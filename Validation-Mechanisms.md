1. Try-Catch:
```
try {
...
} catch (e) {
    res.status(500);
    res.json({
        'Error':e
    })
}
```

2. If-Then:
Example where if no `description` is entered, an error message will appear:
```
if (!description) {
    res.status(400);
    res.json({
        "Error":"A description must be provided."
    });
    return; 
}
```
We add `return` to end the function once error is detected.

3. Ternary Operators:
In the example below, the ternary operator is saying:
"For the value assigned to `datetime`, make it a datetime object; if there isn't, assign today's date value to `datetime` variable".
```
const datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();
```