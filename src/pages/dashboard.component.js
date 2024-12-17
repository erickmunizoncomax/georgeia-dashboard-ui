import React, { useEffect, useState } from "react";
import TopNav from "../components/common/topnav.component";
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDistrict_at_a_glance_top_tile
} from '../redux/slices/counter';

/******Main Fact ******/
import Assessment_icon from '../assets/images/assessment_icon.png'
import Attendance_icon from '../assets/images/attendance_icon.png'
import Graduation_icon from '../assets/images/graduation_icon.png'
import District_Ranking_icon from '../assets/images/District_Ranking_icon.png'
import Student_Behavior_icon from '../assets/images/Student_Behavior_icon.png'
import k12darklogo from '../assets/images/k12-dark-logo.png';

import Enrollment from "./dashboardtiles/enrollment.component";
import StudentCharacteristics from "./dashboardtiles/studentcharacteristics.component";
import SchoolDistrictEmployees from "./dashboardtiles/schooldistrictemployees.component";
import SchoolsCenters from "./dashboardtiles/schoolscenters.component";
import FinancialInformation from "./dashboardtiles/financialiInformation.component";


export default function Dashboard(props) {
    const dispatch = useDispatch();
    const At_A_Glance_Top_Tiledata = useSelector(state => state.netsales.District_at_a_glance_top_tile);
    console.log(At_A_Glance_Top_Tiledata, 'At_A_Glance_Top_Tiledata')

    useEffect(() => {
        dispatch(fetchDistrict_at_a_glance_top_tile({
            "elasticQueryName": "",
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
    }, [])
    // const [mainFacts, setMainFacts] = useState(dataset);
    const [mainDashboard, setMainDashboard] = useState([]);

    const timeAnalysis = (data, key) => {
        if (data && data.length) {
            let newMetric = [];
            let dataset = [];
            let new_obj = {};
            data?.forEach(obj => {
                if (newMetric.indexOf(obj[key]) == -1) {
                    new_obj = obj;
                    var index = 0;
                    data?.forEach(row => {
                        console.log(row, 'rowrow')
                        if (obj[key] == row[key]) {
                            let order = index + 1;
                            new_obj["category_" + order] = row["PERCENTAGE"]?.toFixed(1);
                            new_obj["category_label_" + order] = row["METRIC_NAME"];
                            index++;
                        }
                    });
                    dataset.push(new_obj);
                    newMetric.push(obj[key]);
                }
            });
            return dataset;
        }
    };
    function combineMetrics(data) {
        // Helper function to prefix keys
        function prefixKeys(obj, prefix) {
            let newObj = {};
            for (let key in obj) {
                newObj[`${prefix}${key}`] = obj[key];
            }
            return newObj;
        }

        // Define the transformed data array
        let transformedData = [];

        // Iterate through the input data
        data?.forEach(metric => {
            console.log(metric, 'metricnames')
            if (metric.METRIC_GROUP === "ELA Assessment") {
                // Check if we already have an Assessment group object in transformedData
                let assessmentGroup = transformedData.find(item => item.METRIC_GROUP === "Assessment");
                if (!assessmentGroup) {
                    assessmentGroup = { METRIC_GROUP: "Assessment" };
                    transformedData.push(assessmentGroup);
                }
                Object.assign(assessmentGroup, prefixKeys(metric, 'ela_'));
            } else if (metric.METRIC_GROUP === "Math Assessment") {
                // Check if we already have an Assessment group object in transformedData
                let assessmentGroup = transformedData.find(item => item.METRIC_GROUP === "Assessment");
                if (!assessmentGroup) {
                    assessmentGroup = { METRIC_GROUP: "Assessment" };
                    transformedData.push(assessmentGroup);
                }
                Object.assign(assessmentGroup, prefixKeys(metric, 'math_'));
            }
            else if (metric.METRIC_NAME === "Expulsion rate") {
                // Extra row for student behavior
                let assessmentGroup = { ...metric };
                assessmentGroup.METRIC_GROUP = assessmentGroup.METRIC_GROUP + "_copy"
                transformedData.push(assessmentGroup);
            }
            else if (metric.METRIC_NAME === "% of Referrals") {
                // Extra row for student behavior
                let assessmentGroup = { ...metric };
                assessmentGroup.METRIC_GROUP = assessmentGroup.METRIC_GROUP + "_copy"
                transformedData.push(assessmentGroup);
            }
            else if (metric.METRIC_NAME === "% of OSS") {
                // Extra row for student behavior
                let assessmentGroup = { ...metric };
                assessmentGroup.METRIC_GROUP = assessmentGroup.METRIC_GROUP + "_copy1"
                transformedData.push(assessmentGroup);
            }
            else if (metric.METRIC_NAME === "% of ISS") {
                // Extra row for student behavior
                let assessmentGroup = { ...metric };
                assessmentGroup.METRIC_GROUP = assessmentGroup.METRIC_GROUP + "_copy"
                transformedData.push(assessmentGroup);
            }
            else {
                transformedData.push(metric);
            }
        });

        return transformedData;
    }
    var alertnew = JSON.parse(JSON.stringify(combineMetrics(At_A_Glance_Top_Tiledata)));
    let aaa = alertnew?.filter(itr => itr["METRIC_NAME"] != "% of SPED - NWEA")
    let bbb = alertnew?.filter(itr => itr["METRIC_NAME"] == "% of SPED - NWEA")

    let dataset = timeAnalysis(aaa, "METRIC_GROUP");
    let dataset1 = timeAnalysis(bbb, "METRIC_NAME");

    dataset?.map(itr => {
        if (itr["METRIC_GROUP"] == "Attendance") {
            itr["img"] = "Attendance_icon"
        }
        if (itr["METRIC_GROUP"] == "Student Behavior" || itr["METRIC_GROUP"] == "Student Behavior_copy" || itr["METRIC_GROUP"] == "Student Behavior_copy1") {
            itr["img"] = "Student_Behavior_icon"
        }
        if (itr["METRIC_GROUP"] == "ELA Assessment") {
            itr["img"] = "Assessment_icon"
        }
        if (itr["METRIC_GROUP"] == "Assessment") {
            itr["img"] = "Assessment_icon"
        }
        if (itr["METRIC_GROUP"] == "Math Assessment") {
            itr["img"] = "Assessment_icon"
        }
    })

    let datasetnew;
    if (dataset1?.length > 0) {
        datasetnew = dataset?.concat(dataset1);
    } else {
        datasetnew = dataset;
    }

    datasetnew?.map(itr => {
        if (itr["METRIC_GROUP"] == "Enrollment") {
            itr["ORDER"] = 5
        }
        if (itr["METRIC_GROUP"] == "Attendance") {
            itr["ORDER"] = 1
        }
        if (itr["METRIC_GROUP"] == "Student Behavior") {
            itr["ORDER"] = 2
        }
        if (itr["METRIC_GROUP"] == "Student Behavior_copy") {
            itr["ORDER"] = 2
            //Renaming the Student Behavior
            itr["METRIC_GROUP"] = itr["METRIC_GROUP"].replace("_copy", "")
        }
        if (itr["METRIC_GROUP"] == "Student Behavior_copy1") {
            itr["ORDER"] = 2
            //Renaming the Student Behavior
            itr["METRIC_GROUP"] = itr["METRIC_GROUP"].replace("_copy1", "")
        }
        if (itr["METRIC_GROUP"] == "Assessment") {
            itr["ORDER"] = 3
        }
        if (itr["METRIC_GROUP"] == "Science Assessment") {
            itr["ORDER"] = 4
        }
        if (itr["METRIC_GROUP"] == "ELA Assessment" && itr["METRIC_ID"] == 10092) {
            itr["ORDER"] = 6
        }
        if (itr["METRIC_GROUP"] == "ELA Assessment" && itr["METRIC_ID"] == 10093 || itr["METRIC_ID"] == 10096) {
            itr["ORDER"] = 7
        }
        if (itr["METRIC_GROUP"] == "Math Assessment") {
            itr["ORDER"] = 8
        }
        if (itr["METRIC_GROUP"] == "Assessment - STAAR") {
            itr["ORDER"] = 9
        }
        if (itr["METRIC_GROUP"] == "Reading Assessment - STAAR") {
            itr["ORDER"] = 10
        }
        if (itr["METRIC_GROUP"] == "STAAR Assessment") {
            itr["ORDER"] = 11
        }
        if (itr["METRIC_GROUP"] == "Math Assessment - STAAR") {
            itr["ORDER"] = 12
        }
    })


    if (datasetnew) {
        datasetnew = datasetnew.slice().sort((a, b) => {
            return a.ORDER - b.ORDER
        })
    }

    console.log(datasetnew, 'datasetnew')

    /********Main Fact **********/
    const responsiveOptions = [

        {
            breakpoint: '1441px',
            numVisible: 5,
            numScroll: 4
        },
        {
            breakpoint: '1600px',
            numVisible: 5,
            numScroll: 4
        },
        {
            breakpoint: '1439px',
            numVisible: 5,
            numScroll: 5
        },
        {
            breakpoint: '1200px',
            numVisible: 4,
            numScroll: 4
        },

        {
            breakpoint: '865px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    // const mainFactservice = {
    //     getmainFactsData() {
    //         return dataset;
    //     },

    //     getmainFactsSmall() {
    //         return Promise.resolve(this.getmainFactsData()?.slice(0, 10));
    //     },

    // };
    /********Main Fact end **********/
    /********main Dashboard**********/
    const mainDashboardservice = {
        getmainDashboardData() {
            return [
                {
                    "silder": <Enrollment />
                },
                {
                    "silder": <StudentCharacteristics />
                }
                ,
                {
                    "silder": <SchoolDistrictEmployees />
                }
                ,
                {
                    "silder": <SchoolsCenters />
                }
                ,
                {
                    "silder": <FinancialInformation />
                }
            ];
        },

        getmainDashboardSmall() {
            return Promise.resolve(this.getmainDashboardData().slice(0, 10));
        },

    };
    /******** mainDashboard end **********/

    useEffect(() => {
        // mainFactservice.getmainFactsSmall().then((data) => setMainFacts(dataset));
        mainDashboardservice.getmainDashboardSmall().then((data) => setMainDashboard(data.slice(0, 9)));

    }, []);

    const MainFactsTemplate = (mainFacts) => {
        console.log(mainFacts, 'mainFacts')
        return (
            <>
                {mainFacts.METRIC_GROUP != 'Assessment' ?
                    <div className="product-item">
                        <div className="mnfcts-carimg product-item-content bg-[#0e1b28]  min-h-[125px]" style={{ marginRight: "7px" }}>
                            <div className="bg-[#0c1b28]">
                                <div className="p-2 flex gap-5">
                                    <div >
                                        {
                                            mainFacts?.METRIC_GROUP == "Attendance" ? <img src={Attendance_icon} alt='' className="w-[40px] h-[42px]" /> :
                                                mainFacts?.METRIC_GROUP == "Student Behavior" ? <img src={Student_Behavior_icon} alt='' className="w-[40px] h-[42px]" /> :
                                                    //    <img src={mainFacts?.img} alt='' className="w-[40px] h-[42px]" />
                                                    <img src={Assessment_icon} alt='' className="w-[40px] h-[42px]" />
                                        }
                                        {/* // <img src={mainFacts?.img} alt='' className="w-[40px] h-[42px]" /> */}
                                    </div>
                                    <div>
                                        <p className="text-[12px] text-[#fff] " style={{ top: "10px", position: "relative", fontSize: "15px", }}>{mainFacts?.METRIC_GROUP != "Enrollment" ? mainFacts?.METRIC_GROUP : "Graduation"}</p>
                                        {/* <p className="text-[12px] text-[#fff] " style={{top: "10px",position: "relative",fontSize: "15px",}}>Graduation</p> */}
                                        {/* <h2 className="text-[18px] text-[#fff]">{mainFacts.title}</h2> */}
                                    </div>
                                </div>

                            </div>
                            <div className="bg-[#0c1b28]">
                                <div className="flex p-2 grid grid-cols-12 gap-3 mt-3] h-[67px] py-0">
                                    {
                                        mainFacts?.category_label_1 != "# of Graduates" ?
                                            <div className=" col-span-6 max-h-[70px] overflow-hidden">
                                                <p className="text-[10.5px] text-[#fff] "> {mainFacts?.category_label_1}</p>
                                                {
                                                    (() => {
                                                        let category_1 = Number(mainFacts?.category_1)
                                                        if (mainFacts?.METRIC_GROUP == "Attendance") {
                                                            return (
                                                                <>
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {isNaN(Number(mainFacts?.category_1)) || Number(mainFacts?.category_1) == undefined ? "-" : Number(mainFacts?.category_1).toFixed(2)}{mainFacts?.METRIC_SUFFIX}
                                                                    </p>
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <>
                                                                    {/* <p className="text-[12.5px] text-[#fff] font-semibold"> {category_1 != 0 ? `${category_1?.toFixed(2)} ${mainFacts?.METRIC_SUFFIX}` : '--'}</p> */}
                                                                    {/* <p className="text-[12.5px] text-[#fff] font-semibold"> {category_1 != 0 ? `${category_1?.toFixed(2)}${mainFacts?.METRIC_SUFFIX}` : '-%'}</p> */}
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {category_1 != 0 ?
                                                                            mainFacts?.METRIC_NAME === 'Total Incidents'
                                                                                ? `${Math.round(category_1).toLocaleString()}${mainFacts?.METRIC_SUFFIX}`
                                                                                : `${category_1?.toFixed(2)}${mainFacts?.METRIC_SUFFIX}`
                                                                            : '-%'
                                                                        }
                                                                    </p>

                                                                </>
                                                            )
                                                        }
                                                    })()
                                                }

                                            </div> : null}
                                    <div className="col-span-6 max-h-[70px] overflow-hidden">
                                        <p className="text-[10.5px] text-[#fff]  "> {mainFacts?.METRIC_GROUP != "Enrollment" ? mainFacts?.category_label_2 : "Graduation Rate"}</p>
                                        {
                                            (() => {
                                                let PERCENTAGE = isNaN(Number(mainFacts?.PERCENTAGE)) || mainFacts?.PERCENTAGE === null ? '-' : Number(mainFacts.PERCENTAGE);
                                                let category2Value = isNaN(Number(mainFacts?.category_2)) ? 0 : Number(mainFacts.category_2);

                                                if (mainFacts?.METRIC_GROUP !== "Enrollment") {
                                                    if (mainFacts?.category_label_2 !== undefined) {
                                                        if (mainFacts?.METRIC_GROUP === "Attendance") {
                                                            return (
                                                                <>
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {/* {!isNaN(category2Value) ? `${category2Value.toFixed(2)}%` : ''} */}
                                                                        {isNaN(category2Value) ? "-" : `${category2Value?.toFixed(2)}${mainFacts?.METRIC_SUFFIX}`}

                                                                    </p>
                                                                </>
                                                            );
                                                        } else {
                                                            return (
                                                                <>
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {category2Value !== 0 ? (!isNaN(category2Value) ? `${category2Value.toFixed(2)}%` : '') : '-'}
                                                                    </p>
                                                                </>
                                                            );
                                                        }
                                                    } else {
                                                        return null;
                                                    }
                                                } else {
                                                    return (
                                                        <>
                                                            <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                {!isNaN(PERCENTAGE) ? `${PERCENTAGE?.toFixed(2)}%` : ''}
                                                            </p>
                                                        </>
                                                    );
                                                }
                                            })()
                                        }
                                    </div>

                                    {mainFacts?.category_label_1 === "# of Graduates" ?
                                        <div className="col-span-6 max-h-[70px] overflow-hidden">
                                            <p className="text-[10.5px] text-[#fff]  "> {mainFacts?.category_label_2}</p>
                                            {
                                                (() => {
                                                    let category2Value = Number(mainFacts?.category_2);
                                                    return (
                                                        <p className="text-[12.5px] text-[#fff] font-semibold">
                                                            {!isNaN(category2Value) ? `${category2Value.toFixed(2)}%` : ''}
                                                        </p>
                                                    );
                                                })()
                                            }
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="product-item">
                        <div className="mnfcts-carimg product-item-content bg-[#0e1b28]  min-h-[125px]" style={{ marginRight: "7px" }}>
                            <div className="bg-[#0c1b28]">
                                <div className="p-2 flex gap-5">
                                    <div >
                                        <img src={Assessment_icon} alt='' className="w-[40px] h-[42px]" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] text-[#fff] " style={{ top: "10px", position: "relative", fontSize: "15px", }}>Assessment</p>
                                    </div>
                                </div>

                            </div>
                            <div className="bg-[#0c1b28]">
                                <div className="flex p-3 grid grid-cols-12 gap-3 h-[67px] py-0">

                                    <div className=" col-span-6 max-h-[70px] overflow-hidden">
                                        <p className="text-[10.5px] text-[#fff] "> {mainFacts?.math_METRIC_NAME}</p>
                                        {
                                            (() => {
                                                if (mainFacts?.METRIC_GROUP == "Attendance") {
                                                    return (
                                                        <>
                                                            <p className="text-[12.5px] text-[#fff] font-semibold"> {mainFacts?.math_METRIC_NAME}</p>
                                                        </>
                                                    )
                                                } else {
                                                    return (
                                                        <>
                                                            {/* <p className="text-[12.5px] text-[#fff] font-semibold"> {mainFacts?.math_PERCENTAGE?.toFixed(2)}{mainFacts?.math_METRIC_SUFFIX}</p> */}
                                                            <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                {isNaN(mainFacts?.math_PERCENTAGE) || mainFacts?.math_PERCENTAGE === undefined ? '-' : `${mainFacts.math_PERCENTAGE?.toFixed(2)}${mainFacts?.math_METRIC_SUFFIX}`}
                                                            </p>
                                                        </>
                                                    )
                                                }
                                            })()
                                        }

                                    </div>
                                    <div className="col-span-6 max-h-[70px] overflow-hidden">
                                        {/* <p className="text-[12px] text-[#fff]  "> {mainFacts?.category_label_2}</p> */}
                                        <p className="text-[10.5px] text-[#fff]  "> {mainFacts?.METRIC_GROUP != "Enrollment" ? mainFacts?.ela_METRIC_NAME : "Graduation Rate"}</p>
                                        {/* <p className="text-[12px] text-[#fff]  ">{mainFacts?.METRIC_NAME} </p> */}
                                        {
                                            (() => {
                                                if (mainFacts?.METRIC_GROUP != "Enrollment") {
                                                    if (mainFacts?.ela_METRIC_NAME != undefined) {
                                                        if (mainFacts?.METRIC_GROUP == "Attendance") {
                                                            return (
                                                                <>
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {isNaN(mainFacts?.category_2) || mainFacts?.category_2 === undefined ? '-' : `${mainFacts.category_2}%`}
                                                                    </p>
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <>
                                                                    <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                        {isNaN(mainFacts?.ela_PERCENTAGE) || mainFacts?.ela_PERCENTAGE === undefined ? '-' : `${mainFacts.ela_PERCENTAGE?.toFixed(2)}%`}
                                                                    </p>
                                                                </>
                                                            )
                                                        }

                                                    } else {
                                                        return null;
                                                    }
                                                } else if (mainFacts?.METRIC_GROUP == "Attendance") {
                                                    return (
                                                        <>
                                                            {/* <p className="text-[12.5px] text-[#fff] font-semibold"> {mainFacts?.category_2}%</p> */}
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <>
                                                            <p className="text-[12.5px] text-[#fff] font-semibold">
                                                                {isNaN(mainFacts?.PERCENTAGE) || mainFacts?.PERCENTAGE === undefined ? '-' : `${mainFacts?.PERCENTAGE?.toFixed(2)}%`}
                                                            </p>

                                                        </>
                                                    )
                                                }
                                            })()
                                        }
                                        {/* {mainFacts?.METRIC_GROUP != "Enrollment" ? mainFacts?.category_label_2 != undefined ?  <p className="text-[12.5px] text-[#fff] font-semibold"> {mainFacts?.PERCENTAGE?.toFixed(2)}%</p> : ""  : <p className="text-[12.5px] text-[#fff] font-semibold"> {mainFacts?.PERCENTAGE?.toFixed(2)}%</p>} */}
                                    </div>
                                    {/* <div className="col-span-6 max-h-[70px] overflow-hidden">
                                <p className="text-[12px] text-[#fff] "> {mainFacts?.category_label_3}</p>
                                {mainFacts?.category_3 && <p className="text-[14px] text-[#fff] font-semibold"> {mainFacts?.category_3}{mainFacts?.METRIC_SUFFIX}</p>}
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>}
            </>
        );
    };

    const mainDashboardTemplate = (mainDashboard) => {
        return (
            <div className="product-item">
                <div className="bg-[#081630] h-full product-item-content ">
                    <div>
                        {mainDashboard.silder}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="pt-0 dashboard">
            <TopNav pagename="District at a Glance" pagenamedescription="Key Facts about the District" setUserData={props.setUserData} />
            <div className="mb-20 main-facts">
                <div className="px-10 mb-20">
                    <div class="main_facts_title">
                        <h6 className="text-[1em] text-[#fff] pt-1">Main Facts</h6>
                        <p className="text-[12px] text-[#fff]">The scorecard reflects the District's position in the key measurement areas</p>
                    </div>
                    <div className="mt-2 mb-5 relative">
                        {
                            datasetnew && <Carousel value={datasetnew} numVisible={5} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={MainFactsTemplate} />
                        }

                    </div>
                </div>
            </div>
            <div className="px-10 pb-5 mt-10">
                <div className="mt-10 dashboard-silder dash-slid-img">
                    {/* <Carousel value={mainDashboard} numVisible={5} numScroll={1}
                     responsiveOptions={responsiveOptions} itemTemplate={mainDashboardTemplate} /> */}
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={8}
                        slidesPerView={4}
                        navigation
                        breakpoints={{
                            500: {
                                slidesPerView: 2
                            },
                            865: {
                                slidesPerView: 3
                            },
                            1200: {
                                slidesPerView: 4
                            },
                            1281: {
                                slidesPerView: 5
                            },
                            1441: {
                                slidesPerView: 5
                            },
                            1500: {
                                slidesPerView: 5
                            }
                        }}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        <SwiperSlide> <Enrollment /></SwiperSlide>
                        <SwiperSlide> <StudentCharacteristics /></SwiperSlide>
                        <SwiperSlide> <SchoolDistrictEmployees /></SwiperSlide>
                        <SwiperSlide> <SchoolsCenters /></SwiperSlide>
                        <SwiperSlide> <FinancialInformation /></SwiperSlide>

                    </Swiper>
                </div>
            </div>
            <div className="flex justify-end py-2">
                <img src={k12darklogo} height="50px" width="130px" alt="logo" />
            </div>
        </div>
    )
}