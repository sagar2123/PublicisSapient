import React from "react";
import { Chart } from "react-google-charts";

export const LineChart = ({data, xTitle, yTitle}) => {
    return (
        <div className="chart-container">
            <Chart
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    hAxis: {
                        title: xTitle,
                    },
                    vAxis: {
                        title: yTitle,
                    },
                    backgroundColor: "f6f6f0"
                }}
                rootProps={{ 'data-testid': '1' }}
                />
        </div>
    )
}