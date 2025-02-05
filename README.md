# KrishnKavach Backend
This is the backend for KrishnKavach app.

## Getting Started
First ensure that you have docker installed on your system

```bash
docker compose build
```

```bash
docker compose up
```
This will spin up the backend in a docker container and run it. The backend consists of three services, on for the business logic, one for the redis server, and one for the database

### For development
Simply run the following command
```bash
npm run dev
```
### FOr more information, go through the Dockerfile and the docker-compose.yaml file, and the scripts inside package.json
