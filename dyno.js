var Heroku = require('heroku-client');

if (!process.env.HEROKU_API_TOKEN){
	console.log('Please check the README about setting up HEROKU_API_TOKEN.  This is not optional. Quitting.');
	process.exit(1);
}

if (!process.env.SITE_BLACKLIST){
	console.log('Check the README for info about configuring the optional SITE_BLACKLIST, if you need that.');
}

function pingSites(){
	var blacklist = (process.env.SITE_BLACKLIST) ? process.env.SITE_BLACKLIST.split(',') : [];
	var heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
	heroku.apps().list(function (err, apps) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		var urls = apps
		.filter(function(a){
			return apps.length && blacklist.indexOf(a.name) === -1;
		})
		.map(function(a){
			return a.web_url;
		});
		console.log('pinging sites:\n  ' + urls.join('\n  '));

		apps.forEach(function(a){
			heroku.apps(a.name).info(function(err, app){
				if (err) {
					console.log(err);
					process.exit(1);
				}
				console.log(app);
			});
		})
	});
	
}

pingSites();