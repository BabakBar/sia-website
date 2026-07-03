# The Best Factory Interface Might Be a Voice Note

- **Status:** outlined
- **Type:** product/design / manufacturing AI
- **Primary sources:** FabrikTakt
- **Length:** ~1,100 words
- **Core claim:** shop-floor knowledge systems fail when they require workers to
  behave like office software users. Capture must happen in the worker's normal
  language, device, and input mode.

## Hook

Every knowledge-management tool says it captures tribal knowledge. Then it asks
the busiest person on the shop floor to fill out a form.

## Evidence

- FabrikTakt captures operational knowledge through Telegram text and voice.
- Persian/Farsi input and Jalali dates are first-class, not afterthoughts.
- Gemini structures messy notes into searchable entries.
- PostgreSQL/full-text search gives retrieval without forcing a heavy ERP/MES.

## Structure

1. Tribal knowledge problem: fixes, machine quirks, handover notes, quality
   observations, safety notes.
2. Why forms fail on the floor.
3. Why Telegram and voice reduce capture friction.
4. How AI is useful here: structure, entities, summaries, search fields.
5. What the architecture still has to earn: state externalization, data
   isolation, circuit breakers, observability.
6. Lesson: the interface is part of the architecture.

## One concrete artifact

Flow diagram: `voice note -> transcription/AI structuring -> confirmation -> searchable knowledge entry`.

## Takeaway

If the capture interface is wrong, the knowledge base stays empty. Meet workers
where the knowledge actually appears.

## Risks

- Keep private implementation and client specifics out.
- Do not imply FabrikTakt is enterprise-ready beyond its current maturity.
