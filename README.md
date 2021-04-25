# SQUASH WEBSITE

## start project

- init git: `git init` (N.B. it is important to do this before the deps install so that husky can write its custom hooks)
- setup node: `nvm use`
- install deps: `yarn`
- start you local git repo proxy (for local netlify admin): `npx netlify-cms-proxy-server`
- start project: `yarn start`

### N.B.

`yarn start` triggers the command `netlify dev` that does a lot of things (like injecting the dev env set in netlify backoffice into your local runtime, simulating locally your lambda functions and more)

## Conventions & processes

- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [trunk based development](https://trunkbaseddevelopment.com/)

## start project with Docker
Just run:
```
export UID="$(id -u)"; docker-compose up
```

from the project root and you should be good to go. After the first image build you will be able to just use `docker-compose up`.