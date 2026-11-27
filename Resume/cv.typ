// Babak Barghi - Cloud Engineer Resume
// Template: brilliant-cv v3.1.1 (modified - compact variant)
// Modifications: smaller fonts (26pt name, 14pt headers), reordered header layout

#import "./template/src/lib.typ": cv
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

#set document(title: "Babak Barghi | Cloud Architecture and Applied AI", author: "Babak Barghi")

#import-modules(("summary", "professional", "projects", "skills", "education", "publications"))
