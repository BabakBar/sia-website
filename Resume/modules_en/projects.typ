#import "../layout.typ": section, position

#section[Selected work in industrial AI]
#position([Steel micrograph inspection], [Computer-vision pilot])
Built a PyTorch prototype to grade carbide spheroidization in steel wire rod. A ten-model ensemble flags images where predictions disagree, so a metallurgist can review borderline samples. The pilot separates cases suitable for spot checks from those that need manual inspection.

#position([#link("https://fabriktakt.com/")[FabrikTakt]], [Independent project])
Built a manufacturing knowledge tool around an operator’s existing workflow. Operators send a Persian voice or text note through Telegram. Gemini structures the note, the operator confirms it, and a later shift can search the resulting record in PostgreSQL.
