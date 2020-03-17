exports.normalizeArray = (array, normalizedArray) => {
    for(let i = 0; i < array.length; i++) {
        normalizedArray.push(array[i].toLowerCase());
        for (let j = 0; j < normalizedArray.length; j++) {
            normalizedArray[j] = normalizedArray[j].replace(/[áàãäâ]/,"a");
            normalizedArray[j] = normalizedArray[j].replace(/[éèëê]/,"e");
            normalizedArray[j] = normalizedArray[j].replace(/[íìïî]/,"i");
            normalizedArray[j] = normalizedArray[j].replace(/[óòõöô]/,"o");
            normalizedArray[j] = normalizedArray[j].replace(/[úùüû]/,"u");
        }
    }
};