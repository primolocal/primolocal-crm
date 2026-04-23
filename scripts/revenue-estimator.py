#!/usr/bin/env python3
"""
PrimoLocal Revenue Estimator — Scores leads by estimated annual revenue.
Takes the leads_all.csv output from lead-gen.py and adds revenue estimates.

Usage:
  python scripts/revenue-estimator.py

Output: leads_scored.csv (same data + revenue_estimate, missed_calls_estimate)
"""

import csv
import sys
from pathlib import Path

INPUT_FILE = Path("/home/tommy/PrimoLocal/crm/scripts/leads_all.csv")
OUTPUT_FILE = Path("/home/tommy/PrimoLocal/crm/scripts/leads_scored.csv")


def estimate_revenue(review_count: int, rating: float) -> dict:
    """
    Estimate annual revenue based on review count.

    Logic:
    - Review count is a lagging indicator of job volume
    - Google review rate for home service: ~5-15% of customers leave reviews
    - Average job value (service calls): $1,200
    - Assume 10% review rate = review_count * 10 = total jobs in review period
    - Most GBPs show ~2 years of reviews = divide by 2 for annual jobs
    """
    try:
        rc = int(review_count or 0)
        rat = float(rating or 0)
    except (ValueError, TypeError):
        rc = 0
        rat = 0

    if rc == 0:
        return {
            "annual_revenue_estimate": 0,
            "annual_jobs_estimate": 0,
            "missed_calls_per_week_estimate": 0,
            "potential_annual_value": 0,
        }

    # Review capture rate: 10% of customers leave reviews
    total_customers = rc * 10

    # Reviews span roughly 2 years of history
    annual_jobs = total_customers // 2

    # Average ticket for service calls
    avg_ticket = 1200
    annual_revenue = annual_jobs * avg_ticket

    # Missed calls estimate: busy contractors miss ~15/week
    # Scale with volume: higher job count = more calls = more missed
    if annual_jobs >= 400:
        missed_per_week = 18
    elif annual_jobs >= 200:
        missed_per_week = 15
    elif annual_jobs >= 100:
        missed_per_week = 10
    else:
        missed_per_week = 6

    # Value of captured calls: missed_per_week * 52 weeks * 35% close * $1200
    potential_captured_value = missed_per_week * 52 * 0.35 * avg_ticket

    return {
        "annual_revenue_estimate": annual_revenue,
        "annual_jobs_estimate": annual_jobs,
        "missed_calls_per_week_estimate": missed_per_week,
        "potential_annual_value": int(potential_captured_value),
    }


def main():
    if not INPUT_FILE.exists():
        print(f"❌ Input file not found: {INPUT_FILE}")
        print("   Run lead-gen.py first to generate leads.")
        sys.exit(1)

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    # Add new columns
    new_fields = [
        "annual_revenue_estimate",
        "annual_jobs_estimate",
        "missed_calls_per_week_estimate",
        "potential_annual_value",
    ]
    fieldnames = fieldnames + new_fields

    for row in rows:
        est = estimate_revenue(row.get("review_count", 0), row.get("rating", 0))
        row.update(est)

    # Sort by potential annual value (descending)
    rows.sort(key=lambda x: int(x.get("potential_annual_value", 0) or 0), reverse=True)

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    # Summary
    total = len(rows)
    with_revenue = sum(1 for r in rows if int(r.get("annual_revenue_estimate", 0) or 0) > 0)
    high_potential = sum(1 for r in rows if int(r.get("potential_annual_value", 0) or 0) > 150000)

    print("=" * 60)
    print("Revenue Estimation Complete")
    print("=" * 60)
    print(f"Output: {OUTPUT_FILE}")
    print(f"Total leads:           {total}")
    print(f"With revenue estimate: {with_revenue}")
    print(f"High potential (>$150K captured value): {high_potential}")
    print("\nTop 5 by potential captured value:")
    for i, row in enumerate(rows[:5], 1):
        name = row.get("business_name", "")
        pot = int(row.get("potential_annual_value", 0) or 0)
        rev = int(row.get("annual_revenue_estimate", 0) or 0)
        phone = row.get("phone", "")
        print(f"  {i}. {name}")
        print(f"     Est. Revenue: ${rev:,} | Captured Value: ${pot:,} | {phone}")
    print("=" * 60)


if __name__ == "__main__":
    main()
