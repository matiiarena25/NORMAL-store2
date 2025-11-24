import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const indexHtml = path.join(distPath, 'index.html');
const notFoundHtml = path.join(distPath, '404.html');

if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, notFoundHtml);
    console.log('✅ 404.html created successfully from index.html');
} else {
    console.error('❌ Error: dist/index.html not found. Make sure to run build first.');
    process.exit(1);
}
