const fs = require('fs');

// Read the YAML file
let content = fs.readFileSync('api/openapi-original.yaml', 'utf-8');

// Strategy: Replace all problematic single-quoted multi-line strings with double-quoted single-line strings
// by escaping newlines and quotes

// Find patterns like: description: 'text...
//                                    more text'
// Replace with: description: "text... more text"

const lines = content.split('\n');
let inMultiLineString = false;
let currentIndent = 0;
let stringStart = -1;
let stringContent = [];
const result = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!inMultiLineString) {
    // Check if line starts a multi-line single-quoted string
    const match = line.match(/^(\s*)(description|title):\s*'(.*)$/);
    if (match && !line.trim().endsWith("'")) {
      // Start of multi-line string
      inMultiLineString = true;
      currentIndent = match[1].length;
      stringStart = i;
      stringContent = [match[3]];
    } else {
      result.push(line);
    }
  } else {
    // We're in a multi-line string, check if it ends
    const trimmed = line.trim();
    if (trimmed.endsWith("'")) {
      // End of multi-line string
      stringContent.push(trimmed.slice(0, -1));

      // Combine into a single-line double-quoted string
      const combined = stringContent.join(' ').replace(/"/g, '\\"');
      const startMatch = lines[stringStart].match(/^(\s*)(description|title):\s*'/);
      result.push(`${startMatch[1]}${startMatch[2]}: "${combined}"`);

      inMultiLineString = false;
      stringContent = [];
    } else {
      // Continue collecting string content
      stringContent.push(trimmed);
    }
  }
}

// Write the fixed content
fs.writeFileSync('api/openapi.yaml', result.join('\n'), 'utf-8');
console.log(`Fixed ${stringStart >= 0 ? 'some' : 'no'} multi-line strings`);
