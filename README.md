# +++ REST API +++

## An application programming interface made publicly available for software developers.

### Models:

#### Author:

-   name: string

#### Book:

-   author string
-   title string
-   genre array of strings
-   sample string
-   awards array of strings

## Tech used:

-   NodeJS
-   Express
-   Typescript
-   MongoDB & Mongoose
-   JSON
-   Third Party Libraries
-   Netlify

## routes for author

-   method: GET - To obtain an array of all authors -
-   http://localhost:9090/authors/get

-   method: GET - To obtain an object of an specific author by ID -
-   http://localhost:9090/authors/get/:authorId

-   method: POST - To create an author -
-   http://localhost:9090/authors/create

    body in json

    { "name" : "string" }

*   note the field name is required.

-   method: PATCH - To udpate an author by ID -
-   http://localhost:9090/authors/update/:authorId

    body in json

    { "name" : "string" }

*   note the field name is required.

-   method: DELETE - To delete an author by ID -
-   http://localhost:9090/authors/delete/:authorId

    ## routes for Book

-   method: GET - To obtain an array of all books -
-   http://localhost:9090/books/get

-   method: GET - To obtain an object of an specific book by ID -
-   http://localhost:9090/books/get/:bookId

-   method: POST - To create a book -
-   http://localhost:9090/books/create

        body in json

        {
        "author": "id",
                "title": "string",
                "genre": [
                    "string",
                    "string",
                    "string",
                    "string"
                ],
                "sample": "string",
                "awards": [
                    "string",
                    "string"
                ]

    }

*   note all the fields but awards are required.

-   method: PATCH - To udpate a book by ID -
-   http://localhost:9090/books/update/:bookId

    body in json

    { "author": "id", "title": "string", "genre": [ "string", "string", "string", "string" ], "sample": "string", "awards": [ "string", "string" ]

    }

*   note all the fields but awards are required.

-   method: DELETE - To delete a book by ID -
-   http://localhost:9090/books/delete/:bookId
