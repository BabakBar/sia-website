# Resume Build System
# Usage: make cv | make watch | make clean

TYPST := typst
OUTPUT := output

.PHONY: cv watch clean help

# Default target
cv: $(OUTPUT)/Babak_Barghi_Cloud_Engineer.pdf

$(OUTPUT)/Babak_Barghi_Cloud_Engineer.pdf: cv.typ metadata.toml modules_en/*.typ
	@mkdir -p $(OUTPUT)
	$(TYPST) compile cv.typ $@
	@echo "✓ Built: $@"

# Watch mode - auto-rebuild on save
watch:
	@mkdir -p $(OUTPUT)
	$(TYPST) watch cv.typ $(OUTPUT)/Babak_Barghi_Cloud_Engineer.pdf

# Job-specific variants
# Usage: make job NAME=company-role
job:
ifndef NAME
	$(error NAME required. Usage: make job NAME=company-role)
endif
	@mkdir -p jobs $(OUTPUT)/jobs
	@cp cv.typ jobs/$(NAME).typ
	@echo "Created jobs/$(NAME).typ"
	@echo "Edit it, then run: typst compile jobs/$(NAME).typ $(OUTPUT)/jobs/$(NAME).pdf"

# Clean generated files
clean:
	rm -f $(OUTPUT)/*.pdf $(OUTPUT)/jobs/*.pdf
	@echo "✓ Cleaned"

# Help
help:
	@echo "Resume Build Commands:"
	@echo "  make cv      - Build main resume PDF"
	@echo "  make watch   - Auto-rebuild on changes"
	@echo "  make job NAME=x - Create job-specific copy"
	@echo "  make clean   - Remove generated PDFs"
