1. First thing to do:
```
npm init -y
```

2. Install dependencies:
- Express
- CORS (Cross Origin Resource Sharing); enable it if you want your API to be public
- MongoDB; enables us to connect to Mongo with Express
```
npm install express cors mongodb
```

3. Create `.gitignore` file
```
touch .gitignore
```
Then type in `node_modules` into the blank file.

4. Install node monitor
```
npm install nodemon
```
If can't run `nodemon`:
go to `package.json` file
next, go to 
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    }
```
and add a `dev` key; updated portion should look like this:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js"
  }
```
Next, run `npm run dev`

5. Create a `.env` file to store Mongo URI
```
touch .env
```

Next, run this in the terminal:
```
npm install dotenv
```

Then type in `.env` into the file.

In `index.js`, add in:
```
require('dotenv').config();
```