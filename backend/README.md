### Preparing development environment
1. First, initialize the project by executing `npm install`,
2. When all packages are installed, you can run the project with `npm start`. All the necessary scripts are in `./package.json`. You can make changes without restarting server - NODEMON is refreshing every change after file save.
3. Project is using `eslint` to check code, so if IDE is yelling about errors in code try to run `npm run eslint` or set your IDE to run eslint after every save.

### Setting up database connection
1. Install postgresql
2. Run ```../baza.sql``` with pgAdmin
3. Get Prisma ready by doing the following:
   1. Create ```.env``` file
   2. Put the following line: ```DATABASE_URL="postgresql://<user>:<password>@localhost:5432/postgres?schema=public"```
   3. Open terminal in the ```backend``` directory
   4. Execute ```npx prisma db pull```
   5. Execute ```npx prisma generate```
4. Done
