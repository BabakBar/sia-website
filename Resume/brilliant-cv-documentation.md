# Brilliant CV Documentation
**Version:** 3.0.0
**Build Date:** 2025-11-27
**Author:** yunanwg
---
## 1. Introduction
Brilliant CV is a Typst template for creating a Résumé, CV, or Cover Letter, inspired by the famous LaTeX CV template Awesome-CV.
---
## 2. Setup
### Step 1: Install Fonts
To make Typst render correctly, you must install the required fonts on your local system: **Roboto** and **Source Sans Pro** (or Source Sans 3).
### Step 2: Check Documentation
Review the documentation provided.
### Step 3: Bootstrap Template
Bootstrap the template on your local system using the following command (similar to `git clone`):
```bash
typst init @preview/brilliant-cv:<version>
```
Replace `<version>` with the latest release or any release after 2.0.0.
### Step 4: Compile Files
Adapt the `metadata.toml` file to suit your needs, then run the following command to generate your CV:
```bash
typst c cv.typ
```
### Step 5: Go Beyond
It is recommended to:
1. Use **git** to manage your project for version control.
2. Use **typstyle** and **pre-commit** to help format your CV.
3. Use **typos** to check for typos if your main locale is English.
4. [cite_start](https://www.google.com/search?q=Advanced) Use **LTex** in your code editor to check grammar and get language suggestions.
---
## 3. Migration from v1 to v2
If you have an existing project using v1, migration is required.
1. **Delete folders:** Delete the `brilliant-CV` folder and `.gitmodules`. Future package management is handled directly by Typst.
2. **Migrate Configuration:** Move all configuration from `metadata.typ` to a new `metadata.toml` file. Follow the example toml file in the repo; it is straightforward to migrate.
3. **Update Typ Files:** For `cv.typ` and `letter.typ`, copy the new files from the repository and adapt the modules in your project.
4. **Update Module Files:** For files in `/modules_*` folders:
   - Delete the old import `#import "../brilliant-CV/template.typ": *` and replace it with the import statements found in the new template files.
   - Update path handling: You cannot pass path strings directly to some functions anymore (e.g., the logo argument in `cvEntry` or `cvPublication`).
   - Pass a function instead of a string (e.g., use `image("logo.png")` instead of `"logo.png"`).
   - You may need to install Roboto and Source Sans Pro locally, as the new Typst package discourages including these large files.
   - Run `typst c cv.typ` without the font-path flag.
---
## 4. Configuration via metadata.toml
The `metadata.toml` file is the main configuration file where you set up names, contact info, and display details.
### General Settings
```toml
# INFO: value must match folder suffix; i.e "zh" -> "./modules_zh"
[cite_start]language = "en" [cite: 51]
```
### Layout Configuration
```toml
[layout]
# Optional values: skyblue, red, nephritis, concrete, darknight
[cite_start]awesome_color = "skyblue" [cite: 63]
# Spacing control
[cite_start]before_section_skip = "1pt" [cite: 65]
[cite_start]before_entry_skip = "1pt" [cite: 66]
[cite_start]before_entry_description_skip = "1pt" [cite: 67]
[layout.header]
# Optional values: left, center, right
[cite_start]header_align = "left" [cite: 71]
# Profile photo settings
[cite_start]display_profile_photo = true [cite: 74]
[cite_start]profile_photo_width = "50%" [cite: 76] # Radius in % to clip profile photo at
[cite_start]profile_photo_path = "template/src/avatar.png" [cite: 77]
[layout.entry]
# Decide if you want to put your company in bold or your position in bold
[cite_start]display_entry_society_first = true [cite: 81]
# Decide if you want to display organisation logo or not
[cite_start]display_logo = true [cite: 84]
```
### Injection Settings
```toml
[inject]
# Decide if you want to inject AI prompt or not
[cite_start]inject_ai_prompt = false [cite: 88]
# Decide if you want to inject keywords or not
[cite_start]inject_keywords = true [cite: 91]
[cite_start]injected_keywords_list = ["Data Analyst", "GCP", "Python", "SQL", "Tableau"] [cite: 92]
```
### Personal Information
```toml
[personal]
[cite_start]first_name = "John" [cite: 94]
[cite_start]last_name = "Doe" [cite: 95]
[personal.info]
[cite_start]github = "yunanwg" [cite: 99]
[cite_start]phone = "+33 6 12 34 56 78" [cite: 100]
[cite_start]email = "john.doe@me.org" [cite: 101]
[cite_start]linkedin = "johndoe" [cite: 102]
# [cite_start]gitlab = "yunanwg" [cite: 103]
# [cite_start]homepage = "jd.me.org" [cite: 104]
# [cite_start]orcid = "0000-0000-0000-0000" [cite: 105]
# [cite_start]researchgate = "John-Doe" [cite: 106]
# [cite_start]extraInfo = "I am a cool kid" [cite: 107]
# [cite_start]custom-1 = (icon: "", text: "example", link: "https://example.com") [cite: 108]
```
### Language Specifics
You can add new sections for different languages (e.g., `[lang.ru]`).
**English Example:**
```toml
[cite_start][lang.en] [cite: 112]
[cite_start]header_quote = "Experienced Data Analyst looking for a full time job starting from now" [cite: 114]
[cite_start]cv_footer = "Curriculum vitae" [cite: 115]
[cite_start]letter_footer = "Cover letter" [cite: 116]
```
**French Example:**
```toml
[cite_start][lang.fr] [cite: 118]
[cite_start]header_quote = "Analyste de données expérimenté à la recherche d'un emploi à temps plein disponible dès maintenant" [cite: 120]
[cite_start]cv_footer = "Résumé" [cite: 121]
[cite_start]letter_footer = "Lettre de motivation" [cite: 122]
```
**Non-Latin Script Support:**
For languages not written in Latin script (e.g., "zh", "ja", "ko", "ru"):
```toml
[cite_start][lang.non_latin] [cite: 132]
[cite_start]name = "000" [cite: 133]
[cite_start]font = "Heiti SC" [cite: 134]
```
---
## 5. Functions
### `cv-entry`
Adds an entry to the CV.
**Parameters:**
- `title` (str): Title of the entry.
- `society` (str): Society of the entry (company, university, etc.).
- `date` (str | content): Date(s) of the entry.
- `location` (str): Location of the entry.
- `description` (array): Description of the entry (string or array of strings).
- `logo` (image): Logo of the society. If empty, no logo is displayed.
- `tags` (array): Tags of the entry.
- `metadata` (array): Optional metadata from TOML.
- `awesome-colors` (array): Optional awesome colors.
### `cv-entry-start`
Adds the start of an entry to the CV.
**Parameters:**
- `society` (str): Society of the entry.
- `location` (str): Location of the entry.
- `logo` (image): Logo of the society.
- `metadata` and `awesome-colors` (optional).
### `cv-honor`
Adds an Honor to the CV.
**Parameters:**
- `date` (str): Date of the honor.
- `title` (str): Title of the honor.
- `issuer` (str): Issuer of the honor.
- `url` (str): URL of the honor.
- `location` (str): Location of the honor.
- `awesome-colors` and `metadata` (optional).
### `cv-publication`
Adds publications to the CV by reading a bib file.
**Parameters:**
- `bib` (bibliography): Bibliography object with path to the bib file.
- `keyList` (list): List of keys to include.
- `refStyle` (str): Reference style.
- `refFull` (bool): Whether to show the full reference.
### `cv-section`
Adds the title of a section.
Note: If the language is non-Latin, the title highlight will not be sliced.
**Parameters:**
- `title` (str): Title of the section.
- `highlighted` (bool): Whether the first *n* letters are highlighted in accent color.
- `letters` (int): Number of first letters to highlight.
- `metadata` and `awesome-colors` (optional).
### `cv-skill`
Adds a skill to the CV.
**Parameters:**
- `type` (str): Type of skill (displayed on the left).
- `info` (str | content): Information about the skill (displayed on the right). Items can be separated by `#hbar()`.
### `cv-skill-tag`
Adds a skill tag to the CV.
**Parameters:**
- `skill` (str | content): The skill to be displayed.
### `cv-skill-with-level`
Adds a skill with a level to the CV.
**Parameters:**
- `type` (str): Type of skill (displayed on the left).
- `level` (int): Level of the skill (displayed as circles in the middle). Minimum is 0, maximum is 5.
- `info` (str | content): Information about the skill (displayed on the right).