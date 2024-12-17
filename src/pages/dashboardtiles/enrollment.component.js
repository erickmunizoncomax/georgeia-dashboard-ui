

import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import ArrowUp from "../../assets/images/arrow-up.png"
import ArrowDown from "../../assets/images/arrow-down.png"
import EnrollmentImg from "../../assets/images/Enrollment_banner.jpeg";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchYearwise_Student_Enrollment_Ranking,
  fetchGradewise_Student_Enrollment_Ranking, fetchStudent_Enrollment_Report
} from '../../redux/slices/counter';
import LoaderContainer from "../../components/loaderContainer";

export default function Enrollment() {
  const dispatch = useDispatch();
  const Yearwise_Student_Enrollment_Rankingdata = useSelector(state => state.netsales.Yearwise_Student_Enrollment_Ranking);
  const Yearwise_Student_Enrollment_Rankingdataloading = useSelector(state => state.netsales.Yearwise_Student_Enrollment_Rankingloading);
  const Gradewise_Student_Enrollment_Rankingdata = useSelector(state => state.netsales.Gradewise_Student_Enrollment_Ranking);
  const Gradewise_Student_Enrollment_Rankingdataloading = useSelector(state => state.netsales.Gradewise_Student_Enrollment_Rankingloading);
  const Student_Enrollment_Reportdata = useSelector(state => state.netsales.Student_Enrollment_Report);
  const Student_Enrollment_Reportdataloading = useSelector(state => state.netsales.Student_Enrollment_Reportloading);
  // const At_A_Glance_Top_Tiledata = useSelector(state => state.netsales.At_A_Glance_Top_Tile);
  console.log("Student_Enrollment_Reportdata", Student_Enrollment_Reportdata)
  // console.log("At_A_Glance_Top_Tiledata",At_A_Glance_Top_Tiledata)
  var Gradewise_Student_Enrollment_Rankingdatasort;
  if (Gradewise_Student_Enrollment_Rankingdata) {
    Gradewise_Student_Enrollment_Rankingdatasort = Gradewise_Student_Enrollment_Rankingdata.slice().sort((a, b) => {
      return a.GRADE_SORT_ORDER - b.GRADE_SORT_ORDER
    })
  }


  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        setScreenWidth(screenWidth);
        console.log(screenWidth, "setScreenWidth");
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(fetchYearwise_Student_Enrollment_Ranking({
      "elasticQueryName": "Yearwise_Student_Enrollment_Ranking",
      "filters": [

      ],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
    }],
    }));
    dispatch(fetchGradewise_Student_Enrollment_Ranking({
      "elasticQueryName": "Gradewise_Student_Enrollment_Ranking",
      "filters": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": "2023",
        "excludeKeyword": false
      }],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
    }],
    }));
    dispatch(fetchStudent_Enrollment_Report({
      "elasticQueryName": "Student_Enrollment_Report",
      "filters": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": "2023",
        "excludeKeyword": false
      }],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
    }],
    }));
    // dispatch(fetchAt_A_Glance_Top_Tile({
    //   "elasticQueryName": "At_A_Glance_Top_Tile",
    //   "filters": [
    //   ],
    //   "dynamicColumns": [],
    // }));
  }, [])

  const StudentEnrollmentbyGrade = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
      axisPointer: {
        type: 'shadow'
      }

    },
    grid: {
      tooltip: {
        padding: [100, 100, 100, 100],
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: "#333",
        color: '#fff'

      }
    },
    title: {
      text: 'Student Enrollment by Grade',
      left: 10,
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',

      },
    },

    grid: {
      left: '4%',
      right: '1%',
      bottom: '0%',
      top: "20%",
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fff'
          }
        },
        // min: 0,
        // max: 13000,  // Adjusted slightly above the max value of your data
        // interval: 1000,  // Adjusted interval for better visualization
        axisLabel: {
          show: false,
          color: '#fff'
        },
        splitLine: {
          show: false,
          lineStyle: {
            show: false,
            type: "dashed"
          },
        },
      },
    ],
    xAxis: {
      type: 'category',
      data: Gradewise_Student_Enrollment_Rankingdatasort.map(itr => itr.DIMENSION_NAME),

      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E0E0E0'
        }
      },
      axisLabel: {
        color: '#fff',
        interval: 0,
        rotate: 50,
        fontSize: 10,
      },
    },
    series: [
      {
        // name: 'Revenue 2021',
        type: 'bar',
        stack: 'Profit',
        barWidth: '15vw',
        color: '#2c4089',

        data: Gradewise_Student_Enrollment_Rankingdatasort.map(itr => itr.VALUE),
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },

      // {
      //   name: 'Revenue 2022',
      //   type: 'line',
      //   stack: 'Expenses 2022',
      //   color: '#FFA600',
      //   symbolSize: 0,
      //   // data: [21000, 20000, 21000, 23000, 20000, 23000, 26000,24000,25000],
      //   // lineStyle: {
      //   //   width: 3,
      //   // },
      // },

    ]
  };

  const StudentEnrollmentbyYear = {
    title: {
      text: 'Student Enrollment by Year',
      left: 10,
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
    },
    color: ['#892c69'],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: "line"
        }
      },
      formatter: function (params) {

        if (Array?.isArray(params)) {
          return params.map(param => {
            // console.log(param,'param')
            return `${`Year ` + param.axisValueLabel}: ${param.value?.toLocaleString()}`;
          }).join('<br/>');
        } else {
          return `${params.axisValueLabel}: ${params.value?.toLocaleString()}`;
        }
      }
    },
    grid: {
      tooltip: {
        padding: [100, 100, 100, 100],
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: "#333",
        color: '#fff'
      }
    },

    grid: {
      right: '2%',
      bottom: '0%',
      //top: '0%',
      // width: '100%',
      height: '80%',
      left: '2%'
    },

    yAxis: [
      {
        type: 'value',
        show: false,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#E0E0E0'
          }
        },
        axisLabel: {
          show: false,
          color: '#4F4F4F'
        },
        splitLine: {
          lineStyle: {
            show: false,
            type: "dashed"
          },
        },
        min: 0,
        max: 17000000,
        interval: 1000,
      },
    ],
    xAxis: {
      type: 'category',
      data: Yearwise_Student_Enrollment_Rankingdata.map(itr => itr.SCHOOL_YEAR),
      position: "bottom",
      offset: -30,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E0E0E0'
        }
      },
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      z: 10
    },
    series: [
      {
        data: Yearwise_Student_Enrollment_Rankingdata.map(itr => itr.VALUE),
        type: 'line',
        areaStyle: {},
        label: {
          show: true,
          position: 'top',
          textShadowBlur: false,
          color: '#fff',
          formatter: (params) => {
            return params.value.toLocaleString();
          }
        },
      },
    ]

  };
  // #1d192f9c
  // bg-[#00000080] 
  return (
    <div className="bg-[#081630] text-[#fff] h-[100%] enrollment_main">
      <div className="relative h-[160px]">
        <div className=" h-[160px] ">
          <img src={EnrollmentImg} className="h-[160px] w-full " />
        </div>
        <div className="w-full absolute bottom-0 h-[40px] bg-[#1d192f9c] py-2 px-3">
          <h3 className="text-[14px] text-[#fff] opacity-[0.8] slider-innertitle">Enrollment</h3>
        </div>
      </div>
      <div className="mt-3 flex gap-6 items-center px-4">
        <div className="">
          <p className="text-[12px] font-normal leading-3">Total</p>
          <h4 className="text-[20px] font-meduim">{Student_Enrollment_Reportdata[0]?.VALUE?.toLocaleString()}</h4>
        </div>
        {/* <div style = {{position:"relative",top:"6px"}}>
            {
              Student_Enrollment_Reportdata[2]?.GROUPBY_VARIANCE>=0?<div className="smallarrowbtn" style = {{fontSize:"10px",fontWeight:550}}>
              {Student_Enrollment_Reportdata[2]?.GROUPBY_VARIANCE?.toFixed(1)}%
                <img src={ArrowUp} className="h-2.5 w-2.5" />
              </div>:
              <div className="smallarrowbtndown" style = {{fontSize:"10px",fontWeight:500}}>
              {Student_Enrollment_Reportdata[2]?.GROUPBY_VARIANCE?.toFixed(1)}%
                <img src={ArrowDown} className="h-2.5 w-2.5" /> 
              </div>
            }
            
          </div> */}
        {/* <div style = {{fontSize:"12px", position:"relative",right:"15px",top:"7px"}}>Last Year Variance Comparison</div> */}
      </div>
      {/* <LoaderContainer loading={Student_Enrollment_Reportdataloading}> */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-2">
        {/* <div className="flex-col">
          <p className="text-[11px] font-normal leading-none">New</p>
          <p className="text-[16px] font-medium leading-2">
          {Math.round(Student_Enrollment_Reportdata[0]?.VALUE)?.toLocaleString()}
          </p>
        </div> */}
        {/* <div className="flex-col">
            <p className="text-[11px] font-normal leading-none">Loss</p>
            <p className="text-[16px] font-medium leading-2">{Student_Enrollment_Reportdata[1]?.METRIC_NUMERATOR?.toLocaleString()}</p>
          </div> */}
      </div>
      {/* </LoaderContainer> */}
      <div className="border-t border-[#ffffff26]">
        {/* <LoaderContainer loading={Student_Enrollment_By_Gradedataloading}> */}
        <div className="h-[120px] mt-2 mb-1 mx-auto center-align-echarts StudentEnrollmentbygrade">
          <ReactEcharts style={{ width: screenWidth <= 1281 && screenWidth >= 1100 ? '22.5vw' : '18vw', height: screenWidth <= 1450 && screenWidth >= 1100 ? 120 : 120 }} option={StudentEnrollmentbyGrade} />
        </div>
        {/* </LoaderContainer> */}

      </div>
      <div className="border-t border-[#ffffff26]">
        {/* <LoaderContainer loading={Student_Enrollment_By_Yeardataloading}> */}
        <div className="StudentEnrollmentbyYear mb-0">
          <ReactEcharts style={{ width: screenWidth <= 1281 && screenWidth >= 1100 ? '22.5vw' : '18vw', height: screenWidth <= 1450 && screenWidth >= 1100 ? 120 : 120 }} option={StudentEnrollmentbyYear} />
        </div>
        {/* </LoaderContainer> */}
      </div>
    </div>
  )
}