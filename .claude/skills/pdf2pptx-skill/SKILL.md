# pdf2pptx-skill

## Purpose
This skill converts Markdown files or PDF documents into professional PPTX presentations. It formally integrates **MinerU** for high-fidelity PDF extraction and utilizes the `html2pptx` workflow for precise layout generation. It automates the end-to-end pipeline: **[PDF/MD] -> [Structured MD] -> [HTML Slides] -> [PPTX]**.

## When to Use This Skill
- Converting strategic reports (Markdown) into executive presentations (PPTX).
- Starting from a complex PDF that requires high-quality text and image extraction via MinerU.
- Ensuring visual consistency and professional aesthetics in generated slides.
- Handling environment-specific PPTX generation (e.g., macOS ARM64 with Chromium).

## Core Rules & Best Practices

### 1. The Integrated Pipeline (CRITICAL)
For PDF inputs, always execute the **MinerU extraction** first:
- **Command:** `mineru -p <input.pdf> -o ./output -b pipeline`
- **Asset Handling:** Use the extracted `auto.md` and the `images/` directory. Ensure HTML slides reference these images correctly using relative paths.

### 2. HTML Element Wrapping
- **Rule:** ALL text content MUST be wrapped inside `<p>`, `<h1>`-`<h6>`, `<ul>`, or `<ol>` tags.
- **Why:** The `html2pptx` library ignores raw text nodes.
- **Implementation:** 
  - ✅ `<div class="box"><p>Content</p></div>`
  - ❌ `<div class="box">Content</div>`

### 3. Styling Restrictions
- **No Direct Styling on Text Tags:** Borders, backgrounds, and shadows are ONLY supported on `<div>` elements.
- **Shape Generation:** Use `<div>` with `background-color`, `border`, or `border-radius` to create shapes.
- **Font Safety:** Only use web-safe fonts: `Arial`, `Helvetica`, `Times New Roman`, `Verdana`, `Tahoma`.

### 4. Layout & Positioning
- **16:9 Aspect Ratio:** Standard dimensions are `720pt x 405pt`.
- **Bottom Margin:** Leave at least `0.5"` (36pt) margin at the bottom to prevent validation errors.

### 5. Dependency Management (Technical)
- **NODE_PATH:** If libraries are installed locally, set `export NODE_PATH=$(pwd)/node_modules` before running the generator.
- **Playwright OS Compatibility:** On macOS, ensure Chromium is installed. If needed, use a local modified `html2pptx.js` to bypass forced 'chrome' channel constraints.

## Standard Workflow

### Step 1: PDF to Markdown (via MinerU)
- Run `mineru` to extract structured data.
- Review `auto.md` to identify headers (Slide Titles) and bullets (Slide Content).

### Step 2: HTML Slide Generation
- Create individual HTML files for each slide in a `slides_html/` folder.
- **Standard Layouts:** 
  - *Title Slide:* Center aligned, dark background.
  - *Two-Column:* 60/40 split for text and MinerU-extracted images.
  - *Table Slide:* Use `<table>` with `border-collapse`.

### Step 3: Script Configuration & PPTX Assembly
- Create `generate_pptx.js` using `pptxgenjs` and `html2pptx`.
- Execute with correct `NODE_PATH`.

## Troubleshooting Common Errors
- **"Text element... has border":** Apply border to a parent `<div>`, not the header tag.
- **"DIV contains unwrapped text":** Wrap the raw text in a `<p>` tag.
- **"browserType.launch: Chromium distribution 'chrome' not found":** Update launch options to use installed Chromium.
