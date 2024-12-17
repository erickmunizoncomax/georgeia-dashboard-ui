
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Card } from 'primereact/card';
// import ReactEcharts from "echarts-for-react";
import { Dropdown } from 'primereact/dropdown';
import DrillDown from "../assets/images/drilldown.png";
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { ProductService } from '../service/ProductService';
import thumb from '../assets/images/strength.png';
import improvementimg from '../assets/images/improvement.png';
import caretup from "../assets/images/caret-up.png";
import caretdown from "../assets/images/caret-down.png";
import thumbdown from '../assets/images/weakness.png';
import TopNav from "../components/common/topnav.component";
import k12darklogo from '../assets/images/k12-dark-logo.png';
import ReactEcharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION, fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART, fetchImprovement_Tile_Report, fetchStrength_Tile_Report, fetchWeakness_Tile_Report,
    fetchStrength_Weaknesses_Tile_Report
} from '../redux/slices/strengthweakness';
import TreeMapEcharts from '../components/tree-graph';
import LoaderContainer from "../components/loaderContainer";

export default function StrengthWeakness(props) {
    const dispatch = useDispatch();
    const STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdata = useSelector(state => state.strengthweakness.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART);
    const STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdataloading = useSelector(state => state.strengthweakness.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading);
    const STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONdata = useSelector(state => state.strengthweakness.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION);
    const STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONdataloading = useSelector(state => state.strengthweakness.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONloading);
    // const Improvement_Tile_Reportdata = useSelector(state => state.strengthweakness.Improvement_Tile_Report);
    const Improvement_Tile_Reportdataloading = useSelector(state => state.strengthweakness.Improvement_Tile_Reportloading);
    // const Strength_Tile_Reportdata = useSelector(state => state.strengthweakness.Strength_Tile_Report);
    const Strength_Weaknesses_Tile_Reportdata = useSelector(state => state.strengthweakness.Strength_Weaknesses_Tile_Report);
    const Strength_Weaknesses_Tile_Reportdataloading = useSelector(state => state.strengthweakness.Strength_Weaknesses_Tile_Reportloading);
    const Strength_Tile_Reportdataloading = useSelector(state => state.strengthweakness.Strength_Tile_Reportloading);
    // const Weakness_Tile_Reportdata = useSelector(state => state.strengthweakness.Weakness_Tile_Report);
    const Weakness_Tile_Reportdataloading = useSelector(state => state.strengthweakness.Weakness_Tile_Reportloading);

    // console.log("Strength_Weaknesses_Tile_Reportdata", Strength_Weaknesses_Tile_Reportdata)
    const Strength_Tile_Reportdata = Strength_Weaknesses_Tile_Reportdata?.filter(item => item.TYPE === "Strength");
    const Weakness_Tile_Reportdata = Strength_Weaknesses_Tile_Reportdata?.filter(item => item.TYPE === "Weaknesses");
    const Improvement_Tile_Reportdata = Strength_Weaknesses_Tile_Reportdata?.filter(item => item.TYPE === "Improvements Shown");

    // const STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading = useSelector(state => state.netsales.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading);
    // console.log("Improvement_Tile_Reportdata",Improvement_Tile_Reportdata)
    // console.log("Strength_Tile_Reportdata",Strength_Tile_Reportdata)
    // console.log("Weakness_Tile_Reportdata",Weakness_Tile_Reportdata)
    // const [selectedoptions, setSelectedoptions] = useState('school_level');
    // const [selectedoptions1, setSelectedoptions1] = useState('student_ethnicity');
    // const [selectedoptions2, setSelectedoptions2] = useState('student_grade');
    // const [selectedoptions3, setSelectedoptions3] = useState('student_gender');
    const [selectedoptions, setSelectedoptions] = useState('school_type');
    // const [selectedoptions1, setSelectedoptions1] = useState('student_grade');
    const [selectedoptions1, setSelectedoptions1] = useState('student_ethnicity');
    const [selectedoptions2, setSelectedoptions2] = useState('student_gender');
    // const [selectedoptions3, setSelectedoptions3] = useState('school_level');
    const [selectedoptions3, setSelectedoptions3] = useState('student_grade');
    const [nestedFields, setNestedFields] = useState(["DIMENSION_1", "DIMENSION_2", "DIMENSION_4", "DIMENSION_3"]);
    const [valueFields, setValueFields] = useState(["ACTUAL_D1", "ACTUAL_D2", "ACTUAL_D4", "ACTUAL_D3"]);

    sessionStorage.setItem("selectedoptions", selectedoptions);
    sessionStorage.setItem("selectedoptions1", selectedoptions1);
    sessionStorage.setItem("selectedoptions2", selectedoptions2);
    sessionStorage.setItem("selectedoptions3", selectedoptions3);


    // console.log("Strength_Weaknesses_Tile_Reportdata",Strength_Weaknesses_Tile_Reportdata)

    var Strength_Tile_Reportdatanew = JSON.parse(JSON.stringify(Strength_Tile_Reportdata));
    if (Strength_Tile_Reportdatanew) {
        Strength_Tile_Reportdatanew.map((itr, index) => {
            if (itr["METRIC_NAME"] == "# of Graduates") {
                itr["color"] = "#3A3365"
                itr["order"] = 1
            } else {
                itr["order"] = index + 2
            }
        })
    }


    if (Strength_Tile_Reportdatanew) {
        Strength_Tile_Reportdatanew = Strength_Tile_Reportdatanew.slice().sort((a, b) => {
            return a.order - b.order
        })
    }



    const options = [
        { name: 'School Type', value: 'school_type' },
        { name: 'Grade Level', value: 'student_grade' },
        { name: 'Ethnicity', value: 'student_ethnicity' },
        { name: 'Gender', value: 'student_gender' },
        { name: 'Homeless', value: 'student_homeless' },
        { name: 'Special Ability', value: 'student_special_ability' },
        // { name: 'Special Ability', value: 'student_special_ability' },
        { name: 'ELL', value: 'student_ell' },
        // { name: 'Language Classification', value: 'student_language_classification' }
    ];

    const options1 = [
        { name: 'School Type', value: 'school_type' },
        { name: 'Grade Level', value: 'student_grade' },
        { name: 'Ethnicity', value: 'student_ethnicity' },
        { name: 'Gender', value: 'student_gender' },
        { name: 'Homeless', value: 'student_homeless' },
        { name: 'Special Ability', value: 'student_special_ability' },
        // { name: 'Special Ability', value: 'student_special_ability' },
        { name: 'ELL', value: 'student_ell' },
        // { name: 'Language Classification', value: 'student_language_classification' }
    ];

    const options2 = [
        { name: 'School Type', value: 'school_type' },
        { name: 'Grade Level', value: 'student_grade' },
        { name: 'Ethnicity', value: 'student_ethnicity' },
        { name: 'Gender', value: 'student_gender' },
        { name: 'Homeless', value: 'student_homeless' },
        { name: 'Special Ability', value: 'student_special_ability' },
        // { name: 'Special Ability', value: 'student_special_ability' },
        { name: 'ELL', value: 'student_ell' },
        // { name: 'Language Classification', value: 'student_language_classification' }
    ];

    const options3 = [
        { name: 'School Type', value: 'school_type' },
        { name: 'Grade Level', value: 'student_grade' },
        { name: 'Ethnicity', value: 'student_ethnicity' },
        { name: 'Gender', value: 'student_gender' },
        { name: 'Homeless', value: 'student_homeless' },
        { name: 'Special Ability', value: 'student_special_ability' },
        // { name: 'Special Ability', value: 'student_special_ability' },
        { name: 'ELL', value: 'student_ell' },
        // { name: 'Language Classification', value: 'student_language_classification' }
    ];

    useEffect(() => {
        // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART({
        //   "elasticQueryName": "STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART",
        //   "filters": [
        //   ],
        //   "dynamicColumns": [],
        // }));

        // dispatch(fetchImprovement_Tile_Report({
        //     "elasticQueryName": "Improvement_Tile_Report",
        //     "filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }],
        //     "grad_filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "MEASURE_TYPE",
        //         "columnValue": ["All"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "SCHOOL_OFFICIAL_NAME",
        //         "columnValue": ["DistrictWide"],
        //         "excludeKeyword": false
        //     }],
        //     "dynamicColumns": [],
        // }));

        // dispatch(fetchStrength_Tile_Report({
        //     "elasticQueryName": "Strength_Tile_Report",
        //     "filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }],
        //     "grad_filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "MEASURE_TYPE",
        //         "columnValue": ["All"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "SCHOOL_OFFICIAL_NAME",
        //         "columnValue": ["DistrictWide"],
        //         "excludeKeyword": false
        //     }],
        //     "dynamicColumns": [],
        // }));

        // dispatch(fetchWeakness_Tile_Report({
        //     "elasticQueryName": "Weakness_Tile_Report",
        //     "filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }],
        //     "grad_filters": [{
        //         "columnName": "SCHOOL_YEAR",
        //         "columnValue": ["2023"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "MEASURE_TYPE",
        //         "columnValue": ["All"],
        //         "excludeKeyword": false
        //     }, {
        //         "columnName": "SCHOOL_OFFICIAL_NAME",
        //         "columnValue": ["DistrictWide"],
        //         "excludeKeyword": false
        //     }],
        //     "dynamicColumns": [],
        // }));

        dispatch(fetchStrength_Weaknesses_Tile_Report({
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


    const drilldown = {
        series: [{
            type: "tree",
            data: [{
                name: "Actual 76.9%",
                symbolSize: 10,
                itemStyle: {
                    color: '#4C80E4',
                    shadowColor: 'rgba(76, 128, 228, 1)',
                    shadowBlur: 10,
                    fill: true

                },
                children: [{
                    name: "Middle(81.4%)",
                    lineStyle: {
                        width: 20,
                        color: "rgb(164, 202, 84)"
                    },
                    symbolSize: 10,
                    label: {
                        show: true,
                        position: "left"
                    },

                },
                // second chart 
                {
                    name: "Elementrary(79.7%)",

                    lineStyle: {
                        width: 12,
                        color: "rgb(202, 84, 84)"
                    },
                    symbolSize: 10,

                }, {
                    name: "Combined Middle/High(56.9%)",
                    lineStyle: {
                        width: 20,
                        color: "rgb(164, 202, 84)"
                    },
                    symbolSize: 10,

                }, {
                    name: "Combined Elementry /Secondory(98.4%)",
                    lineStyle: {
                        width: 20,
                        color: "rgb(164, 202, 84)"
                    },
                    symbolSize: 10,
                }]
            }],
            label: {
                position: "left"
            }
        }]
    }


    const handleTreeOnClick = (node) => {
        // console.log(node);
    }

    const handleNestedFieldChange = (values) => {
        setNestedFields(values);
    }


    const [products, setProducts] = useState(Strength_Tile_Reportdatanew);
    const [products1, setProducts1] = useState(Improvement_Tile_Reportdata);
    const [products2, setProducts2] = useState(Weakness_Tile_Reportdata);

    useEffect(() => {
        setProducts(Strength_Tile_Reportdatanew);
        setProducts1(Improvement_Tile_Reportdata);
        setProducts2(Weakness_Tile_Reportdata);
    }, [products, products1, products2]);

    const [selectedmetric, setSelectedmetric] = useState("10001");

    sessionStorage.setItem("selectedmetric", selectedmetric);

    const [selectedmetricname, setSelectedmetricname] = useState("% of Students with >95% Attendance");
    console.log('selectedmetricname: ', selectedmetricname);

    useEffect(() => {
        const handleBeforeUnload = () => {
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
    var defaultallfilter = JSON.parse(sessionStorage.getItem("allfilter"));

    useEffect(() => {
        // const body = {
        //     "elasticQueryName": "",
        //     "filters": [{ "columnName": "metric_id", "columnValue": [selectedmetric], "excludeKeyword": false }],
        //     "dynamicColumns": [{ columnName: "#{dimension_1}", columnValue: [selectedoptions] },
        //     { columnName: "#{dimension_2}", columnValue: [selectedoptions1] },
        //     { columnName: "#{dimension_3}", columnValue: [selectedoptions2] },
        //     { columnName: "#{dimension_4}", columnValue: [selectedoptions3] }],
        //     "pivotConfig": [],

        // };
        let body;
        if (defaultallfilter) {
            body = {
                "elasticQueryName": "",
                "filters": defaultallfilter.filters.concat([{ "columnName": "METRIC_ID", "columnValue": [selectedmetric] }]),
                "dynamicColumns": [{ columnName: "#{dimension_1}", columnValue: [selectedoptions] },
                { columnName: "#{dimension_2}", columnValue: [selectedoptions1] },
                { columnName: "#{dimension_3}", columnValue: [selectedoptions2] },
                { columnName: "#{dimension_4}", columnValue: [selectedoptions3] }],
            };
        } else {
            body = {
                "elasticQueryName": "",
                "filters": [{ "columnName": "SCHOOL_YEAR", "columnValue": ["2023"], "excludeKeyword": false }, { "columnName": "METRIC_ID", "columnValue": [selectedmetric], "excludeKeyword": false }],
                "dynamicColumns": [{ columnName: "#{dimension_1}", columnValue: [selectedoptions] },
                { columnName: "#{dimension_2}", columnValue: [selectedoptions1] },
                { columnName: "#{dimension_3}", columnValue: [selectedoptions2] },
                { columnName: "#{dimension_4}", columnValue: [selectedoptions3] }],
            };
        }
        handleperformance(body)
    }, [selectedoptions, selectedoptions1, selectedoptions2, selectedoptions3, selectedmetric]);

    const handleperformance = (body) => {
        // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART(body));
        // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION(body));
    }
    const handleTopTileFilterClick = (tile) => {
        console.log('tile', tile)
        // setSelectedmetric(tile?.METRIC_ID)
        setSelectedmetricname(tile?.METRIC_NAME != "# of Graduates" ? tile?.METRIC_NAME : "Graduation Rate")
        // setSelectedmetricname("Graduation Rate")
    }
    const strength = (Strength_Tile_Reportdatanew) => {
        return (
            <Strength_Tile_Report clicker={Strength_Tile_Reportdatanew} clickerFunc={handleTopTileFilterClick} METRIC_NAME={Strength_Tile_Reportdatanew?.METRIC_NAME} ACTUAL={Strength_Tile_Reportdatanew?.VALUE} TARGET={Strength_Tile_Reportdatanew?.TARGET}
                TARGET_VARIANCE={Strength_Tile_Reportdatanew?.CURR_DIFF} LAST_PERIOD={Strength_Tile_Reportdatanew?.PREV_VALUE} LAST_PERIOD_VARIANCE={Strength_Tile_Reportdatanew?.PREV_DIFF} METRIC_INDICATOR_TYPE={Strength_Tile_Reportdatanew?.METRIC_INDICATOR_TYPE} METRIC_SUFFIX={Strength_Tile_Reportdatanew?.METRIC_SUFFIX} INT_CUR={Strength_Tile_Reportdatanew?.INT_CUR} INT_PREV={Strength_Tile_Reportdatanew?.INT_PREV}
            />
        );
    };
    const improvement = (Improvement_Tile_Reportdata) => {
        return (
            <Strength_Tile_Report clicker={Improvement_Tile_Reportdata} clickerFunc={handleTopTileFilterClick} METRIC_NAME={Improvement_Tile_Reportdata?.METRIC_NAME} ACTUAL={Improvement_Tile_Reportdata?.VALUE} TARGET={Improvement_Tile_Reportdata?.TARGET}
                TARGET_VARIANCE={Improvement_Tile_Reportdata?.CURR_DIFF} LAST_PERIOD={Improvement_Tile_Reportdata?.PREV_VALUE} LAST_PERIOD_VARIANCE={Improvement_Tile_Reportdata?.PREV_DIFF} METRIC_INDICATOR_TYPE={Improvement_Tile_Reportdata?.METRIC_INDICATOR_TYPE} METRIC_SUFFIX={Improvement_Tile_Reportdata?.METRIC_SUFFIX} INT_CUR={Improvement_Tile_Reportdata?.INT_CUR} INT_PREV={Improvement_Tile_Reportdata?.INT_PREV}
            />
        );
    };
    const weakness = (Weakness_Tile_Reportdata) => {
        return (
            <Strength_Tile_Report clicker={Weakness_Tile_Reportdata} clickerFunc={handleTopTileFilterClick} METRIC_NAME={Weakness_Tile_Reportdata?.METRIC_NAME} ACTUAL={Weakness_Tile_Reportdata?.VALUE} TARGET={Weakness_Tile_Reportdata?.TARGET}
                TARGET_VARIANCE={Weakness_Tile_Reportdata?.CURR_DIFF} LAST_PERIOD={Weakness_Tile_Reportdata?.PREV_VALUE} LAST_PERIOD_VARIANCE={Weakness_Tile_Reportdata?.PREV_DIFF} METRIC_INDICATOR_TYPE={Weakness_Tile_Reportdata?.METRIC_INDICATOR_TYPE} METRIC_SUFFIX={Weakness_Tile_Reportdata?.METRIC_SUFFIX} INT_CUR={Weakness_Tile_Reportdata?.INT_CUR} INT_PREV={Weakness_Tile_Reportdata?.INT_PREV}
            />
        );
    };




    const Strength_Tile_Report = (props) => {
        console.log(props, 'strengthprosps')
        // const [selectedmetric, setSelectedmetric] = useState("10003");  

        // const dynamicBgColor =
        //     props?.METRIC_INDICATOR_TYPE === "positive"
        //         ? props?.TARGET < props?.VALUE
        //             ? "#1C6130"
        //             : "#6A1D25"
        //         : props?.TARGET > props?.VALUE
        //             ? "#1C6130"
        //             : "#6A1D25";

        const dynamicBgColor =
            props?.INT_CUR === "POSITIVE" ? "#1C6130" : "#6A1D25"

         const PrevDynBgColor =
            props?.INT_PREV === "POSITIVE" ? "#1C6130" : "#6A1D25"



        return (
            <>
                <div id='cardtilesCustomer ' onClick={

                    () => props.clickerFunc(props.clicker)

                }>
                    {/* <div className=" text-center strength-vertical-slider">
                <div className="">
                <div className="strength-vertical-slider-active bg-[#27304a] w-full flex justify-between items-center px-2">
                    <div className='w-full flex justify-between'>
                        <div className=''><h4 className="mb-1 firstrowtext py-3 text-left" style = {{fontSize:"14px"}}>Graduation Rate</h4></div>
                        <div className=''><h4 className="mb-1 strenth-pers py-3 text-right">{props?.ACTUAL.toFixed(1)}%</h4></div>                    
                    </div>
                    <div className='w-full flex justify-between'>
                        <div className=''><h4 className="mb-1 firstrowtext py-3 text-left" style = {{fontSize:"14px"}}>Target <span className='font-semibold'>{props?.TARGET}%</span> 
                        {
                            props?.METRIC_NAME == "Refferal Rate" || props?.METRIC_NAME == "Referral Rate"? 
                            props?.TARGET_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Suspension Rate"? 
                            props?.TARGET_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Chronic Absence Rate"? 
                            props?.TARGET_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Expulsion Rate"? 
                            props?.TARGET_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            props?.TARGET_VARIANCE>=0 ? <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.TARGET_VARIANCE.toFixed(1)}%</span>           
                        }
                        </h4></div>
                        <div className=''><h4 className="mb-1 firstrowtext py-3 text-left" style = {{fontSize:"14px"}}>Last Year <span className='font-semibold'>{props?.LAST_PERIOD.toFixed(1)}%</span>
                        {
                            props?.METRIC_NAME == "Refferal Rate" || props?.METRIC_NAME == "Referral Rate"?  
                            props?.LAST_PERIOD_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Suspension Rate"?  
                            props?.LAST_PERIOD_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Chronic Absence Rate"?  
                            props?.LAST_PERIOD_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            props?.METRIC_NAME == "Expulsion Rate"?  
                            props?.LAST_PERIOD_VARIANCE>=0 ? <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            props?.LAST_PERIOD_VARIANCE>=0 ? <span className="bg-[#1C6130] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>:
                            <span className="bg-[#6A1D25] text-xs text-white px-1 rounded-full w-11" style = {{fontSize:"14px",position:"relative",left:"5px"}}><img src={caretdown} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE.toFixed(1)}%</span>       
                        }    
                        </h4></div>  
                    </div>
                </div>
                </div>                   
           </div> */}
                    {
                        props?.METRIC_NAME == selectedmetricname ? <div className=" text-center strength-vertical-slider">
                            <div className="">
                                <div className="strength-vertical-slider-active bg-[#27304a] w-full flex justify-between items-center px-2">
                                    <div className='w-full flex justify-between'>
                                        <div className=''><h4 className="mb-1 firstrowtext py-3 text-left" style={{ fontSize: "13px" }}>{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</h4></div>
                                        <div className=''><h4 className="mb-1 strenth-pers py-3 text-right">{props?.METRIC_NAME == 'Total Incidents' ? props?.ACTUAL?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : props?.ACTUAL?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {props?.METRIC_SUFFIX}</h4></div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        {(
                                            <div className=''>
                                                <h4 className="mb-1 firstrowtext py-3 text-left" style={{ fontSize: "10px" }}>
                                                    Target <span style={{ fontSize: "14px" }} className='font-semibold'>{props?.TARGET == null || undefined ? '-' : `${props?.TARGET?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${props?.METRIC_SUFFIX}`}</span>
                                                    {
                                                        (props?.METRIC_NAME === "Referral Rate" || props?.METRIC_NAME === "Refferal Rate" ||
                                                            props?.METRIC_NAME === "Suspension Rate" || props?.METRIC_NAME === "Chronic Absence Rate" ||
                                                            props?.METRIC_NAME === "Expulsion Rate") ? (
                                                            <span className="text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: dynamicBgColor, fontSize: "9px", position: "relative", left: "5px" }}>
                                                                <img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />
                                                                {props?.TARGET_VARIANCE == null || undefined ? '-' : props?.TARGET_VARIANCE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {props?.METRIC_SUFFIX}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: dynamicBgColor, fontSize: "9px", position: "relative", left: "5px" }}>
                                                                <img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />
                                                                {props?.TARGET_VARIANCE == null || undefined ? '-' : props?.TARGET_VARIANCE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {props?.METRIC_SUFFIX}
                                                            </span>
                                                        )
                                                    }
                                                </h4>
                                            </div>
                                        )}
                                        <div className=''><h4 className="mb-1 firstrowtext py-3 text-left" style={{ fontSize: "10px" }}>Last Year <span className='font-semibold' style={{ fontSize: "14px" }}>{props?.METRIC_NAME == 'Total Incidents' ? props?.LAST_PERIOD?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : props?.LAST_PERIOD?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {props?.METRIC_SUFFIX}</span>
                                            {
                                                props?.METRIC_NAME == "Total Incidents" ? <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(0)} {props?.METRIC_SUFFIX}</span> :
                                                    props?.METRIC_NAME == "Refferal Rate" || props?.METRIC_NAME == "Referral Rate" ?
                                                        <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(1)} {props?.METRIC_SUFFIX}</span> :
                                                        props?.METRIC_NAME == "Suspension Rate" ?
                                                            <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(1)} {props?.METRIC_SUFFIX}</span> :
                                                            props?.METRIC_NAME == "Chronic Absence Rate" ?
                                                                <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(1)} {props?.METRIC_SUFFIX}</span> :
                                                                props?.METRIC_NAME == "Expulsion Rate" ?
                                                                    <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(1)} {props?.METRIC_SUFFIX}</span> :
                                                                    <span className=" text-xs text-white px-1 rounded-full w-11" style={{ backgroundColor: PrevDynBgColor, fontSize: "9px", position: "relative", left: "5px" }}><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />{props?.LAST_PERIOD_VARIANCE?.toFixed(1)} {props?.METRIC_SUFFIX}</span>
                                            }
                                        </h4></div>
                                    </div>
                                </div>
                            </div>
                        </div> :
                            <div className=" text-center strength-vertical-slider">
                                <div className="w-full flex justify-between items-center px-4">
                                    <h4 className="mb-1 firstrowtext py-3 text-left">{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</h4>
                                    <h4 className="mb-1 firstrowtext py-3 text-right">{Number(props?.ACTUAL) != 0 ? (props?.METRIC_SUFFIX ? props?.ACTUAL?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + `${props?.METRIC_SUFFIX}` : props?.ACTUAL?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })) : '---'}</h4>
                                </div>
                            </div>
                    }
                </div>
            </>
        );
    };

    let finalDrilldownChartData = selectedmetricname == "Graduation Rate" ? STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdata : STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdata
    console.log('finalDrilldownChartData: ', finalDrilldownChartData);
    return (
        <div className="body">
            <TopNav pagename="Strength & Weakness" pagenamedescription="Highlights the areas that the district is doing well and areas where district needs to improve" setUserData={props.setUserData} />
            <div className="flex justify-between items-center mx-3 my-2 strength">
                <div className="wrapper-card2 w-full mx-2">
                    <LoaderContainer loading={Strength_Weaknesses_Tile_Reportdataloading}>
                        <div className="streweak-vertical-carousel">
                            <div className="">
                                <div className='flex justify-between items-center bg-[#1b1422] h-[40px] pr-2'>
                                    <div className="px-3 flex items-center justify-around">
                                        <img src={thumb} style={{ height: 18, width: 18 }} /><span className="xl font-[400] mx-2 text-[16px]">Strength</span>
                                    </div>
                                </div>
                            </div>
                            {console.log("Strength_Tile_Reportdatanew", Strength_Tile_Reportdatanew)}
                            <Carousel value={Strength_Tile_Reportdatanew} numVisible={5} numScroll={1} orientation="vertical" verticalViewPortHeight="250px"
                                itemTemplate={strength}
                            />
                        </div>
                    </LoaderContainer>
                </div>
                {/* <div className="wrapper-card2 w-full mx-2">
                    <LoaderContainer loading={Strength_Tile_Reportdataloading}>
                        <div className="streweak-vertical-carousel">
                            <div className="">
                                <div className='flex justify-between items-center bg-[#1b1422] h-[40px] pr-2'>
                                    <div className="px-3 flex items-center justify-around">
                                        <img src={thumb} style={{ height: 18, width: 18 }} /><span className="xl font-[400] mx-2 text-[16px]">Strength</span>
                                    </div>
                                </div>
                            </div>
                            {console.log("Strength_Tile_Reportdatanew", Strength_Tile_Reportdatanew)}
                            <Carousel value={Strength_Tile_Reportdatanew} numVisible={5} numScroll={1} orientation="vertical" verticalViewPortHeight="250px"
                                itemTemplate={strength}
                            />
                        </div>
                    </LoaderContainer>
                </div> */}
                <div className="wrapper-card2 w-full mx-2">
                    <LoaderContainer loading={Strength_Weaknesses_Tile_Reportdataloading}>
                        <div className="streweak-vertical-carousel">
                            <div className="">
                                <div className='flex justify-between items-center bg-[#1b1422] h-[40px] pr-2'>
                                    <div className="px-3 flex items-center justify-around">
                                        <img src={improvementimg} style={{ height: 18, width: 18 }} /><span className="xl font-[400] mx-2 text-[16px]">Improvements Shown</span>
                                    </div>
                                </div>
                            </div>
                            <Carousel value={Improvement_Tile_Reportdata} numVisible={7} numScroll={1} orientation="vertical" verticalViewPortHeight="250px"
                                itemTemplate={improvement} />
                        </div>
                    </LoaderContainer>
                </div>
                <div className="wrapper-card2 w-full mx-2">
                    <LoaderContainer loading={Strength_Weaknesses_Tile_Reportdataloading}>

                        <div className="streweak-vertical-carousel">
                            <div className="">
                                <div className='flex justify-between items-center bg-[#1b1422] h-[40px] pr-2'>
                                    <div className="px-3 flex items-center justify-around">
                                        <img src={thumbdown} style={{ height: 18, width: 18 }} /><span className="xl font-[400] mx-2 text-[16px]">Weakness</span>
                                    </div>
                                </div>
                            </div>
                            <Carousel value={Weakness_Tile_Reportdata} numVisible={6} numScroll={1} orientation="vertical" verticalViewPortHeight="250px"
                                itemTemplate={weakness} />
                        </div>
                    </LoaderContainer>
                </div>
            </div>
            {/* <div className="card wrapper-card text-white mx-5 my-3 strength-drilldown">
                <Card title="">
                    <div className="flex justify-between studenteoc-civi">
                        <div className="title-text flex items-center">{selectedmetricname}</div>
                        <div className="flex justify-center">
                            <div className="mx-1">
                                <label htmlFor="dd-city" className="labeltext">Dimension 1</label>
                                <Dropdown value={selectedoptions} onChange={(e) => setSelectedoptions(e.value)} options={options} optionLabel="name"
                                    placeholder="School Type" className="w-full md:w-14rem" />
                            </div>
                            <div className="mx-1">
                                <label htmlFor="dd-city" className="labeltext">Dimension 2</label>
                                <Dropdown value={selectedoptions1} onChange={(e) => setSelectedoptions1(e.value)} options={options1} optionLabel="name"
                                    placeholder="Ethinicity" className="w-full md:w-14rem" />
                            </div>
                          
                            <div className="mx-1">
                                <label htmlFor="dd-city" className="labeltext">Dimension 3</label>
                                <Dropdown value={selectedoptions3} onChange={(e) => setSelectedoptions3(e.value)} options={options3} optionLabel="name"
                                    placeholder="Gender" className="w-full md:w-14rem" />
                            </div>
                            <div className="mx-1">
                                <label htmlFor="dd-city" className="labeltext">Dimension 4</label>
                                <Dropdown value={selectedoptions2} onChange={(e) => setSelectedoptions2(e.value)} options={options2} optionLabel="name"
                                    placeholder="Grade Level" className="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>
                    <LoaderContainer loading={selectedmetricname == "Graduation Rate" ? STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdataloading : STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTdataloading}>
                        <p className="m-0 text-white flex items-center justify-start">
                           
                            <TreeMapEcharts
                                handleTreeOnClick={handleTreeOnClick}
                                data={finalDrilldownChartData}
                                nestedFields={nestedFields} valueFields={valueFields}
                                loading={false}
                            />
                        </p>
                    </LoaderContainer>
                </Card>
            </div> */}
            <div className="py-2 flex justify-end mt-[14rem]">
                <img src={k12darklogo} height="50px" width="130px" alt="logo" />
            </div>
        </div>
    )
}