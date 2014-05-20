var Heroku = require('heroku-client'),
	url = require('url'),
	http = require('http');

if (!process.env.HEROKU_API_TOKEN){
	console.log('Fatal: Please check the README about setting up HEROKU_API_TOKEN. This is not optional. Quitting.');
	process.exit(1);
}

if (!process.env.SITE_BLACKLIST){
	console.log('Optional: Check the README for info about configuring the SITE_BLACKLIST, if you need that.');
}

function genericErr(err){
	if (err) {
		console.log(err);
		process.exit(1);
	}
}

function pingSites(){
	setTimeout(pingSites, 3000000);
	var blacklist = (process.env.SITE_BLACKLIST) ? process.env.SITE_BLACKLIST.split(',') : [];
	var heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
	heroku.apps().list(function (err, apps) {
		genericErr(err);
		apps.forEach(function(app){
			heroku.apps(app.name).dynos().list(function(err, dynos){
				genericErr(err);
				var urls = dynos.filter(function(dyno){
					return dyno.type == 'web' && blacklist.indexOf(app.name) === -1;
				}).forEach(function(dyno){
					http.get(url.parse(app.web_url), function(res) {
						console.log("Got response: ("+app.name+"): " + res.statusCode);
					}).on('error', function(e) {
						console.log("Got error: ("+app.name+"): " + e.message);
					});
				});
			});
		});
	});
}

pingSites();