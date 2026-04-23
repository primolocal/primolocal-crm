# PrimoLocal Lead Gen Protocol

## What This Is

A systematic way to find, score, and prioritize home service businesses in Houston for PrimoLocal partnership outreach. Uses the official Google Places API — no scraping, no CAPTCHAs, no blocked IPs.

---

## Setup

### 1. Get a Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable the **Places API (New)**
4. Create an API key under **Credentials**
5. Set environment variable:
   ```bash
   export GOOGLE_PLACES_API_KEY=your_key_here
   ```

**Cost:** ~$5 per 1,000 requests. Each category search returns ~60 results across 3 pages. Full run = ~240 businesses = ~$1.20.

---

## Running the Protocol

### Step 1: Collect Leads

```bash
python scripts/lead-gen.py
```

**What it does:**
- Searches Google Places for HVAC, plumbing, electrical, and roofing contractors in Houston
- Pulls: name, address, phone, website, rating, review count, business type
- Scores each lead on a 100-point scale
- Exports 4 category CSVs + 1 master CSV

**Scoring logic:**

| Factor | Points | Why |
|--------|--------|-----|
| Has phone number | +20 | Can forward to Piper |
| Has website | +15 | Online presence baseline |
| No website | +10 | Bigger GBP opportunity |
| 50+ reviews | +25 | High call volume |
| 20-49 reviews | +15 | Moderate volume |
| 3.0-4.2 rating | +25 | Room for review improvement |
| 4.3+ rating | +10 | Strong but can still grow |
| Zero reviews | +15 | Invisible online = big opportunity |

**Priority tiers:**
- **HIGH (70+):** Call these first. They have volume + phone + room to grow.
- **MEDIUM (45-69):** Good backup list. Mixed signals but worth a call.
- **LOW (<45):** Skip or deprioritize. Low volume or missing data.

---

### Step 2: Estimate Revenue Potential

```bash
python scripts/revenue-estimator.py
```

**What it does:**
- Takes the master lead list
- Estimates annual revenue based on review count (proxy for job volume)
- Estimates missed calls per week based on volume
- Calculates potential captured revenue if Piper handles those calls

**Estimation logic:**
- Review count × 10 = total customers (10% leave reviews)
- ÷ 2 = annual jobs (2 years of review history)
- × $1,200 = estimated annual revenue
- Missed calls scale with volume: 6-18/week
- Captured value = missed × 52 × 35% close × $1,200 ticket

---

## Output Files

| File | Description |
|------|-------------|
| `leads_hvac.csv` | HVAC contractors only |
| `leads_plumbing.csv` | Plumbers only |
| `leads_electrical.csv` | Electricians only |
| `leads_roofing.csv` | Roofers only |
| `leads_all.csv` | Combined master list |
| `leads_scored.csv` | Master list + revenue estimates |

---

## Outreach Priority

### Call Order

1. **HIGH priority + $200K+ captured potential** — These are your whales
2. **HIGH priority + 50+ reviews + 3.0-4.2 rating** — Volume + room to improve
3. **HIGH priority + 0 reviews** — Invisible online, easy win story
4. **MEDIUM priority + phone number** — Backup list for slow days

### What to Say (Cold Call)

> "Hi [Name], this is Tommy with PrimoLocal. I'm calling because I noticed [Business Name] has [X] Google reviews, which tells me you're doing real volume. Quick question — are you currently missing calls while you're on jobs?"

> "I work with Houston contractors who are tired of losing jobs to voicemail. I built an AI receptionist called Piper that answers every call, books appointments directly into your calendar, and works 24/7. I'm selecting 10 partners for a 30-day prove-it period — completely free. If it doesn't work, you walk away with zero charge."

> "The application takes 5 minutes. I'll review it within 24 hours and call you back. Sound fair?"

---

## CRM Import

The `leads_scored.csv` is formatted for direct import into your Supabase CRM:

```sql
-- After exporting leads_scored.csv, convert to INSERT statements
-- Or use the Supabase dashboard CSV import feature
```

**Map to your `leads` table:**
- `business_name` → `company_name`
- `phone` → `phone`
- `address` → `address`
- `website` → `website`
- `rating` → `google_rating`
- `review_count` → `review_count`
- `annual_revenue_estimate` → `estimated_revenue`
- `priority` → `priority`
- `category` → `vertical`
- `place_id` → `google_place_id`

---

## Expanding Beyond Houston

To search other cities, edit `lead-gen.py`:

```python
SEARCH_LOCATION = "Dallas, TX"
# Update lat/lng for the new city:
# Dallas: 32.7767, -96.7970
# Austin: 30.2672, -97.7431
# San Antonio: 29.4241, -98.4936
```

Then re-run. Each city = ~$1.20 in API costs.

---

## Legal / Compliance

- Uses the official Google Places API — fully compliant with Google's ToS
- No scraping, no automation of Google Maps UI, no CAPTCHA bypass
- Data is public business information (names, addresses, phone numbers)
- TCPA compliance: only calling businesses, not consumers
- Always honor DNC requests immediately
