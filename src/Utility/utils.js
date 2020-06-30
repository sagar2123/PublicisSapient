export const setDataToLocalStorage = (dataObj) => {
    localStorage.setItem(dataObj.objectID, JSON.stringify(dataObj));
}

export const getDataFromLocalStorage = (objectID) => {
    let currentObj = JSON.parse(localStorage.getItem(objectID));
    if(currentObj){
        return currentObj;
    } else {
        return null;
    }
}