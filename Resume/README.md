# Resume - Babak Barghi

Typst-powered resume system using the [brilliant-cv](https://typst.app/universe/package/brilliant-cv) template.

## Quick Start

```bash
# Install Typst (if not already installed)
brew install typst  # macOS
# or: cargo install typst-cli

# Build resume
make cv
# or: typst compile cv.typ output/Babak_Barghi_Resume.pdf

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

**Workflow:**

1. **Create variant:**
   ```bash
   make job NAME=aws-cloud-architect
   ```

2. **Edit** `jobs/aws-cloud-architect.typ`:
   - Reorder bullets to match job requirements
   - Adjust keywords in metadata if needed
   - Emphasize relevant skills

3. **Compile:**
   ```bash
   make compile-job NAME=aws-cloud-architect
   ```

**Additional commands:**

```bash
make list-jobs    # List all job variants
make all-jobs     # Compile all variants at once
make clean        # Remove all generated PDFs
```

**File structure:**
```
output/
├── Babak_Barghi_Resume.pdf  # Main CV
└── jobs/
    ├── aws-cloud-architect.pdf
    ├── azure-devops-engineer.pdf
    └── data-platform-engineer.pdf
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
