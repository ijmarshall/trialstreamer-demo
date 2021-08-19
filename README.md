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
Run `cp .envTemplate .env` and edit variables at `.env` file pointing to Trialstreamer API url and key.

### Running
Run `docker-compose up --build --remove-orphans` to build and run the container.
Trialstreamer-demo service will be exposed at port 8080 and can be accessed from your local machine from [http://localhost:8080](http://localhost:8080)
