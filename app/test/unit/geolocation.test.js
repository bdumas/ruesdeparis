describe('reduceStreetName', function() {

    it('should generate a simple id from the street of the name', function() {
        var reducedName = geolocationModule._reduceStreetName("Rue du 6 février deux mille quatorze");
        expect(reducedName).toBe("ruedu6fevrierdeuxmillequ");
    });

});

describe('extractStreetInfo', function() {

    it('should retrieve the street fields from the JSON data', function() {
        var streetName = "passagemontgallet";
        var jsonString = '{"passagemontgallet":{"d":"Picpus.","h":"#ORIG# Voisinage de la rue Montgallet.#HISTO# La partie située entre la rue Sainte-Claire Deville et la rue Erard, déclassée par arrêté préfectoral du 28 juillet 1967, a été supprimée lors de la rénovation de l\'îlot Saint-Eloi.","a":"XIIe"}}';
        var theStreet = geolocationModule._extractStreetInfo(jsonString, streetName);
        expect(theStreet.d).toBe("Picpus.");
        expect(theStreet.h).toBe("#ORIG# Voisinage de la rue Montgallet.#HISTO# La partie située entre la rue Sainte-Claire Deville et la rue Erard, déclassée par arrêté préfectoral du 28 juillet 1967, a été supprimée lors de la rénovation de l'îlot Saint-Eloi.");
        expect(theStreet.a).toBe("XIIe");
    });

});
