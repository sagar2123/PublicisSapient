import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData, updateDataAtIndex } from '../actions';
import { LineChart } from "../Components/LineChart";
import { Table } from '../Components/Table';

const _HackerNews =  (props) => {
    
    useEffect(() => {
        props.fetchData(props.match.params.pageId);
    }, [props.match.params.pageId]);

    //         const currentDataInStorage = getDataFromLocalStorage(currentObj.objectID);
    //         return currentDataInStorage ? {
    //             ...currentDataObj,
    //             ...currentDataInStorage
    //         } : {
    //             ...currentDataObj
    //         }

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

    return (
        <div className="container">
            <>
                <Table headers={["Comments", "Vote Count", "Up Vote", "News Details"]} updateElementAtIndex={props.updateDataAtIndex} hideElement={props.hideElement} data={props.news}/>
                <div className="page-controls background-primary">
                    <div className="app-primary-color">
                        <button className="btn-transparent app-primary-color cursor-pointer" onClick={() => {changePage("dec")}}>Previous</button>
                        | 
                        <button className="btn-transparent app-primary-color cursor-pointer" onClick={() => {changePage("inc")}}>Next</button>
                    </div>
                </div>
                <LineChart data={props.news.length > 0 ? prepareLineChartData(props.news) : []} xTitle={"Id"} yTitle={"Votes"}/>
            </> 
        </div>
    )
}

export const loadData = (store, page) => {
    return store.dispatch(fetchData(page));
};

const HackerNews = connect((state) => {
    return {
        news: state.news
    }
}, {fetchData, updateDataAtIndex })(_HackerNews);

export default HackerNews;