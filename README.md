<h1>Bikeramp API</h1>

<h3>Docs are available on `/docs`</h3>

<h3>To run project you need to:</h3>
- install nest cli and all must have packages - https://docs.nestjs.com
- open terminal and run `npm install` to install dependecies
- run command `npm run docker:init` to initialize database - remember to install docker and prepare .env file with credentials
- after setting up database, just run appliaction in development mode using `npm run start:dev`

<h3>Adding migration</h3>
To automatically generate migration depending on entities, just make change in existsing entity or create a new one and run `npm run generate:migration MigrationName`