# heroku-up

Ping all your heroku apps, so they don't go to sleep.

This is similar to [heroku-pinger](https://github.com/dcampano/heroku-pinger), but you don't have to set anything up, other than your heroku token & deploying the code. If you add new web apps, it will ping them, automatically.

## setup

Replace `my-heroku-pinger` with whatever you want your app to be called on heroku.

The dyno will do all the work. Here is how you first install it:

*  Fork/clone this repo
*  `cd heroku-up`
*  Create a heroku app to do the pinging: `heroku apps:create my-heroku-pinger -s cedar`
*  Set your heroku API token (check [account page](https://dashboard.heroku.com/account), click "Show API Key"): `heroku config:add HEROKU_API_TOKEN="TOKEN_GOES_HERE"`. You can also edit the "Config Variables" sction on your app's settings, if that is easier.
*  Push yer code: `git push heroku master`
*  Spin up a single worker dyno: `heroku ps:scale worker=1`

### blacklist

This is totally optional. Set the environment variable `SITE_BLACKLIST` to a comma-seperated list of apps to ignore, if you want to do this. Here is an example:

```
heroku config:add SITE_BLACKLIST="my-heroku-pinger,app1,app2,app3,another-heroku-project"
```

### logs

Like any heroku app, you can see how it's going by running `heroku logs`