import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../src/reducers";
import Routes from "../src/Routes";
import { renderer } from "./renderer";

const application = express();

application.use(express.static('public'));

application.get('/', (req, res) => {
    res.redirect('/page/1');
});

application.get('*', (req, res) => {
    const store = createStore(reducers, {}, applyMiddleware(thunk));

    const promises = matchRoutes(Routes, req.path).map(({route, match}) => {
        return route.loadData ? route.loadData(store, match.params.pageId || 1) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
});

const PORT = process.env.PORT || 3004;
application.listen(PORT);