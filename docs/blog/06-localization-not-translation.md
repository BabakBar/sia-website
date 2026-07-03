# Localization Is Not a Translation File

- **Status:** outlined
- **Type:** human + technical / product design
- **Primary sources:** FabrikTakt, Taliman-Website, personal cross-border
  background, LinkedIn/public history
- **Length:** ~1,000 words
- **Core claim:** internationalization becomes real when language, calendar,
  directionality, and defaults affect the actual workflow.

## Hook

Persian support was not a line in a settings menu. In some workflows, Persian is
the workflow.

## Evidence

- FabrikTakt stores Persian date/time/weekday/month on knowledge entries.
- Taliman-Website is bilingual Persian/English with RTL/LTR design.
- Personal path spans Iran, Spain, Mexico, Germany, and English/German/Persian
  professional contexts.
- AutoSpendTracker and personal tools expose currency/calendar assumptions.

## Structure

1. Translation is text; localization is behavior.
2. RTL/LTR changes layout and scanning patterns.
3. Jalali dates are not cosmetic if users reason about work in that calendar.
4. Currency, names, addresses, and language are data-model assumptions.
5. Why living across defaults makes you a better engineer.

## One concrete artifact

Small table of assumptions: date, text direction, currency, language, name.

## Takeaway

Your defaults are someone's edge case. Build the actual workflow, not the one
your framework assumes.

## Risks

- Keep it technical, not a diary.
