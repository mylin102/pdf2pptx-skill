const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
// Reference the library from the skill directory
const html2pptx = require('./html2pptx_local.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'AI Strategy Bot';
    pptx.title = '2024-2025 AI Strategy & Semiconductor Supply Chain';

    const slidesDir = path.join(__dirname, 'slides_html');
    const slideFiles = fs.readdirSync(slidesDir)
        .filter(f => f.endsWith('.html'))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

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

    const outputName = 'AI_Strategy_Report.pptx';
    await pptx.writeFile({ fileName: outputName });
    console.log(`Presentation created successfully: ${outputName}`);
}

createPresentation().catch(console.error);
