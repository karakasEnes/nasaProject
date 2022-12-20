# Full Stack Node.js Application (Heavily Back End)

## TL;DR: What is covered? Pre-exists React front-end code provided. Node.js, Express, Mongodb, MVP Pattern, Jest, Supertest, Clusters, Threads, Authentication and Security, CI & CD, Github Actions, Docker, AWS EC2, GraphQL with Express and Apollo, Socket IO (fundamentals), Deno vs Node.js (fundamentals).

### WARNING: This is live application which runs on AWS E2 service inside docker image. The reason I don't provide live link it's about can't afford domain on AWS and to not get any charge by AWS.

- React, node.js, Express, mongoDB, Jest
- MVP Pattern (Excelent Work to implement MVP Pattern)
- Client and server folder structure
- Serving client builded files into serverside and deploying it.
- CORS topic
- Testing Back-End APIs
  - JEST
  - SuperTEST
- using .dotenv for security issue.
- Handling backend multiple requests.
  - Understanding How Cluster Works
  - Cluster, Multiple Core Process, Logical Proccessors
  - Load Balancing, Horizontal - Vertical Scaling, RoundRobin Approach
  - Cluster Policy in Windows OS.
  - Implementing Cluster via PM2 library.
- Understanding "Work Threads"
  - Using v8 isolation (new) feature.
  - Differences between cluster.
- SQL vs NOSQL Topic
  - Making decisions about which approach is best for a particular application.
  - using mongoose to connect mongodb atlas cluster
  - Difference between MVC's Model vs mongoose.model
  - removing all states in memory, applying them with database (mongodb), converting application to be stateless.
  - Adjusting JEST for mongoDB
- Versioning API (dynamicly)
- Talking to third libary(spaceX) via Axios To have data for our application
  - Posting Query object to have corresponding data properties.
  - Dealing with relationed data inside mongodb.
  - Covering how to deal with population, selecting properties and more while requesting data.
  - Applying pagination, page, limit for our own api.
- AUTHENTICATION and SECURITY.
  - HTTPS with SSL and TLS.
  - Understanding Auth 2.0 flow and applying it via passport libary
  - Token Based Authentication vs Cookie Based
  - Cookies, Session, Client Side Session, Server Side Session
  - Using Express Client Side Session package "cookie-session" with passport.
- Continuous Integration & Continuous Delivery & Continuous Deployment.
  - CI & CD Pipeline
  - Github Actions
  - Building CI Pipeline for "NASA" Project inside Github Actions.
  - CI Test functionality inside Github Actions.
  - Mongodb Integration, Mongodb Test Functionality inside Github Actions.
- Docker (Containers) & Virtual Machine Topic
  - Creating Container, dockerfile to setup our application on the container.
  - Building Our Own Image hosting it on dockerHub.
  - Serving Docker Image (Our Application) on AWS EC2.
  - Installing Docker Inside AWS EC2 to make online our full-stack application over internet. Now Our application is available to anyone who has internet connection!
- GraphQL and Apollo

  - Difference between GraphQL and REST.
  - Creating GraphQL Server and Apollo Server
  - Understanding Query, Mutation, Resolvers and more.
  - Please check below repository link to see project code
  - https://github.com/karakasEnes/graphql-apollo#readme

- Socket.io

  - Polling vs Socket
  - Difference between WebSocket and HTTP
  - Since I have already big project related to socket.io I'm skipping to build additional project for now.
  - Learning fundamentals about socket.io techonology.

- Deno vs Node.js
  - Learning basics of Deno and why it exists. Difference between node.js.
