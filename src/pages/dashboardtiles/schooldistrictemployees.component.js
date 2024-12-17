

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import ReactEcharts from "echarts-for-react";

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';

import SchoolDistBannerImg from "../../assets/images/school_dist_banner.jpeg"
import InterviewImg from "../../assets/images/interview.png"
import { fetchschoolTeachersFTE, fetchschoolTotalFTE, fetchTotalTeacherFTE, fetchSchool_District_employees, fetchStudentCounselorRatio, fetchStudentTeacherRatio } from "../../redux/slices/counter";
import { useDispatch, useSelector } from "react-redux";
// import HorizontalStackBars from "../components/common/horizontalstackbars";
import HorizontalStackBars from "../../components/common/horizontalstackbars/horizontalstackbar";




export default function StudentCharacteristics() {
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(0);

    const School_district_teacher_fteData = useSelector(state => state.netsales.School_District_Teachers_FTE);
    const School_district_teacher_fteDataloading = useSelector(state => state.netsales.School_District_Teachers_FTEloading);
    const School_Total_Teachers_FTEData = useSelector(state => state.netsales.School_Total_Teachers_FTE);
    const School_Total_Teachers_FTEDataloading = useSelector(state => state.netsales.School_Total_Teachers_FTEloading);
    const TotalTeacherFTEData = useSelector(state => state.netsales.TotalTeacherFTE);
    const TotalTeacherFTEloading = useSelector(state => state.netsales.TotalTeacherFTEloading);
    const School_District_employeesData = useSelector(state => state.netsales.School_District_employees);
    const School_District_employeesloading = useSelector(state => state.netsales.School_District_employeesloading);
    const StudentCounselorRatioData = useSelector(state => state.netsales.StudentCounselorRatio);
    const StudentCounselorRatioloading = useSelector(state => state.netsales.StudentCounselorRatioloading);
    const StudentTeacherRatioData = useSelector(state => state.netsales.StudentTeacherRatio);
    const StudentTeacherRatioloading = useSelector(state => state.netsales.StudentTeacherRatioloading);

    console.log('StudentCounselorRatioData', StudentCounselorRatioData)
    console.log('StudentCounselorRatioData2', StudentTeacherRatioData)
    console.log('School_District_employeesData', School_District_employeesData)

    const order = ["Elementary Schools", "Middle Schools", "High Schools", "Not Reported"];

    const sortedData = [...School_District_employeesData].sort((a, b) => {
        return order.indexOf(a.SCHOOL_TYPE) - order.indexOf(b.SCHOOL_TYPE);
    });
    

    //TotalTeacherFTE
    useEffect(() => {
        // dispatch(fetchschoolTeachersFTE({
        //   "elasticQueryName": "School_District_Teachers_FTE",
        //   "filters": [{
        //     "columnName": "SCHOOL_YEAR",
        //     "columnValue": ["2024"],
        //     "excludeKeyword": false
        //   }],
        //   "dynamicColumns": [],
        // }));
        // dispatch(fetchschoolTotalFTE({
        //   "elasticQueryName": "School_Total_Teachers_FTE",
        //   "filters": [{
        //     "columnName": "SCHOOL_YEAR",
        //     "columnValue": ["2024"],
        //     "excludeKeyword": false
        //   }],
        //   "dynamicColumns": [],
        // }));
        dispatch(fetchTotalTeacherFTE({
            "elasticQueryName": "Total Teacher FTE",
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
        dispatch(fetchSchool_District_employees({
            "elasticQueryName": "Teacher FTE",
            // "filters": [{
            //     "columnName": "SCHOOL_YEAR",
            //     "columnValue": ["2024"],
            //     "excludeKeyword": false
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
        // dispatch(fetchStudentCounselorRatio({
        //     "elasticQueryName": "Student/Counselor Ratio",
        //     "filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }],
        //     "dynamicColumns": [{
        //         "columnName": "#{sort}",
        //         "columnValue": "State",
        //         "excludeKeyword": false
        //     }],
        // }));
        dispatch(fetchStudentTeacherRatio({
            "elasticQueryName": "Student/Teacher Ratio",
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
    }, []); //Teacher FTE

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


    }, []);
    const studentteacherratio = {
        yaxis: ["student"],
        value: [13],
        value1: [1]
    }



    //     const SchoolDistrictEmployees = {

    //         tooltip: {
    //             trigger: 'axis',
    //             backgroundColor: 'rgba(50,50,50,0.7)',
    //             borderColor: "#333",
    //             textStyle: {
    //                 fontSize: 12,
    //                 fontWeight: "normal",
    //                 color: '#fff',
    //             },
    //             axisPointer: {
    //                 type: 'shadow'
    //             }
    //         },
    //         grid: {
    //             left: '0',
    //             right: '0',
    //             top: '0',
    //             height: '100%',
    //             containLabel: true
    //         },
    //         xAxis: {
    //             show: false,
    //             type: 'value',
    //         },
    //         yAxis: [{
    //             type: 'category',
    //             data: ['A-Audlt/Higher Ed', 'C-Combined ', 'K12-Combined Elementary/Secondary', 'C-Combined Middle/High', 'E-Elementary', 'M-Middle', 'h-high'],
    //             axisLine: {
    //                 show: false,
    //             },
    //             axisTick: {
    //                 show: false,
    //             },

    //             axisLabel: {
    //                 inside: true,
    //                 color: '#fff',
    // padding:30
    //             },
    //             z: 10
    //         },
    //         {
    //             type: 'category',

    //             axisLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 color: "#fff"
    //             },
    //         },

    //         ],
    //         series: [{
    //             type: 'bar',
    //             stack: 'total',
    //             barWidth: "25px",
    //             barGap: "20",
    //             itemStyle: {
    //                 normal: {
    //                     color: '#1f46ab',
    //                 }
    //             },
    //             label: {
    //                 show: true,
    //                 position: 'center',
    //                 color:'#fff',
    //                 padding:8
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [80, 100, 100, 90, 90, 90, 90]
    //         },
    //         {
    //             type: 'bar',
    //             stack: 'total',
    //             barWidth: "25px",
    //             barGap: "20",
    //             itemStyle: {
    //                 normal: {
    //                     color: '#892c69',
    //                 }
    //             },
    //             avoidLabelOverlap: false,
    //             label: {
    //                 show: true,
    //                 position: 'center',
    //                 color:'#fff',
    //                 padding:8
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [20, 0, 0, 10, 10, 10, 10]
    //         },

    //         ]
    //     };


    const SchoolDistrictEmployees = {

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
            left: '0',
            right: '0',
            top: '0',
            height: '100%',
            containLabel: true
        },
        xAxis: {
            show: false,
            type: 'value',
        },
        yAxis: [{
            type: 'category',
            data: ['Others(Early Childhood Centre,Etc)', 'High School', 'Middle School', 'Elementary'],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },

            axisLabel: {
                inside: true,
                color: '#fff',
                padding: 16
            },
            z: 10
        },
        {
            type: 'category',

            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#fff"
            },
        },

        ],
        series: [{
            type: 'bar',
            stack: 'total',
            barWidth: "25px",
            barGap: "20",
            itemStyle: {
                normal: {
                    color: '#1f46ab',
                }
            },
            label: {
                show: true,
                position: 'right',
                color: '#fff',
                // padding:6.5,
                // paddingLeft:40,

            },
            emphasis: {
                focus: 'series'
            },
            data: [43, 1329, 1088, 3031]
        },
            // {
            //     type: 'bar',
            //     stack: 'total',
            //     barWidth: "25px",
            //     barGap: "20",
            //     itemStyle: {
            //         normal: {
            //             color: '#892c69',
            //         }
            //     },
            //     avoidLabelOverlap: false,
            //     label: {
            //         show: true,
            //         position: 'center',
            //         color:'#fff',
            //         padding:8
            //     },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [20, 0, 0, 10, 10, 10, 10]
            // },

        ]
    };

    // const SchoolDistrictEmployeesnew = {
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
    //         top: "0%",
    //         right: '10%',
    //         height: '100%',
    //         containLabel: true
    //     },

    //     yAxis: [
    //         {
    //             type: 'category',
    //             position: "left",
    //             inverse: true,
    //             data: ['Elementary', 'Middle School', 'High School', 'Others'],
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
    //         inverse: false,
    //         min: 0,
    //         max: 3500,
    //         interval: 10,
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
    //             data: [3031, 1088, 1329, 43],
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

    const TeacherFTEDataOption = {
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
            },
            confine: true
        },
        grid: {
            left: '5%',
            bottom: '0%',
            top: "0%",
            right: '-8%',
            height: '100%',
            containLabel: true
        },
        yAxis: [
            {
                type: 'category',
                position: "left",
                inverse: true,
                data: sortedData?.map(item => item.SCHOOL_TYPE),
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
            show: false,
            // min: 0,
            // max: 1000000,
            // interval: 1000,
            axisLabel: {
                show: true
            }
        },
        series: [
            {
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        fontSize: 10,
                        formatter: function (params) {
                            return params.value;
                        },
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: sortedData?.map(item => item.VALUE?.toFixed(1)),
                type: 'bar',
                barWidth: "40%",
                color: '#1F46AB',
                itemStyle: {
                    normal: {
                        barBorderRadius: [3, 3, 3, 3],
                        color: '#1F46AB',
                    }
                }
            }
        ]
    };



    return (
        <div className=" h-[100%]">

            <div className="bg-[#081630] text-[#fff] h-[100%]">
                <div className="relative h-[160px]">
                    <div className=" h-[160px] ">
                        <img src={SchoolDistBannerImg} className="h-[160px] w-full " />
                    </div>
                    <div className="w-full absolute bottom-0 h-[40px] bg-[#1d192f9c] py-2 px-3">
                        <h3 className="text-[14px] text-[#fff] opacity-[0.8] slider-innertitle">School District Employees</h3>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-10 px-5 mt-2">
                    <div className="flex items-start gap-4">
                        <img src={InterviewImg} className="h-[33px] w-[33px]" />
                        <div className="pt-0 mb-2">
                            {/* <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-1">Total Teachers</p> */}
                            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-0">Total Teacher FTE</p>
                            {/* <h4 className="text-[20px] text-[#fff]">829.32</h4> */}
                            <h4 className="text-[20px] text-[#fff] leading-none">{TotalTeacherFTEData?.[0]?.['VALUE'] !== undefined ? Math.round(TotalTeacherFTEData?.[0]?.['VALUE'])?.toLocaleString() : null}</h4>
                        </div>
                    </div>

                    {/* <div className="flex items-start gap-3">

                        <div className="pt-2">
                            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-1">
                                Administrators &Professional Staff</p>
                            <h4 className="text-[20px] text-[#fff]">1569</h4>
                        </div>


                    </div> */}
                </div>
                <div className="border-t border-[#ffffff26]">
                    <div className="px-2 mt-2">

                        <div className="flex justify-between">
                            <p className="text-[9.5px] text-[#ebebeb] font-light  mb-1"> Teachers FTE</p>
                            {/* <p className="text-[9.5px] text-[#ebebeb] font-light mb-1"> Administrators</p> */}
                        </div>
                    </div>

                </div>


                <div className="px-2 mt-1 SchoolDistrictTeachers">
                    <ReactEcharts option={TeacherFTEDataOption} style={{ width: '16.5vw', height: screenWidth <= 1450 && screenWidth >= 1100 ? 200 : 260 }} />
                </div>
                <div className="border-t border-[#ffffff26]">
                    <div className="grid grid-cols-2 gap-10 px-2 mt-2">
                        <div className="flex items-start gap-3">
                            <div className="">
                                <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-1">Student / Teacher Ratio</p>
                                <h4 className="text-[20px] text-[#fff]">{StudentTeacherRatioData?.[0]?.RATIO}</h4>
                                {/* <HorizontalStackBars
                                    barWidth='16'
                                    data={studentteacherratio}
                                    names={["Student", "Teacher"]}
                                    grid={{
                                        "left": '0%',
                                        "top": '0%',
                                        "right": '0%',
                                        "containLabel": "true"
                                    }}
                                    /> */}
                            </div>
                        </div>
                        {false && 
                        <div className="flex items-start gap-3">
                            <div className="">
                                <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-1">
                                    Student / Counselor Ratio</p>
                                <h4 className="text-[20px] text-[#fff]">{StudentTeacherRatioData?.[1]?.RATIO}</h4>
                                {/* <h4 className="text-[20px] text-[#fff]">377:1</h4> */}
                            </div>
                        </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
