We're using bcrypt for the JSON web token.
To install it, run:
```
npm install jsonwebtoken bcrypt
``` 

At the top on `index.js`, where the dependencies are clustered, type in:
```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
```

Next, go to https://randomkeygen.com/.
Under the 504-bit WPA Key, copy the password.
Then, paste it in the `.env` file:
```
TOKEN_SECRET=!6g,Z_gHb>jVkW@9DU#i;oXumMRt,1F)Zdx(`u#3A3.yb~V#FI`+x"-H^Qh5P)O
```