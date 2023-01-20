# Simple CRUD Api with NodeJs, MongoDB and Docker.

This app is a simple CRUD rest-API that allows you to create protocols (like a todo list), edit, delete, get all documents or single one, and reset the database. It's only for demonstration purpose and it was deployed on my server in digital ocean. You can test accessing 'https://willyanhpbertolino-simple-crud-react.netlify.app'.

## Test on your computer (localhost)

If you want to run this app locally, you must have docker installed in your local machine. After clonning this repository to your directory, open a command line on directory /your-directory-clone-root>/Basic-CRUD-app> then run the comand:

->docker-compose up -d --build

Note: if you want to see the logs, run
->docker-compose up --build
instead.
To stop the containers, press control-C.

Just a few seconds or minutes later, after docker magics (you don't have to install nodeJS or MongoDB in your local machine, docker creates those images for you with all setup needed), you can access on your browser 'http://localhost:5000/api/v1/protocols' to see all the documents on the database.

After testing on localhost run:
->docker-compose down
to remove the container created.

## Production

If you wish to deploy a similar app, first you have to set environment variables as example.env file, which contains your mongodb username, password, cloud string, database name, and cors origin. Next, comment the line "const mongoURI = 'mongodb://mongodb:27017/protocols?authSource=admin'; " on app.js file and uncomment the line below which contains the const mongoURI variable. Also, switch the comments on docke-compose.yml file from development to production.

# App

When you run the app for the first time, the app creates 5 items on database automatically (see /utils/mockData.js). The image below shows a part of mockData returned, saw from the browser (FireFox) when the app is started. As it is a persistent data, if there is no data when you access or many data, press the reset button.

![image](https://user-images.githubusercontent.com/57110420/189744975-ec77a127-1a81-468d-9e4f-0a3bea01832e.png)

This app has the following routes:

## Create new protocol

A POST route,

'/api/v1/protocols'

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

'/api/v1/protocols'

return the first 20 documents.
Pagination is include, just enter the queries as the example below,

'/api/v1/protocols?page=2&max=20'

where page is the number of the page and 'max' is the max number of documents for each page.

## Get single document

A GET route which requires the id of the document. This id is create by mongoDB when the document is created and has the format \_id:631f83b44379f4fdf9a8a36f, so, to get a single document enters,

'/api/v1/protocols/631f83b44379f4fdf9a8a36f'

## Update a protocol

A PATCH route for a specific document with id=631f83b44379f4fdf9a8a36f, for example.

'/api/v1/protocols/631f83b44379f4fdf9a8a36f'
which requires at least one of the raw data:

{
"requester": "Maria Silveira Campos",
"description": "Solicitação de assinatura do documento 9032.7/70",
"email": "mariasilveiracampos@email.com"
}

## Delete a document

A DELETE route of the form,

'/api/v1/protocols/631f83b44379f4fdf9a8a36f'

excludes the document with id 631f83b44379f4fdf9a8a36f.

## Reset DataBase

A GET route that reset the database to original mockData only documents.

'/api/v1/protocols/reset'
