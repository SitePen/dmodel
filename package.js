var miniExcludes = {
		'dmodel/README.md': 1,
		'dmodel/package': 1
	},
	isTestRe = /\/test\//;

var packages = {};
try {
	// retrieve the set of packages for determining which modules to include
	require(['util/build/buildControl'], function (buildControl) {
		packages = buildControl.packages;
	});
} catch (error) {
	console.error('Unable to retrieve packages for determining optional package support in dmodel');
}
var profile = {
	resourceTags: {
		test: function (filename, mid) {
			return isTestRe.test(filename);
		},

		miniExclude: function (filename, mid) {
			return /\/(?:tests|demos|docs)\//.test(filename) || mid in miniExcludes;
		},

		amd: function (filename, mid) {
			return /\.js$/.test(filename);
		},

		copyOnly: function (filename, mid) {
			// conditionally omit modules dependent on json-schema packages
			return (!packages['json-schema'] && /jsonSchema\.js/.test(filename));
		}
	}
};