# I Stopped Organizing Bookmarks and Started Searching Them

- **Status:** outlined
- **Type:** practical AI / personal knowledge management
- **Primary sources:** Bookmark-intelligence
- **Length:** ~1,000 words
- **Core claim:** folders fail when the same link belongs to many contexts. For a
  large bookmark collection, retrieval beats manual organization.

## Hook

The problem was not that I had too many bookmarks. The problem was that I could
remember the reason I saved them, but not the folder I put them in.

## Evidence

- BookmarkAI goal: semantic search, automatic tagging, summaries, project-based
  clustering.
- Phase 0 imports existing bookmarks before building the extension.
- Stack: FastAPI, PostgreSQL, Qdrant, Valkey, embeddings, self-hosted.

## Structure

1. Bookmark graveyard problem.
2. Why folders are the wrong primitive for project-based memory.
3. Phase 0 lesson: test organization on existing messy data before building new
   capture UX.
4. Embeddings as retrieval, not magic.
5. Project context as the missing layer.

## One concrete artifact

Example schema for a bookmark record: url, title, summary, tags, project,
embedding metadata.

## Takeaway

For personal knowledge, the question is not "where did I put it?" It is "what
was I trying to do when I saved it?"
