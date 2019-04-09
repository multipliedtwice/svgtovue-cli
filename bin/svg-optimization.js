const SVGO = require("svgo");
const svgoSettings = require("./svgo-settings.js");
const cheerio = require("cheerio");

const getViewbox = function(viewbox){
  return `
<script>
export default {
  data() {
    return {
      viewbox: '${viewbox}',
    };
  },
  mounted() {
    this.$emit('onMounted', this.viewbox);
  },
};
</script>`;
};

module.exports = function(data, pathToFile, svgoOptions) {
	const svgo = new SVGO(
		svgoSettings(svgoOptions)
	);
	return svgo.optimize(data, {path: pathToFile})
		.then(function(result) {
			let currentSVG = cheerio.load(result.data, {
					xmlMode: true
				}),
				paths = currentSVG("svg > *").toArray().map(p => {
					return currentSVG.html(p);
				}),
				pathsToString = paths.join(""),
				viewbox = currentSVG("svg").attr("viewBox"),
				template;

			if ( paths.length > 1 ) {
        template = `<!-- eslint-disable -->
<template><g>${pathsToString}</g></template>
${getViewbox(viewbox)}
`;
			} else {
        template = `<!-- eslint-disable -->
<template>${pathsToString}</template>
${getViewbox(viewbox)}
`;
			}
			return {template, viewbox};
		}
		);
};