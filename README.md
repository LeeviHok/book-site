# book-site
Full-stack programming assignment for Buutti Education.

## Application requirements

This website is packaged as a multi-container Docker application. It consists
of three services, which are managed by Docker Compose:

- Database (PostgreSQL)
- Backend application (REST API)
- Web server / reverse proxy (NGINX)

You need Docker and Docker Compose to get the application running. One easy way
is to install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
, which includes both tools. This application was tested with Docker Desktop
(Windows with WSL 2 engine), but it should work with any Docker installation
with the following version requirements:

- Docker Engine (19.03.0 or higher)
- Docker Compose (1.27.0 or higher)

## Running the application

After installing or checking those requirements are fulfilled, the following
steps will get the application running:

- Start Docker engine
- Clone the repository: `git clone https://github.com/LeeviHok/book-site.git`
- Navigate to the repository root directory
- Build and start the containers: `docker compose up -d --build`

The build is expected to take slightly above 2 minutes when starting from
scratch. Once the three containers are running, the website will be available
at <http://localhost:8080>, and the API at <http://localhost:8080/api/docs>.
And since the application is running locally, the API can also be accessed
directly through <http://localhost:8000/api/docs>.
