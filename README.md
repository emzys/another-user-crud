## Welcome to another-user-crud!

The aim of this exercise is to create RESTful API that allows users to create, retrieve, update, and delete data on a PostgreSQL database, using Typescript and Node.JS.

# How to get started

1. add **.env** file with your db info
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_pwd
   POSTGRES_DB=your_db
2. yarn install
3. yarn start-dev

# API tested in postman:

1. yarn start-dev
2. user crud base url: http://localhost:8000/api/user (see: user routes)
3. auth base url: http://localhost:8000/api/auth (see: auth routes)

<!-- # Login in terminal to interact with PostgreSQL database from the command line
psql -U postgress -d postgress -->
