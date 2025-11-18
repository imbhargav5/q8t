const fs = require('fs');

// Read the YAML file
let yaml = fs.readFileSync('api/openapi.yaml', 'utf-8');

// Find and fix problematic single-quoted multi-line strings
// Pattern: description: 'text that may span
//                       multiple lines'

const lines = yaml.split('\n');
const fixed = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // Check if this is a description line with a starting single quote
  const match = line.match(/^(\s*description:\s*)'(.*)$/);

  if (match && !line.endsWith("'")) {
    // This is a multi-line single-quoted description
    const indent = match[1];
    let content = match[2];
    i++;

    // Collect all lines until we find the closing quote
    while (i < lines.length && !lines[i].trim().endsWith("'")) {
      content += '\n' + lines[i].trim();
      i++;
    }

    // Add the last line with closing quote
    if (i < lines.length) {
      const lastLine = lines[i].trim();
      content += '\n' + lastLine.substring(0, lastLine.length - 1);
      i++;
    }

    // Output as a multi-line string without quotes
    fixed.push(indent + content.trim().replace(/`/g, '`'));
  } else {
    fixed.push(line);
    i++;
  }
}

// Write back the fixed YAML
fs.writeFileSync('api/openapi.yaml', fixed.join('\n'), 'utf-8');
console.log('YAML file fixed!');
