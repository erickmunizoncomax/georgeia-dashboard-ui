import React, { useEffect, useMemo, useState } from "react";
import caretup from "../assets/images/caret-up.png";
import caretdown from "../assets/images/caret-down.png";
import { Dropdown } from 'primereact/dropdown';
import { ProductService } from '../service/ProductService';
import 'primeicons/primeicons.css';
import ReactEcharts from "echarts-for-react";
import TopNav from "../components/common/topnav.component";
import ProgressBar from "@ramonak/react-progress-bar";
import students from "../assets/images/student_image.png";
import Studentgrp from "../assets/images/student_image_1.png";
import school from "../assets/images/interschool_image.png";
import RightArrow from "../assets/images/right-arrow.png";
import k12darklogo from '../assets/images/k12-dark-logo.png';
import student_avatar_man from "../assets/images/student_avatar_man.png";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchEnrollment, fetchSpecial_Group, fetchEthnicity_Mix, fetchSPED_Enrollment, fetchNet_Movement, fetchGraduation_To_KG_Enrollment_Ratio,
    fetchInter_School_Conversion, fetchSchools_Biggest_Gainers, fetchSchools_Biggest_Losers, fetchTime_Analysis, fetchEnrollment_Time_Analysis,
    fetchEnrollment_Summary_By_Dimensions, fetchAverage_Class_Size,
    fetchEnrollment_Projections
} from '../redux/slices/enrollment';
import HorizontalStackBars from "../components/common/horizontalstackbars";
import LoaderContainer from "../components/loaderContainer";

export default function StrengthWeakness(props) {

    const options = [
        { name: 'Enrollment', value: 'All' },
        { name: 'Grade Level', value: 'Grade' },
        { name: 'Ethnicity', value: 'Ethnicity' },
        { name: 'Gender', value: 'Gender' },
        // { name: 'Homeless', value: 'student_homeless' },
        // { name: 'ELL', value: 'student_ell' },
        // { name: 'Special Ability', value: 'student_special_ability' },
        // { name: 'Language Classification', value: 'student_language_classification' }
    ];
    const [enrollment, setEnrollment] = useState("Ethnicity");
    sessionStorage.setItem("enrollmentdimension", enrollment);
    const dispatch = useDispatch();
    const Enrollmentdata = useSelector(state => state.enrollment.Enrollment);
    const Enrollment_Projectionsdata = useSelector(state => state.enrollment.Enrollment_Projections);
    const Enrollmentdataloading = useSelector(state => state.enrollment.Enrollmentloading);
    const Special_Groupdata = useSelector(state => state.enrollment.Special_Group);
    const Special_Groupdataloading = useSelector(state => state.enrollment.Special_Grouploading);
    const Ethnicity_Mixdata = useSelector(state => state.enrollment.Ethnicity_Mix);
    const Ethnicity_Mixdataloading = useSelector(state => state.enrollment.Ethnicity_Mixloading);
    const SPED_Enrollmentdata = useSelector(state => state.enrollment.SPED_Enrollment);
    const SPED_Enrollmentdataloading = useSelector(state => state.enrollment.SPED_Enrollmentloading);
    const Net_Movementdata = useSelector(state => state.enrollment.Net_Movement);
    const Net_Movementdataloading = useSelector(state => state.enrollment.Net_Movementloading);
    const Graduation_To_KG_Enrollment_Ratiodata = useSelector(state => state.enrollment.Graduation_To_KG_Enrollment_Ratio);
    const Graduation_To_KG_Enrollment_Ratiodataloading = useSelector(state => state.enrollment.Graduation_To_KG_Enrollment_Ratioloading);
    const Inter_School_Conversiondata = useSelector(state => state.enrollment.Inter_School_Conversion);
    const Inter_School_Conversiondataloading = useSelector(state => state.enrollment.Inter_School_Conversionloading);
    const Schools_Biggest_Gainersdata = useSelector(state => state.enrollment.Schools_Biggest_Gainers);
    const Schools_Biggest_Gainersdataloading = useSelector(state => state.enrollment.Schools_Biggest_Gainersloading);
    const Schools_Biggest_Losersdata = useSelector(state => state.enrollment.Schools_Biggest_Losers);
    const Schools_Biggest_Losersdataloading = useSelector(state => state.enrollment.Schools_Biggest_Losersloading);
    const Time_Analysisdata = useSelector(state => state.enrollment.Time_Analysis);
    const Time_Analysisdataloading = useSelector(state => state.enrollment.Time_Analysisloading);
    const Enrollment_Time_Analysisdata = useSelector(state => state.enrollment.Enrollment_Time_Analysis);
    const Enrollment_Time_Analysisdataloading = useSelector(state => state.enrollment.Enrollment_Time_Analysisloading);
    const Enrollment_Summary_By_Dimensionsdata = useSelector(state => state.enrollment.Enrollment_Summary_By_Dimensions);
    const Enrollment_Summary_By_Dimensionsdataloading = useSelector(state => state.enrollment.Enrollment_Summary_By_Dimensionsloading);

    // Average Class Size
    const Average_Class_Sizedata = useSelector(state => state.enrollment.Average_Class_Size);
    const Average_Class_Sizedataloading = useSelector(state => state.enrollment.Average_Class_Sizeloading);

    console.log("Enrollment_Summary_By_Dimensionsdata", Enrollment_Summary_By_Dimensionsdata)
    // console.log("Enrollment_Time_Analysisdata",Enrollment_Time_Analysisdata)
    useEffect(() => {
        dispatch(fetchEnrollment({
            "elasticQueryName": "Enrollment",
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
            //   "userEmail": 'Test.PBI@redingtongroup.com'
        }));

        dispatch(fetchEnrollment_Projections({
            "elasticQueryName": "",
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
            //   "userEmail": 'Test.PBI@redingtongroup.com'
        }));

        dispatch(fetchSpecial_Group({
            "elasticQueryName": "Special_Group",
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
        dispatch(fetchEthnicity_Mix({
            "elasticQueryName": "Ethnicity_Mix",
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
        dispatch(fetchSPED_Enrollment({
            "elasticQueryName": "SPED_Enrollment",
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
        dispatch(fetchNet_Movement({
            "elasticQueryName": "Net_Movement",
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
        dispatch(fetchGraduation_To_KG_Enrollment_Ratio({
            "elasticQueryName": "Graduation_To_KG_Enrollment_Ratiodata",
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
        dispatch(fetchInter_School_Conversion({
            "elasticQueryName": "Inter_School_Conversion",
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

        dispatch(fetchSchools_Biggest_Gainers({
            "elasticQueryName": "Schools_Biggest_Gainers",
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

        dispatch(fetchSchools_Biggest_Losers({
            "elasticQueryName": "Schools_Biggest_Losers",
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

        dispatch(fetchTime_Analysis({
            "elasticQueryName": "Time_Analysis",
            "filters": [],
            "dynamicColumns": [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }));

        dispatch(fetchEnrollment_Time_Analysis({
            "elasticQueryName": "Enrollment_Time_Analysis",
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

        // dispatch(fetchEnrollment_Summary_By_Dimensions({
        //     "elasticQueryName": "Enrollment_Summary_By_Dimensions",
        //     "filters": [
        //     ],
        //     "dynamicColumns": [{ columnName: "#{dimension}", columnValue: ["student_gender"]}],
        // }));

        dispatch(fetchAverage_Class_Size({
            "elasticQueryName": "",
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
        }))

    }, [])
    useEffect(() => {
        const handleBeforeUnload = () => {
            window.sessionStorage.removeItem('enrollmentdimension');
            window.sessionStorage.removeItem('allfilter');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    var defaultallfilter = JSON.parse(sessionStorage.getItem("allfilter"));

    useEffect(() => {
        let body;
        if (defaultallfilter) {
            body = {
                "elasticQueryName": "",
                "filters": defaultallfilter.filters,

                "dynamicColumns": [{
                    "columnName": "#{sort}",
                    "columnValue": "State",
                    "excludeKeyword": false
                }, {
                    "columnName": "#{dimension}",
                    "columnValue": enrollment,
                    "excludeKeyword": false
                }],
                "pivotConfig": [],
            };
        } else {
            body = {
                "elasticQueryName": "",
                "filters": [{
                    "columnName": "SCHOOL_YEAR",
                    "columnValue": "2023",
                    "excludeKeyword": false
                }],

                "dynamicColumns": [{
                    "columnName": "#{sort}",
                    "columnValue": "State",
                    "excludeKeyword": false
                }, {
                    "columnName": "#{dimension}",
                    "columnValue": enrollment,
                    "excludeKeyword": false
                }],
                "pivotConfig": [],
            };
        }
        handleenrollment(body)
    }, [enrollment]);

    /* Obsereve Screen Width */
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
    /*  */

    const handleenrollment = (body) => {
        dispatch(fetchEnrollment_Summary_By_Dimensions(body));
    }

    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 5,
            numScroll: 5
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    }, []);

    const timeAnalysis = (data, key) => {
        if (data && data.length) {
            let newMetric = [];
            let dataset = [];
            let new_obj = {};
            data.forEach(obj => {
                if (newMetric.indexOf(obj[key]) == -1) {
                    new_obj = obj;
                    var index = 0;
                    data.forEach(row => {
                        if (obj[key] == row[key]) {
                            let order = index + 1;
                            new_obj["category_" + order] = row["ENROLL_NUM"];
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
    var alertnew = JSON.parse(JSON.stringify(Time_Analysisdata));
    let dataset = timeAnalysis(alertnew, "SCHOOL_YEAR");
    if (dataset) {
        dataset = dataset.slice().sort((a, b) => {
            return a.SCHOOL_YEAR - b.SCHOOL_YEAR
        })
    }
    console.log("dataset", dataset)

    let new_arr = [];
    if (Enrollment_Summary_By_Dimensionsdata) {
        Enrollment_Summary_By_Dimensionsdata.forEach(n => {
            let isExist = false;

            new_arr.forEach(obj => {
                if (obj.DIMENSION_NAME == n.DIMENSION_NAME) {
                    obj.sum_total = obj.sum_total + n.VALUE;
                    isExist = true;
                }
            });

            if (!isExist) {
                new_arr.push({
                    DIMENSION: n.DIMENSION_NAME,
                    sum_total: n.VALUE,
                    VARIANCE: n.VARIANCE,
                    // DIMENSION_NAME: n.DIMENSION_NAME
                });
            }
        });

        //   let maxCallback = (acc, cur) => Math.max(acc, cur);
        //   let maxValue = new_arr.map(el => el.sum_total).reduce(maxCallback);
        let maxCallback = (acc, cur) => Math.max(acc, cur);
        let maxValue = new_arr.map(el => el.sum_total);
        (new_arr || []).forEach(r => {
            r.sum_avg = (r.sum_total / maxValue) * 100;
        });

        new_arr.sort((a, b) => {
            return b.sum_avg - a.sum_avg;
        });

        console.log("new_arr", new_arr)
    }

    const biggestGainers = Schools_Biggest_Gainersdata?.map((item) => item?.VALUE);
    console.log(biggestGainers, 'biggestGainers')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const items = new_arr; // your array of items
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
    const MinMaxValue_currentItems = (arr => {
        const min = Math.min(...arr);           // Find the minimum value
        const max = Math.max(...arr);           // Find the maximum value
        const secondMin = Math.min(...arr.filter(x => x !== min));  // Second minimum value
        const secondMax = Math.max(...arr.filter(x => x !== max));  // Second maximum value

        // Custom rounding function to adjust the minimum value
        function CustomroundminNumber(num) {
            const length = num.toString().length;
            const factor = Math.pow(10, length - 1);
            return Math.floor(num / factor) * factor; // Round down to nearest factor
        }

        // Custom function to determine the max value based on second min and max
        function CustomMaxNumber() {
            return secondMax === secondMin ? max : secondMax + secondMin;
        }

        return {
            min: CustomroundminNumber(min),
            max: CustomMaxNumber()
        };
    });

    let totalArray = new_arr.map(x => x?.sum_total);

    const minMaxValueForAllTheCharts = MinMaxValue_currentItems(totalArray);

    const schoolGainers = Schools_Biggest_Gainersdata?.map((item) => item?.VALUE)
    console.log(schoolGainers, 'schoolGainers')
    const schoolLosers = Schools_Biggest_Losersdata?.map((item) => item?.VALUE)

    const minMaxValueForGainers = MinMaxValue_currentItems(biggestGainers);
    console.log(minMaxValueForGainers, 'minMaxValueForGainers')

    const minMaxValueForSchoolGainers = MinMaxValue_currentItems(schoolGainers);
    console.log(minMaxValueForSchoolGainers, 'minMaxValueForSchoolGainers')
    const minMaxValueForSchoolLosers = MinMaxValue_currentItems(schoolLosers);


    console.log("dataset", dataset)
    const unique = [...new Set(dataset?.map(item => item["METRIC_NAME"]))]
    console.log("unique", unique)

    let series = []

    unique?.forEach(element => {
        series.push({
            name: element == 'Total enrollment' ? 'Total Enrollment' : element,
            type: 'bar',
            stack: element,
            barWidth: "30%",
            color: '#2C83C1',
            data: element === "Loss count" ? dataset?.map(itr => itr.category_2) : dataset?.map(itr => itr.category_1),
            emphasis: {
                focus: 'series'
            },
            itemStyle: {
                borderRadius: 8,
                // normal: {
                //     barBorderRadius: [2, 2, 2, 2],
                // }
            }
        },)
    })

    console.log("series", series)

    const CollectionTrend = {
        title: {},
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
        legend: {
            // left: '5%',
            // bottom: '0%',
            type: "plain",
            show: true,
            bottom: 0,
            left: '10%',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        },
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
            right: '5%',
            bottom: '10%',
            top: "10%",
            containLabel: true
        },
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                // min: 0,
                // max: 80000,
                // interval: 20000,
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
            data: Time_Analysisdata?.map(itr => itr.SCHOOL_YEAR),
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            },
        },
        // series: series
        series: [
            {
                name: 'Total enrollment',
                type: 'bar',
                stack: 'Total enrollment',
                barWidth: "30%",
                color: '#2C83C1',
                data: Time_Analysisdata?.map(itr => itr.VALUE),
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 8,
                    // normal: {
                    //     barBorderRadius: [2, 2, 2, 2],
                    // }
                }
            },
            // {
            //     name: 'Loss count',
            //     type: 'bar',
            //     stack: 'Loss count',
            //     barWidth: "30%",
            //     // barBorderRadius:"20px",
            //     color: '#129C83',
            //     data: dataset?.map(itr => itr.category_2),
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     itemStyle: {
            //         // normal: {
            //         //     barBorderRadius: [2, 2, 2, 2],
            //         // }
            //         borderRadius: 8,
            //     }
            // },


        ]
    };

    console.log("CollectionTrend", CollectionTrend)
    // const SpecialGroups = {
    //     title: {},
    //     tooltip: {
    //         trigger: 'item',
    //         backgroundColor: 'rgba(50,50,50,0.7)',
    //         borderColor: "#333",
    //         textStyle: {
    //             fontSize: 12,
    //             fontWeight: "normal",
    //             color: '#fff',
    //         },
    //         axisPointer: {
    //             type: 'shadow'
    //         }

    //     },

    //     grid: {
    //         // left: -50,
    //         bottom: '0%',
    //         top: "20%",
    //         containLabel: true
    //     },
    //     legend: {
    //         orient: 'horizontal',
    //         // right: "-2%",
    //         left: "-2%",
    //         bottom: 'bottom',
    //         itemWidth: 6,
    //         itemHeight: 6,
    //         // top: '70%',
    //         // width:'220',
    //         itemGap: 4,
    //         textStyle: {
    //             color: "#fff",
    //             fontSize: '8',
    //             fontStyle: 'normal',

    //         }
    //     },
    //     series: [
    //         {
    //             name: 'Access From',
    //             type: 'pie',
    //             radius: '50%',
    //             avoidLabelOverlap: true,
    //             label: {
    //                 show: true,
    //                 position: 'left',
    //                 formatter: '{d}%',
    //                 position: 'inside',
    //                 textStyle: {
    //                     fontSize: '8',
    //                     color: "#fff"
    //                 }
    //             },
    //             emphasis: {
    //                 label: {
    //                     show: true,
    //                     fontSize: 9,
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             labelLine: {
    //                 show: false
    //             },
    //             data: [
    //                 {
    //                   value: Special_Groupdata[0]?.VALUE,
    //                   name: Special_Groupdata[0]?.KEY,
    //                   itemStyle:
    //                   {
    //                     color: '#377ab8'
    //                   }
    //                 },
    //                 {
    //                   value: Special_Groupdata[1]?.VALUE,
    //                   name: Special_Groupdata[1]?.KEY,
    //                   itemStyle:
    //                   {
    //                     color: '#6f2e66'
    //                   }
    //                 },
    //                 {
    //                   value: Special_Groupdata[2]?.VALUE,
    //                   name: Special_Groupdata[2]?.KEY,
    //                   itemStyle:
    //                   {
    //                     color: '#2c4990'
    //                   }
    //                 },
    //                 {
    //                   value: Special_Groupdata[3]?.VALUE,
    //                   name: Special_Groupdata[3]?.KEY,
    //                   itemStyle:
    //                   {
    //                     color: '#41a5ac'
    //                   }
    //                 },
    //               ]
    //         }
    //     ]
    // };
    // const EthnicityMix = {
    //     tooltip: {
    //         trigger: 'item',
    //         backgroundColor: 'rgba(50,50,50,0.7)',
    //         borderColor: "#333",
    //         textStyle: {
    //             fontSize: 12,
    //             fontWeight: "normal",
    //             color: '#fff',
    //         },
    //         axisPointer: {
    //             type: 'shadow'
    //         }

    //     },
    //     legend: {
    //         orient: 'horizontal',
    //         // right: "-2%",
    //         itemGap: 4,
    //         left: "-2%",
    //         bottom: 'bottom',
    //         itemWidth: 6,
    //         itemHeight: 6,
    //         // top: '70%',
    //         // width: '250',

    //         textStyle: {
    //             color: "#fff",
    //             fontSize: '8',
    //             fontStyle: 'normal',

    //         }
    //     },
    //     series: [
    //         {
    //             name: 'Access From',
    //             type: 'pie',
    //             radius: ['20%', '50%'],
    //             avoidLabelOverlap: false,
    //             label: {
    //                 show: true,
    //                 position: 'left',
    //                 formatter: '{d}%',
    //                 position: 'inside',
    //                 textStyle: {
    //                     fontSize: '8',
    //                     color: "#fff"
    //                 }
    //             },
    //             emphasis: {
    //                 label: {
    //                     show: true,
    //                     fontSize: 9,
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             labelLine: {
    //                 show: false
    //             },
    //             data: [
    //                 {
    //                     value: Ethnicity_Mixdata[0]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[0]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                       color: '#377ab8'
    //                     }
    //                   },
    //                   {
    //                     value: Ethnicity_Mixdata[1]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[1]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                       color: '#6f2e66'
    //                     }
    //                   },
    //                   {
    //                     value: Ethnicity_Mixdata[2]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[2]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                       color: '#2c4990'
    //                     }
    //                   },
    //                   {
    //                     value: Ethnicity_Mixdata[3]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[3]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                       color: '#41a5ac'
    //                     }
    //                   },
    //                 {
    //                     value: Ethnicity_Mixdata[4]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[4]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                         color: '#393469'
    //                     }
    //                 },
    //                 {
    //                     value: Ethnicity_Mixdata[5]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[5]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                         color: '#6f2e66'
    //                     }
    //                 },
    //                 {
    //                     value: Ethnicity_Mixdata[6]?.GROUPBY_METRIC_NUMERATOR,
    //                     name: Ethnicity_Mixdata[6]?.STUDENT_ETHNICITY,
    //                     itemStyle:
    //                     {
    //                         color: '#359760'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // };

    console.log("Special_Groupdata", Special_Groupdata)
    const customColors = [
        '#1f46ac', // Example color 1
        '#66b3ff', // Example color 2
        '#6f2e66', // Example color 3
        '#32a5ac', // Example color 4
        '#27714e', // Example color 5
        '#892c69',// Add more colors as needed
    ];
    const SpecialGroupChartData = useMemo(() => [...Special_Groupdata].sort((a, b) => b.VALUE - a.VALUE), [Special_Groupdata])
    const SpecialGroup = {
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
            top: "22%",
            right: '10%',
            height: '85%',
            containLabel: true
        },

        yAxis: [
            {
                type: 'category',
                position: "left",
                inverse: true,
                data: SpecialGroupChartData.map(itr => itr.DIMENSION === "Emergent Bilingual" ? "English Learners" : itr.DIMENSION),
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#E3E3E3'
                    }
                },
                axisLabel: {
                    width: 70,
                    // overflow: "truncate",
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
            inverse: false,
            // min: 0,
            // max: 5000,
            // interval: 100,
        },

        series: [
            {
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        fontSize: 10,
                        // padding: 10,
                        "formatter": function (params) {
                            return params.value?.toLocaleString()
                        },
                        "textStyle": {
                            "color": "#fff"
                        }
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: SpecialGroupChartData.map(itr => itr.VALUE),
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

    // const customColors = [
    //     '#1f46ac', // Example color 1
    //     '#66b3ff', // Example color 2
    //     '#6f2e66', // Example color 3
    //     '#32a5ac', // Example color 4
    //     '#27714e', // Example color 5
    //     '#892c69',// Add more colors as needed
    //   ];
    // const SpecialGroup = {
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       left: '65%',
    //       top: 'middle',
    //       right: 10,
    //       textStyle: {
    //         color: '#fff',
    //         fontSize: 8,
    //         width: 60,
    //         overflow: 'truncate',  
    //       },
    //       itemWidth: 8.5,
    //       itemHeight: 6,
    //     },
    //     series: [
    //       {
    //         type: 'pie',
    //         radius: '70%',
    //         center: ['35%', '50%'],
    //         data: Special_Groupdata?.map((item, index) => {
    //           return {
    //             name: item?.METRIC_NAME === "Emergent Bilingual" ? "English Learners" : item?.METRIC_NAME,
    //             value: item["VALUE"],
    //             itemStyle: {
    //               color: customColors[index] // Set custom color based on index
    //             }
    //           };
    //         }),
    //         label: {
    //           show: false,
    //           position: 'inside',
    //           color: '#fff',
    //           fontSize: 8,
    //           formatter: `{c}`
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         emphasis: {
    //           itemStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           }
    //         }
    //       }
    //     ]
    //   };


    // const EthnicityMixs = {
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
    //         left: '3%',
    //         bottom: '0%',
    //         top: "22%",
    //         right: '3%',
    //         height: '85%',
    //         containLabel: true
    //     },

    //     yAxis: [
    //         {
    //             type: 'category',
    //             position: "left",
    //             inverse: true,
    //             data: Ethnicity_Mixdata.map(itr => itr.STUDENT_ETHNICITY),
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
    //         max: 15000,
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
    //                         return params.value.GROUPBY_METRIC_NUMERATOR
    //                     },
    //                     "textStyle": {
    //                         "color": "#fff"
    //                     }
    //                 }
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: Ethnicity_Mixdata.map(itr => itr.GROUPBY_METRIC_NUMERATOR),
    //             type: 'bar',
    //             barWidth: "80%",
    //             color: '#892c69',
    //             itemStyle: {
    //                 normal: {
    //                     barBorderRadius: [3, 3, 3, 3],
    //                     color: '#892c69',
    //                 }
    //             }

    //         }
    //     ]
    // };
    const totalValue = Ethnicity_Mixdata?.reduce((sum, item) => sum + item["VALUE"], 0);

    const data = Ethnicity_Mixdata?.map((item, index) => {
        const percentage = ((item["VALUE"] / totalValue) * 100).toFixed(2);
        return {
            name: item["DIMENSION_NAME"],
            value: item["VALUE"],
            percentage: `${percentage}%`, // Store percentage for label
            itemStyle: {
                color: customColors[index]
            }
        };
    });

    const EthnicityMixs = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                // Format actual value with a comma separator
                const formattedValue = params.data.value.toLocaleString();
                return `${params.name}: ${formattedValue} (${params.data.percentage})`;
            }
        },
        legend: {
            orient: 'vertical',
            left: '54%',
            top: 'middle',
            right: 10,
            textStyle: {
                color: '#fff',
                fontSize: 8,
                width: 130,
                overflow: 'truncate',
            },
            itemWidth: 8.5,
            itemHeight: 6,
            formatter: function (name) {
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
                radius: '65%',
                center: ['25%', '50%'],
                data: data,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    fontSize: 8,
                    formatter: `{d}%` // Display percentage inside the pie
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


    const enrollData = {
        yaxis: ["Telco"],
        value: Enrollment_Projectionsdata?.map(item => item["ENROLLMENT"]),
        value1: Enrollment_Projectionsdata?.map(item => item["VALUE"])
    }

    const enrollData1 = {
        yaxis: ["Telco"],
        value: SPED_Enrollmentdata?.map(item => item["METRIC_NUMERATOR"]),
        value1: SPED_Enrollmentdata?.map(item => item["ADJUSTMENTS"])
    }

    const handleEnrollment = (e) => {
        setEnrollment(e.value)
        setCurrentPage(1)
    }
    return (
        <div className="pb-5 body">
            <TopNav pagename="Enrollment" pagenamedescription="Enrollment summary for the School District by various cuts and slices of data" setUserData={props.setUserData} />
            <div className="basic-container">
                <div className="grid grid-cols-9 gap-3 mx-8">
                    <div className="col-span-3 h-full">
                        <div className="basic-container-child px-1 !h-full">
                            <LoaderContainer loading={Enrollmentdataloading}>
                                <div className="text-white text-[9px]">[Pre-K to 12 Grade]</div>
                                <div className="text-white text-sm">Enrollment</div>
                                <div className="flex items-center justify-start">
                                    <div className="text-white text-lg">{Enrollmentdata[0]?.VALUE?.toLocaleString()}</div>
                                    {
                                        Enrollmentdata[0]?.VARIANCE >= 0 ?
                                            <div className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center justify-between gap-1"><img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /> <p>{Enrollmentdata[0]?.VARIANCE?.toFixed(2)}% from Last Year</p></div>
                                            // <div className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center"><img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /> NA</div>
                                            :
                                            <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center justify-between gap-1"><img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /> <p>{Enrollmentdata[0]?.VARIANCE?.toFixed(2)}% from Last Year</p></div>
                                        // <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center"><img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /> NA</div>
                                    }
                                </div>
                                <div className="grid grid-cols-3 gap-2 flex items-center mt-2">
                                    <div className="col-span-1">
                                        <div className="flex items-center justify-evenly">
                                            <div className="rounded full h-2 w-3 bg-[#0c3a54]"></div>
                                            <div className="px-2 py-1">
                                                <div className="text-white text-[11px] font-[300]">Enrollment Projections</div>
                                                <div className="text-white text-sm">{Enrollment_Projectionsdata[0]?.ENROLLMENT_PROJECTIONS?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="flex items-center justify-evenly">
                                            <div className="rounded full h-2 w-2 bg-[#149c83]"></div>
                                            <div className="px-2 py-1">
                                                <div className="text-white text-[11px] font-[300]">Actual Enrollment</div>
                                                <div className="text-white text-sm">{Enrollment_Projectionsdata[0]?.ENROLLMENT?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="flex items-center justify-evenly">
                                            <div className="rounded full h-2 w-2 bg-[#892a69]"></div>
                                            <div className="px-2 py-1">
                                                <div className="text-white text-[11px] font-[300]">Adjustments</div>
                                                <div className="text-white text-sm">{Enrollment_Projectionsdata[0]?.VALUE?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2  pre_enrollment">
                                    <div className="bg-[#0c3a54] py-1 px-1 rounded-[10px] h-4">
                                        {/* <ProgressBar className="relative h-5" labelClassName="progresslbl" completed={Enrollment_Projectionsdata[0]?.VALUE} bgColor="#149c83" borderRadius="10px" baseBgColor="#892a69" /> */}
                                        <HorizontalStackBars
                                            barWidth='10'
                                            data={enrollData}
                                            names={["Actual Enrollment", "Adjustments"]}
                                            grid={{
                                                "left": '0%',
                                                "top": '-74%',
                                                "right": '0%',
                                                "containLabel": "true"
                                            }}
                                        />

                                    </div>

                                </div>
                            </LoaderContainer>
                        </div>
                    </div>
                    <div className="col-span-3 h-full">
                        <LoaderContainer loading={Special_Groupdataloading}>
                            <div className="basic-container-child h-full px-1">
                                <div className="text-white text-sm">Special Groups</div>
                                <div className=''>
                                    {/* <ReactEcharts option={SpecialGroup} style={{ width: 325, height: 170, margin: 'auto' }} notMerge={true}/> */}
                                    <ReactEcharts option={SpecialGroup} style={{ width: screenWidth <= 1450 && screenWidth >= 1100 ? 270 : 320, height: screenWidth <= 1450 && screenWidth >= 1300 ? 170 : 170, margin: 'auto' }} notMerge={true} />
                                </div>
                            </div>
                        </LoaderContainer>
                    </div>
                    <div className="col-span-3 h-full">
                        <LoaderContainer loading={Ethnicity_Mixdataloading}>
                            <div className="basic-container-child">
                                <div className="text-white text-sm">Ethnicity Mix</div>
                                <div className=''>
                                    <ReactEcharts option={EthnicityMixs} style={{ width: screenWidth <= 1450 && screenWidth >= 1100 ? 270 : 320, height: screenWidth <= 1450 && screenWidth >= 1300 ? 170 : 170, margin: 'auto' }} notMerge={true} />
                                </div>
                            </div>
                        </LoaderContainer>
                    </div>
                    {/* <div className="col-span-3">
                        <LoaderContainer loading={Ethnicity_Mixdataloading}>
                            <div className="basic-container-child">
                                <div className="text-white text-sm">Average Class Size</div>
                                <div className="text-white text-xl my-[1rem]">{Average_Class_Sizedata[0]?.AVGCLASSSIZE} Students</div>
                                <div>
                                    <div className="text-white text-sm">LY avg. Class size</div>
                                    <div className="text-white text-lg">{Average_Class_Sizedata[0]?.PYAVGCLASSSIZE} Students</div>
                                </div>
                                <div className='mt-[-28px]'>
                                    <ReactEcharts option={EthnicityMixs} style={{ width: 325, height: 170, margin: 'auto' }} />
                                </div>
                            </div>
                        </LoaderContainer>
                    </div> */}
                    {/* <div className="col-span-3">
                        <LoaderContainer loading={Average_Class_Sizedataloading}>
                            <div className="basic-container-child">
                                <div className="text-white text-sm">Average Class size</div>
                                <div className="text-lg text-white mt-3">{Average_Class_Sizedata[0]?.AVGCLASSSIZE} Students</div>
                                <div className="flex justify-between w-full max-h-[75px] h-[75px] my-2">
                                    <div className="flex flex-wrap  gap-1 w-full h-[47px] overflow-hidden">
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>
                                        <div><img src={student_avatar_man} className="max-w-[13px]" alt="" /></div>

                                    </div>
                                </div>
                                <div className="text-white text-[9px] mt-3">LY avg. Class size</div>
                                <div className="text-sm text-white">{Average_Class_Sizedata[0]?.PYAVGCLASSSIZE} Students</div>
                            </div>
                        </LoaderContainer>
                    </div> */}
                    {/* <div className="col-span-3">
                        <div className="basic-container-child">
                            <div className="text-white text-[9px]">[Pre-K to 12 Grade]</div>
                            <div className="text-white text-sm">SpEd Enrollment</div>
                            <div className="flex items-center justify-start">
                                <div className="text-white text-lg">{SPED_Enrollmentdata[0]?.METRIC_NUMERATOR}</div>
                               
                                {
                                        SPED_Enrollmentdata[0]?.GROUPBY_VARIANCE >=0?<div className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center"><img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /> {SPED_Enrollmentdata[0]?.GROUPBY_VARIANCE?.toFixed(2)}% from Last Year</div>:
                                        <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-5 flex items-center"><img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /> {SPED_Enrollmentdata[0]?.GROUPBY_VARIANCE?.toFixed(2)}% from Last Year</div>
                                }
                            </div>
                            <div className="grid grid-cols-3 gap-2 flex items-center mt-2">
                                <div className="col-span-1">
                                    <div className="flex items-center justify-evenly">
                                        <div className="rounded full h-2 w-3 bg-[#0c3a54]"></div>
                                        <div className="px-2 py-1">
                                            <div className="text-white text-[11px] font-[300]">Enrollment Projections</div>
                                            <div className="text-white text-sm">{SPED_Enrollmentdata[0]?.ENROLLMENT_PROJECTION}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center justify-evenly">
                                        <div className="rounded full h-2 w-2 bg-[#149c83]"></div>
                                        <div className="px-2 py-1">
                                            <div className="text-white text-[11px] font-[300]">Actual Enrollment</div>
                                            <div className="text-white text-sm">{SPED_Enrollmentdata[0]?.METRIC_NUMERATOR}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center justify-evenly">
                                        <div className="rounded full h-2 w-2 bg-[#892a69]"></div>
                                        <div className="px-2 py-1">
                                            <div className="text-white text-[11px] font-[300]">Adjustments</div>
                                            <div className="text-white text-sm">{SPED_Enrollmentdata[0]?.ADJUSTMENTS}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="bg-[#0c3a54] py-1 px-1 rounded-[10px] h-4">
                                    
                                    <HorizontalStackBars
                                    barWidth='8'
                                    data={enrollData1}
                                    names={["Actual Enrollment", "Adjustments"]}
                                    grid={{
                                        "left": '0%',
                                        "top": '-74%',
                                        "right": '0%',
                                        "containLabel": "true"
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="movement-container">
                <LoaderContainer loading={Net_Movementdataloading}>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-1">
                            <div className="text-xs text-white ml-0 my-2">Net Movement</div>
                            <div className="flex justify-between gap-4">
                                <img src={students} width="40px" height="65px" style={{ margin: 'auto' }} />
                                <div>
                                    <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-5">
                                            <div className="text-xs text-white">{Net_Movementdata[0]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">{Net_Movementdata[0]?.VALUE?.toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Net_Movementdata[0]?.VARIANCE >= 0 ? <div className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center" style={{ width: "50px" }}>{Number(Net_Movementdata[0]?.VARIANCE).toFixed(1)}%
                                                    <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                </div> :
                                                    <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full  h-4 ml-0 flex items-center justify-center" style={{ width: "50px" }}>{Number(Net_Movementdata[0]?.VARIANCE).toFixed(1) == 'NaN' ? '-' : Number(Net_Movementdata[0]?.VARIANCE).toFixed(1)}%
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-6">
                                            <div className="text-xs text-white">{Net_Movementdata[1]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="text-sm text-white">{Net_Movementdata[1]?.METRIC_NUMERATOR?.toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {console.log("Net_Movementdata", Net_Movementdata[1]?.GROUPBY_VARIANCE)}
                                            {
                                                Net_Movementdata[1]?.GROUPBY_VARIANCE >= 0 ? <div style={{ width: "50px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full  h-4 ml-0 flex items-center justify-center">{Number(Net_Movementdata[1]?.GROUPBY_VARIANCE).toFixed(2)}%
                                                    <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                </div> :
                                                    <div style={{ width: "50px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-center">{Number(Net_Movementdata[1]?.GROUPBY_VARIANCE).toFixed(1)}%
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-8 mb-1">
                                        <div className="col-span-6">
                                            <div className="text-xs text-white">{Net_Movementdata[2]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="text-sm text-white">{Net_Movementdata[2]?.METRIC_NUMERATOR?.toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Net_Movementdata[2]?.GROUPBY_VARIANCE >= 0 ? <div style={{ width: "50px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-center">{Number(Net_Movementdata[2]?.GROUPBY_VARIANCE).toFixed(2)}%
                                                    <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                </div> :
                                                    <div style={{ width: "50px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-center">{Number(Net_Movementdata[2]?.GROUPBY_VARIANCE).toFixed(1)}%
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="text-xs text-white ml-0 my-2">Graduation to KG Enrollment Ratio</div>
                            <div className="flex justify-between gap-4">
                                <div className="text-white text-2xl flex justify-center"> 1:1</div>
                                <div>
                                    {/* <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                    <div className="col-span-6">
                                        <div className="text-xs text-white flex items-center">
                                            <i className="pi pi-arrow-left mx-1"></i>
                                            <img src={Studentgrp} width={20} height={20} className="mx-1" />
                                            <span># of Graduates</span>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-sm text-white">-</div>
                                    </div>
                                    <div className="col-span-1">
                                       
                                    </div>
                                </div> */}
                                    <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-5">
                                            <div className="text-xs text-white flex items-center">
                                                <i className="pi pi-arrow-left mx-1"></i>
                                                <img src={Studentgrp} width={20} height={20} className="mx-1" />
                                                <span>{Graduation_To_KG_Enrollment_Ratiodata?.[0]?.METRIC_NAME == '#_of_Graduates' ? '# of Graduate' : Graduation_To_KG_Enrollment_Ratiodata?.[0]?.METRIC_NAME}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">{Graduation_To_KG_Enrollment_Ratiodata?.[0]?.VALUE?.toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {/* <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Graduation_To_KG_Enrollment_Ratiodata?.[0]?.GROUPBY_VARIANCE.toFixed(1)}%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div> */}
                                            {
                                                Graduation_To_KG_Enrollment_Ratiodata[0]?.VARIANCE >= 0 ?
                                                    <div style={{ width: "55px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[0]?.VARIANCE?.toFixed(2)}%
                                                        {/* <div style={{ width: "55px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">NA */}
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div> :
                                                    <div style={{ width: "55px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[0]?.VARIANCE?.toFixed(1)}%
                                                        {/* <div style={{ width: "55px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">NA */}
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-5">
                                            <div className="text-xs text-white flex items-center">
                                                <i className="pi pi-arrow-left mx-1"></i>
                                                <img src={Studentgrp} width={20} height={20} className="mx-1" />
                                                <span>{Graduation_To_KG_Enrollment_Ratiodata?.[1]?.METRIC_NAME == 'Total_KG_Enrollment' ? 'Total KG Enrollment' : Graduation_To_KG_Enrollment_Ratiodata?.[1]?.METRIC_NAME}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">{Graduation_To_KG_Enrollment_Ratiodata?.[1]?.VALUE?.toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {/* <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Graduation_To_KG_Enrollment_Ratiodata?.[1]?.GROUPBY_VARIANCE.toFixed(1)}%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div> */}
                                            {
                                                Graduation_To_KG_Enrollment_Ratiodata[1]?.VARIANCE >= 0 ?
                                                    <div style={{ width: "55px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[1]?.VARIANCE?.toFixed(1)}%
                                                        {/* <div style={{ width: "55px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">NA */}
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div> :
                                                    <div style={{ width: "55px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full  h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[1]?.VARIANCE?.toFixed(2)}%
                                                        {/* <div style={{ width: "55px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full  h-4 ml-0 flex items-center justify-center">NA */}
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="grid grid-cols-8 mb-1" >
                                        <div className="col-span-6">
                                            <div className="text-xs text-white flex items-center">
                                                <i className="pi pi-arrow-left mx-1"></i>
                                                <img src={Studentgrp} width={20} height={20} className="mx-1" />
                                                <span>{Graduation_To_KG_Enrollment_Ratiodata?.[2]?.METRIC_NAME}</span>
                                              
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="text-sm text-white">{Graduation_To_KG_Enrollment_Ratiodata?.[2]?.VALUE}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Graduation_To_KG_Enrollment_Ratiodata[2]?.VARIANCE >= 0 ?
                                                    <div style={{ width: "55px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[2]?.VARIANCE?.toFixed(1)}%
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div> :
                                                    <div style={{ width: "55px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full  h-4 ml-0 flex items-center justify-center">{Graduation_To_KG_Enrollment_Ratiodata[2]?.VARIANCE?.toFixed(1)}%
                                                        <img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" />
                                                    </div>
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="text-xs text-white ml-0 my-2">Inter-School Conversion Ratio</div>
                            <div className="flex justify-between gap-4">
                                <img src={school} width="50px" height="50px" style={{ margin: 'auto' }} />
                                <div>
                                    <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-5">
                                            <div className="text-xs text-white">{Inter_School_Conversiondata?.[0]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">1:{Inter_School_Conversiondata?.[0]?.VALUE?.toFixed(1)}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Inter_School_Conversiondata?.[0]?.VARIANCE > 0 ?
                                                    <div style={{ width: "50px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[0]?.VARIANCE?.toFixed(1)}%
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div> :
                                                    <div style={{ width: "50px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[0]?.VARIANCE?.toFixed(1)}%<img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-8 mb-1" style={{ borderBottom: '1px solid rgb(92, 120, 132)' }}>
                                        <div className="col-span-5">
                                            <div className="text-xs text-white">{Inter_School_Conversiondata?.[1]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">1:{Inter_School_Conversiondata?.[1]?.VALUE?.toFixed(1)}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Inter_School_Conversiondata?.[0]?.VARIANCE > 0 ?
                                                    <div style={{ width: "50px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[1]?.VARIANCE?.toFixed(1)}%
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div> :
                                                    <div style={{ width: "50px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[1]?.VARIANCE?.toFixed(1)}%<img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-8 mb-1">
                                        <div className="col-span-5">
                                            <div className="text-xs text-white">{Inter_School_Conversiondata?.[2]?.METRIC_NAME}</div>
                                        </div>
                                        <div className="col-span-2 text-right pr-2">
                                            <div className="text-sm text-white">1:{Inter_School_Conversiondata?.[2]?.VALUE?.toFixed(1)}</div>
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                Inter_School_Conversiondata?.[0]?.VARIANCE > 0 ?
                                                    <div style={{ width: "50px" }} className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[2]?.VARIANCE?.toFixed(1)}%
                                                        <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div> :
                                                    <div style={{ width: "50px" }} className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 ml-0 flex items-center justify-between">{Inter_School_Conversiondata?.[2]?.VARIANCE?.toFixed(1)}%<img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoaderContainer>
            </div>
            {/* <div className="card wrapper-card text-white mx-5 mt-5 mb-1">
                <div className="flex justify-between">
                    <div>
                        <div className="title-text text-xl flex items-center">Students Dimension Analysis</div>
                        <div className="text-xs flex items-center">Selected Indicator: % of students with 95% attendance</div>
                    </div>
                    <div className="flex justify-center" >
                        <div className="mx-1">
                            <label htmlFor="dd-city" className="labeltext">Analyze by</label>
                            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                placeholder="Ethnicity" className="w-full md:w-14rem" style={{ width: 250 }} />
                        </div>

                    </div>
                </div>
            </div> */}
            <div className='grid grid-cols-12 mx-5 mt-2 gap-3 pt-5 bottom-container'>
                <div className='col-span-6'>
                    <LoaderContainer loading={Time_Analysisdataloading}>
                        <div className='echart h-full relative wrap-component'>
                            <div className="title-text flex items-center text-white ml-5 py-2 text-[16px]">Time Analysis</div>
                            <LoaderContainer loading={Time_Analysisdataloading}>
                                <div className='relative'>
                                    <ReactEcharts option={CollectionTrend} style={{ height: "270px" }} />
                                    <div className='yaxis-text absolute top-[40%] left-[-20px] text-[#fff]'>Enrollment</div>
                                </div>
                            </LoaderContainer>
                        </div>
                    </LoaderContainer>
                </div>
                <div className="card col-span-3 wrap-component relative">
                    <LoaderContainer loading={Enrollment_Summary_By_Dimensionsdataloading}>
                        <div className="flex justify-between mx-2 my-2 items-center">
                            <div className="text-md text-white text-[16px]">Enrollment Summary</div>
                            <div className="flex justify-center enrollselect" >
                                <Dropdown value={enrollment} onChange={handleEnrollment} options={options} optionLabel="name"
                                    placeholder="View by Gender" className="w-full md:w-14rem text-xs" style={{ width: 180 }} />
                            </div>
                        </div>
                    </LoaderContainer>
                    <div className="px-2 pt-5">
                        {console.log("currentItems", currentItems)}
                        {currentItems && currentItems?.sort((a, b) => b?.['sum_total'] - a?.['sum_total'])?.map(itr => {
                            // console.log("itritritr",itr)
                            return (
                                <LoaderContainer loading={Inter_School_Conversiondataloading}>
                                    <div className="my-2">
                                        <ProgressBar className="relative" labelClassName="progresslabeltext py-2"
                                            completed={itr?.sum_total}
                                            customLabel={itr?.sum_total?.toLocaleString()}
                                            minCompleted={minMaxValueForAllTheCharts?.min || 0}
                                            maxCompleted={minMaxValueForAllTheCharts?.max || 7500}
                                            bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)"
                                            borderRadius="10px"
                                            baseBgColor="#32395699" />
                                        <div className="text-white text-xs mx-2 mt-[-19px] absolute">{itr?.DIMENSION}</div>
                                        {
                                            itr?.VARIANCE >= 0 ?
                                                <div className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 mt-[-19px] absolute right-[-10%]  flex items-center" style={{ right: "0.5rem" }}>{itr?.VARIANCE?.toFixed(1)}%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                                // <div className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-auto h-4 mt-[-19px] absolute right-[-10%]  flex items-center" style={{ right: "0.5rem" }}>{"NA"}<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                                :
                                                <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 mt-[-19px] absolute right-[-10%]  flex items-center" style={{ right: "0.5rem" }}>{itr?.VARIANCE?.toFixed(1)}%<img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                            // <div className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-auto h-4 mt-[-19px] absolute right-[-10%]  flex items-center" style={{ right: "0.5rem" }}>{"NA"}<img src={caretdown} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                        }

                                    </div>
                                </LoaderContainer>
                            )
                        })}
                        {/* <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext py-2" completed="100" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">White, Non-Hispanic</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="26" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Black, Non-Hispanic</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="23" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Hispanic</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="20" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Multi-racial</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="10" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Asian or Pacific Islander</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="10" bgColor="#32395699" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Amer. Indian or Alaskan Native</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div>
                        <div className="my-2">
                            <ProgressBar className="relative" labelClassName="progresslabeltext" completed="1" bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)" borderRadius="10px" baseBgColor="#32395699" />
                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">Not Reported</div>
                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full w-10 h-4 mt-[-19px] absolute ml-[20%]  flex items-center">1%<img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                        </div> */}

                    </div>
                    <div className='pagination'>
                        <a class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <button className={`paginationprevious ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevClick} disabled={currentPage === 1}><img src={RightArrow} className="rotate-180" width="12" /></button> {currentPage} </a>
                        <span>of</span>
                        <a class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {totalPages} <button className={`paginationnext ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextClick} disabled={currentPage === totalPages}><img src={RightArrow} className="" width="12" /></button></a>
                    </div>
                </div>
                <div className="card col-span-3 wrap-component">
                    <div className="text-md text-white my-2 mx-2 text-[16px]">Schools</div>
                    <div className="px-2  ">
                        <LoaderContainer loading={Schools_Biggest_Gainersdataloading}>
                            <div className="bg-[#1b223c] rounded-[10px] px-1 py-2 my-1">
                                <div className="text-xs text-white">Biggest Gainers</div>
                                {/* {[...Schools_Biggest_Gainersdata]?.sort((a,b)=>b?.['METRIC_NUMERATOR'] - a?.['METRIC_NUMERATOR'])?.map((item)=>{
                                    return (
                                        <div className="my-2">
                                            <ProgressBar 
                                                    className="relative" 
                                                    labelClassName="progresslabeltext1" 
                                                    completed={item?.METRIC_NUMERATOR} 
                                                    customLabel={item?.METRIC_NUMERATOR?.toLocaleString()} 
                                                    maxCompleted={minMaxValueForGainers.max} 
                                                    minCompleted={minMaxValueForGainers.min} 
                                                    bgColor="#129c83" 
                                                    borderRadius="10px" 
                                                    baseBgColor="#32395699" 
                                             />   

                                            <div className="text-white text-xs mx-2 mt-[-19px] absolute">{item?.SCHOOL_OFFICIAL_NAME}</div>
                                </div>
                                    )
                                })} */}
                                {Schools_Biggest_Gainersdata?.map((school, index) => (
                                    <div className="my-2" key={index}>
                                        <ProgressBar
                                            className="relative"
                                            labelClassName="progresslabeltext1"
                                            completed={school?.VALUE}
                                            customLabel={school?.VALUE?.toLocaleString()}
                                            minCompleted={minMaxValueForSchoolGainers?.min}
                                            maxCompleted={minMaxValueForSchoolGainers?.max}
                                            bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(54, 186, 89) 100%)"
                                            borderRadius="10px"
                                            baseBgColor="#32395699"
                                        />
                                        <div className="text-white text-xs mx-2 mt-[-19px] absolute">
                                            {school?.SCHOOL_NAME}
                                        </div>
                                    </div>
                                ))}
                                {/* <div className="my-2">
                                <ProgressBar className="relative" labelClassName="progresslabeltext1" completed="90" bgColor="#129c83" borderRadius="10px" baseBgColor="#32395699" />
                                <div className="text-white text-xs mx-2 mt-[-19px] absolute">White, Non-Hispanic</div>
                            </div>
                            <div className="my-2">
                                <ProgressBar className="relative" labelClassName="progresslabeltext1" completed="320" bgColor="#129c83" borderRadius="10px" baseBgColor="#32395699" />
                                <div className="text-white text-xs mx-2 mt-[-19px] absolute">Plantation Oaks Elementary</div>
                            </div>
                            <div className="my-2">
                                <ProgressBar className="relative" labelClassName="progresslabeltext1" completed="91" bgColor="#129c83" borderRadius="10px" baseBgColor="#32395699" />
                                <div className="text-white text-xs mx-2 mt-[-19px] absolute">Robert M Paterson Elementary</div>
                            </div> */}
                                {/* METRIC_NUMERATOR */}
                            </div>
                        </LoaderContainer>
                        <LoaderContainer loading={Schools_Biggest_Losersdataloading}>
                            <div className="bg-[#1b223c] rounded-[10px] px-1 py-2 my-1">
                                <div className="text-xs text-white text-left">Least Gainers</div>
                                {Schools_Biggest_Losersdata?.map((school, index) => (
                                    <div className="mb-2 mt-0.5" key={index}>
                                        <ProgressBar
                                            className="relative"
                                            labelClassName="progresslabeltext1"
                                            completed={school?.VALUE}
                                            customLabel={school?.VALUE?.toLocaleString()}
                                            minCompleted={minMaxValueForSchoolLosers?.min}
                                            maxCompleted={minMaxValueForSchoolLosers?.max}
                                            bgColor="linear-gradient(90deg, rgb(62, 119, 164) 0%, rgb(135, 46, 106) 100%)"
                                            orderRadius="10px"
                                            baseBgColor="#32395699"
                                        />
                                        <div className="text-white text-xs mx-2 mt-[-19px] absolute">
                                            {school?.SCHOOL_NAME}
                                        </div>
                                    </div>
                                ))}




                                {/* <div className="my-2">
                                    <ProgressBar className="relative ml-[20px]" labelClassName="progresslabeltext1" completed={Schools_Biggest_Losersdata?.[1]?.SCHOOL_OFFICIAL_NAME} bgColor="#82316c" borderRadius="10px" baseBgColor="#32395699" />
                                    <div className="text-white text-xs mx-2 mt-[-19px] absolute">{Schools_Biggest_Losersdata?.[1]?.METRIC_NUMERATOR}</div>
                                </div>
                                <div className="my-2">
                                    <ProgressBar className="relative" labelClassName="progresslabeltext1" completed={Schools_Biggest_Losersdata?.[2]?.SCHOOL_OFFICIAL_NAME} bgColor="#82316c" borderRadius="10px" baseBgColor="#32395699" />
                                    <div className="text-white text-xs mx-2 mt-[-19px] absolute">{Schools_Biggest_Losersdata?.[2]?.METRIC_NUMERATOR}</div>
                                </div> */}
                            </div>
                        </LoaderContainer>
                        {/* <div className="bg-[#1b223c] rounded-[10px] px-1 py-2 my-1">
                            <div className="text-[13px] text-white">New School Addition</div>
                            <div className="flex justify-between">
                                <div className="text-xs text-white">Eric High School</div>
                                <div className="text-xs text-white">336</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-xs text-white">Paul Elementary School</div>
                                <div className="text-xs text-white">437</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="py-4 flex justify-end pt-5">
                <img src={k12darklogo} height="50px" width="130px" alt="logo" />
            </div>
        </div>
    )
}