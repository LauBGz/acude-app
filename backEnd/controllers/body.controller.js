exports.checkBody = (res, body, arrayValores) => {
    for (valor of arrayValores){
        //If any property empty give error
        if(body["keyWords"].length === 0 || body[valor] === ""){
            res.status(400).send({"error":"Revisa el body."});
            throw new Error("Body incorrecto.")
        } else {
            //If no keywords give error
            body["keyWords"].forEach(element => {
                if (element === ""){
                    res.status(400).send({"error":"Las palabras claves no pueden estar vacías."});
                    throw new Error("Body incorrecto.")
                }
            });
        } 
    }
}

