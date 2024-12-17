import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'

const barColors = ["#129C83", "#2C4089", "#2C82BE", "#892C69"]

export default function Barchart({ legend, grid, xAxislabel, xAxisline, xAxistick, min, max, interval, yAxislabel, yAxissplitline, yAxisline, yAxistick,
  // xAxisdata,bardata1,barcolor1,bardata2,barcolor2,bardata3,barcolor3,bardata4,barcolor4,poiterdata,pointerstyle,itemStyle,itemStyle2,
  xAxisname, namegap, nameTextStyle,
  data
}) {

  const [ChartData, setChartData] = useState({ labels: [], data: {} })
  useEffect(() => {
    let labels = []
    const data_ = data.reduce((acc, item) => {
      const { ["METRIC_NAME"]: seriesname, ["SCHOOL_YEAR"]: category, ...rest } = item
      if (!acc[seriesname]) acc[seriesname] = { [category]: [] }
      else if (!acc[seriesname][category]) acc[seriesname] = { ...acc[seriesname], [category]: [] }

      labels.push(category)
      acc[seriesname][category].push(
        // data for the chart
        { value: item?.VALUE }
      )

      return acc
    }, {})

    labels = [...new Set(labels)].sort()

    setChartData({ labels: labels, data: data_ })

  }, [data])

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return params.map(item => {
          return `${item.seriesName}: ${(item.value / 1000000)?.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
        }).join('<br/>');
      }
    },

    legend: legend,
    grid: grid,
    xAxis: {
      type: 'category',
      data: ChartData?.labels,
      axisLabel: xAxislabel,
      axisLine: xAxisline,
      axisTick: xAxistick
    },
    yAxis: [
      {
        type: 'value',
        // max: 2000,
        // min: 0,
        // interval: 200,
        axisLabel: {
          ...yAxislabel,
          formatter: function (value) {
            return (value / 1000000).toFixed(0) + 'M';
          }
        },
        splitLine: yAxissplitline,
        axisLine: yAxisline,
        axisTick: yAxistick,
        name: xAxisname,
        nameLocation: "center",
        nameGap: namegap,
        nameTextStyle: nameTextStyle
      },

    ],
    series: Object.entries(ChartData.data || {}).map(([seriesname, items], index) => {
      return {
        name: seriesname,
        data: Object.values(items).flat(),
        type: 'bar',
        // stack:'Add',
        color: barColors[index % barColors.length],
      }
    })
    // series: [
    //   {
    //     name: 'Local Revenue',
    //     data: bardata1,
    //     type: 'bar',
    //     stack:'Add',
    //     color: barcolor1,
    //   },
    //   {
    //     name: 'State Revenue',
    //     data:bardata2,
    //     type: 'bar',
    //     stack:'Add',
    //     color: barcolor2,
    //   },
    //   {
    //     name: 'Federal Revenue',
    //     data:bardata3,
    //     type: 'bar',
    //     stack:'Add',
    //     color:barcolor3,
    //     itemStyle: itemStyle
    //   },
    //   {
    //     name: 'Expenses',
    //     data: bardata4,
    //     type: 'bar',
    //     color: barcolor4,
    //     itemStyle:itemStyle2,
    //   },
    //   {
    //     name: 'Single Point',
    //     type: 'scatter',
    //     data:poiterdata,  
    //     symbolSize: 18,      // Size of the dot
    //     itemStyle: pointerstyle
    //   }

    // ],

  };


  return (
    <ReactEcharts
      echarts={echarts}
      option={option}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
