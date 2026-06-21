const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const jsSrc = path.join(rootDir, 'js', 'main.js');
const jsDest = path.join(rootDir, 'js', 'main.min.js');
const cssSrc = path.join(rootDir, 'css', 'styles.css');
const cssDest = path.join(rootDir, 'css', 'styles.min.css');

function minifyCSS(cssText) {
  return cssText
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\s*([:;{},])\s*/g, '$1') // Remove spacing around delimiters
    .replace(/\s+/g, ' ') // Compress multiple whitespaces
    .trim();
}

function minifyJS(jsText) {
  // Strip block comments
  let cleanText = jsText.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Strip line comments while preserving URLs
  const lines = cleanText.split('\n');
  const cleanLines = lines.map(line => {
    return line.replace(/(?<!http:)(?<!https:)\/\/.*/g, '');
  });
  
  return cleanLines.join('\n')
    .replace(/\s*([=+\-*/{}()\[\];,<>:])\s*/g, '$1') // Remove spaces around operators/delimiters
    .replace(/\s+/g, ' ') // Compress whitespace
    .trim();
}

try {
  console.log('Starting assets minification...');
  
  // 1. Minify CSS
  if (fs.existsSync(cssSrc)) {
    const cssContent = fs.readFileSync(cssSrc, 'utf8');
    const minCSS = minifyCSS(cssContent);
    fs.writeFileSync(cssDest, minCSS, 'utf8');
    console.log(`✓ CSS Minified successfully. Size: ${cssContent.length} B -> ${minCSS.length} B`);
  } else {
    console.error(`✗ CSS Source file not found: ${cssSrc}`);
  }

  // 2. Minify JS
  if (fs.existsSync(jsSrc)) {
    const jsContent = fs.readFileSync(jsSrc, 'utf8');
    const minJS = minifyJS(jsContent);
    fs.writeFileSync(jsDest, minJS, 'utf8');
    console.log(`✓ JS Minified successfully. Size: ${jsContent.length} B -> ${minJS.length} B`);
  } else {
    console.error(`✗ JS Source file not found: ${jsSrc}`);
  }
  
  console.log('Assets minification completed successfully.');
} catch (error) {
  console.error('✗ Minification failed with error:', error.message);
  process.exit(1);
}
