# What have we done in this step

In this step, we Dockerize!

The first step is adding a new npm script in our package.json, `start`, which can be run to start our app via npm:

```
  "scripts": {
    "lint": "standard",
    "diff": "npx prettydiff diff source:\"app.js\" diff:\"app.complete.js\"",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  }
```

Next, we went ahead and created `Dockerfile` and `.dockerignore`. In the Dockerfile we've scaffolded out a comparatively basic setup:

**Dockerfile:**

- Use the latest Node.js LTS with Alpine Linux
- Create an application directory
- Copy over the `package.json` and `package-lock.json` from the current directory
- Run `npm ci` to install dependencies rapidly
- Copy the dependencies into the app directory
- Run `npm start`

Here's the resulting Dockerfile:

```dockerfile
# Use LTS for stability and alpine for speed
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json 
# are copied
COPY package*.json ./

# This command uses package-lock.json to install dependencies rapidly
RUN npm ci --only=production

# Copy the deps to the app – helps reduce build time in conjunction w/ previous
# COPY command
COPY . .

# Run `npm start`, which will execute `node app.js` as defined in the `start` 
# script in `package.json`
CMD [ "npm", "start" ]
```

**.dockerignore:**

- Ignore `node_modules`
- Ignore npm's debug file

Here's the resulting `.dockerignore`:

```
node_modules
npm-debug.log
```

Next, we'll _need_ to run a command to actually build the Docker image from the `Dockerfile`. To do this, run the following command after replacing `<YOUR_DOCKER_HUB_USERNAME>` with your [Docker Hub](https://hub.docker.com/) username:

```bash
docker build -t <YOUR_DOCKER_HUB_USERNAME>/step-by-step-express-workshop .
```

It's worth noting that `<YOUR_DOCKER_HUB_USERNAME>/step-by-step-express` can be any string – this is just the one I've decided to use personally, as it's more easily identifyable. You're not required to include your Docker Hub username nor the repo/project name, but this does seem to be the naming convention the Docker community has standardized on.

From there, we'll want to run the Docker image, publshing (`-p`) port 8080 and running it in detached mode (`-d`). You'll need to have Docker locally installed for this step!

```bash
docker run -p 8080:8080 -d <YOUR_DOCKER_HUB_USERNAME>/step-by-step-express-workshop
```

Next, you're going to want to publish this image to Docker Hub – this just requires a few steps:

```bash
docker login # log in with your Docker Hub credentials
```

```bash
docker push <YOUR_DOCKER_HUB_USERNAME>/step-by-step-express-workshop # push the image you built to hub.docker.com (the public registry)
```

Now, your app can be consumed on the public internet extremely easily! Anyone can pull it down from Docker Hub and get it up and running, including you. This is great, as any host that can deploy from Docker images, like [App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=stepbystepexpressworkshop-github-ticyren), can just automatically start running it from Docker Hub.

Additionally, since this step now has a Dockerfile you could even automatically build the Dockerfile on every commit and deploy it to production using something like App Service's [Deployment](https://docs.microsoft.com/azure/devops/pipelines/apps/cd/deploy-docker-webapp?view=azure-devops&WT.mc_id=stepbystepexpressworkshop-github-ticyren) functionality or [Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/languages/docker?view=azure-devops&tabs=yaml&WT.mc_id=stepbystepexpressworkshop-github-ticyren) for ease of use \o/