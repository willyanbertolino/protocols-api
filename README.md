# Simple CRUD Api with NodeJs and MongoDB.

This app is a simple CRUD rest-API that allows you to create protocols, edit, delete, get all documents or single one, and reset the database.

## Test on your computer
If you want to run this app locally, you must have docker installed in your local machine. After clonning the repository to your directory, open a command line and change to directory /your-directory-clone-root>/Basic-CRUD-app> then run the comand:

->docker-compose up -d

Just a few minutes later, after docker magics (you don't have to install nodeJS or MongoDB in your local machine, docker creates those images for you with all setup needed), you can access on your browser 'http://localhost:5000/api/v1/protocols' to see all the documents on the database.

Note: if you want to see the logs, run
->docker-compose up
instead.
To stop the containers, press control-C.

Note: when running the app for the first time, the app creates 5 documents automatically (see /utils/mockData.js). The image below shows a part of mockData returned saw from the bowser (FireFox).

![image](https://user-images.githubusercontent.com/57110420/189744975-ec77a127-1a81-468d-9e4f-0a3bea01832e.png)


This app has the following routes:

## Create new protocol

A POST route,

'http://localhost:5000/api/v1/protocols'

which requires these three raw data, that must be unique:
```
{
  "requester": "Maria Silveira Campos",
  "description": "Solicitação de assinatura do documento 9032.7/70",
  "email": "mariasilveiracampos@email.com"
}
```

Note: There is one more field, "status", filled by the app with default "1" value which means: to be evaluated. Timestamp is also true when created or update a document.

## Get all data
A GET route,

'http://localhost:5000/api/v1/protocols'

thats return all documents from the collection.

## Get single document
A GET route which requires the id of the document. This id is create by mongoDB when the document is created and has the format _id:631f83b44379f4fdf9a8a36f, so, to get a single document enters,

'http://localhost:5000/api/v1/protocols/631f83b44379f4fdf9a8a36f'


## Update a protocol
A PATCH route for a specific document with id=631f83b44379f4fdf9a8a36f, for example.

'http://localhost:5000/api/v1/protocols/631f83b44379f4fdf9a8a36f'
which requires at least one of the raw data:

{
  "requester": "Maria Silveira Campos",
  "description": "Solicitação de assinatura do documento 9032.7/70",
  "email": "mariasilveiracampos@email.com"
}

## Delete a document
A DELETE route of the form,

'http://localhost:5000/api/v1/protocols/631f83b44379f4fdf9a8a36f'

thas excludes the document with id 631f83b44379f4fdf9a8a36f.

## Reset DataBase
A GET route that reset the database to original mockData only documents.

'http://localhost:5000/api/v1/protocols/reset'

