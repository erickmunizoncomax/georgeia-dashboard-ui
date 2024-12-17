import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'


export default function HorizontalStackBars({ data, barColor, grid, lineColor, barWidth, legends, yaxis, names }) {

    const options = {
        tooltip: {
            // trigger: 'axis',
            confine:'true',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            },
            formatter : function(params){
                // debugger
                return `${params.marker} ${params.seriesName} :
                
                ${params.data}`;
            }
            
        },
        legend: {
            show: false,
           
            orient :'horizontal',
            top: 0,
            right :-50,
           
            itemWidth: 12,
            itemHeight: 12
        },
        grid: grid,
        xAxis: {
            type: 'value',
            splitLine: {
                show: false
            }, axisLabel: {
                show: false,
            }
        },
        yAxis: {
            type: 'category',
            data: data?.yaxis,
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
                
            }
        },
        series: [
            {
                name: names[0],
                type: 'bar',
                stack: 'total',
                barWidth: barWidth,
                barHeight:'10',
                data: data?.value,
                color: "#149C83",
                label: {
                    show: false,
                    fontSize:10,
                    formatter: function(params){
                        return params.data
                    },
                    color : "#09230A"
                },
                itemStyle : {
                    borderRadius: [0, 10,10, 0]
               },
            },
            {
                name: names[1],
                type: 'bar',
                stack: 'total',
                color: "#892C69",
                label: {
                    show: false,
                    fontSize:10,
                    // position: "right",
                    formatter: function(params){
                        return params.data
                    },
                color : "#FFFFFF"

                },
                itemStyle : {
                    borderRadius: [0, 10, 10, 0]
               },
                data: data?.value1,

            },
           
        ]
    };

    return (
        <div  >
            <ReactEcharts
                echarts={echarts}
                option={options}
                opts={{renderer:'svg'}}

            />
        </div>
    );
}


