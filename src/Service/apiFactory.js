import axios from "axios";

export const getPageData = (pageId) => {
    return axios.get(`https://hn.algolia.com/api/v1/search?page=${pageId}`);
}

export const testSum = (a, b) => {
    return a+b
}

//Adding to just see how the test coverage works, not required and can be removed later
export const randomComparisonFunction = (a, b) => {
    return a>b ? a : b;
}
