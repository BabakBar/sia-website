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
// 2. Professional Experience (progression: data scientist → solutions → platform architect)
// 3. Advisory & Leadership (business acumen, differentiators)
// 4. Skills (technical keywords for ATS)
// 5. Projects (hands-on technical credibility)
// 6. Education
// 7. Certifications (gate-opener for senior roles)
// 8. Publications (research credibility)

#import-modules((
	  "summary",
	  "professional",
	  "advisory",
	  "projects",
	  "skills",
	  "education",
	  "certificates",
	  "publications",
	))
