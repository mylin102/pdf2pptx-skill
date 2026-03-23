# md2pptx-expert

## Purpose
This skill converts Markdown files into professional PPTX presentations using the `html2pptx` workflow. It automates the generation of HTML slides, handles complex layout constraints, ensures proper text wrapping, and manages environment-specific dependencies like Playwright and Node.js module paths.

## When to Use This Skill
- Converting strategic reports (Markdown) into executive presentations (PPTX).
- Need to ensure visual consistency and professional aesthetics in generated slides.
- Encountering layout validation errors (overflow, missing text, improper styling) during conversion.
- Setting up environment-specific PPTX generation (e.g., macOS ARM64 with Chromium).

## Core Rules & Best Practices

### 1. HTML Element Wrapping (CRITICAL)
- **Rule:** ALL text content MUST be wrapped inside `<p>`, `<h1>`-`<h6>`, `<ul>`, or `<ol>` tags.
- **Why:** The `html2pptx` library ignores raw text nodes or text directly inside `<div>`/`<span>`.
- **Implementation:** 
  - ✅ `<div class="box"><p>Content</p></div>`
  - ❌ `<div class="box">Content</div>`

### 2. Styling Restrictions
- **No Direct Styling on Text Tags:** Borders, backgrounds, and shadows are ONLY supported on `<div>` elements.
- **Shape Generation:** Use `<div>` with `background-color`, `border`, or `border-radius` to create shapes.
- **Font Safety:** Only use web-safe fonts: `Arial`, `Helvetica`, `Times New Roman`, `Verdana`, `Tahoma`.

### 3. Layout & Positioning
- **16:9 Aspect Ratio:** Standard dimensions are `720pt x 405pt`.
- **Bottom Margin:** Leave at least `0.5"` (36pt) margin at the bottom to prevent validation errors.
- **Box Shadows:** Use only outer shadows; inset shadows are not supported and may corrupt the file.

### 4. Dependency Management (Technical)
- **NODE_PATH:** If libraries are installed locally, set `export NODE_PATH=$(pwd)/node_modules` before running the generator.
- **Playwright OS Compatibility:** 
  - On macOS (Darwin), ensure Chromium is installed via `npx playwright install chromium`.
  - If the default library forces a 'chrome' channel that is missing, use a local modified version of `html2pptx.js` to default to the installed Chromium.

## Workflow: Markdown to PPTX

### Step 1: Content Analysis
- Identify headers, key bullets, and embedded images in the source `.md`.
- Group content into logical slides (Title, Overview, Deep Dives, Summary).

### Step 2: HTML Slide Generation
- Create individual HTML files for each slide.
- Use CSS Flexbox for alignment.
- Ensure all text is wrapped in appropriate tags.

### Step 3: Script Configuration
- Create a `generate_pptx.js` script using `pptxgenjs` and `html2pptx`.
- Sort slide files numerically to ensure correct order.

### Step 4: Execution & Validation
- Run the generation script with correct `NODE_PATH`.
- Address any validation errors reported by `html2pptx` (e.g., "Text element h1 has border").

## Troubleshooting Common Errors
- **"Text element... has border":** Remove border from the header tag and apply it to a parent `<div>`.
- **"DIV contains unwrapped text":** Find the specific text and wrap it in a `<p>` tag.
- **"browserType.launch: Chromium distribution 'chrome' not found":** Update the launch options to remove the `channel: 'chrome'` constraint or install Chrome.
- **Missing Images:** Ensure image paths in HTML are relative to the HTML file or absolute.

## Reference Examples
- **Two-Column Layout:** Use flexbox with `flex: 1` on two child divs.
- **Title Slide:** Center content vertically and horizontally with a dark background.
- **Table Slide:** Use standard `<table>` with `border-collapse: collapse`.
