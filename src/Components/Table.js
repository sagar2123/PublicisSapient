import React from 'react';
import { getDataFromLocalStorage ,setDataToLocalStorage } from '../Utility/utils';

export const Table = ({data, headers, updateElementAtIndex}) => {

    const createHeaders = () => {
        return headers.map((header, index) => {
            return <th key={header+index} className="text-medium">{header}</th>;
        });
    };

    const updateUpVoteCount = (operation, currentData, index) => {
        let updatedData = JSON.parse(JSON.stringify(currentData));
        if(operation === "inc"){
            updatedData.points = parseInt(updatedData.points) + 1; 
            // updatedData.voted = true;
        } else {
            updatedData.points = parseInt(updatedData.points) - 1; 
            // updatedData.voted = false;
        }

        const checkIfAlreadyExistInLocalStorage = getDataFromLocalStorage(currentData.objectID);
        if(checkIfAlreadyExistInLocalStorage){
            setDataToLocalStorage({...checkIfAlreadyExistInLocalStorage, ...updatedData});
        } else {
            setDataToLocalStorage({...updatedData});
        }
        updateElementAtIndex(index, updatedData);
    };

    const hideElementRow = (currentData, index) => {
        let updatedData = JSON.parse(JSON.stringify(currentData));
        updatedData.hide = true

        const checkIfAlreadyExistInLocalStorage = getDataFromLocalStorage(currentData.objectID);
        if(checkIfAlreadyExistInLocalStorage){
            setDataToLocalStorage({...checkIfAlreadyExistInLocalStorage, ...updatedData});
        } else {
            setDataToLocalStorage({...updatedData});
        }
        updateElementAtIndex(index, updatedData);
    }

    const createRows = () => {
        return data.map((row, index) => {
            return (
                <>
                { !row.hide &&
                    <tr key={row.objectID}>
                        <td className="text-medium align-center">{row.num_comments || "-"}</td>
                        <td className="text-medium align-center">{row.points || "-"}</td>
                        {/* <td className="text-medium align-center">{
                            !row.voted ?
                            <div onClick={() => {updateUpVoteCount("inc", row, index)}} className={"triangle-up-icon cursor-pointer"}></div> : 
                            <div onClick={() => {updateUpVoteCount("dec", row, index)}} className={"triangle-down-icon cursor-pointer"}></div>
                        }</td> */}
                        <td className="text-medium align-center">
                            <div onClick={() => {updateUpVoteCount("inc", row, index)}} className={"triangle-up-icon cursor-pointer"}></div>
                        </td>
                        <td className="text-medium">
                            <a className="news-anchor" href={row.url}>
                                {row.title || "-"} 
                                <span className={"table-elements-non-highlighted"}> by </span> 
                                {row.author || "-"} 
                            </a>
                            <button className={"text-medium float-right hide-button btn-transparent cursor-pointer table-elements-non-highlighted"} onClick={() => {hideElementRow(row, index)}}>hide</button>
                        </td>
                    </tr>
                }
                </>
            );
        });
    }

    return(
        <table>
            <thead>
                <tr>
                    {createHeaders()}
                </tr>
            </thead>
            <tbody>
                {createRows()}
            </tbody>
        </table>
    )
}

