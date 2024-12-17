import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Barchart from './Charts/barchart';
import { ScrollPanel } from 'primereact/scrollpanel';
import Piechart from './Charts/piechart';
import { color } from 'echarts';
import k12darklogo from '../../assets/images/k12-dark-logo.png';
import BarwithDoubleLinechart from './Charts/barwithdoublelinechart';
import './financedashboard.css'
import { Dropdown } from 'primereact/dropdown';

import TopNav from '../../components/common/topnav.component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreditRatingRevenue_and_Expenditure, fetchRevenuevsExpenditurechart, fetchExpensesbycategory, fetchPPE, fetchPPE_toptile, fetchCredit_toptile } from '../../redux/slices/financedashboard';
import LoaderContainer from "../../components/loaderContainer";

export default function Financedashboard(props) {
    /* dependencies */
    const dispatch = useDispatch();
    /*  */

    /* Redux States */
    const CreditRatingRevenue_and_Expenditure = useSelector(state => state.financedashboard.CreditRatingRevenue_and_Expenditure)
    console.log(CreditRatingRevenue_and_Expenditure, 'CreditRatingRevenue_and_Expenditure')
    const CreditRatingRevenue_and_Expenditureloading = useSelector(state => state.financedashboard.CreditRatingRevenue_and_Expenditureloading)

    const RevenuevsExpenditurechart = useSelector(state => state.financedashboard.RevenuevsExpenditurechart)
    const RevenuevsExpenditurechartloading = useSelector(state => state.financedashboard.RevenuevsExpenditurechartloading)

    const Expensesbycategory = useSelector(state => state.financedashboard.Expensesbycategory)
    console.log(Expensesbycategory, 'Expensesbycategory')
    const Expensesbycategoryloading = useSelector(state => state.financedashboard.Expensesbycategoryloading)

    const PPEdata = useSelector(state => state.financedashboard.PPE)
    const PPEloading = useSelector(state => state.financedashboard.PPEloading)

    const PPE_toptiledata = useSelector(state => state.financedashboard.PPE_toptile)
    const Credit_toptiledata = useSelector(state => state.financedashboard.Credit_toptile)
    console.log(PPE_toptiledata, 'PPE_toptiledata')

    /*   */

    const dropdownoptionCategory = [
        ...new Set(Expensesbycategory?.map((item) => item?.DIMENSION_NAME))
    ];

    /* API Calls */
    useEffect(() => {
        dispatch(fetchCreditRatingRevenue_and_Expenditure({
            elasticQueryName: "",
            filters: [
                //     {
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }
            ],
            filters1: [
                //     {
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }
            ],
            dynamicColumns: [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }))


        dispatch(fetchPPE_toptile({
            elasticQueryName: "",
            filters: [
                //     {
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }
            ],
            filters1: [
                //     {
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }
            ],
            dynamicColumns: [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }))


        dispatch(fetchCredit_toptile({
            elasticQueryName: "",
            filters: [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],

            dynamicColumns: [],
        }))



        dispatch(fetchRevenuevsExpenditurechart({
            elasticQueryName: "",
            filters: [

            ],
            dynamicColumns: [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }))

        dispatch(fetchExpensesbycategory({
            elasticQueryName: "",
            filters: [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2022"],
                "excludeKeyword": false
            }],
            dynamicColumns: [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }))

        dispatch(fetchPPE({
            elasticQueryName: "",
            filters: [
                //     {
                //     "columnName": "SCHOOL_YEAR",
                //     "columnValue": ["2023"],
                //     "excludeKeyword": false
                // }
            ],
            dynamicColumns: [{
                "columnName": "#{sort}",
                "columnValue": "State",
                "excludeKeyword": false
            }],
        }))
    }, [])



    const [activeCarousel, setactiveCarousel] = useState(0);
    useEffect(() => setactiveCarousel(CreditRatingRevenue_and_Expenditure[0]), [CreditRatingRevenue_and_Expenditure])

    const [activeTab, setActiveTab] = useState(0);

    // const products = [
    //     {
    //         id: '1',
    //         title: 'Cohort 2020',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 0,
    //         active: true
    //     },

    //     {
    //         id: '2',
    //         title: 'Cohort 2020',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },
    //     {
    //         id: '3',
    //         title: 'Cohort 2020',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 0,
    //         active: false
    //     },
    //     {
    //         id: '4',
    //         title: 'Cohort 2020',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },
    //     {
    //         id: '5',
    //         title: 'Cohort 2016',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },
    //     {
    //         id: '5',
    //         title: 'Cohort 2016',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },
    //     {
    //         id: '5',
    //         title: 'Cohort 2016',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },
    //     {
    //         id: '5',
    //         title: 'Cohort 2016',
    //         subtitle: 'Current Period',
    //         pertcentage: '15%',
    //         status: 1,
    //         active: false
    //     },

    // ]

    const responsiveOptions = [

        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 4
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

    function convertToMillions(value) {
        // Check if the value is a valid number
        if (typeof value !== 'number' || isNaN(value)) {
            return ''; // Return an empty string if the value is invalid
        }

        // Convert to millions and format with commas
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value / 1_000_000) + "M";
    }




    const productTemplate = (data) => {
        console.log(data, 'datadata')
        return (
            <div className={`${data?.METRIC_NAME === activeCarousel?.METRIC_NAME ? 'bg-white text-[#2C363F]' : 'bg-[#16203F] text-[#FFFFFF]'} mr-2 ml-2 p-[16px] 3xl:p-[0.833vw] rounded-[8px] 3xl:rounded-[0.417vw] min-h-[119px] 3xl:min-h-[6.198vw]`}
                onClick={() => setactiveCarousel(data)}
            >
                <div className={`${data?.METRIC_NAME === activeCarousel?.METRIC_NAME && 'text-[#19212A]'} text-[16px] 3xl:text-[0.833vw] font-normal leading-normal mb-[12px] 3xl:mb-[0.625vw] min-h-[24px] 3xl:min-h-[1.25vw] finance-title`}>
                    {data?.METRIC_NAME || ''}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className=' text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>Current Period</span>
                        <div className='text-[22px] 3xl:text-[1.667vw] font-normal leading-none'>
                            {/* {data?.METRIC_NAME == 'Revenues' || data?.METRIC_NAME == 'Expenditures' ? convertToMillions(data?.VALUE) : data?.VALUE == null || 'undefined'? '-' : data?.VALUE} */}
                            {data?.METRIC_NAME == 'Revenue' || data?.METRIC_NAME == 'Expenditure' ? convertToMillions(data?.VALUE) : data?.VALUE == null || undefined ? '-' : data?.METRIC_NAME == 'Spend Per Student District (FY-22)' || data?.METRIC_NAME == 'Spend Per Student Federal (FY-22)' || data?.METRIC_NAME == 'Spend Per Student State (FY-22)' ? new Intl.NumberFormat("en-US").format(data.VALUE.toFixed(0)) : data?.VALUE}
                        </div>
                    </div>
                    {
                        // !(data?.METRIC_NAME === activeCarousel?.METRIC_NAME) &&
                        <div>
                            <div className={`${data.status === 0 && 'invisible'} flex justify-between gap-[31px] 3xl:gap-[0.833vw] mb-[8px] 3xl:mb-[0.417vw]`}>
                                {/* <div className='text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>
                                    Utilizated
                                </div>
                                <div className='text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>
                                    75%
                                </div> */}
                            </div>

                            <div className='flex justify-between gap-[16px] 3xl:gap-[0.833vw]'>
                                <div className='text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>
                                    LY var
                                </div>


                                {data?.VARIANCE > 0 ? (
                                    <div className='flex gap-[4px] xl:gap-[4px] 3xl:gap-[0.208vw] items-center bg-[#069564] rounded-full px-[6px] py-[2px]'>
                                        <img src={'/images/resources/arrow_green_up.svg'} width={10} height={10} alt=''
                                            className='h-[12px] 3xl:h-[0.625vw] w-[15px] 3xl:w-[0.781vw]' />
                                        <div className='text-[#fff] text-[10px] xl:text-[10px] 3xl:text-[0.521vw] font-medium'>
                                            {data?.VARIANCE.toFixed(1)}%
                                        </div>
                                    </div>
                                ) : data?.VARIANCE < 0 ? (
                                    <div className='flex gap-[4px] xl:gap-[4px] 3xl:gap-[0.208vw] items-center bg-[#903E10] rounded-full px-[6px] py-[2px]'>
                                        <img src={'/images/resources/arrow_white_down.svg'} width={10} height={10} alt=''
                                            className='h-[12px] 3xl:h-[0.625vw] w-[15px] 3xl:w-[0.781vw]' />
                                        <div className='text-[#fff] text-[10px] xl:text-[10px] 3xl:text-[0.521vw] font-medium'>
                                            {data?.VARIANCE.toFixed(1)}%
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex gap-[4px] xl:gap-[4px] 3xl:gap-[0.208vw] items-center bg-[#903E10] rounded-full px-[6px] py-[2px]'>
                                        <img src={'/images/resources/arrow_white_down.svg'} width={10} height={10} alt=''
                                            className='h-[12px] 3xl:h-[0.625vw] w-[15px] 3xl:w-[0.781vw]' />
                                        <div className='text-[#fff] text-[10px] xl:text-[10px] 3xl:text-[0.521vw] font-medium'>0%</div>
                                    </div>
                                )}

                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    };

    const [enrollment, setEnrollment] = useState("All");

    const handleEnrollment = (e) => {
        setEnrollment(e.value)

    }

    const options = [
        { name: "All", value: "All" }, 
        ...dropdownoptionCategory?.map((item) => ({
          name: item,
          value: item
        }))
      ];
      

    const ExpensesbycategoryFilter = enrollment == 'All' ? Expensesbycategory :  Expensesbycategory?.filter(item => item?.DIMENSION_NAME == enrollment) 
    // console.log(ExpensesbycategoryFilter,'ExpensesbycategoryFilter')

    return (
        <>
            <div className="body select-none flex flex-col">
                <TopNav
                    pagename="Financial Dashboard"
                    pagenamedescription=""
                    setUserData={props.setUserData}
                />

                <div className='landing_resources_wrap !flex-grow'>
                    {/* header start */}
                    {/* <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-[89px] 3xl:gap-[4.635vw]'>
                <div className='pl-[24px] 3xl:pl-[1.25vw]'>
                    <img src={'/images/resources/districtlogo.svg'} width={206} height={81} alt='logo' className='3xl:w-[10.729vw] 3xl:h-[4.219vw]' />
                </div>
                <div className='text-[#FFFFFF] text-[28px] 3xl:text-[1.458vw] font-normal leading-normal'>
                    Finance Dashboard
                </div>
                </div>
                <div className='pr-[38px] 3xl:pr-[1.979vw]'>
                <img src={'/images/logo.svg'} width={120} height={48} alt='logo' className='3xl:w-[6.25vw] 3xl:h-[2.5vw]' />
                </div>
            </div> */}
                    {/* header end */}
                    <div className='px-[30px] 3xl:px-[1.563vw] py-[18px] 3xl:py-[0.938vw] h-full'>
                        <div className='h-full'>
                            <LoaderContainer loading={CreditRatingRevenue_and_Expenditureloading} cssClass="h-[120px]">
                                <div className='cohortboxcarousel'>
                                    <Carousel value={Credit_toptiledata?.concat(CreditRatingRevenue_and_Expenditure).concat(PPE_toptiledata)} numScroll={1} numVisible={5} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
                                </div>
                            </LoaderContainer>
                            <div className='flex gap-[16px] xl:gap-[16px] 3xl:gap-[0.833vw] my-[16px] xl:mt-[30px] xl:mb-[28px]'>
                                <div className='flex items-center gap-[16px] 3xl:gap-[0.833vw]'>
                                    <button onClick={() => setActiveTab(0)} className={`${activeTab === 0 ? 'bg-[#FFF] text-[#16203F]' : 'bg-[#16203F] text-[#FFFFFF]'} text-[16px] 3xl:text-[0.833vw] font-normal rounded-full px-[16px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw]`}>
                                        Summary
                                    </button>
                                    {/* <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'bg-[#FFF] text-[#2C363F]' : 'bg-[#16203F] text-[#FFFFFF]'} text-[16px] 3xl:text-[0.833vw] font-normal rounded-full px-[16px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw]`}>
                                        Revenue
                                    </button> */}
                                </div>
                            </div>
                            {activeTab === 0 &&
                                <div className='mt-[30px] 3xl:mt-[1.563vw]'>
                                    <div className='grid grid-cols-3 gap-[40px] xl:gap-[40px] 3xl:gap-[2.083vw] revenue-expenditure-main'>
                                        <LoaderContainer loading={RevenuevsExpenditurechartloading} cssClass="h-full revenue-expenditure">
                                            <div className='bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] '>
                                                <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Revenue vs Expense (FY 2023)</div>
                                                <div className=' w-full h-[400px] xl:h-[450px] 3xl:h-[20.833vw]'>
                                                    <Barchart
                                                        legend={{
                                                            type: "plain",
                                                            show: true,
                                                            bottom: 5,
                                                            left: 10,
                                                            itemWidth: 10,
                                                            itemHeight: 10,
                                                            textStyle: {
                                                                color: "rgba(255, 255, 255, 1)"
                                                            }
                                                        }}
                                                        xAxisname={'Values in Million'}
                                                        namegap={70}
                                                        nameTextStyle={{
                                                            color: "#fff",
                                                            fontSize: 12,
                                                        }}
                                                        grid={{
                                                            height: "70%",
                                                            // width: "80%",
                                                            left: "25%",
                                                            right: "5%",
                                                            top: "5%",
                                                            bottom: "0%"
                                                        }}
                                                        xAxisdata={['2013', '2014', '2015', '2016', '2017', '2018']}
                                                        xAxislabel={{
                                                            color: "#fff"
                                                        }}
                                                        xAxisline={{
                                                            show: true,
                                                            lineStyle: {
                                                                color: "#4B5563"
                                                            }
                                                        }}
                                                        xAxistick={{
                                                            show: false,
                                                            lineStyle: {
                                                                color: "rgba(255, 255, 255, 1)"
                                                            }
                                                        }}
                                                        yAxislabel={{
                                                            color: "#fff",
                                                            width: 50,
                                                            overflow: 'truncate'
                                                        }}
                                                        yAxissplitline={{
                                                            show: true,
                                                            lineStyle: {
                                                                color: "#4B5563"
                                                            }
                                                        }}
                                                        yAxisline={{
                                                            show: true,
                                                            lineStyle: {
                                                                color: "#4B5563"
                                                            }
                                                        }}
                                                        yAxistick={{
                                                            show: false,
                                                            lineStyle: {
                                                                color: "rgba(255, 255, 255, 1)"
                                                            }
                                                        }}
                                                        bardata1={[270, 150, 150, 270, 470, 450]}
                                                        barcolor1={"#129C83"}
                                                        bardata2={[200, 300, 310, 100, 290, 500]}
                                                        barcolor2={"#2C4089"}
                                                        bardata3={[800, 200, 650, 300, 600, 300]}
                                                        barcolor3={"#2C82BE"}
                                                        itemStyle={{
                                                            emphasis: {
                                                                barBorderRadius: [50, 50]
                                                            },
                                                            normal: {
                                                                barBorderRadius: [4, 4, 0, 0]
                                                            }
                                                        }}
                                                        bardata4={[1500, 800, 1300, 1200, 2000, 1600]}
                                                        barcolor4={'#892C69'}
                                                        itemStyle2={{
                                                            emphasis: {
                                                                barBorderRadius: [50, 50]
                                                            },
                                                            normal: {
                                                                barBorderRadius: [4, 4, 0, 0]
                                                            }
                                                        }}
                                                        poiterdata={[[0, 1000]]}
                                                        pointerstyle={{
                                                            color: '#F2990E'   // Color of the dot (red in this case)
                                                        }}
                                                        data={RevenuevsExpenditurechart}
                                                    />
                                                </div>
                                            </div>
                                        </LoaderContainer>

                                        <div className='districtclimaterating bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] per-pupil'>
                                            <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Per Pupil Expenditure (FY 2022)</div>
                                            <LoaderContainer loading={PPEloading}>
                                                <div className='relative '>
                                                    <div className='score w-full'>
                                                        <div className='text-[#fff] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal text-left'>{PPEdata[0]?.METRIC_NAME}</div>
                                                        <div className='mt-[4px] xl:mt-[4px] 3xl:mt-[0.208vw] flex justify-between'>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-[#fff] leading-none'>Current Period</div> */}
                                                                <div className='text-[15px] xl:text-[20px] 3xl:text-[30px] text-[#fff] font-normal leading-none mt-[5px] 3xl:mt-[0.26vw]'>{PPEdata[0]?.VALUE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                                                            </div>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal invisible leading-none'>Current Period</div> */}
                                                                <div className='flex gap-[16px] '>
                                                                    <div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>Last Year</div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>{PPEdata[0]?.PREV_VALUE == null || undefined ? '-' : PPEdata[0]?.PREV_VALUE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                                                                    </div>
                                                                    <div className='flex items-end'>
                                                                        <div className='bg-[#069564] flex items-center gap-1 px-[6px] 3xl:px-[0.313vw] py-[2px] 3xl:py-[0.104vw] rounded-full'>
                                                                            <img src={'/images/resources/arrow_green_up.svg'} width={25} height={11} alt='' className='w-[25px] 3xl:w-[1.458vw] h-[10px] 3xl:h-[0.573vw]' /> <span className='text-[#fff] text-[12px] 3xl:text-[0.625vw] font-normal'>{PPEdata[0]?.VARIANCE == null || undefined ? '-' : PPEdata[0]?.VARIANCE}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='relative'>
                                                    <div className='score2 w-full mt-[60px] xl:mt-[60px] 3xl:mt-[5.729vw]'>
                                                        <div className='text-[#fff] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal  text-left'>{PPEdata[1]?.METRIC_NAME}</div>
                                                        <div className='mt-[4px] xl:mt-[4px] 3xl:mt-[0.208vw] flex justify-between'>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-[#fff] leading-none'>Current Period</div> */}
                                                                <div className='text-[15px] xl:text-[20px] 3xl:text-[30px] text-[#fff] font-normal leading-none mt-[5px] 3xl:mt-[0.26vw]'>{PPEdata[1]?.VALUE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                                                            </div>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal invisible '>Current Period</div> */}
                                                                <div className='flex gap-[16px] '>
                                                                    <div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>Last Year</div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>{PPEdata[1]?.PREV_VALUE == null || undefined ? '-' : PPEdata[1]?.PREV_VALUE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                                                                    </div>
                                                                    <div className='flex items-end'>
                                                                        <div className='bg-[#069564] flex items-center gap-1 px-[6px] 3xl:px-[0.313vw] py-[2px] 3xl:py-[0.104vw] rounded-full'>
                                                                            <img src={'/images/resources/arrow_green_up.svg'} width={25} height={11} alt='' className='w-[25px] 3xl:w-[1.458vw] h-[10px] 3xl:h-[0.573vw]' /> <span className='text-[#fff] text-[12px] 3xl:text-[0.625vw] font-normal'>{PPEdata[1]?.VARIANCE == null || undefined ? '-' : PPEdata[1]?.VARIANCE}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='relative'>
                                                    <div className='score score-three w-full mt-[190px] xl:mt-[190px] 3xl:mt-[11.458vw]'>
                                                        <div className='text-[#fff] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal text-left'>{PPEdata[2]?.METRIC_NAME}</div>
                                                        <div className='mt-[4px] xl:mt-[4px] 3xl:mt-[0.208vw] flex justify-between'>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-[#fff] leading-none '>Current Period</div> */}
                                                                <div className='text-[15px] xl:text-[20px] 3xl:text-[30px] text-[#fff] font-normal leading-none mt-[5px] 3xl:mt-[0.26vw]'>{PPEdata[2]?.VALUE?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                                                            </div>
                                                            <div>
                                                                {/* <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal invisible leading-none '>Current Period</div> */}
                                                                <div className='flex gap-[16px]'>
                                                                    <div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>Last Year</div>
                                                                        <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>{PPEdata[2]?.PREV_VALUE == null || undefined ? '-' : PPEdata[2]?.PREV_VALUE}</div>
                                                                    </div>
                                                                    <div className='flex items-end'>
                                                                        <div className='bg-[#069564] flex items-center gap-1 px-[6px] 3xl:px-[0.313vw] py-[2px] 3xl:py-[0.104vw] rounded-full'>
                                                                            <img src={'/images/resources/arrow_green_up.svg'} width={25} height={11} alt='' className='w-[25px] 3xl:w-[1.458vw] h-[10px] 3xl:h-[0.573vw]' /> <span className='text-[#fff] text-[12px] 3xl:text-[0.625vw] font-normal'>{PPEdata[2]?.VARIANCE == null || undefined ? '-' : PPEdata[2]?.VARIANCE}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </LoaderContainer>
                                            {/* <div className='relative'>
                                                <div className='score2  score-four w-full mt-[330px] xl:mt-[330px] 3xl:mt-[17.188vw]'>
                                                    <div className='text-[#fff] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal'>{PPEdata[3]?.METRIC_NAME}</div>
                                                    <div className='mt-[4px] xl:mt-[4px] 3xl:mt-[0.208vw] flex justify-between'>
                                                        <div>
                                                            <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-[#fff] leading-none '>Current Period</div>
                                                            <div className='text-[15px] xl:text-[20px] 3xl:text-[30px] text-[#fff] font-normal leading-none mt-[5px] 3xl:mt-[0.26vw]'>{PPEdata[3]?.VALUE}</div>
                                                        </div>
                                                        <div>
                                                            <div className='text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal invisible leading-none '>Current Period</div>
                                                            <div className='flex gap-[16px] mt-[5px] 3xl:mt-[0.26vw]'>
                                                                <div>
                                                                    <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>Last Year</div>
                                                                    <div className='text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] '>{PPEdata[3]?.PREV_VALUE}</div>
                                                                </div>

                                                                <div className='flex items-end'>
                                                                    <div className='bg-[#069564] flex items-center gap-1 px-[6px] 3xl:px-[0.313vw] py-[2px] 3xl:py-[0.104vw] rounded-full'>
                                                                        <img src={'/images/resources/arrow_green_up.svg'} width={25} height={11} alt='' className='w-[25px] 3xl:w-[1.458vw] h-[10px] 3xl:h-[0.573vw]' /> <span className='text-[#fff] text-[12px] 3xl:text-[0.625vw] font-normal'>{PPEdata[3]?.VARIANCE}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}



                                        </div>

                                        {/* <div className='h-full relative bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] '>
                                            <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Expenses by Category</div>
                                            <ScrollPanel className='h-[460px] xl:h-[460px] 2xl:h-[420px] 3xl:h-[20.833vw] '>
                                                <div className=' w-full h-full'>
                                                    <div className='collegejoindata h-full'>
                                                        <table class='table-auto border-collapse  h-full'>
                                                            <thead className='bg-[rgba(10,22,34,0.40)] h-[40px]'>
                                                                <tr>
                                                                    <th>Category Name</th>
                                                                    <th>Category Health</th>
                                                                    <th>Allocated Budget</th>
                                                                    <th>Expense YTD</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className='bg-[rgba(71,85,104,0.40)]'>
                                                                    <td><p>Administration</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#069564] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>
                                                                </tr>
                                                                <tr className='bg-[rgba(10,22,34,0.40)]'>
                                                                    <td><p>Facilities</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#B91D59] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>

                                                                </tr>
                                                                <tr className='bg-[rgba(71,85,104,0.40)]'>
                                                                    <td><p>Fiscal Services</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#B91D59] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>

                                                                </tr>
                                                                <tr className='bg-[rgba(10,22,34,0.40)]'>
                                                                    <td><p>Food services</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#F2990E] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>

                                                                </tr>
                                                                <tr className='bg-[rgba(71,85,104,0.40)] '>
                                                                    <td><p>Transportation</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#069564] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>
                                                                </tr>
                                                                <tr className='bg-[rgba(10,22,34,0.40)]'>
                                                                    <td><p>Admin technology services</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#F2990E] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>

                                                                </tr>

                                                                <tr className='bg-[rgba(71,85,104,0.40)]'>
                                                                    <td><p>Community Services</p></td>
                                                                    <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#069564] w-[15px] h-[15px]'></div></div></td>
                                                                    <td><p>$2,345</p></td>
                                                                    <td><p>$2,005</p></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </ScrollPanel>
                                            <div className=' absolute -top-6 right-6 flex items-center gap-[8px] xl:gap-[8px] 3xl:gap-[0.417vw] text-[#fff] bg-[#2E265A] rounded-full py-[12px] xl:py-[11px] 3xl:py-[0.625vw] px-[20px] xl:px-[19px] 3xl:px-[1.042vw] w-fit text-[16px] xl:text-[16px] 3xl:text-[0.833vw] cursor-pointer'>
                                                <img src={'/images/filter.svg'} width={17} height={17} alt='manu' className='3xl:w-[0.885vw] 3xl:h-[0.885vw]' />
                                                Category
                                            </div>
                                        </div> */}
                                        <div className='expensesby-category'>
                                            <LoaderContainer loading={Expensesbycategoryloading} cssClass="h-full">
                                                <div className='h-full relative bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] ss'>
                                                    <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Expenses by Category</div>
                                                    <ScrollPanel className='h-[460px] xl:h-[460px] 2xl:h-[420px] 3xl:h-[20.833vw] '>
                                                        <div className=' w-full h-full'>
                                                            <div className='collegejoindata h-full'>
                                                                <table className='table-auto border-collapse  h-full'>
                                                                    {/* <thead className='bg-[rgba(10,22,34,0.40)] h-[40px] sticky top-0 z-10'> */}
                                                                    <thead className='bg-[rgb(10,22,34)] h-[40px] sticky top-0 z-10'>
                                                                        <tr>
                                                                            <th>Category Name</th>
                                                                            {/* <th>Category Health</th> */}
                                                                            {/* <th>Allocated Budget</th> */}
                                                                            <th>Expense YTD</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {ExpensesbycategoryFilter.map((item, index) =>
                                                                            <tr key={index}>
                                                                                <td><p>{item?.DIMENSION_NAME || ''}</p></td>
                                                                                {/* <td><div className='flex rounded-full items-center justify-center'><div className=' rounded-full bg-[#069564] w-[15px] h-[15px]'></div></div></td>
                                                                            <td><p>$2,345</p></td> */}
                                                                                <td><p>${convertToMillions(item?.VALUE) || ''}</p></td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </ScrollPanel>
                                                    <div className=' absolute -top-6 right-6 flex items-center gap-[8px] xl:gap-[8px] 3xl:gap-[0.417vw] text-[#fff] bg-[#2E265A] rounded-full py-[12px] xl:py-[11px] 3xl:py-[0.625vw] px-[20px] xl:px-[19px] 3xl:px-[1.042vw] w-fit text-[16px] xl:text-[16px] 3xl:text-[0.833vw] cursor-pointer'>
                                                        {/* <img src={'/images/filter.svg'} width={17} height={17} alt='manu' className='3xl:w-[0.885vw] 3xl:h-[0.885vw]' /> */}
                                                        <div className="flex justify-center" >
                                                            <Dropdown value={enrollment} onChange={handleEnrollment} options={options} optionLabel="name"
                                                                placeholder="View by Gender" className="w-full md:w-14rem text-xs" style={{ width: 180 }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </LoaderContainer>
                                        </div>

                                    </div>
                                </div>
                            }

                            {activeTab === 1 &&
                                <div className='mt-[30px] 3xl:mt-[1.563vw]'>
                                    <div className='grid grid-cols-2 gap-[40px] xl:gap-[40px] 3xl:gap-[2.083vw]'>
                                        <div className='bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] '>
                                            <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Projected Revenue by Sources</div>
                                            <div className=' w-full h-[400px] xl:h-[400px] 3xl:h-[20.833vw]'>
                                                <BarwithDoubleLinechart
                                                    legend={{
                                                        type: "plain",
                                                        show: true,
                                                        bottom: 5,
                                                        left: 10,
                                                        itemWidth: 10,
                                                        itemHeight: 10,
                                                        textStyle: {
                                                            color: "rgba(255, 255, 255, 1)"
                                                        }
                                                    }}
                                                    xAxisname={'$ in thousand'}
                                                    namegap={40}
                                                    nameTextStyle={{
                                                        color: "#fff",
                                                        fontSize: 12,
                                                    }}
                                                    grid={{
                                                        height: "70%",
                                                        // width: "80%",
                                                        left: "15%",
                                                        right: "2%",
                                                        top: "5%",
                                                        bottom: "0%"
                                                    }}
                                                    xAxisdata={['2013', '2014', '2015', '2016', '2017', '2018']}
                                                    xAxislabel={{
                                                        color: "#fff"
                                                    }}
                                                    xAxisline={{
                                                        show: true,
                                                        lineStyle: {
                                                            color: "#4B5563"
                                                        }
                                                    }}
                                                    xAxistick={{
                                                        show: false,
                                                        lineStyle: {
                                                            color: "rgba(255, 255, 255, 1)"
                                                        }
                                                    }}
                                                    yAxislabel={{
                                                        color: "#fff"
                                                    }}
                                                    yAxissplitline={{
                                                        show: true,
                                                        lineStyle: {
                                                            color: "#4B5563"
                                                        }
                                                    }}
                                                    yAxisline={{
                                                        show: true,
                                                        lineStyle: {
                                                            color: "#4B5563"
                                                        }
                                                    }}
                                                    yAxistick={{
                                                        show: false,
                                                        lineStyle: {
                                                            color: "rgba(255, 255, 255, 1)"
                                                        }
                                                    }}
                                                    bardata1={[270, 150, 150, 270, 470, 450]}
                                                    barcolor1={"#129C83"}
                                                    bardata2={[200, 300, 310, 100, 290, 500]}
                                                    barcolor2={"#2C4089"}
                                                    bardata3={[800, 200, 650, 300, 600, 300]}
                                                    barcolor3={"#2C82BE"}
                                                    itemStyle={{
                                                        emphasis: {
                                                            barBorderRadius: [50, 50]
                                                        },
                                                        normal: {
                                                            barBorderRadius: [4, 4, 0, 0]
                                                        }
                                                    }}
                                                    bardata4={[1500, 800, 1300, 1200, 2000, 1600]}
                                                    barcolor4={'#892C69'}
                                                    itemStyle2={{
                                                        emphasis: {
                                                            barBorderRadius: [50, 50]
                                                        },
                                                        normal: {
                                                            barBorderRadius: [4, 4, 0, 0]
                                                        }
                                                    }}
                                                    poiterdata={[[0, 1000]]}
                                                    pointerstyle={{
                                                        color: '#F2990E'   // Color of the dot (red in this case)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className='bg-[#1a2025b3] rounded-[8px] 3xl:rounded-[0.417vw] p-[24px] xl:p-[24px] 3xl:p-[1.25vw] '>
                                            <div className='mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw] text-[#fff] text-[18px] font-medium'>Revenue Breakup</div>
                                            <div className=' w-full h-[400px] xl:h-[400px] 3xl:h-[20.833vw]'>
                                                <Piechart
                                                    legend={{
                                                        orient: 'vertical',
                                                        right: '10%',
                                                        top: "center",
                                                        icon: 'circle',
                                                        itemWidth: 12,
                                                        itemHeight: 12,
                                                        textStyle: {
                                                            color: '#fff',
                                                            fontSize: 12
                                                        }
                                                    }}
                                                    name={'Access From'}
                                                    radius={['40%', '70%']}
                                                    center={['30%', '50%']}
                                                    label={{
                                                        show: true,
                                                        position: 'inside',
                                                        formatter: '{c}%',
                                                        color: '#fff'
                                                    }}
                                                    labelLine={{
                                                        show: true
                                                    }}
                                                    data={[
                                                        { value: 60, name: 'Charges for services', itemStyle: { color: '#2C82BE' } },
                                                        { value: 4, name: 'Operating grants', itemStyle: { color: '#2C4089' } },
                                                        { value: 16, name: 'Capital grants', itemStyle: { color: '#892C69' } },
                                                        { value: 20, name: 'Property taxes', itemStyle: { color: '#129C83' } },
                                                        { value: 10, name: 'State aid', itemStyle: { color: '#3A3365' } },
                                                    ]}
                                                    graphic={{
                                                        elements: [
                                                            {
                                                                type: 'text',
                                                                left: '20%',
                                                                top: 'middle',
                                                                style: {
                                                                    text: '{a|$1.3M}',
                                                                    rich: {
                                                                        a: {
                                                                            fontSize: 42
                                                                        },
                                                                    },
                                                                    textAlign: 'center',
                                                                    fill: '#fff'
                                                                }
                                                            }
                                                        ]
                                                    }}

                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div class="footer flex justify-end  p-0 mt-0">


                        <div class="mr-3">

                            <img src={k12darklogo} height="50px" width="130px" alt="logo" className="mr-[0vw]" />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
