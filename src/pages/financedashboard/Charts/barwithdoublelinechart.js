import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { graphic } from 'echarts';

export default function BarwithDoubleLinechart({ legend, grid }) {
  const option = {
    tooltip: {},
    legend: {
      show: true,
      bottom: 10,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 10
      },
      data: [
        { name: 'Revenue', itemStyle: { color: '#129C83' }, icon: 'roundRect' },
        {
          name: 'Projected Revenue', itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 2, [
              {
                offset: 0,
                color: 'rgba(18, 156, 131, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(18, 156, 131, 0.00)'
              }]),
            borderColor: '#129C83',
            borderWidth: 2
          }, icon: 'roundRect'
        },
        { name: 'Local Tax Revenue growth', itemStyle: { color: '#2C82BE' }, icon:'circle'},
        { name: 'Property Value growth rate', itemStyle: { color: '#892C69' }, icon: 'circle'},
      ]
    },
    grid: {
      left: "10%",
      right: "8%",
      top: "5%",
      bottom: "20%"
    },
    xAxis: {
      type: 'category',
      data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      axisLabel: {
        color: "#C9D0DB",
        fontSize: 10
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#4B5563"
        }
      },
      axisTick: {
        show: false,
      }
    },
    yAxis: [
      {
        name: '$ in thousand',
        nameLocation: "center",
        nameGap: 40,
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 10
        },
        type: 'value',
        max: 1400,
        min: 0,
        interval: 200,
        axisLabel: {
          color: "#FFFFFF",
          fontSize: 10
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#4B5563"
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#4B5563"
          }
        },
        axisTick: {
          show: false,
        }
      },
      {
        name: '% growth',
        nameLocation: "center",
        nameGap: 40,
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 10
        },
        type: 'value',
        max: 22,
        min: 0,
        interval: 2,
        axisLabel: {
          color: "#FFFFFF",
          fontSize: 10,
          formatter: '{value}',
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#4B5563"
          }
        },
        axisTick: {
          show: false
        }
      },
    ],
    series: [
      {
        name: 'Revenue',
        data: [800, 300, 500,
          600,
          {
            value: 600,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 2, [
                {
                  offset: 0,
                  color: 'rgba(18, 156, 131, 0.24)'
                },
                {
                  offset: 1,
                  color: 'rgba(18, 156, 131, 0.00)'
                }]),
              borderColor: '#129C83',
              borderWidth: 1
            },
          },
          {
            value: 700,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 2, [
                {
                  offset: 0,
                  color: 'rgba(18, 156, 131, 0.24)'
                },
                {
                  offset: 1,
                  color: 'rgba(18, 156, 131, 0.00)'
                }]),
              borderColor: '#129C83',
              borderWidth: 1
            },
          },
          {
            value: 800,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 2, [
                {
                  offset: 0,
                  color: 'rgba(18, 156, 131, 0.24)'
                },
                {
                  offset: 1,
                  color: 'rgba(18, 156, 131, 0.00)'
                }]),
              borderColor: '#129C83',
              borderWidth: 1
            },
          },
        ],
        type: 'bar',
        color: '#129C83',
        itemStyle: {
          normal: {
            barBorderRadius: [8, 8, 0, 0]
          }
        },
      },
      {
        name: 'Projected Revenue',
        show: false,
        color: '#129C83',
        type: 'line',
      },
      {
        name: 'Local Tax Revenue growth',
        data: [12, 12, 14, 12, 13, 16, 18],
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          color: '#E32C89',
          borderColor: '#fff',
          borderWidth: 2
        },
        lineStyle: {
          color: "#E32C89",
          width: 2,
        }
      },
      {
        name: 'Property Value growth rate',
        data: [10, 15, 16, 14, 15, 18, 20],
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          color: '#2C82BE',
          borderColor: '#fff',
          borderWidth: 2
        },
        lineStyle: {
          color: "#2C82BE",
          width: 2,
        }
      }

    ]
  };
  return (
    <ReactEcharts
      echarts={echarts}
      option={option}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
