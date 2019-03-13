#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const folder = process.argv[2];
const optimization = require("./svg-optimization");
const junk = require("junk");
const slugify = require("@sindresorhus/slugify");
const rimraf = require("rimraf");


//read directory
fs.readdir(folder, ( err, files ) => {
	files = files.filter( junk.not );
	let total = files.length;
	let counter = 0;

	let parentDirectory = path.join( folder, "../" );
	let pathToTest = parentDirectory+"/templates/";

	// remove templates folder
	rimraf(pathToTest, () => {
		fs.mkdirSync(pathToTest);
	});

	//loop through files
	files.forEach(( file ) => {
		file = path.resolve( folder, file );
		let filename = path.basename( file );
		let filenameNoExtension = filename.substring(0, filename.lastIndexOf("."));
		let slugifiedFilename = slugify(filenameNoExtension);

		// read files
		fs.readFile(file, "utf8", function( err, data ) {
			if ( err ) {
				throw err;
			}

			// optimize files
			optimization(data, file).then(res => {
				counter++;
				let templatesPath = parentDirectory+"/templates/"+slugifiedFilename+".vue";

				// save vue template
				fs.writeFile(templatesPath, res.template, "utf8", function(err) {
					if (err) throw err;
				});

			})
		});
	});
});

