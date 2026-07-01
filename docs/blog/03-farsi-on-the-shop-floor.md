# Farsi on the Shop Floor

- **Status:** outlined
- **Type:** human + technical
- **Serves:** human story + technical; ties your roots to your work
- **Sources:** FabrikTakt
- **Length:** ~1,000 words
- **Why:** the cross-cultural engineering angle no template blog has.

## Hook

Every knowledge-management tool I've seen assumes the same user: an
English-speaking, desk-bound worker who'll happily fill out a web form. The
people with the most valuable knowledge on a shop floor are none of those
things.

## Angle

FabrikTakt captures operational "tribal knowledge" from manufacturing workers
in **Persian**, by **voice or text**, over **Telegram**, structured by Gemini,
with **Jalali (Persian) dates** as a first-class citizen. The design lesson:
meet users in their language, their input mode, and their calendar — or you
capture nothing.

## Outline

- The problem: tribal knowledge walks out the door when a senior operator
  leaves. Nobody types it into a wiki.
- Why Telegram + voice: zero training, no new app, works on any phone.
- Why Farsi and Jalali dates aren't a "localization feature" — they're the
  whole point. `persian_date`, `persian_weekday`, `persian_month` baked into
  every record.
- How Gemini turns a rambling voice note into a structured `knowledge_entry`
  with full-text search.

## Takeaway

Localization isn't translation you bolt on at the end. For some products, the
language and the calendar *are* the product. Build for the user you actually
have, not the one your framework assumes.

## Notes / risks

- Nice bridge from your Iran background to your German manufacturing work.
- One diagram: voice note → Gemini → structured entry → searchable.
