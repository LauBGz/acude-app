exports.checkBody = (res, body, arrayValores) => {
    for (valor of arrayValores){
        //If any property is empty give error
        if(body["keyWords"].length === 0 || body[valor] === ""){
            res.status(400).send({"error":"Revisa el body."});
            throw new Error("Body incorrecto.")
        } else {
            //If keywords are not empty, check if the elements do
            body["keyWords"].forEach(element => {
                if (element === ""){
                    res.status(400).send({"error":"Las palabras claves no pueden estar vacías."});
                    throw new Error("Body incorrecto.")
                }
            });
        } 
    }
}

