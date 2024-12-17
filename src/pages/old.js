import { Link, useNavigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import React, { useState, useEffect } from "react";
// import whiteBgLogoImg from '../assets/brands/schoolperformance.png';
import whiteBgLogoImg from '../assets/brands/sfps_logo.png';
import { TabView, TabPanel } from 'primereact/tabview';
import HRProfile from "./profile.component";
import { Sidebar } from 'primereact/sidebar';
import school_icon from '../assets/images/school_icon.png';
import school_campus from '../assets/images/school_campus.png';
import avatar_head from '../assets/images/avatar_head.png';
import { Carousel } from 'primereact/carousel';
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSchool_Performance_Fund_Type_Report, fetchSchool_Performance_School_Type_Report, fetchSchool_Performance_Metric_Report,
    fetchSchool_Performance_Map_Report, fetchSchool_Performance_Pie_Chart_Report
} from '../redux/slices/schoolperformance';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import locationIcon from "../assets/images/green_dot_pin.png";
import locationIcon1 from "../assets/images/red_dot_pin.png";
import locationIcon2 from "../assets/images/yellow_dot_pin.png";
import FilterComponent from "../components/filterComponent";
import SchoolPerformanceTableComponent from "../components/tableComponent/schoolPerformTable";


export default function Schoolperformance(props) {
    var pagename = window.location.pathname
    const [mapData, setMapData] = useState([])
    // console.log("pagename",pagename)
    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const center = {
        // lat: 30.340004,
        // lng: -97.731763
        lat: 35.691544,
        lng: -105.944183

    };
    const options = {
        mapTypeControl: false,
        fullscreenControl: false,
        // zoomControl: false,
        streetViewControl: false
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBHkESRyB7oJAtl15zRm6cXnBBoe2rS9Ik"  //need to define your google api key 
    })
    useEffect(() => {
        const handleBeforeUnload = () => {
            window.sessionStorage.removeItem('SchoolType');
            window.sessionStorage.removeItem('Schoolname');
            window.sessionStorage.removeItem('Year');
            window.sessionStorage.removeItem('Gender');
            window.sessionStorage.removeItem('Ethincity');
            window.sessionStorage.removeItem('Grade');
            window.sessionStorage.removeItem('allfilter');
            window.sessionStorage.removeItem('selectedoptions');
            window.sessionStorage.removeItem('selectedoptions1');
            window.sessionStorage.removeItem('selectedoptions2');
            window.sessionStorage.removeItem('selectedoptions3');
            window.sessionStorage.removeItem('selectedmetric');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    const handleClick1 = () => {
        window.sessionStorage.removeItem('SchoolType');
        window.sessionStorage.removeItem('Schoolname');
        window.sessionStorage.removeItem('Year');
        window.sessionStorage.removeItem('Gender');
        window.sessionStorage.removeItem('Ethincity');
        window.sessionStorage.removeItem('Grade');
        window.sessionStorage.removeItem('allfilter');
        window.sessionStorage.removeItem('selectedoptions');
        window.sessionStorage.removeItem('selectedoptions1');
        window.sessionStorage.removeItem('selectedoptions2');
        window.sessionStorage.removeItem('selectedoptions3');
        window.sessionStorage.removeItem('selectedmetric');
    };
    const [map, setMap] = useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [visibleRight, setVisibleRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pieChartData, setpieChartData] = useState([]);

    const dispatch = useDispatch();
    const School_Performance_Fund_Type_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Fund_Type_Report);
    const School_Performance_School_Type_Reportdata = useSelector(state => state.schoolperformance.School_Performance_School_Type_Report);
    const School_Performance_Metric_Reportata = useSelector(state => state.schoolperformance.School_Performance_Metric_Report);
    const School_Performance_Map_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Map_Report);
    const School_Performance_Pie_Chart_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Pie_Chart_Report);
    // console.log("School_Performance_Metric_Reportata",School_Performance_Metric_Reportata)
    // console.log("School_Performance_School_Type_Reportdata",School_Performance_School_Type_Reportdata)




    // let School_Performance_Metric_Reportatanew = School_Performance_Metric_Reportata;

    var School_Performance_Metric_Reportatanew = JSON.parse(JSON.stringify(School_Performance_Metric_Reportata))
        ?.filter(item => item["METRIC_NAME"] != "% of student above Reading Benchmark"
            && item["METRIC_NAME"] != "% of student above Writing Benchmark"
            && item["METRIC_NAME"] != "% of student above Speaking Benchmark"
            && item["METRIC_NAME"] != "% of student above Listening Benchmark"
            && item["METRIC_NAME"] != "Referral Rate"
            && item["METRIC_NAME"] != "Suspension Rate"
        );

    if (School_Performance_Metric_Reportatanew) {
        School_Performance_Metric_Reportatanew.map(itr => {
            if (itr["METRIC_NAME"] == "Students with >95% Attendance") {
                itr["color"] = "#2C4089"
                itr["order"] = 1
            } else if (itr["METRIC_NAME"] == "Chronic Absence Rate") {
                itr["color"] = "#2C82BE"
                itr["order"] = 2;
            }
            else if (itr["METRIC_NAME"] == "% of student above Math Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 3
            } else if (itr["METRIC_NAME"] == "% of student above ELA Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 4
            } else if (itr["METRIC_NAME"] == "% of student above Science Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 5
            }
            else if (itr["METRIC_NAME"] == "# of Graduates") {
                itr["color"] = "#3A3365"
                itr["order"] = 6
            }
            // if (itr["METRIC_NAME"] == "# of Graduates") {
            //     itr["color"] = "#3A3365"
            //     itr["order"] = 10
            // } else if (itr["METRIC_NAME"] == "Students with >95% Attendance") {
            //     itr["color"] = "#2C4089"
            //     itr["order"] = 1
            // } else if (itr["METRIC_NAME"] == "Chronic Absence Rate") {
            //     itr["color"] = "#2C82BE"
            //     itr["order"] = 2;
            // } else if (itr["METRIC_NAME"] == "Referral Rate") {
            //     itr["color"] = "#892C69"
            //     itr["order"] = 4
            // } else if (itr["METRIC_NAME"] == "Suspension Rate") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 5
            // }
            // else if (itr["METRIC_NAME"] == "% of student above STAAR Reading benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 6
            // }
            // else if (itr["METRIC_NAME"] == "% of student above STAAR Math benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 3
            // }
            // else if (itr["METRIC_NAME"] == "% of student above NWEA ELA benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 8
            // }
            // else if (itr["METRIC_NAME"] == "% of student above NWEA Math benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 9
            // }

        })
    }

    if (School_Performance_Metric_Reportatanew) {
        School_Performance_Metric_Reportatanew = School_Performance_Metric_Reportatanew.slice().sort((a, b) => {
            return a.order - b.order
        })

    }




    var School_Performance_School_Type_Reportdatanew = JSON.parse(JSON.stringify(School_Performance_School_Type_Reportdata));
    if (School_Performance_School_Type_Reportdatanew) {
        School_Performance_School_Type_Reportdatanew.map(itr => {
            if (itr["LABEL"] == "Not Reported") {
                itr["color"] = "#3A3365"
                itr["order"] = 5
            } else if (itr["LABEL"] == "Middle School") {
                itr["color"] = "#2C4089"
                itr["order"] = 2
            } else if (itr["LABEL"] == "Elementary School") {
                itr["color"] = "#2C82BE"
                itr["order"] = 1;
            } else if (itr["LABEL"] == "High School") {
                itr["color"] = "#892C69"
                itr["order"] = 3
            } else if (itr["LABEL"] == "Other Combination") {
                itr["color"] = "#129C83"
                itr["order"] = 4
            }
            else if (itr["LABEL"] == "Community School") {
                itr["color"] = "#129C83"
                itr["order"] = 6
            }
        })

        // function compareStrings(a, b) {
        //     // Assuming you want case-insensitive comparison
        //     a = a.toLowerCase();
        //     b = b.toLowerCase();

        //     return (a < b) ? -1 : (a > b) ? 1 : 0;
        //   }

        //   School_Performance_School_Type_Reportdatanew.sort(function(a, b) {
        //     return compareStrings(a.LABEL, b.LABEL);
        //   })
        // School_Performance_School_Type_Reportdatanew.slice().sort((a, b) => {
        //     return a.order - b.order
        // })
    }
    School_Performance_School_Type_Reportdatanew = School_Performance_School_Type_Reportdatanew.slice().sort((a, b) => {
        return a.order - b.order
    })
    // console.log("School_Performance_School_Type_Reportdatanew",School_Performance_School_Type_Reportdatanew)

    const [selectedmetricschool, setSelectedmetricschool] = useState(School_Performance_School_Type_Reportdatanew?.[0]?.LABEL);

    useEffect(() => {
        setSelectedmetricschool(School_Performance_School_Type_Reportdatanew?.[0]?.LABEL)
    }, [School_Performance_School_Type_Reportdatanew?.[0]?.LABEL])

    useEffect(() => {
        dispatch(fetchSchool_Performance_Fund_Type_Report({
            "elasticQueryName": "School_Performance_Fund_Type_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
        dispatch(fetchSchool_Performance_School_Type_Report({
            "elasticQueryName": "School_Performance_School_Type_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
        dispatch(fetchSchool_Performance_Metric_Report({
            "elasticQueryName": "School_Performance_School_Type_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
        if(isLoaded){
            dispatch(fetchSchool_Performance_Map_Report({
                "elasticQueryName": "School_Performance_Map_Report",
                "filters": [{
                    "columnName": "SCHOOL_YEAR",
                    "columnValue": ["2023"],
                    "excludeKeyword": false
                }],
                // "grad_filters": [{
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }, {
                //     "columnName": "MEASURE_TYPE",
                //     "columnValue": ["All"],
                //     "excludeKeyword": false
                // }],
                "dynamicColumns": [],
            }));

        }
        dispatch(fetchSchool_Performance_Pie_Chart_Report({
            "elasticQueryName": "School_Performance_Pie_Chart_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "grad_filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }, {
                "columnName": "MEASURE_TYPE",
                "columnValue": ["All"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
    }, [isLoaded])

    // useEffect(()=>{
    //     const ifameData=document.getElementById("iframeId")
    //     const lat=1.305385;
    //     const lon=30.923029;
    //     ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // })
    const navigate = useNavigate()
    const hangleLogOut = () => {

        sessionStorage.removeItem("userInfo")
        props.setUserData(null)
        navigate("/")
    }

    const BarHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-bars"></i>
            </div>
        )
    };
    const FilterHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-sliders-v"></i>
            </div>
        )
    };
    const SettingHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-cog"></i>
            </div>
        )
    };


    const [divRecord, setDivRecord] = useState("Students with >95% Attendance");
    const [divRecordschool, setDivRecordschool] = useState("Middle School");


    let School_Performance_Map_Reportdata11;
    if (School_Performance_Map_Reportdata) {
        School_Performance_Map_Reportdata11 = School_Performance_Map_Reportdata.filter((item) => {
            return item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool
            // return item.METRIC_NAME == divRecord
        }
        );
    }


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const items = School_Performance_Map_Reportdata11; // your array of items
    const totalPages = Math.ceil(items?.length / itemsPerPage);
    const handleNextClick = () => {
        setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
    };
    const handlePrevClick = () => {
        setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items?.slice(startIndex, endIndex);

    useEffect(() => {

    }, []);

    const [isvisible, setVisible] = React.useState(false);
    const onClick = () => setVisible(!isvisible)
    const [selectedone, setSelectedone] = useState('1');
    const handleClickselected = (event, h) => {
        setSelectedone(h);
        // console.log("innerText",event.target.querySelector('div:first-child:div'));
        setDivRecordschool(event.target.innerText);
        setSelectedMarker(null);
    }
    // console.log("divRecordschool",divRecordschool)


    const [selectedmetric, setSelectemetric] = useState('1');
    const handleClickmetric = (event, h) => {
        setSelectemetric(h);
        setDivRecord(event.target.innerText);
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    // useEffect(()=>{
    //     const ifameData=document.getElementById("iframeId")
    //     const lat=1.305385;
    //     const lon=30.923029;
    //     School_Performance_Map_Reportdata11.map(itr => {
    //         ifameData.src=`https://maps.google.com/maps?q=${itr.LATITUDE},${itr.LONGITUDE}&hl=es;&output=embed`
    //     })

    // })
    const [showDiv, setShowDiv] = useState(false);
    const handleTopTileFilterClick = (tile) => {
        setShowDiv(true);
    }
    const handleTopTileFilterClick1 = (tile) => {
        setShowDiv(false);
    }


    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    }

    const handleMarkerClick1 = (marker) => {
        setSelectedMarker(null);
    }

    const [selectedMarker, setSelectedMarker] = useState(null);
    //   console.log("selectedMarker",selectedMarker)

    useEffect(() => {
        let School_Performance_Pie_Chart_Reportdata11;
        if (School_Performance_Pie_Chart_Reportdata) {
            School_Performance_Pie_Chart_Reportdata11 = School_Performance_Pie_Chart_Reportdata.filter((item) => {
                // return item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool &&
                //     item.SCHOOL_OFFICIAL_NAME == selectedMarker?.SCHOOL_OFFICIAL_NAME
                if (selectedMarker) {
                    return (item?.METRIC_NAME == divRecord) && (item?.SCHOOL_ID == selectedMarker?.SCHOOL_ID)
                }
                return item.METRIC_NAME == divRecord
            }
            );
            setpieChartData(School_Performance_Pie_Chart_Reportdata11)
        }
    }, [School_Performance_Pie_Chart_Reportdata, divRecord, selectedMarker])


    useEffect(() => {
        let School_Performance_Map_Reportdata11;
        if (School_Performance_Map_Reportdata) {
            School_Performance_Map_Reportdata11 = School_Performance_Map_Reportdata.filter((item) => {
                return item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool
                // return item.METRIC_NAME == divRecord
            }
            );

            setMapData(School_Performance_Map_Reportdata11)
        }

        // let School_Performance_Pie_Chart_Reportdata11;
        // if (School_Performance_Pie_Chart_Reportdata) {
        //     School_Performance_Pie_Chart_Reportdata11 = School_Performance_Pie_Chart_Reportdata.filter((item) => {
              
        //         if (selectedMarker) {
        //             return (item?.METRIC_NAME == divRecord) && (item?.SCHOOL_ID == selectedMarker?.SCHOOL_ID)
        //         }
        //         return item.METRIC_NAME == divRecord
        //     }
        //     );
        //     setpieChartData(School_Performance_Pie_Chart_Reportdata11)
        // }
    }, [School_Performance_Map_Reportdata, divRecord, selectedMarker])
    // console.log("School_Performance_Pie_Chart_Reportdata11",School_Performance_Pie_Chart_Reportdata11)

    let uniqueEthnicity = [...new Set(pieChartData?.map(item => item["STUDENT_ETHNICITY"]))]?.sort()
    let uniqueEthnicityColors = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"]

    const StudentCenters = {
        tooltip: {
            trigger: 'item',
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
            right: '5%',
            bottom: '10%',
            top: "0%",
            containLabel: true
        },
        legend: {
            show: true,
            orient: 'horizontal',
            center: 'center',
            data: uniqueEthnicity,
            textStyle: {
                padding: [4, 20, 4, 20],
                borderRadius: 4
            },
            // right: '5%',
            // left: "60%",
            itemWidth: 8.5,
            itemHeight: 6,
            bottom: '10%',
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
                radius: ['30%', '60%'],
                center: ['50%', '40%'],

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
                data: pieChartData?.map((item) => {
                    let getIndex = uniqueEthnicity.indexOf(item?.STUDENT_ETHNICITY)
                    let color = uniqueEthnicityColors[getIndex]
                    return {
                        value: item?.VALUE, name: item?.STUDENT_ETHNICITY, itemStyle: { color }
                    }
                })
                // data : [
                //     {
                //         "value": 1,
                //         "name": "American Indian",
                //         "itemstyle": {
                //             "color": "red"
                //         }
                //     },
                //     {
                //         "value": 9,
                //         "name": "Asian",
                //         "itemstyle": {
                //             "color": "#377ab8"
                //         }
                //     },
                //     {
                //         "value": 2,
                //         "name": "Black",
                //         "itemstyle": {
                //             "color": "#377ab8"
                //         }
                //     },
                //     {
                //         "value": 49,
                //         "name": "Caucasian",
                //         "itemstyle": {
                //             "color": "#377ab8"
                //         }
                //     },
                //     {
                //         "value": 0,
                //         "name": "Native Hawaiian",
                //         "itemstyle": {
                //             "color": "#377ab8"
                //         }
                //     }
                // ]
                // data:
                //     pieChartData.map(x => {
                //         return {
                //             value: x?.VALUE,
                //             name: x?.STUDENT_ETHNICITY,
                //             itemstyle: {
                //                 color: '#377ab8',
                //             },
                //             // color : 'red'
                //         }
                //     })


                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[0]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[0]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#377ab8'
                //     }

                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[1]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[1]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#6f2e66'
                //     }
                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[2]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[2]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#2c4990'
                //     }

                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[3]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[3]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#41a5ac'
                //     }
                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[4]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[4]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#393469'
                //     }
                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[5]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[5]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#6f2e66'
                //     }
                // },
                // {
                //     value: School_Performance_Pie_Chart_Reportdata11[6]?.VALUE,
                //     name: School_Performance_Pie_Chart_Reportdata11[6]?.STUDENT_ETHNICITY,
                //     itemStyle:
                //     {
                //         color: '#359760'
                //     }
                // },

            }
        ]
    };

    console.log("StudentCenters", StudentCenters)
    const handleTopTileFilterClickmetric = (tile) => {
        console.log("selected tile",tile)
        setDivRecord(tile?.METRIC_NAME);
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    const handleTopTileFilterClick2 = (tile) => {
        setSelectedmetricschool(tile?.LABEL)
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    const SchoolType = (props) => {
        let cleanedHexColorCode = `bg-[${props?.color?.replace(/"/g, '')}] w-full flex items-center justify-between p-2 text-white rounded`
        let cleanedHexColorCode1 = `bg-[${props?.color?.replace(/"/g, '')}] w-full flex items-center justify-between p-2 text-white rounded active`
        return (
            <>
                <div onClick={() => props.clickerFunc(props?.clicker)}>
                    {
                        props?.LABEL == selectedmetricschool ?
                            props?.LABEL == "Elementary School" ?
                                <div className="bg-[#2C82BE] w-full flex items-center justify-between p-2 text-white rounded active" >
                                    <div className="text-xs">{props?.LABEL}</div>
                                    <div className="leading-none">
                                        <span className="mr-2">{props?.VALUE}</span>
                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                    </div>
                                </div> :
                                props?.LABEL == "High School" ?
                                    <div className="bg-[#892C69] w-full flex items-center justify-between p-2 text-white rounded active" >
                                        <div className="text-xs">{props?.LABEL}</div>
                                        <div className="leading-none">
                                            <span className="mr-2">{props?.VALUE}</span>
                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                        </div>
                                    </div> :
                                    props?.LABEL == "Middle School" ?
                                        <div className="bg-[#2C4089] w-full flex items-center justify-between p-2 text-white rounded active" >
                                            <div className="text-xs">{props?.LABEL}</div>
                                            <div className="leading-none">
                                                <span className="mr-2">{props?.VALUE}</span>
                                                {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                            </div>
                                        </div> :
                                        props?.LABEL == "Other Combination" ?
                                            <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded active" >
                                                <div className="text-xs">{props?.LABEL}</div>
                                                <div className="leading-none">
                                                    <span className="mr-2">{props?.VALUE}</span>
                                                    {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                </div>
                                            </div> : props?.LABEL == "Community School" ?
                                                <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                                    <div className="text-xs">{props?.LABEL}</div>
                                                    <div className="leading-none">
                                                        <span className="mr-2">{props?.VALUE}</span>
                                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                    </div>
                                                </div> : null




                            //    <div className={cleanedHexColorCode1} >
                            //    <div className="text-xs">{props?.LABEL}</div>
                            //    <div className="leading-none">
                            //        <span className="mr-2">{props?.VALUE}</span> 
                            //        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                            //   </div>
                            //  </div>

                            :
                            props?.LABEL == "Elementary School" ?
                                <div className="bg-[#2C82BE] w-full flex items-center justify-between p-2 text-white rounded" >
                                    <div className="text-xs">{props?.LABEL}</div>
                                    <div className="leading-none">
                                        <span className="mr-2">{props?.VALUE}</span>
                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                    </div>
                                </div> :
                                props?.LABEL == "High School" ?
                                    <div className="bg-[#892C69] w-full flex items-center justify-between p-2 text-white rounded" >
                                        <div className="text-xs">{props?.LABEL}</div>
                                        <div className="leading-none">
                                            <span className="mr-2">{props?.VALUE}</span>
                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                        </div>
                                    </div> :
                                    props?.LABEL == "Middle School" ?
                                        <div className="bg-[#2C4089] w-full flex items-center justify-between p-2 text-white rounded" >
                                            <div className="text-xs">{props?.LABEL}</div>
                                            <div className="leading-none">
                                                <span className="mr-2">{props?.VALUE}</span>
                                                {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                            </div>
                                        </div> :
                                        props?.LABEL == "Other Combination" ?
                                            <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                                <div className="text-xs">{props?.LABEL}</div>
                                                <div className="leading-none">
                                                    <span className="mr-2">{props?.VALUE}</span>
                                                    {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                </div>
                                            </div> : props?.LABEL == "Community School" ?
                                                <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                                    <div className="text-xs">{props?.LABEL}</div>
                                                    <div className="leading-none">
                                                        <span className="mr-2">{props?.VALUE}</span>
                                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                    </div>
                                                </div> : null


                        //      <div className={cleanedHexColorCode} >
                        //     <div className="text-xs">{props?.LABEL}</div>
                        //     <div className="leading-none">
                        //         <span className="mr-2">{props?.VALUE}</span> 
                        //         {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                        //    </div>
                        //   </div>  
                    }

                </div>
            </>
        );
    };
    const MetricTemplate = (MetricTemplate) => {
        return (
            <MetricTemplateMertic clicker={MetricTemplate} clickerFunc={handleTopTileFilterClickmetric} METRIC_ID={MetricTemplate?.METRIC_ID} METRIC_NAME={MetricTemplate?.METRIC_NAME} />
        );
    };
    const MetricTemplateMertic = (props) => {
        return (
            <>
                <div id='cardtilesCustomer' onClick={
                    () => props.clickerFunc(props.clicker)
                }>
                    <div className="flex justify-center " style={{ minHeight: 70 }}>
                        {
                            props?.METRIC_NAME == divRecord ?
                                <div className="bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] max-h-[70px] flex items-center text-center" >{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</div> :
                                <div className="bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] max-h-[70px] flex items-center text-center" >{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</div>
                        }

                    </div>
                </div>
            </>
        );
    };
    return (
        <div>
            <div className="relative z-10 w-full text-gray-700 py-4  top-0 z-10 headar-wrapper dark:bg-[#232528] dark:shadow-md">
                <div x-data="{ open: false }" className="flex flex-col mx-auto md:items-center md:justify-between md:flex-row">
                    <div className="flex flex-row items-center justify-between p-2 px-4">
                        {/* <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"> */}
                        {/* <AppLogo /> */}
                        <img src={whiteBgLogoImg} className="max-w-[250px] min-h-[65px]" />
                        {/* </Link> */}
                        <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                <path x-show="!open" fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                <path x-show="open" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <nav className="bg-[#1B1C31] py-1 hidden md:flex md:items-center md:justify-end md:flex-row">
                        <div className="flex-col items-center justify-end max-w-[350px]">
                            <h2 className="text-xl text-white text-end">School Performance</h2>
                            <p className="text-xs text-white text-end" style={{ position: "relative", left: "7px" }}>Comparative View of Key Areas Like Assessments and Behavior</p>
                        </div>

                        <div className="relative flex items-center gap-3 ml-5 profile-block" x-data="{ open: false }">
                            <div className="px-2"><button onClick={() => setVisibleRight(true)}><i className="pi pi-bars text-xl text-white"></i></button></div>
                            {/* <HRProfile /> */}
                        </div>
                    </nav>
                </div>
                <div>
                    <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>


                        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                            <TabPanel header="  " headerTemplate={BarHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[120px]">
                                    <h2 className="text-[18px] text-[#fff]">Navigation Menu</h2>
                                    <p className="text-[14px] text-[#fff]">Search through the list of Navigation menus</p>
                                </div>
                                <div className="px-3 py-3 menu">
                                    <ul onClick={handleClick1}>
                                        <li className={pagename == "/" ? "active" : ''}><Link to='/'>District at a Glance</Link></li>
                                        <li className={pagename == "/StrengthWeakness" ? "active" : ''}><Link to='/StrengthWeakness'>Strength & Weakness</Link></li>
                                        <li className={pagename == "/StudentPerformance" ? "active" : ''}><Link to='/StudentPerformance'>Student Performance & Progress</Link></li>
                                        {/* <li><Link to='/collegecareerreadiness'>College and Career Readiness</Link></li> */}
                                        {/* <li><Link to='/humanResources'>Human Resources</Link></li> */}
                                        <li className={pagename == "/enrollment" ? "active" : ''}><Link to='/enrollment'>Enrollment</Link></li>
                                        {/* <li><Link to='/districtgoals'>District Goal & Strategy</Link></li> */}
                                        <li className={pagename == "/studentbehavior" ? "active" : ''}><Link to='/studentbehavior'>Student Behaviour</Link></li>
                                        <li className={pagename == "/schoolperformance" ? "active" : ''}><Link to='/schoolperformance'>School Performance</Link></li>
                                        {/* <li><Link to='/GraduationRateAnalysis'>Graduation Rate Analysis</Link></li> */}

                                    </ul>

                                </div>

                            </TabPanel>
                            <TabPanel header="" headerTemplate={FilterHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[auto]">
                                    <h2 className="text-[18px] text-[#fff]">Filters</h2>
                                    <p className="text-[14px] text-[#fff]">Apply filters for Advanced Search</p>
                                    <FilterComponent />
                                </div>
                            </TabPanel>
                            <TabPanel header="" headerTemplate={SettingHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[120px]">
                                    <div className="text-[18px] text-[#fff] mb-3" style={{ cursor: "pointer" }} onClick={hangleLogOut}>LogOut</div>
                                    <h2 className="text-[18px] text-[#fff]">Resources</h2>
                                    {/* <p className="text-[14px] text-[#fff]">SApply filters for Advanced Search</p> */}
                                </div>
                            </TabPanel>
                        </TabView>



                    </Sidebar>
                </div>
            </div>

            <div className="fixed left-0 top-0 bottom-0 right-0">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122283.79110569143!2d74.16882735484785!3d16.708456761646506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8ea642952e42f!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1676303987916!5m2!1sen!2sin" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                {/* <iframe id="iframeId" height="100%" width="100%"></iframe> */}
                {console.log("mapData", mapData,isLoaded)}
                {isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                 
                    options={options}
                >
                    {mapData.map((location, index) => {
                        return (
                            <div>
                                {location?.METRIC_PROFICIENCY_BAND == "Chronic" ? <>
                                    <div>
                                        <Marker key={index} onClick={() => handleMarkerClick(location)} ADDRESS_1={location?.ADDRESS_1} SCHOOL_TYPE={location?.SCHOOL_TYPE} SCHOOL_GRADE_CONFIGURATION={location?.SCHOOL_GRADE_CONFIGURATION} SCHOOL_OFFICIAL_NAME={location?.SCHOOL_OFFICIAL_NAME} position={{ lat: Number(location.LATITUDE), lng: Number(location.LONGITUDE), }} icon={locationIcon1} />
                                    </div>
                                </> :
                                    location?.METRIC_PROFICIENCY_BAND == "Excellent" ? <Marker clicker={location} onClick={() => handleMarkerClick(location)} key={index} ADDRESS_1={location?.ADDRESS_1} SCHOOL_TYPE={location?.SCHOOL_TYPE} SCHOOL_GRADE_CONFIGURATION={location?.SCHOOL_GRADE_CONFIGURATION} SCHOOL_OFFICIAL_NAME={location?.SCHOOL_OFFICIAL_NAME} position={{ lat: Number(location.LATITUDE), lng: Number(location.LONGITUDE), }} icon={locationIcon} /> :
                                        location?.METRIC_PROFICIENCY_BAND == "Basic" ? <Marker clicker={location} onClick={() => handleMarkerClick(location)} key={index} ADDRESS_1={location?.ADDRESS_1} SCHOOL_TYPE={location?.SCHOOL_TYPE} SCHOOL_GRADE_CONFIGURATION={location?.SCHOOL_GRADE_CONFIGURATION} SCHOOL_OFFICIAL_NAME={location?.SCHOOL_OFFICIAL_NAME} position={{ lat: Number(location.LATITUDE), lng: Number(location.LONGITUDE), }} icon={locationIcon2} /> :
                                            null
                                }

                            </div>
                        )
                    }
                    )}

                    {selectedMarker && (
                        <div className="absolute top-2/5 left-2/4 -translate-x-2/4 z-20" style={{ position: "relative", top: "40%" }}>
                            <div className="flex justify-center">
                                <div className="rounded-full relative">
                                    <div className="bg-white p-4 rounded-lg box_sha1 arrow_box">
                                        <div className="flex justify-between gap-5">
                                            <div className="text-md fontsemibold">{selectedMarker?.SCHOOL_OFFICIAL_NAME}</div>
                                            <div
                                                onClick={handleMarkerClick1}
                                            ><Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link></div>
                                        </div>
                                        <div className="mt-1">
                                            <div className="text-[#3c474a] text-sm"><span className="font-semibold">School Type :</span> {selectedMarker?.SCHOOL_TYPE}</div>
                                            {/* <div className="text-[#3c474a] text-sm"><span className="font-semibold">Grade :</span> {selectedMarker?.SCHOOL_GRADE_CONFIGURATION}</div> */}
                                            <div className="text-[#3c474a] text-sm"><span className="font-semibold">Address :</span> {selectedMarker?.ADDRESS_1}</div>
                                        </div>
                                    </div>
                                 
                                </div>

                            </div>
                        </div>
                    )}
                    <></>
                </GoogleMap>
                    : <></>
                }
            </div>

            <div className="px-4 mt-10">
                <div className="flex items-start justify-between">
                    <div className="bg-[#181726] w-full max-w-[20%] p-1 box-sha relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="text-md text-white">School Details</div>
                            <div className="flex gap-2">
                                <div className="text-md text-white"><i className="pi pi-map-marker"></i></div>
                                {/* <div>
                                    <label class="switch"><input type="checkbox" /> <span class="slider round"></span> </label>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-5">
                            <div className="text-center">
                                <div className="w-[64px]">
                                    <img src={school_icon} alt="" />
                                </div>
                                <div className="mt-3">
                                    <div className="text-white font-semibold text-2xl leading-none">{School_Performance_School_Type_Reportdata[1]?.SUM_TOTAL}</div>
                                    <div className="text-white text-md">school</div>
                                </div>
                            </div>
                            {console.log("School_Performance_School_Type_Reportdatanew", School_Performance_School_Type_Reportdatanew)}
                            <div className="w-full space-y-1 school_tabs">
                                {
                                    School_Performance_School_Type_Reportdatanew?.map(itr => {
                                        return (
                                            <SchoolType clicker={itr} clickerFunc={handleTopTileFilterClick2} LABEL={itr?.LABEL} VALUE={itr?.VALUE} color={itr?.color} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {selectedMarker && selectedMarker ?
                        <div className="bg-[#1b1c31]  text-white border-2 border-t-[#FFC700] border-b-[#FFC700] border-l-[#FFC700] border-r-[#FFC700] w-full max-w-[20%] school_table relative z-10">
                            <p className="head">{divRecord}</p>
                            <div className="flex justify-between gap-4 px-4 py-2">
                                <div className="text-sm fontsemibold">School Information</div>
                                <div onClick={handleMarkerClick1}><Link><i className="pi pi-times f-s-9"></i></Link></div>
                            </div>
                            {/* <div className="px-5"><img src={school_campus} alt="" /></div> */}
                            <div className="text-[18px] px-5 py-1">{selectedMarker?.SCHOOL_OFFICIAL_NAME}</div>
                            <div className="text-[12px] text-white px-5"><i className="f-s-9 pi pi-flag-fill mr-1"></i>{selectedMarker?.ADDRESS_1}</div>
                            <div className="text-[10px] text-white px-5"><i className="f-s-9 pi pi-phone mr-1"></i></div>
                            <div className="flex items-center mt-2 gap-3 border-b border-white/[5] pb-2 px-5">
                                <div className="rounded overflow-hidden">
                                    <img src={avatar_head} className="max-w-[38px]" alt="" />
                                </div>
                                <div>
                                    <div className="text-xs">Principal</div>
                                    <div className="text-xs">Diane M Sanchez Aliakbarian</div>
                                </div>
                            </div>
                            <div className="StudentCenters">
                                <div className="text-xs text-white text-left pt-2">{divRecord}</div>
                                <div className="flex justify-between mt-2">
                                    <div className="flex items-center space-x-2 w-full">
                                        {/* <div className="bg-[#2acd72] w-3 h-3 rounded-full"></div> */}
                                        {
                                            selectedMarker?.METRIC_PROFICIENCY_BAND == "Chronic" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                <img src={locationIcon1} className="max-w-[38px]" alt="" />
                                            </div> :
                                                selectedMarker?.METRIC_PROFICIENCY_BAND == "Excellent" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                    <img src={locationIcon} className="max-w-[38px] icon-Img" alt="" />
                                                </div> :
                                                    selectedMarker?.METRIC_PROFICIENCY_BAND == "Basic" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                        <img src={locationIcon2} className="max-w-[38px]" alt="" />
                                                    </div> : null
                                        }
                                        <div className="text-sm">{selectedMarker?.CURRENT_PERCENTAGE}%</div>
                                    </div>
                                    <div className="text-xs text-white w-full" style={{ position: "relative", fontSize: "12px", top: "3px" }}>
                                        Target :{selectedMarker?.TARGET_PERCENTAGE}%
                                    </div>
                                    <div className="text-xs text-white w-full" style={{ position: "relative", fontSize: "12px", top: "3px" }}>
                                        Last Period :{selectedMarker?.LAST_PERIOD_PERCENTAGE}%
                                    </div>
                                </div>
                                <ReactEcharts option={StudentCenters} />
                            </div>
                        </div> :
                        <>
                            {/* <p>{divRecord}</p> */}
                            <div className="bg-[#1b1c31] text-[12px] text-white border-2 border-t-[#FFC700] border-b-[#FFC700] border-l-[#FFC700] border-r-[#FFC700] w-full max-w-[20%] school_table relative z-10">
                                <p className="head">{divRecord}</p>
                                {/* <table className="w-full" cellPadding={0} cellSpacing={0}>
                                    <tr className="bg-[#181725]">
                                        <td align="center" style={{ fontSize: "13px" }}>School Name</td>
                                        <td align="center" style={{ fontSize: "13px" }}>{divRecord}</td>
                                    </tr>
                                    {currentItems && currentItems?.map(itr => {
                                        return (
                                            <tr>
                                                <td width='60%'>{itr?.SCHOOL_OFFICIAL_NAME}</td>
                                                <td>{itr?.CURRENT_PERCENTAGE}%</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td align="center"><button className={`paginationprevious ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevClick} disabled={currentPage === 1}>Previous</button></td>
                                        <td align="center"><button className={`paginationnext ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextClick} disabled={currentPage === totalPages}>Next</button></td>
                                    </tr>
                                </table> */}
                                <SchoolPerformanceTableComponent School_Performance_Map_Reportdata={School_Performance_Map_Reportdata} divRecord={divRecord} selectedmetricschool={selectedmetricschool} />
                            </div>
                        </>

                    }




                </div>
                {console.log("School_Performance_Metric_Reportatanew", School_Performance_Metric_Reportatanew)}
                <div className="absolute left-0 right-0 bottom-6"
                //  style = {{width:"54rem",position:"relative",left:"18rem"}}
                >
                    <div className="school_per_sldr">
                        {
                            School_Performance_Metric_Reportatanew && <Carousel value={School_Performance_Metric_Reportatanew} numVisible={4} numScroll={1}
                                itemTemplate={MetricTemplate} />
                        }
                    </div>
                    {/* <Carousel value={School_Performance_Metric_Reportata} numVisible={4} numScroll={1}  itemTemplate={MetricTemplate} /> */}
                    {/* <div className="flex justify-center gap-4">
                        <div onClick={(event) => {handleClickmetric(event,'1');}} className={selectedmetric == '1'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"} >{School_Performance_Metric_Reportata[0]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'2');}} className={selectedmetric == '2'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[1]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'3');}} className={selectedmetric == '3'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[2]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'4');}} className={selectedmetric == '4'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[3]?.METRIC_NAME}</div>
                    </div> */}
                </div>
            </div>
        </div >
    )
}