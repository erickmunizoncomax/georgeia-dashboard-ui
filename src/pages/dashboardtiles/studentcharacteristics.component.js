

import React, { useEffect, useState ,useMemo} from "react";
import ReactEcharts from "echarts-for-react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import StudentCharacteristics_bannerImg from "../../assets/images/StudentCharacteristics_banner.jpeg"
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent_Characterstics,fetchEthnicity_District_at_a_glance
} from '../../redux/slices/counter';
import LoaderContainer from "../../components/loaderContainer";
import { filter } from "d3";


export default function StudentCharacteristics() {
  const dispatch = useDispatch();
  const Student_Charactersticsdata= useSelector(state => state.netsales.Student_Characterstics);
  const Student_Charactersticsdataloading = useSelector(state => state.netsales.Student_Charactersticsloading);
  console.log("kavi",Student_Charactersticsdata)
  let Ethnicity_District_at_a_glancedata = useSelector(state => state.netsales.Ethnicity_District_at_a_glance);
  let Ethnicity_District_at_a_glancedataloading = useSelector(state => state.netsales.Ethnicity_District_at_a_glanceloading);

  useEffect(() => {
    dispatch(fetchStudent_Characterstics({
      "elasticQueryName": "Student_Characterstics",
      "filters": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      }],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
    }],
    }));
    dispatch(fetchEthnicity_District_at_a_glance({
      "elasticQueryName": "Ethnicity_District_at_a_glance",
      // "filters": [{
      //   "columnName": "SCHOOL_YEAR",
      //   "columnValue": ["2024"],
      //   "excludeKeyword": false
      // }],
      "filters":[{
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      }],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
    }],
    }));
  }, []);

  
  const[screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
  const handleResize = () => {
  if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      setScreenWidth(screenWidth);
      console.log(screenWidth,"setScreenWidth");
      }
  };
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => {
  window.removeEventListener('resize', handleResize);
  };
  }, []);


  const Student_CharacChartsdata = useMemo(() => 
    [...Student_Charactersticsdata].sort((a, b) => b.VALUE - a.VALUE), 
    [Student_Charactersticsdata]
  );  
  
  console.log(Student_CharacChartsdata,'Student_CharacChartsdata')
  const StudentCharacteristics = {
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
      left: '5%',
      bottom: '15%',
      top: "0%",
      right: '10%',
      height: '100%',
      containLabel: true
    },
    yAxis: [
      {
        type: 'category',
        position: "right",
        inverse: true,
        data: Student_CharacChartsdata.map(itr => itr.DIMENSION),
        axisLine: {
          show: false,
          lineStyle: {
            color: '#E3E3E3'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: '10',
          fontWeight: "normal",
          position: 'insideLeft',
        },
        axisTick: {
          show: false,
        },
      },
    ],
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      inverse: true,
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed"
        },
      },
      // min: 0,
      // max: 12000,
      interval: 100,
    },
    series: [
      {
        label: {
          show: false,
          formatter: "{@VALUE}",
        },
        emphasis: {
          focus: 'series'
        },
        data: Student_CharacChartsdata.map(itr => itr.VALUE), // Use sorted values here
        type: 'bar',
        barWidth: "80%",
        color: '#892c69',
        itemStyle: {
          normal: {
            barBorderRadius: [3, 3, 3, 3],
            color: '#892c69',
          }
        }
      }
    ]
  };
  const StudentGroup = {
    title: {
      // text: 'Student Group',
      left: 10,
      top: 0,
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
    },

    // tooltip: {
    //   trigger: 'item',
    //   backgroundColor: 'rgba(50,50,50,0.7)',
    //   borderColor: "#333",
    //   textStyle: {
    //     fontSize: 12,
    //     fontWeight: "normal",
    //     color: '#fff',
    //   },
    //   axisPointer: {
    //     type: 'shadow'
    //   }
    // },
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        return (
          params.name + " : " + params.percent.toFixed(2) + "%"
        );
      },
      confine: true
    },

    grid: {
      left: -50,
      bottom: '0%',
      top: "60%",
      containLabel: true
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      // left: "6%",
      itemWidth: 8.5,
      itemHeight: 6,
      top: 'center',
      textStyle: {
        color: "#fff",
        fontSize: '9',
        fontStyle: 'normal'
      }
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '70%',
        center: ['30%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'left',
          formatter: '{d}%',
          position: 'inside',
          textStyle: {
            fontSize: '8',
            color: "#fff"
          }
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 10,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        color: [
          "#2C7AB8",
          "#6F2E67",
          "#2C4990",
          "#32A5AC",
          "#393469",
          "#359760",
          "#992837",
        ],
        data: [
          {
            value: Ethnicity_District_at_a_glancedata[0]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[0]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#393469'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[1]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[1]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#32A5AC'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[2]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[2]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#992837'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[3]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[3]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#359760'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[4]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[4]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#2C4990'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[5]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[5]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#402B50'
            }
          },
          {
            value: Ethnicity_District_at_a_glancedata[6]?.VALUE,
            name: Ethnicity_District_at_a_glancedata[6]?.DIMENSION_NAME,
            itemStyle:
            {
              color: '#2C7AB8'
            }
          }
        ]
      }
    ]
  };


//   const SchoolDistrictEmployeesnew = {
//     tooltip: {
//         trigger: 'axis',
//         backgroundColor: 'rgba(50,50,50,0.7)',
//         borderColor: "#333",
//         textStyle: {
//             fontSize: 12,
//             fontWeight: "normal",
//             color: '#fff',
//         },
//         axisPointer: {
//             type: 'shadow'
//         },
//         confine: true
//     },
//     grid: {
//         left: '6%',
//         bottom: '0%',
//         top: "7%",
//         right: '15%',
//         height: 190,
//         containLabel: true
//     },

//     yAxis: [
//         {
//             type: 'category',
//             position: "left",
//             inverse: true,
//             // data: ['Prekindergarten', 'Kindergarten', 'Elementary', 'Secondary','Ungraded'],
//             data: [...new Set(Student_Groupdata?.map(item => item["LABEL"]))],
//             axisLine: {
//                 show: false,
//                 lineStyle: {
//                     color: '#E3E3E3'
//                 }
//             },
//             axisLabel: {
//                 color: '#fff',
//                 fontSize: '10',
//                 fontWeight: "normal",
//                 position: 'insideLeft',
//             },
//             axisTick: {
//                 show: false,
//             },
//         },
//     ],

//     xAxis: {
//         show: false,
//         // inverse: false,
//         min: 0,
//         max: 8000,
//         interval: 5,
//         axisLabel:{
//             show:true
//         }
//     },

//     series: [
//         {
//             label: {
//                 normal: {
//                     show: true,
//                     position: "right",
//                     fontSize: 10,
//                     // padding: 10,
//                     "formatter": function (params) {
//                         return params.value.VALUE
//                     },
//                     "textStyle": {
//                         "color": "#fff"
//                     }
//                 }
//             },
//             emphasis: {
//                 focus: 'series'
//             },
//             // data: [29.12, 25, 360.09, 295.64,119.47],
//             // data: [257, 26.00, 358.85, 297.41,119.40],
//             data: Student_Groupdata?.map(item => item["VALUE"]),
//             type: 'bar',
//             barWidth: "80%",
//             color: '#1F46AB',
//             itemStyle: {
//                 normal: {
//                     barBorderRadius: [3, 3, 3, 3],
//                     color: '#1F46AB',
//                 }
//             }

//         }
//     ]
// };

// Define your custom colors
const customColors = [
  '#1f46ac', // Example color 1
  '#66b3ff', // Example color 2
  '#6f2e66', // Example color 3
  '#32a5ac', // Example color 4
  '#27714e', // Example color 5
  // Add more colors as needed
];

const totalValue = Ethnicity_District_at_a_glancedata?.reduce((sum, item) => sum + item["VALUE"], 0);
const data = Ethnicity_District_at_a_glancedata?.map((item, index) => {
  const percentage = ((item["VALUE"] / totalValue) * 100).toFixed(2); // Calculate percentage and format to 2 decimal places
  return {
    name: item["DIMENSION_NAME"],
    value: percentage, 
   actualValue: item["VALUE"].toLocaleString(), // Set the value as the calculated percentage
    itemStyle: {
      color: customColors[index] // Set custom color based on index
    }
  };
});
const SchoolDistrictEmployeesnew = {
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.name}: ${params.data.actualValue} (${params.data.value})%`;
    }
  },
  legend: {
    orient: 'vertical',
    // left: screenWidth > 1000 &&  screenWidth < 1400 ? '42%' : '47%',
    left: '49%',
    top: 'middle',
    right: 10,
    textStyle: {
      color: '#fff',
      fontSize: 8,
      width: 110,
      overflow: 'truncate',  
    },
    itemWidth: 8,
    itemHeight: 6,
    formatter: function(name) {
      // If the legend label is more than 25 characters, truncate it and add "..."
      if (name.length > 25) {
        return name.substring(0, 25) + '...';
      }
      return name;
    }
  },  
  series: [
    {
      type: 'pie',
      //radius: '55%',
      radius: screenWidth > 1000 &&  screenWidth < 1400 ? '55%' :'65%',
      center: ['25%', '50%'],
      // center: screenWidth > 1000 &&  screenWidth < 1400 ? ['22%', '50%'] :['25%', '50%'],
      data: data,
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 8,
        formatter: `{c}%`
      },
      labelLine: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};



  return (
    <div className="bg-[#081630] text-[#fff] h-[100%]">
      <div className="relative h-[160px]">
        <div className=" h-[160px] ">
          <img src={StudentCharacteristics_bannerImg} className="h-[160px] w-full " alt="banner-img"/>
        </div>
        <div className="w-full absolute bottom-0 h-[40px] bg-[#1d192f9c] py-2 px-3">
          <h3 className="text-[14px] text-[#fff] opacity-[0.8] slider-innertitle">Student Characteristics</h3>
        </div>
      </div>
      {/* <LoaderContainer loading={Student_Characteristicsdataloading}> */}
      <div className="StudentCharacteristics bg-[#081630] pb-2 pt-2">
        <ReactEcharts option={StudentCharacteristics} style={{ width:  '18vw', height: screenWidth <= 1450 && screenWidth >= 1100  ? 140 :150}} />
      </div>
      {/* </LoaderContainer> */}
      <div className="border-t py-5 border-[#ffffff26]  bg-[#081630]">
        {/* <LoaderContainer loading={Student_Groupdataloading}> */}
        <div className="StudetGroup">
          <div className="text-white text-[14px] text-left mx-3">Ethnicity</div>
          {/* <ReactEcharts option={StudentGroup} /> */}
          {/* style={{ width: screenWidth > 1279 ?  '18vw' : screenWidth < 1000 ? '28vw' : '25vw' */}
          <ReactEcharts option={SchoolDistrictEmployeesnew} style={{ width: screenWidth > 1282 ?  '18vw' : screenWidth < 1000 ? '28vw' : '21vw', height: screenWidth <= 1450 && screenWidth >= 1100  ? 200 :210}} />
        </div>
        {/* </LoaderContainer> */}
      </div>
    </div>
  )
}