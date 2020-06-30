import axios from "axios";

export const getPageData = (pageId) => {
    return axios.get(`https://hn.algolia.com/api/v1/search?page=${pageId}`);
}