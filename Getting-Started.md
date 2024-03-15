1. In the terminal, change the directory name to the current folder:
```
cd Express-Basics 
```
In the example above, the folder name is `Express-Basics`.

2. To create the Node.js application, run the following line in the ternminal:
```
npm init -y
```
Once you run this, a new Node.js application is created in the current directory. Hence, only run it in an empty folder.

This command creates the `package.json` file in the folder.

3. Install Express
```
npm install express
```
Once this is done, a new folder will appear: `node-modules`.

4. Create `.gitignore` file
In the terminal, run:
```
touch .gitignore
```
In the folder, create a `.gitignore` file. In it, type `node_modules`. This removes all the modules showing in github.

5. Intall dotenv to activate the `.env` folder
```
npm install dotenv
```
Next, on the top of the index.js file, add:
```
require('dotenv').config();
```
This will enable us to call the `.env` files using `process.env.<variableName>`.