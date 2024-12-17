

import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import StudentCenter_bannerImg from "../../assets/images/school&center_banner.jpeg"
import SchoolImg from "../../assets/images/school.png"
import TargetImg from "../../assets/images/target.png"
import CareImg from "../../assets/images/care.png"
import { useDispatch, useSelector } from "react-redux";
import {fetchSchools,fetchSchools_Centers_Report
} from '../../redux/slices/counter';
import LoaderContainer from "../../components/loaderContainer";


export default function SchoolsCenters() {
  const dispatch = useDispatch();
  const Schoolsdata = useSelector(state => state.netsales.Schools);
  const Schoolsdataloading = useSelector(state => state.netsales.Schoolsloading);
  const Schools_Centers_Reportdata = useSelector(state => state.netsales.Schools_Centers_Report);
  const order = ["Elementary Schools", "Middle Schools", "High Schools","Not Reported"];

  const sortedData = [...Schoolsdata].sort((a, b) => {
      return order.indexOf(a.METRIC_NAME) - order.indexOf(b.METRIC_NAME);
  });

  console.log(sortedData,'sortedData')
  
  const Schools_Centers_Reportdataloading = useSelector(state => state.netsales.Schools_Centers_Reportloading);
    useEffect(() => {
      dispatch(fetchSchools({
        "elasticQueryName": "Schools",
        // "filters": [{
        //   "columnName": "SCHOOL_YEAR",
        //   "columnValue": ["2024"],
        //   "excludeKeyword": false
        // }],
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
      dispatch(fetchSchools_Centers_Report({
        "elasticQueryName": "Schools_Centers_Report",
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
  },[]);

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

  

  const StudentCenters = {
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
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: "0%",
      containLabel: true
    },
    legend: {
      orient: 'vertical',
      center: 'center',
      textStyle: {
        padding: [4, 20, 4, 20],
        borderRadius: 4
      },
      // right: '5%',
      // left: "60%",
      itemWidth: 8.5,
      itemHeight: 6,
      bottom:0,
      textStyle: {
        color: "#fff",
        fontSize: '10',
        fontStyle: 'normal'
      }
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '38%'],

        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'left',
          // formatter: '{d}%',
          formatter : (params) => {
              console.log("params label",params)
              return params.value
          },
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
        data: [
          // {
          //   value: sortedData[0]?.VALUE,
          //   name: sortedData[0]?.METRIC_NAME,
          //   itemStyle:
          //   {
          //     color: '#2c4990'
          //   }
          // },
          {
            value: sortedData[1]?.VALUE,
            name: sortedData[1]?.METRIC_NAME,
            itemStyle:
            {
              color: '#377ab8'
            }
          },
          {
            value: sortedData[2]?.VALUE,
            name: sortedData[2]?.METRIC_NAME,
            itemStyle:
            {
              color: '#6f2e66'
            }
          },
          
          {
            value: sortedData[3]?.VALUE,
            name: sortedData[3]?.METRIC_NAME,
            itemStyle:
            {
              color: '#41a5ac'
            }
          },
          {
            value: sortedData[4]?.VALUE,
            name: sortedData[4]?.METRIC_NAME,
            itemStyle:
            {
              color: '#393469'
            }
          },
        ]
      }
    ]
  };

  return (
    <div className="bg-[#081630] text-[#fff] h-[100%]">
      <div className="relative h-[160px]">
        <div className=" h-[160px] ">
          <img src={StudentCenter_bannerImg} className="h-[160px] w-full " />
        </div>
        <div className="w-full absolute bottom-0 h-[40px] bg-[#1d192f9c] py-2 px-3">
          <h3 className="text-[14px] text-[#fff] opacity-[0.8] slider-innertitle">Schools & Centers</h3>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-3 px-5 mt-3 mb-1">
        <div className="flex items-start gap-3">
          <img src={SchoolImg} className="h-[35px] w-[35px]" />
          {/* <LoaderContainer loading={Schools_Centers_Reportdataloading}> */}
          <div className="pt-0">
            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-0">
              Total Schools</p>
            <h4 className="text-[20px] text-[#fff] leading-none">{sortedData[0]?.VALUE}</h4>
          </div>
          {/* </LoaderContainer> */}
        </div>

        <div className="flex items-start gap-3">
          {/* <LoaderContainer loading={Schools_Centers_Reportdataloading}> */}
          <div className="pt-0">
            {/* <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-0">
              Distinguished schools</p> */}
            {/* <h4 className="text-[20px] text-[#fff]">{Schools_Centers_Reportdata[0]?.COUNT}</h4> */}
            {/* <h4 className="text-[20px] text-[#fff] leading-none">NA</h4> */}
          </div>
          {/* </LoaderContainer> */}
        </div>
      </div>
      <div className="border-t border-[#ffffff26]">
        {/* <LoaderContainer loading={School_And_Centersdataloading}> */}
      <div className="mt-5 mb-0 StudentCenters">
        <ReactEcharts option={StudentCenters} style={{ maxWidth:  screenWidth <= 1900 && screenWidth >= 1100  ? 280 : 360 }}/>
      </div>
      {/* </LoaderContainer> */}
      </div>

      {/* <div className="grid grid-cols-2 gap-10 px-5 border-t py-3 border-[#ffffff26] mt-10">
        <div className="flex items-start gap-3">
          <img src={TargetImg} className="h-[38px] w-[38px]" />
          <div className="pt-2">
            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-1">Regular Classified People</p>
            <h4 className="text-[20px] text-[#fff]">459</h4>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <img src={CareImg} className="h-[38px] w-[38px]" />
          <div className="pt-2">
            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-3">
              National Board Certified Teacher</p>
            <h4 className="text-[20px] text-[#fff]">197</h4>
          </div>
        </div>
      </div> */}
    </div>
  )
}