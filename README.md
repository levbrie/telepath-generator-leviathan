# generator-leviathan [![Build Status](https://secure.travis-ci.org/leviathantech/generator-leviathan.png?branch=master)](https://travis-ci.org/leviathantech/generator-leviathan)

[Yeoman](http://yeoman.io) generator that scaffolds out a full stack Javascript web app using [angularjs](https://angularjs.org/), Grunt and Bower, Node and Express, MongoDB and Redis.

## Getting Started

### Using this generator:

[If you're not familiar with Yeoman and want to learn more](http://yeoman.io/learning/index.html)
[If you want to build your own generator](http://yeoman.io/authoring/index.html)

Install Yeoman:
```bash
$ npm install -g yo
```

To install generator-leviathan from npm, run:

```bash
$ npm install -g generator-leviathan
```

Finally, initiate the generator:

```bash
$ yo leviathan optionalAppName
```

### Recommended github and heroku setup:

run ```$ yo leviathan:deploy``` to setup both github and heroku automatically.

The command uses the following to setup Github:

```zsh
$ hub init
$ hub add . && hub commit -m "initial commit"
$ hub create optional_org_name/repo_name -d "description of repo"
$ hub push origin master
```

And to setup Heroku, it runs grunt build, copies over the Procfile, initializes the dist/ dir as a separate repository, and runs:

```zsh
$ heroku apps:create herokuAppName && heroku config:set NODE_ENV=production
$ git add -A && git commit -m "Initial commit"
$ git push heroku master
```

all of which you can of course do at the command line, provided you have both [hub](https://github.com/github/hub) and the [heroku toolbelt](https://toolbelt.heroku.com/) installed.

[More info on working with node in Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

The deploy generator also uses a plugin called heroku-config to push your local .env file to heroku.  Install it with:

```zsh
$ heroku plugins:install git://github.com/ddollar/heroku-config.git
```

Deployment requires that you have a remote mongo database to connect to.  You can use heroku addons to create one:

```zsh
 heroku addons:add mongolab
```

or you can [setup a mongolab account] and create one online. If you do this, just make sure to set the MONGOLAB_URI on heroku to the URI for accessing that db.
