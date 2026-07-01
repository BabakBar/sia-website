# Telegram Is My Favorite Frontend

- **Status:** outlined
- **Type:** interface opinion (replaces the dropped job-search post)
- **Serves:** thought leadership + practical
- **Sources:** FabrikTakt, Hermès monitor, KinoWeek, AutoSpendTracker
- **Length:** ~800 words
- **Why:** a strong, contrarian take backed by four shipped projects.

## Hook

I've built maybe a dozen personal tools. Almost none of them have a website.
They all talk to me through Telegram, and I'm not sure I'll ever go back.

## Argument

For solo tools and small products, a chat bot is the cheapest viable frontend
that exists. No auth, no hosting a UI, no responsive CSS, push notifications
for free, voice input for free, and it's already installed on every phone.
The bot is the interface; your logic stays a plain script.

## Outline

- The hidden cost of a "real" UI: routing, state, auth, deploy, mobile,
  a11y — before you've solved the actual problem.
- What Telegram gives you for nothing: identity (chat ID), delivery, voice,
  media, buttons, and a UI users already know.
- Four proofs: FabrikTakt (input), Hermès (alerts), KinoWeek (digest),
  AutoSpendTracker (reports). Same interface, four very different jobs.
- Where it breaks down — be honest: rich dashboards, multi-user products,
  anything that needs real layout. Know when to graduate to a web UI.

## Takeaway

Default to the interface with the lowest cost-to-first-value. For a tool with
one user, that's almost always a bot — not a blank React app.

## Notes / risks

- Keep it opinionated but fair; the "where it breaks down" section earns trust.
- Pairs naturally with 01 (method) and 05 (stack).
