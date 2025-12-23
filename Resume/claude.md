# Resume System Context

Typst-based resume using [brilliant-cv](https://typst.app/universe/package/brilliant-cv) template.

## Structure

- `cv.typ` - main file
- `metadata.toml` - personal info, colors, ATS keywords
- `modules_en/` - content sections (skills, professional, education, etc.)
- `jobs/` - job-specific variants
- `output/` - generated PDFs (gitignored)

## Key Commands

```bash
make cv         # Compile resume
make watch      # Auto-recompile on changes
make job NAME=x # Create job-specific variant
```

## Content Guidelines

- **ATS-first**: Single-column, standard headers, keyword-rich
- **One page**: Tight spacing, concise bullets
- **Quantified**: Include metrics where possible
- **Keywords**: Match job descriptions (update metadata.toml injected_keywords_list)

## Workflow for Job Applications

1. `make job NAME=company-role`
2. Edit `jobs/company-role.typ` - reorder/emphasize relevant bullets
3. Update keywords in copy if needed
4. Compile: `typst compile jobs/company-role.typ output/jobs/company-role.pdf`

## Technical Notes

- Font warnings (Source Sans, Roboto) are avoided by default by using a Typst-available font in `metadata.toml`
- Font Awesome 7 installed via homebrew (`brew install --cask font-fontawesome`)
- English-only (German support removed)
- Current role: Cloud Engineer at Continental (Azure/AWS, IaC, Data platforms)
- AWS Certified Solutions Architect (Oct 2024), studying for AZ-104

### Template Modifications

Modified `/Users/Sia/Library/Caches/typst/packages/preview/brilliant-cv/3.1.1/src/cv.typ`:

**Header layout (lines 116-127):**

- Swapped positions line with contact info
- Order: Name → Positions (header_quote) → Contact details
- Reason: Better hierarchy, positions more prominent

**Font sizes:**

- Name: 32pt → 26pt (lines 18, 23)
- Section headers: 16pt → 14pt (line 300)
- Reason: Better mobile scalability, improved content density
