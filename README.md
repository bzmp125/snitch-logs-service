# logs-service
A reusable logs service for a Microservices Architecture.

The idea is to help developers get started faster with new projects, allowing them to focus on building their applications, which is what really matters. We all know every project will at some point need to capture and save logs somewhere to create a bug database which the developers can use to either fix bugs on their applications or refer to when they experience new bugs. This service comes with a simple HTTP REST API to allow you the developer to add any form of client on top of this service so that you are able to see which bugs/errors are present in your applications.

## Getting Started
The service can be deployed on any server, and to get started, you can follow these simple steps. A Heroku Procfile has been added to help you deploy to Heroku. You can head over to [Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-cli) to learn more about installing the Heroku Toolbelt.

```
git clone https://github.com/bzmp125/logs-service
npm install
npm start
```

This will run a server on your localhost on the port specified in the .env.local file, ready to save errors/bugs to MongoDB. However the underlying architecture or components can easily be changed to suite your preference, but this gives you the basics you need to get started.

## Documentation
Official documentation to the REST API is found on the [documentation site](https://logs-service.restlet.io). 

## Deploying
The service uses environment variables for configuring things like the Database URI, port to run on and many other things. This helps to make the service configurable on-the-fly and easily deployable on different PaaS providers like Heroku.

### Deploying to Heroku
As stated in the official Heroku Documentation, you can get started 'quickly' on deploying to Heroku with these simple steps, run from the directory where the logs-service had been cloned:

```
heroku apps:create test-logs-service
heroku git:remote -a test-logs-service
git init
```
You can replace 'test-logs-service' with the name of the service you wanted.

Since the service uses MongoDB we will have to add an add-on onto our Heroku app. One great add-on to start with is the mLab MongoDB add-on from mongoLab. To add the Free Sandbox plan from mongoLab:

```
heroku addons:create mongolab
```

or 

```
heroku addons:create mongolab:shared-cluster-1
```
 for the shared-cluster-1 Cluster plan which provides high-availability. NB Sandbox databases should not be used in production, as they are intended for development/testing environments that do not require high availability. [Heroku Dev Center MongoLab Article](https://devcenter.heroku.com/articles/mongolab)

 To deploy the service simply run :

 ```
 git add .
 git commit -m "First Commit"
 git push heroku master
 ```

Voila! You now have a logs aggregating service running on https://test-logs-service.herokuapp.com.


The service can be deployed on any server and can be reached via a simple HTTP REST API built with ExpressJS. For more documentation on the actual endpoints, go to the [documentation site](https://logs-service.restlet.io).

