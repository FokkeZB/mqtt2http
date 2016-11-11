const fs = require('fs');
const path = require('path');

let pkg = require(path.resolve(__dirname, '..', 'package.json'));
let app = require(path.resolve(__dirname, '..', 'app.json'));

app.name = pkg.name;
app.description = pkg.description;
app.repository = pkg.repository.url;
app.keywords = pkg.keywords;
app.website = pkg.homepage;

fs.writeFile('app.json', JSON.stringify(app, null, 2), 'utf8', (err) => {

	if (err) {
		console.log('FAILED:', err);
	}

});
