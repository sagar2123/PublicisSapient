import React from "react";
import {HackerNews, loadData} from "./Containers/HackerNews";

export default [
    {
        path: "/",
        component: HackerNews,
        exact: true
    },
    {
        loadData: loadData,
        path: "/page/:pageId",
        render: (matchProps) =>  <HackerNews {...matchProps} />,
        exact: true
    }
]