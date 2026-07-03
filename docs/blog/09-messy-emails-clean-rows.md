# Messy Emails, Clean Rows

- **Status:** outlined
- **Type:** practical AI / structured extraction
- **Primary sources:** AutoSpendTracker
- **Length:** ~1,000 words
- **Core claim:** LLMs are useful when the input is ugly but the output shape is
  strict. Spend effort on schema, validation, and idempotency instead of endless
  regex.

## Hook

Every bank formats transaction emails differently. Regex can survive one
provider. It cannot survive a life split across currencies, accounts, and
countries.

## Evidence

- AutoSpendTracker: Gmail notifications, Gemini extraction/categorization,
  Google Sheets output, multi-currency reality.
- Personal finance across MXN, EUR, USD.

## Structure

1. The problem: transaction emails as semi-structured chaos.
2. Why regex becomes a maintenance trap.
3. Define the target schema first.
4. Let the model parse, then validate before writing.
5. Idempotency and audit trail: do not double-count money.
6. Why Sheets can be the right database for a one-person finance tool.

## One concrete artifact

Sanitized JSON schema or extraction contract.

## Takeaway

For messy input and clean output, specify the output and validate hard. The LLM
is the parser, not the source of truth.

## Risks

- No personal account details, vendor-sensitive data, or real transactions.
