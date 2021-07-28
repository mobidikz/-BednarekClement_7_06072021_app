//fonction de traitement de la date 
export const dateParser= (num) => {
    let options = {
        hour: "2-digit", 
        minute: "2-digit", 
        second:"2-digit", 
        weekday: "long", 
        year: "numeric", 
        month:"short", 
        day: "numeric"
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

//fontion pour savoir si c'est vide ou non
export const isEmpty = (value) => {
    return (
        value === undefined || 
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
};

//fonction de traitement de la date (pour les commentaires)
export const timestampParser = (num) => {
    let options = {
        hour: "2-digit", 
        minute: "2-digit", 
        second:"2-digit", 
        weekday: "long", 
        year: "numeric", 
        month:"short", 
        day: "numeric"
    };

    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
}