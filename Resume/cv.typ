// Babak Barghi - Cloud Engineer Resume
// Template: brilliant-cv v3.1.1

#import "@preview/brilliant-cv:3.1.1": cv
#let metadata = toml("./metadata.toml")

#let import-modules(modules) = {
  for module in modules {
    include "modules_en/" + module + ".typ"
  }
}

#show: cv.with(
  metadata,
  profile-photo: none,  // No photo for ATS optimization
)

// Section order optimized for senior cloud engineer roles:
// 1. Summary (context + scope for ATS/NLP)
// 2. Skills (keywords first for ATS)
// 3. Certifications (gate-opener for senior roles)
// 4. Experience (most important)
// 5. Education
// 6. Publications (differentiator)

#import-modules((
  "summary",
  "professional",
  "skills",
  "education",
  "certificates",
  "publications",
))
