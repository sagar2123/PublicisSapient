import { FETCH_DATA, UPDATE_DATA_AT_INDEX, HIDE_ELEMENT } from "../actions";
import { getDataFromLocalStorage } from "../Utility/utils";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA:
            const payload = [...action.payload.data.hits];
            const currentData = payload.map((currentObj) => {
                // const currentDataInStorage = getDataFromLocalStorage(currentObj.objectID);
                const dataObj = {
                    points: currentObj.points,
                    title: currentObj.title,
                    author: currentObj.author,
                    objectID: currentObj.objectID,
                    url: currentObj.url,
                    num_comments: currentObj.num_comments,
                    voted: false
                }
                // return currentDataInStorage ? {
                //     ...dataObj,
                //     ...currentDataInStorage
                // } : {
                //         ...dataObj
                //     }
                return dataObj;
            });
            return currentData;
        case UPDATE_DATA_AT_INDEX:
            let currentState = [...state];
            currentState[action.index] = { ...currentState[action.index], ...action.currentIndexData };
            return currentState;
        case HIDE_ELEMENT:
            let updatedState = [...state];
            updatedState.splice(action.index, 1);
            return updatedState;
        default:
            return state;
    }
}