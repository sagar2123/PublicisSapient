export const FETCH_DATA = "fetch_data";
export const UPDATE_DATA_AT_INDEX = "update_data_at_index";
export const HIDE_ELEMENT = "hide_element";
import { getPageData } from "../Service/apiFactory";

export const fetchData = (page) => async (dispatch) => {
    const res = await getPageData(page);

    dispatch({
        type: FETCH_DATA,
        payload: res
    });
}

export const updateDataAtIndex = (index, currentIndexData) => (dispatch) => {
    dispatch({
        type: UPDATE_DATA_AT_INDEX,
        index,
        currentIndexData
    });
}

export const hideElement = (index) => (dispatch) => {
    dispatch({
        type: HIDE_ELEMENT,
        index
    });
}