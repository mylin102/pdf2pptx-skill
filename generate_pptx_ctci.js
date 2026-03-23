const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const html2pptx = require('./html2pptx_local.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'CTCI Strategy Bot';
    pptx.title = 'CTCI Next-Gen EPC Digital Defense Strategy';

    const slidesDir = path.join(__dirname, 'slides_html_ctci');
    const slideFiles = fs.readdirSync(slidesDir)
        .filter(f => f.endsWith('.html'))
        .sort();

    console.log(`Found ${slideFiles.length} slides to process...`);

    for (const file of slideFiles) {
        const filePath = path.join(slidesDir, file);
        console.log(`Processing ${file}...`);
        try {
            await html2pptx(filePath, pptx);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    const outputName = 'CTCI_Strategy_Report.pptx';
    await pptx.writeFile({ fileName: outputName });
    console.log(`Presentation created successfully: ${outputName}`);
}

createPresentation().catch(console.error);
