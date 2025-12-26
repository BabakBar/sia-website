# Resume Build System
# Usage: make cv | make watch | make clean

TYPST := typst
OUTPUT := output

.PHONY: cv watch clean help job compile-job list-jobs all-jobs

# Default target
cv: $(OUTPUT)/Babak_Barghi_Resume.pdf

$(OUTPUT)/Babak_Barghi_Resume.pdf: cv.typ metadata.toml modules_en/*.typ
	@mkdir -p $(OUTPUT)
	$(TYPST) compile cv.typ $@
	@echo "✓ Built: $@"

# Watch mode - auto-rebuild on save
watch:
	@mkdir -p $(OUTPUT)
	$(TYPST) watch cv.typ $(OUTPUT)/Babak_Barghi_Resume.pdf

# Job-specific variants
# Usage: make job NAME=company-role
job:
ifndef NAME
	$(error NAME required. Usage: make job NAME=company-role)
endif
	@mkdir -p jobs $(OUTPUT)/jobs
	@if [ ! -f jobs/$(NAME).typ ]; then \
		cp cv.typ jobs/$(NAME).typ; \
		echo "✓ Created jobs/$(NAME).typ"; \
	else \
		echo "⚠ jobs/$(NAME).typ already exists"; \
	fi

# Compile specific job variant
# Usage: make compile-job NAME=company-role
compile-job:
ifndef NAME
	$(error NAME required. Usage: make compile-job NAME=company-role)
endif
	@if [ ! -f jobs/$(NAME).typ ]; then \
		echo "✗ jobs/$(NAME).typ not found. Run: make job NAME=$(NAME)"; \
		exit 1; \
	fi
	@mkdir -p $(OUTPUT)/jobs
	$(TYPST) compile jobs/$(NAME).typ $(OUTPUT)/jobs/$(NAME).pdf
	@echo "✓ Built: $(OUTPUT)/jobs/$(NAME).pdf"

# List all job variants
list-jobs:
	@echo "Job variants:"
	@if [ -d jobs ]; then \
		ls -1 jobs/*.typ 2>/dev/null | sed 's|jobs/||; s|.typ$$||' || echo "  (none)"; \
	else \
		echo "  (none)"; \
	fi

# Compile all job variants
all-jobs:
	@mkdir -p $(OUTPUT)/jobs
	@if [ -d jobs ] && [ -n "$$(ls -A jobs/*.typ 2>/dev/null)" ]; then \
		for job in jobs/*.typ; do \
			name=$$(basename $$job .typ); \
			$(TYPST) compile $$job $(OUTPUT)/jobs/$$name.pdf; \
			echo "✓ Built: $(OUTPUT)/jobs/$$name.pdf"; \
		done \
	else \
		echo "No job variants found"; \
	fi

# Clean generated files
clean:
	rm -f $(OUTPUT)/*.pdf $(OUTPUT)/jobs/*.pdf
	@echo "✓ Cleaned"

# Help
help:
	@echo "Resume Build Commands:"
	@echo "  make cv                - Build main resume PDF"
	@echo "  make watch             - Auto-rebuild on changes"
	@echo ""
	@echo "Job Variants:"
	@echo "  make job NAME=x        - Create job-specific variant"
	@echo "  make compile-job NAME=x - Compile specific variant"
	@echo "  make list-jobs         - List all variants"
	@echo "  make all-jobs          - Compile all variants"
	@echo ""
	@echo "  make clean             - Remove generated PDFs"
