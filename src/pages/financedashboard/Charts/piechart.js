import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'

export default function Piechart({legend ,name,radius,label,labelLine,data,graphic,center}) {
    const option = {  
        legend: legend,
        
        series: [     
          {       
            name: name,       
            type: 'pie',       
            radius: radius, 
            center:center  ,             
            label: label,             
            labelLine: labelLine,       
            data: data,   
          }   
        ],     
        graphic: graphic,
      };
       
  return (
    <ReactEcharts
    echarts={echarts}
    option={option}
    style={{ width: '100%', height: '100%' }}
/>
  )
}
