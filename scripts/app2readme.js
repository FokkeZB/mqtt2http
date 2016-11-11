const fs = require('fs');
const path = require('path');
const table = require('markdown-table');

const FROM = 'The following variables can be set:';

const app = require(path.resolve(__dirname, '..', 'app.json'));
const readme = path.resolve(__dirname, '..', 'README.md');

fs.readFile(readme, 'utf8', (err, data) => {

  if (err) {
    console.log('FAILED:', err);
    return;
  }

  let env = [
    ['Variable', 'Required', 'Description']
  ];

  for (let key of Object.keys(app.env)) {
    env.push([
      '`' + key + '`',
      (app.env[key].required !== false) ? 'Yes' : 'No',
      app.env[key].description
    ]);
  }

  data = data.replace(new RegExp(`(${FROM})[\\s\\S]*$`), '$1\n\n' + table(env) + '\n\n');

  fs.writeFile(readme, data, 'utf8', (err) => {

    if (err) {
      console.log('FAILED:', err);
      return;
    }

  });

});
