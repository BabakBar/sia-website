# Parsing Messy Email with an LLM

- **Status:** outlined
- **Type:** practical / tutorial-ish
- **Serves:** community + professional signal
- **Sources:** AutoSpendTracker (Gmail API + Gemini + Sheets)
- **Length:** ~1,000 words
- **Why:** the most "how-to" post; broadly useful, good for search/shares.

## Hook

Transaction emails are a nightmare to parse. Every bank, every provider, every
currency formats them differently, and half of them are HTML soup. Regex is a
losing game. So I stopped writing parsers and started describing what I wanted.

## Angle

A concrete, honest walkthrough of using an LLM for **structured extraction**
from messy real-world text — with the parts tutorials skip: schema design,
handling the model getting it wrong, cost, and keeping a human-auditable trail.

## Outline

- The task: Gmail notifications from Wise, PayPal, etc. → categorized rows in
  a Google Sheet.
- Why not regex: N formats × M providers × K currencies = infinite parsers.
- The approach: define the output schema first, let Gemini fill it, validate
  before you trust it.
- The unglamorous bits: bad extractions, ambiguous categories, idempotency so
  you don't double-count, and why Sheets (not a DB) is the right store here.
- What I'd tell someone starting their own extraction project.

## Takeaway

For messy input with a clean target shape, don't write the parser — specify
the output and let the model parse. Then spend your effort on validation, not
on regex you'll rewrite next month.

## Notes / risks

- One real (sanitized) schema + prompt snippet. Scrub any account details.
- Keep it reproducible: reader should be able to adapt it to their own emails.
