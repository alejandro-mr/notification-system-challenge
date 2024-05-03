# Notification System Challenge

The project consists of two applications:

* Frontend: A react application bootstrapped with [Vite](https://vitejs.dev/) in the `/web` directory, using [Tailwind CSS](https://tailwindcss.com/) for styling.
* Backend: Nodejs application in directory `/backend` built with [NestJS](https://nestjs.com/) framework, using [Prisma](https://www.prisma.io/orm) as ORM.

Other resources:

* PostgreSQL database.
* Redis used only as a message broker [PubSub](https://redis.io/docs/latest/develop/interact/pubsub/).

This project comes already dockerized and ready to be started using docker compose, the project is only being containerized in dev mode.

### How to start apps:

Run the command `docker compose up` on the project root directory, it will require ports `8000` and `8001` available.

* frontend: [http://localhost:8000](http://localhost:8000)
* backend: [http://localhost:8001](http://localhost:8001)
