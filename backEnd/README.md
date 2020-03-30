## Endpoints
* [Get all animals](#Get-all-animals)
* [Get an animal](#Get-an-animal)
* [Delete an animal](#Delete-an-animal)
* [Add an animal](#Add-an-animal)
* [Upload an image](#Upload-an-image)
* [Check name](#Check-name)
* [Filter by keywords](#Filter-by-keywords)
* [Update keywords](#Update-keywords)

**Get all animals**
----
 `Obtain all animals from the database.`

* **URL**

  `/getAllAnimals`

* **Method:**

    `GET`

*  **URL Params**

   `None`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `All data`


* **Sample Call:**

```Javascript
    server.get('/getAllAnimals');
```


**Get an animal**
----
 `Obtain all data from a single animal.`

* **URL**

  `/getAnAnimal/:id`

* **Method:**

    `GET`

*  **URL Params**

   `Animal "id"`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `Single data`

* **Sample Call:**

```Javascript
    server.get('/getAnAnimal/:id');
```


**Delete an animal**
----
 `Delete a single animal from the database.`

* **URL**

  `/deleteAnAnimal/:id`

* **Method:**

    `DELETE`

*  **URL Params**

   `Animal "id"`

* **Data Params**

     `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
     ```json
    {
    "message": "Animal borrado del registro."
    }
    ```

* **Sample Call:**

```Javascript
    server.delete('/deleteAnAnimal/:id');
```


**Add an animal**
----
 `Send information about an animal to the database.`

* **URL**

  `/addAnimal`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
    {
    "name": "Prueba",
    "keyWords": ["mamífero", "agua", "acuático", "nocturno", "hocico", "morro", "largo", "trompeta", "topo", "rata", "ratón", "musaraña", "cola", "larga"],
    "diet": "Se nutre principalmente de larvas acuáticas y de crustáceos.",
    "reproduction": "Su periodo de celo se da entre los meses de noviembre y mayo, y las hembras paren dos veces al año.",
    "habit": "Es un animal de hábitos principalmente nocturnos y muy territorial.",
    "habitat": "Habita las proximidades de riachuelos y torrentes." ,
    "category": "MAMÍFEROS",
    "conservationStatus": "Vulnerable"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "Message": "Datos del animal guardados con éxito."
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
     ```json
    {
    "Message": "El animal ya existe en la base de datos."
    }
    ```

* **Sample Call:**

```Javascript
    server.post('/addAnimal');
```


**Upload an image**
----
 `Add an image associated with the animal saved in the database.`

* **URL**

  `/uploadImage/:id`

* **Method:**

    `POST`

*  **URL Params**

    `Animal "id"`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
    res.redirect("/success")
    }
    ```

* **Sample Call:**

```Javascript
    server.post('/uploadImage/:id');
```


**Check name**
----
 `Check if the animal is already registered searching by name.`

* **URL**

  `/checkName`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
    {
    "name": "Prueba"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "Success": "¡Perfecto! El animal todavía no existe en la base de datos."
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
     ```json
    {
    "Error": "El animal ya existe en la base de datos."
    }
    ```

* **Sample Call:**

```Javascript
    server.post('/checkName');
```


**Filter by keywords**
----
 `Retrieve a list of animals according to the keywords sent by the user.`

* **URL**

  `/filterByKeywords`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
    {
    "keyWords": ["prueba"]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `Array of animals`

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    > Example
     ```json
    {
    "error": "Revisa el body."
    }
    ```

* **Sample Call:**

```Javascript
    server.post('/filterByKeywords');
```

**Update keywords**
----
 `Add new keywords if the user search is successful.`

* **URL**

  `/updateKeywords/:id`

* **Method:**

    `PUT`

*  **URL Params**

    `Animal "id"`

* **Data Params**

    ```json
    {
    "keyWords": ["prueba"]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
     ```json
    {
    "message": "Palabras clave actualizadas."
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    > Example
     ```json
    {
    "error": "Revisa el body."
    }
    ```

* **Sample Call:**

```Javascript
    server.put('/updateKeywords/:id');
```


