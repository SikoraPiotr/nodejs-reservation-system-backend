# NestJS Reservation Tasks Module

What did I use?:

 - NestJS as a backend framework
 - Typescript
 - MongoDB
 - Agenda.js ( job scheduling https://github.com/agenda/agenda )
 - Jest (for testing /tasks/tests/tasks.service.ts)
 - Docker ( To run mongodb )

##  How to run

### Dependencies
```sh
npm install
```

### Run Docker
```sh
 docker compose up -d mongodb
```

####  *App should now run on http://localhost:3000


##  How to test with postman

 - File upload ( test File included in files /src/demo)
 ```sh
http://localhost:3000/tasks/upload
```

It should return taskID

 - File upload ( test File included in files /src/demo)
 ```sh
http://localhost:3000/tasks/status/1710773094823
```

It should return task status




