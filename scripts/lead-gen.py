#!/usr/bin/env python3
"""
PrimoLocal Lead Gen Protocol — Google Places API
Finds home service businesses in Houston for partnership outreach.

Usage:
  1. Get a Google Places API key: https://developers.google.com/maps/documentation/places/web-service/overview
  2. Set it as an environment variable: export GOOGLE_PLACES_API_KEY=your_key_here
  3. Run: python scripts/lead-gen.py

Output: leads_hvac.csv, leads_plumbing.csv, leads_electrical.csv, leads_roofing.csv
"""

import os
import csv
import time
import json
import urllib.request
import urllib.parse
from datetime import datetime
from typing import List, Dict, Optional

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
BASE_URL = "https://places.googleapis.com/v1/places:searchText"

# Houston metro area + surrounding suburbs
SEARCH_LOCATION = "Houston, TX"
RADIUS_METERS = 50000  # ~31 miles covers full metro

CATEGORIES = [
    {"file": "leads_hvac", "query": "HVAC contractor Houston"},
    {"file": "leads_plumbing", "query": "plumber Houston"},
    {"file": "leads_electrical", "query": "electrician Houston"},
    {"file": "leads_roofing", "query": "roofing contractor Houston"},
]

# Fields we want from the API
FIELD_MASK = "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus,places.types"


def fetch_places(query: str, page_token: Optional[str] = None) -> Dict:
    """Fetch places from Google Places API (New)."""
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
    }

    body = {
        "textQuery": query,
        "locationBias": {
            "circle": {
                "center": {"latitude": 29.7604, "longitude": -95.3698},
                "radius": RADIUS_METERS,
            }
        },
    }

    if page_token:
        body["pageToken"] = page_token

    req = urllib.request.Request(
        BASE_URL,
        data=json.dumps(body).encode("utf-8"),
        headers=headers,
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def score_lead(place: Dict) -> Dict:
    """Score a lead based on PrimoLocal partnership criteria."""
    rating = place.get("rating", 0)
    review_count = place.get("userRatingCount", 0)
    phone = place.get("nationalPhoneNumber", "")
    website = place.get("websiteUri", "")

    score = 0
    reasons = []

    # Has a phone number = can call / forward to Piper
    if phone:
        score += 20
        reasons.append("Has phone number")

    # Has a website = invested in online presence
    if website:
        score += 15
        reasons.append("Has website")
    else:
        score += 10
        reasons.append("No website — GBP opportunity")

    # Review count indicates call volume potential
    if review_count >= 50:
        score += 25
        reasons.append(f"{review_count} reviews — high volume")
    elif review_count >= 20:
        score += 15
        reasons.append(f"{review_count} reviews — moderate volume")
    elif review_count >= 5:
        score += 5
        reasons.append(f"{review_count} reviews — low volume")

    # Rating sweet spot: 3.0–4.2 means room for improvement
    if 3.0 <= rating <= 4.2:
        score += 25
        reasons.append(f"{rating}★ — room for review improvement")
    elif rating > 4.2:
        score += 10
        reasons.append(f"{rating}★ — strong but can still grow")
    elif rating > 0:
        score += 5
        reasons.append(f"{rating}★ — needs help")

    # Flag if no reviews at all — could mean invisible online
    if review_count == 0:
        score += 15
        reasons.append("No reviews — invisible online, big opportunity")

    return {
        "score": score,
        "score_reasons": "; ".join(reasons),
        "priority": "HIGH" if score >= 70 else "MEDIUM" if score >= 45 else "LOW",
    }


def collect_leads(category: Dict) -> List[Dict]:
    """Collect all leads for a category with pagination."""
    leads = []
    page_token = None
    pages = 0
    max_pages = 3  # API returns ~20 per page, 3 pages = ~60 leads per category

    print(f"\n🔍 Searching: {category['query']}")

    while pages < max_pages:
        try:
            data = fetch_places(category["query"], page_token)
            places = data.get("places", [])

            if not places:
                break

            for place in places:
                # Skip closed businesses
                if place.get("businessStatus") == "CLOSED_PERMANENTLY":
                    continue

                scored = score_lead(place)

                lead = {
                    "place_id": place.get("id", ""),
                    "business_name": place.get("displayName", {}).get("text", ""),
                    "address": place.get("formattedAddress", ""),
                    "phone": place.get("nationalPhoneNumber", ""),
                    "website": place.get("websiteUri", ""),
                    "rating": place.get("rating", ""),
                    "review_count": place.get("userRatingCount", 0),
                    "types": ", ".join(place.get("types", [])),
                    "score": scored["score"],
                    "priority": scored["priority"],
                    "score_reasons": scored["score_reasons"],
                    "category": category["file"].replace("leads_", ""),
                    "scraped_at": datetime.now().isoformat(),
                }
                leads.append(lead)

            print(f"  Page {pages + 1}: {len(places)} places found")

            page_token = data.get("nextPageToken")
            if not page_token:
                break

            pages += 1
            time.sleep(2)  # Rate limit respect

        except Exception as e:
            print(f"  ⚠️ Error on page {pages + 1}: {e}")
            break

    # Sort by score descending
    leads.sort(key=lambda x: x["score"], reverse=True)
    print(f"  ✅ Total leads collected: {len(leads)}")
    return leads


def export_csv(leads: List[Dict], filename: str) -> None:
    """Export leads to CSV."""
    if not leads:
        return

    filepath = f"/home/tommy/PrimoLocal/crm/scripts/{filename}.csv"
    fieldnames = [
        "priority", "score", "business_name", "phone", "address",
        "website", "rating", "review_count", "types", "score_reasons",
        "place_id", "category", "scraped_at",
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(leads)

    print(f"  💾 Exported: {filepath}")


def main():
    if not API_KEY:
        print("❌ Set GOOGLE_PLACES_API_KEY environment variable first.")
        print("   Get one at: https://developers.google.com/maps/documentation/places/web-service/overview")
        return

    print("=" * 60)
    print("PrimoLocal Lead Gen Protocol")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    all_leads = []

    for category in CATEGORIES:
        leads = collect_leads(category)
        all_leads.extend(leads)
        export_csv(leads, category["file"])
        time.sleep(3)

    # Master combined file
    export_csv(all_leads, "leads_all")

    # Summary
    high = sum(1 for l in all_leads if l["priority"] == "HIGH")
    medium = sum(1 for l in all_leads if l["priority"] == "MEDIUM")
    low = sum(1 for l in all_leads if l["priority"] == "LOW")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total leads:      {len(all_leads)}")
    print(f"HIGH priority:    {high}")
    print(f"MEDIUM priority:  {medium}")
    print(f"LOW priority:     {low}")
    print(f"\nMaster file:      /home/tommy/PrimoLocal/crm/scripts/leads_all.csv")
    print("\nNext steps:")
    print("  1. Import leads_all.csv into your CRM")
    print("  2. Cross-reference with revenue estimates (see revenue estimator below)")
    print("  3. Call HIGH priority leads first — they have phone + volume + room to grow")
    print("=" * 60)


if __name__ == "__main__":
    main()
