const runButton = document.getElementById('runbutton');
const textarea = document.getElementById('pseudocode');
const output = document.getElementById('output');
const indent = '    ';

let jscode;
let lastIndentLevel;

const displayError = (error) => {
  output.innerHTML = error;
  throw error;
};

const convertLine = (line) => {
  let rest;

  const lineWords = line.split(' ');

  switch (lineWords[0].toLowerCase()) {
    case '':
      break;
    case 'set':
      rest = line.substring(line.indexOf('to ') + 3);
      jscode += `${lineWords[1]} = ${rest}\n`;
      break;
    case 'get':
    case 'read':
      jscode += `temp = prompt()
${lineWords[1]} = +temp || temp\n`;
      break;
    case 'print':
    case 'write':
      rest = line.substring(line.indexOf(' ') + 1).replace(/,/g, '+');
      jscode += `output.innerHTML += "<p>" + ${rest} + "</p>"\n`;
      break;
    case 'if':
    case 'while':
      lastIndentLevel++;
      jscode += `${line} {\n`;
      break;
    case 'else':
      lastIndentLevel++;
      jscode += `${line} {\n`;
      break;
    default:
      displayError(new Error(`Unreconized keyword '${lineWords[0]}'`));
  }
};

runButton.onclick = () => {
  output.innerHTML = '';

  const lines = textarea.value.split('\n');

  jscode = '';
  lastIndentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    let currentIndentLevel = 0;

    while (lines[i].includes(indent)) {
      currentIndentLevel++;
      lines[i] = lines[i].replace(indent, '');
    }

    if (currentIndentLevel < lastIndentLevel) {
      lastIndentLevel--;
      jscode += '}\n';
    }

    convertLine(lines[i]);
  }

  while (lastIndentLevel > 0) {
    lastIndentLevel--;
    jscode += '}\n';
  }

  console.log(`--- START OF CONVERTED JAVASCRIPT CODE ---

${jscode}
---  END OF CONVERTED JAVASCRIPT CODE  ---`);

  try {
    eval(jscode);
  } catch (e) {
    displayError(e);
  }
};
