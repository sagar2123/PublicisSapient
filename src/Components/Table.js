import React from 'react';
import { getDataFromLocalStorage ,setDataToLocalStorage } from '../Utility/utils';

export const Table = ({data, headers, updateElementAtIndex, hideElement}) => {

    const createHeaders = () => {
        return headers.map((header, index) => {
            return <th key={header+index}>{header}</th>;
        });
    };

    const setCurrentDataInLocalStorage = (operation, currentData, index) => {
        let updatedData = JSON.parse(JSON.stringify(currentData));
        if(operation === "inc"){
            updatedData.points = parseInt(updatedData.points) + 1; 
            updatedData.voted = true;
        } else {
            updatedData.points = parseInt(updatedData.points) - 1; 
            updatedData.voted = false;
        }

        const checkIfAlreadyExistInLocalStorage = getDataFromLocalStorage(currentData.objectID);
        if(checkIfAlreadyExistInLocalStorage){
            setDataToLocalStorage({...checkIfAlreadyExistInLocalStorage, ...updatedData});
        } else {
            setDataToLocalStorage({...updatedData});
        }
        updateElementAtIndex(index, updatedData);
    };

    const createRows = () => {
        return data.map((row, index) => {
            return (
                <tr key={row.objectID}>
                    <td className="text-small align-center">{row.num_comments || "-"}</td>
                    <td className="text-small align-center">{row.points || "-"}</td>
                    <td className="text-small align-center">{
                        !row.voted ?
                        <div onClick={() => {setCurrentDataInLocalStorage("inc", row, index)}} className={"triangle-up-icon cursor-pointer"}></div> : 
                        <div onClick={() => {setCurrentDataInLocalStorage("dec", row, index)}} className={"triangle-down-icon cursor-pointer"}></div>
                    }</td>
                    <td className="text-small">{row.title || "-"} by {row.author || "-"} 
                    <button className={"text-small float-right hide-button btn-transparent cursor-pointer"} onClick={() => {hideElement(index)}}>hide</button>
                    </td>
                </tr>
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

