import express from "express";
import "babel-polyfill";
import React from "react";
import  {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "../src/Routes";

const application = express();

application.use(express.static('public'));

application.get('*', (req, res) => {
    console.log("path", req.path);
    console.log("url", req.url);
    const content = renderToString( 
        // <div>sagar</div>
        <StaticRouter location={req.path} context={{}}>
            <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
    );

    console.log("content", content);
    const html = `
        <html lang="en">
            <head>
                <base href="/">
                <title>News</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script type="text/javascript" src="bundle.js"></script>
            </body>
        </html>
    `;
    console.log("html", html);
    res.send(html);
});

const PORT = process.env.PORT || 3004;
application.listen(PORT);