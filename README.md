# Alio IT Project.

For this project, I built the front-end to consume websockets and endpoint with aiohttp library. Running the docker is enough to use this app.

## Databases

- Users (authentication and permissions)
- Secret (To test websockets)

Feel free to use the pg-admin as image with the credentials as you can see in the `.env.dev` file.

## Create Docker images

Open a terminal and run the next commands to set up the project.

1. Go to the main directory of the project:

`cd alioit-app`

2. The first step to use this full stack app is running the next command:

`docker-compose up --build`

3. To use the front-end app, you can entry in the front-end container localhost.

## Run tests for Django REST User model

4. If you want to proof the API REST using the TestCase libary in Python, feel free to run the next command.

`docker exec -it backend-app python manage.py test api`
