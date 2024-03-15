# Updating

General syntax fo `updateOne`:
```
db.collection_name.updateOne({
    <criteria of the document to update>
}, {
    <the new changes>
})
```

Disclaimer: Every document will have its own unique ID.

```
db.animals.updateOne({
    'id': ObjectID (`xxxx')
}, {$'set': {
    'name': 'Thunder'
}
})
```

# Update all fields
We have to manually put in all the fields for the object referred to by `$set`
```
db.animals.updateOne({
    "_id":ObjectId("XXX")
})
```

# Delete
```
db.animals.deleteOne({
    'id': ObjectID ('XXX')
})
```

## Add to array 
* Note the array does not have to exist
* For embeded documents, we have to manually provide an ID

```
db.animals.updateOne({'_id': ObjectId("XXX")
}, {
    "$push":{
        'checkups': {
            "_id":ObjectId(),
            "name":"Dr. Chua",
            "diagnosis":"flu",
            "treatment":"pills"
        }
    }
}
)
```

## Remove from array

* we use `$pull`
```
db.animals.updateOne({
    "_id":ObjectId("XXX")
}, {
    "$pull": {
        "checkups": {
            "_id": ObjectId ("xxx")
        }
    }
})
```

## Modify item in an array

```
db.animals.updateOne({
    '_id': ObjectId('xxx'),
    'checkups': {
        '$elemMatch': {
            '_id':ObjectId('xxx')
        }
    }
}, {
    "$set": {
        "checkups.$.name":"Dr. Su"
    }
})
```