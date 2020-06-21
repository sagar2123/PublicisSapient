import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table} from './Table';
import {LineChart} from "./LineChart";
import {getDataFromLocalStorage} from "../Utility/utils";

export const Container =  (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, [props.match.params.pageId]);

    const loadData = () => {
        axios.get(`https://hn.algolia.com/api/v1/search?page=${props.match.params.pageId || 1}`)
            .then(result => {
                const currentData = result.data.hits.map((currentObj) => {
                    const currentDataInStorage = getDataFromLocalStorage(currentObj.objectID);
                    const currentDataObj = {
                        points: currentObj.points,
                        title: currentObj.title,
                        author: currentObj.author,
                        objectID: currentObj.objectID,
                        url: currentObj.url,
                        num_comments: currentObj.num_comments,
                        voted: false,
                        hide: false
                    }
                    return currentDataInStorage ? {
                        ...currentDataObj,
                        ...currentDataInStorage
                    } : {
                        ...currentDataObj
                    }
                });
                setData(currentData);
            })
    };

    const updateElementAtParticularIndex = (index, currentIndexData) => {
        let updatedData = JSON.parse(JSON.stringify(data));
        updatedData[index] = {...updatedData[index], ...currentIndexData};
        setData(updatedData);
    }

    const changePage = (operation) => {
        if(operation === "inc"){
            props.history.push(`/page/${parseInt(props.match.params.pageId) + 1}`);
        } else {
            props.history.push(props.match.params.pageId <= 1 ? `/page/1` : `/page/${parseInt(props.match.params.pageId) - 1}`);
        }
    };

    const prepareLineChartData = (data) => {
        let finalData = data.map((dataObj) => {
            return [dataObj.objectID, dataObj.points]
        });
        return [["Id", "Votes"], ...finalData];
    };

    const hideElement = (index) => {
        let updatedData = JSON.parse(JSON.stringify(data));
        updatedData.splice(index, 1);
        setData(updatedData);
    }

    return (
        <div className="container">
            <Table headers={["Comments", "Vote Count", "Up Vote", "News Details"]} updateElementAtIndex={updateElementAtParticularIndex} hideElement={hideElement} data={data}/>
            <div className="page-controls background-primary">
                <div className="app-primary-color">
                    <button className="btn-transparent app-primary-color" onClick={() => {changePage("dec")}}>Previous</button>
                     | 
                    <button className="btn-transparent app-primary-color" onClick={() => {changePage("inc")}}>Next</button>
                </div>
            </div>
            <LineChart data={data.length > 0 ? prepareLineChartData(data) : []} xTitle={"Id"} yTitle={"Votes"}/>
        </div>
    )
}