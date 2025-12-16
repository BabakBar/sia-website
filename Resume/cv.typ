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
// 1. Skills (keywords first for ATS)
// 2. Certifications (gate-opener for senior roles)
// 3. Experience (most important)
// 4. Education
// 5. Publications (differentiator)

#import-modules((
  "skills",
  "certificates",
  "professional",
  "education",
  "publications",
))
