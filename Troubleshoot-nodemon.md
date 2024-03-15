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

