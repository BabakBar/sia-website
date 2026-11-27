// Shared typography and page geometry for the English and Persian profiles.
#let navy = rgb("#203d56")
#let ink = rgb("#1c2933")
#let secondary = rgb("#4c606e")
#let rule = 0.55pt + rgb("#a6b6c1")
#let serif = "Libertinus Serif"
#let sans = "Noto Sans"
#let persian = "Vazirmatn"
#let latin(body) = box(text(font: sans, lang: "en", dir: ltr, body))
#let identity = toml("metadata.toml").personal

#let resume(lang, title, body) = {
  let fa = lang == "fa"
  set document(title: title, author: identity.first_name)
  set text(lang: lang, dir: if fa { rtl } else { ltr },
    font: if fa { persian } else { serif },
    size: 12pt, fill: ink)
  set page(paper: "a4", margin: (x: 20mm, top: 18mm, bottom: 19mm),
    footer: context [
      #line(length: 100%, stroke: rule)
      #v(2pt)
      #set text(font: if fa { persian } else { sans }, size: 8pt, fill: secondary)
      #box(text(font: serif, dir: ltr, identity.first_name)) #h(1fr)
      #if fa { [صفحه #counter(page).display("۱")] } else { [Page #counter(page).display()] }
    ])
  set par(leading: if fa { 0.94em } else { 0.77em }, spacing: 6pt)
  set list(tight: false, indent: 13pt, body-indent: 4pt, spacing: 5pt)
  body
}

#let masthead(role, locality) = context {
  let fa = text.lang == "fa"
  let c = identity.info
  block(width: 100%)[
    #align(if fa {right} else {left}, text(size: 37pt, weight: "regular", font: serif, fill: navy, dir: ltr, identity.first_name))
    #v(3pt)
    #text(font: if fa { persian } else { sans }, size: if fa { 16pt } else { 14.5pt }, fill: navy, role)
    #v(8pt)
    #set text(font: if fa { persian } else { sans }, size: 9pt, fill: secondary)
    #locality  ·  #link(c.custom-1.link, latin(c.custom-1.text))  ·  #link(c.custom-5.link, latin(c.custom-5.text))  ·  #link(c.custom-3.link, latin[LinkedIn])  ·  #link(c.custom-4.link, latin[GitHub])
    #if not fa { [ · #latin(c.custom-2.text)] }
  ]
  v(8pt)
  line(length: 100%, stroke: 1.1pt + navy)
}

#let section(title) = context {
  let fa = text.lang == "fa"
  v(16pt, weak: true)
  block(width: 100%, above: 0pt, below: 0pt, sticky: true)[
    #text(font: if fa { persian } else { serif }, size: 19pt, fill: navy, weight: "bold", title)
    #v(1pt)
    #line(length: 100%, stroke: rule)
    #v(4pt)
  ]
}
#let position(title, date, detail: none) = context {
  let fa = text.lang == "fa"
  v(9pt)
  block(width: 100%, above: 0pt, below: 0pt, sticky: true)[
    #text(font: if fa { persian } else { sans }, size: 11.4pt, weight: "bold", title)
    #h(1fr)
    #text(font: if fa { persian } else { sans }, size: 9pt, fill: secondary, date)
    #if detail != none { [\ #text(size: 10pt, fill: secondary, detail)] }
    #v(5pt)
  ]
}
