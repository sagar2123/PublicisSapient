import React from "react";
import {Container} from "./Components/Container";

export default [
    {
        path: "/",
        component: Container,
        exact: true
    },
    {
        path: "/page/:pageId",
        render: (matchProps) =>  <Container {...matchProps} />,
        exact: true
    }
]