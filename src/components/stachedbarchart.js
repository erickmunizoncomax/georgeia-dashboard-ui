import React, {useEffect, useMemo} from "react"
import ReactEcharts from "echarts-for-react"

export default function StachedBarChart(props) {
  let {
    barDimensions = [],
    lineDimensions = [],
    pivotData = [],
    selectDimension
  } = props

  let colors = ["#2b79b3", "#2b3d82", "#802a64", "#13917c", "#cac2f9", "#2b79b3", "#2b79b3"]

  let series = []
  barDimensions?.forEach((item, index) => {
    series.push({
      type: 'bar',
      barGap: '8%',
      barWidth: selectDimension === 'Grade' ? '5%' : "8%",
      color: colors[index],
      animation: false,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 2, 2],
        }
      }
    })
  })

  useEffect(() => {
    let barColors = barDimensions.reduce((value, item, index) => Object.assign(value, {[item]: colors[index]}), {})
    props.getBarColor(barColors)
  }, [barDimensions])

  lineDimensions?.forEach(item => {
    series.push({
      type: 'line',
      stack: 'Actual',
      color: '#fff',
      symbolSize: 10,
      symbol: 'circle',
      symbolRotate: 0,
      itemStyle: {
        normal: {
          borderWidth: 2,
          borderColor: '#fff',
          color: '#0c1c3c'
        }
      },
      animation: false,
      lineStyle: {
        width: 2,
        color: '#fff'
      }
    })
  })

  const chartOptions = useMemo(() => {
    return {
      title: {
        textStyle: {
          fontSize: 12,
          fontWeight: "normal"
        },
      },
      tooltip: {
        trigger: 'axis',
        animation: false,
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: "#333",
        textStyle: {
          fontSize: 12,
          fontWeight: "normal",
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          let tooltipContent = `<div style="text-align: left;"><strong>${params[0].axisValue}</strong><br/>`;
          params.forEach(param => {
            if (param.value !== undefined) {
              tooltipContent += `
                <div style="margin-top : 4px; display: flex; align-items: center; justify-content: space-between;">
                    <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                    <span style="flex-grow: 1; margin-right: 20px;">${param?.seriesName}</span>
                    <span>${param?.value?.[param?.seriesName]}</span>
                </div>            
            `
            }
          })
          return tooltipContent
        }
      },
      legend: {
        left: '5%',
        top: '0%',
        show: false
      },
      dataset: {
        dimensions: ['SCHOOL_YEAR', ...barDimensions, ...lineDimensions],
        source: pivotData
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: [0, 1],
          realtime: false,
          start: 0,
          end: 80,
          top: 0,
          height: 15,
          handleIcon:
            'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%'
        },
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 30,
          top: 10,
          height: 15
        }
      ],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: "15%",
        containLabel: true
      },
      yAxis: [
        {
          type: 'value',
          animation: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          min: 0,
          max: 120,
          interval: 20,
          axisLabel: {
            //   formatter: '${value}',
            show: true,
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: 'transparent'
            },
          },
        },

      ],
      xAxis: {
        type: 'category',
        animation: false,
        data: props?.finalData1?.map(itr => itr?.overallvalue),
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          color: '#fff'
        },
      },
      // series: props.data,
      series: series
    }
  }, [series])

  console.log(chartOptions)

  return (
    <ReactEcharts option={chartOptions} />
  )
}