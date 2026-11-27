# Babak Barghi · Résumés

The English résumé covers cloud architecture, people management and applied AI. The Persian profile is written for industrial executives. Both are two-page, selectable-text PDFs, with a shared layout and native right-to-left typesetting for Persian.

## Build

Install Typst, Noto Sans, and the regular and bold faces of [Vazirmatn](https://github.com/rastikerdar/vazirmatn). Typst includes Libertinus Serif. Locally installed fonts are discovered automatically, or set `TYPST_FONT_PATHS` to a directory containing the fonts.

```bash
make cv cv-fa
make watch
```

The generated PDFs are `output/Babak_Barghi_Resume.pdf` and `output/Babak_Barghi_Resume_FA.pdf`. For typst.app, upload the Resume directory and fonts, then select `cv.typ` or `cv-fa.typ` as the entry point.

## Edit

- `cv.typ` sets the page break and section order for the English résumé. Edit its text in `modules_en/`.
- `cv-fa.typ` contains the Persian advisory profile and industrial case studies.
- `layout.typ` defines the typography, direction, contact header, section headings and footer for both editions. Contact values come from `metadata.toml`.

## Job variants

```bash
make job NAME=example
make compile-job NAME=example
make list-jobs
make all-jobs
make clean
```

Edit the generated `jobs/example.typ` to tailor its sections. The existing Continental job variant uses the older brilliant-cv header under `template/src/` and requires Font Awesome 7 Free and Brands for its icons.
