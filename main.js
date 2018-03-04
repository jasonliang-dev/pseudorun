const toast = document.getElementById('toast');
const runButton = document.getElementById('runbutton');
const indentDisplay = document.getElementById('indentdisplay');
const textarea = document.getElementById('pseudocode');
const output = document.getElementById('output');
const errorDisplay = document.getElementById('error');

const examples = [
  `Read x
Print x`,
  `Set i to 1
While (i <= 10)
    Print i
    Set i to i + 1`,
  `Set i to 1
While (i <= 100)
    If (i % 15 = 0)
        Print "FizzBuzz"
    ElseIf (i % 3 = 0)
        Print "Fizz"
    ElseIf (i % 5 = 0)
        Print "Buzz"
    Else
        Print i
    Set i to i + 1`,
  `Function fact(n)
    If (n = 0)
        Return 1
    Return n * fact(n - 1)

Read num
Print fact(num)`,
];

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 13 && evt.ctrlKey) {
    runButton.onclick();
  }
});

let indent = '    ';

let jscode;
let saveIndentLevel;

const indexOfEnd = (str, elt) => {
  let index = str.indexOf(elt);

  if (index === -1) {
    index = str.length;
  }

  return index;
};

const choose = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const setIndent = (newIndentSize) => {
  indent = '';

  for (let i = 0; i < newIndentSize; i++) {
    indent += ' ';
  }

  indentDisplay.innerHTML = newIndentSize;
};

const reindent = (indentSize) => {
  const saveIndent = indent;
  const lines = textarea.value.split('\n');
  let newText = '';

  setIndent(indentSize);

  for (let i = 0; i < lines.length; i++) {
    let currentIndentLevel = 0;

    while (lines[i].includes(saveIndent)) {
      currentIndentLevel++;
      lines[i] = lines[i].replace(saveIndent, '');
    }

    while (currentIndentLevel > 0) {
      currentIndentLevel--;
      lines[i] = indent + lines[i];
    }

    newText += lines[i];

    if (i < lines.length - 1) {
      newText += '\n';
    }
  }

  textarea.value = newText;
};

// eslint-disable-next-line no-unused-vars
const chooseExample = (i) => {
  const prevIndent = indent.length;
  reindent(4);
  textarea.value = examples[i];
  reindent(prevIndent);
};

const displayError = (error) => {
  errorDisplay.innerHTML = error;
  throw error;
};

const convertLine = (line) => {
  let rest;

  const lineWords = line.split(' ');

  switch (lineWords[0]) {
    case '':
      break;
    case 'set':
      rest = line.substring(line.indexOf('to ') + 3);
      jscode += `${lineWords[1]} = ${rest}\n`;
      break;

    case 'get':
    case 'read':
    case 'input':
      jscode += `reserve = prompt('Enter Input...')
${lineWords[1]} = +reserve || reserve\n`;
      break;

    case 'print':
    case 'write':
    case 'display':
    case 'output':
      rest = line.substring(line.indexOf(' ') + 1);
      jscode += `output.innerHTML += ${rest} + "</br>"\n`;
      break;

    case 'if':
    case 'else':
    case 'while':
    case 'function':
      saveIndentLevel++;
      jscode += `${line.replace('[]', '')} {\n`;
      break;

    case 'elif':
    case 'elseif':
      saveIndentLevel++;
      rest = line.substring(line.indexOf('if ') + 3);
      jscode += `else if ${rest} {\n`;
      break;

    case 'return':
      jscode += `${line}\n`;
      break;

    case 'array':
    case 'boolean':
    case 'integer':
    case 'float':
    case 'string':
      rest = line
        .substring(line.indexOf(' ') + 1)
        .replace('[', '= new Array(')
        .replace(']', ')');
      jscode += `${rest}\n`;
      break;

    case 'increment':
      rest = line.substring(line.indexOf(' ') + 1);
      jscode += `${rest}++\n`;
      break;

    case 'decrement':
      rest = line.substring(line.indexOf(' ') + 1);
      jscode += `${rest}--\n`;
      break;

    default:
      if (lineWords[1] === '<--') {
        rest = line.substring(line.indexOf('<--') + 3);
        jscode += `${lineWords[0]} = ${rest}\n`;
      } else {
        displayError(new Error(`Unreconized keyword '${lineWords[0]}'`));
      }
  }
};

runButton.onclick = () => {
  output.innerHTML = '';
  errorDisplay.innerHTML = '';

  const lines = textarea.value.split('\n');

  jscode = '';
  saveIndentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    let currentIndentLevel = 0;

    let line = lines[i];

    while (line.includes(indent)) {
      currentIndentLevel++;
      line = line.replace(indent, '');
    }

    while (currentIndentLevel < saveIndentLevel) {
      saveIndentLevel--;
      jscode += '}\n';
    }

    const lineEnd = indexOfEnd(line, '//');

    line = line
      .substring(0, lineEnd)
      .replace(/else if/i, 'else if')
      .replace(/true/gi, 'true')
      .replace(/false/gi, 'false')
      .replace(/ and /gi, ' && ')
      .replace(/ or /gi, ' || ')
      .replace(/[(]not /gi, '(!')
      .replace(/ not /gi, ' !')
      .replace(/=/g, '==')
      .replace(/!==/g, '!=')
      .replace(/<==/g, '<=')
      .replace(/>==/g, '>=');
    const firstWS = indexOfEnd(line, ' ');
    line = line.substring(0, firstWS).toLowerCase() + line.substring(firstWS);
    convertLine(line);
  }

  while (saveIndentLevel > 0) {
    saveIndentLevel--;
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

toast.innerHTML = 'Run pseudocode in the browser';

if (Math.random() < 0.5) {
  toast.innerHTML = choose([
    'Now with 20% less fat',
    'How was the midterm?',
    'If there\'s a bug I probably won\'t fix it',
    'I\'m great with names',
    'Try Ctrl+Enter',
    'Kinda like Python',
  ]);
}
