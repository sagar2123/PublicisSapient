import React from "react";
import { renderToString } from "react-dom/server";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import Routes from "../src/Routes";
import {Provider} from "react-redux";

export const renderer = (req, store) => {
    const content = renderToString( 
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    const html = `
        <html lang="en">
            <head>
                <base href="/">
                <title>News</title>
                <link rel="stylesheet" type="text/css" href="assets/app.css"></link>                
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.InitialState = ${JSON.stringify(store.getState())}
                </script>
                <script type="text/javascript" src="bundle.js"></script>
            </body>
        </html>
    `;

    return html;
};