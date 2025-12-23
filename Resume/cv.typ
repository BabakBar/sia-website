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
// 3. Skills (technical keywords for ATS)
// 4. Projects (hands-on technical credibility)
// 5. Education
// 6. Publications (research credibility)
// Optional: Advisory & Leadership (uncomment for roles valuing business acumen)

#import-modules((
	  "summary",
	  "professional",
	  // "advisory",  // uncomment for leadership-focused roles
	  "projects",
	  "skills",
	  "education",
	  "publications",
	))
