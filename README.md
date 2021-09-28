# my-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Run as a Docker service

Trialstreamer API needs to be running.

### Configuration
Run `cp .envTemplate .env` and edit variables at `.env` file, 
with `VUE_APP_SERVER_URL` pointing to Trialstreamer API (e.g. http://localhost:5000) and 
`VUE_APP_API_KEY` with a valid API-Key specified in the configuration file of Trialstreamer API.


### Run for development
Run `docker-compose up -f docker-compose.dev.yml --build --remove-orphans` to build and run the container in development mode.

Note: Trialstreamer-demo service will be exposed at port 8080 and can be accessed from your local machine from [http://localhost:8080](http://localhost:8080)

### Run for production
Run `docker-compose up --build --remove-orphans` to build and run the container for production with an Nginx server.

Note: Trialstreamer-demo service will be exposed at port 80 in a production environment.
