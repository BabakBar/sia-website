# Resume - Babak Barghi

Typst-powered resume system using the [brilliant-cv](https://typst.app/universe/package/brilliant-cv) template.

## Quick Start

```bash
# Install Typst (if not already installed)
brew install typst  # macOS
# or: cargo install typst-cli

# Build resume
make cv
# or: typst compile cv.typ output/Babak_Barghi_Cloud_Engineer.pdf

# Watch mode (auto-rebuild on save)
make watch
```

## Structure

```text
resume/
├── cv.typ              # Main resume file
├── metadata.toml       # Personal info, colors, ATS keywords
├── modules_en/         # Content sections
│   ├── skills.typ
│   ├── certificates.typ
│   ├── professional.typ
│   ├── education.typ
│   └── publications.typ
├── jobs/               # Job-specific customizations
├── output/             # Generated PDFs
└── Makefile
```

## Customization

### Per-Job Applications

1. Create a copy:

   ```bash
   make job NAME=acme-senior-cloud
   ```

2. Edit `jobs/acme-senior-cloud.typ` to adjust:
   - Reorder bullets to match job requirements
   - Adjust keywords in metadata.toml
   - Emphasize relevant skills

3. Build:

   ```bash
   typst compile jobs/acme-senior-cloud.typ output/jobs/acme-senior-cloud.pdf
   ```

### Content Updates

Edit files in `modules_en/`:

- `professional.typ` - Work experience
- `skills.typ` - Technical skills
- `certificates.typ` - Certifications
- `education.typ` - Education
- `publications.typ` - Publications

### Styling

Edit `metadata.toml`:

- `awesome_color` - Accent color (hex or preset)
- `inject_keywords` - ATS keyword injection
- `layout.*` - Spacing, fonts, alignment

## ATS Optimization

This resume is optimized for Applicant Tracking Systems:

- ✅ Single-column layout
- ✅ Standard section headers
- ✅ Clean PDF output (text selectable)
- ✅ Invisible keyword injection
- ✅ No photos/graphics
- ✅ Standard fonts

## Fonts

By default, this repo uses a Typst-available font (configured in `metadata.toml`) so the PDF builds **without** "unknown font family" warnings.

If you want the upstream `brilliant-cv` look, install these fonts and then switch the settings in `metadata.toml` under `[layout.fonts]`:

- Source Sans 3 (or Source Sans Pro)
- Roboto
- Font Awesome 7 (optional, only needed if your content uses it)

## Template

Using [brilliant-cv v3.1.1](https://typst.app/universe/package/brilliant-cv)
