import TopNav from "../components/common/topnav.component";
import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Carousel } from 'primereact/carousel';
import { ProductService } from '../service/ProductService';
import assessment_icon from "../assets/images/assessment_icon.png";
import studentEngagement from "../assets/images/studentEngagement.png";
import graduation from "../assets/images/graduation.png";
import ensureSchoolSafety from "../assets/images/ensureSchoolSafety.png";
import attendance from "../assets/images/attendance.png";
import timer from "../assets/images/timer.png";
import TreadingarrowDown from '../assets/images/treading-arrow-down.png';
import TreadingarrowUp from '../assets/images/treading-arrow-up.png';
import bullseye from '../assets/images/bullseye.svg';
import clock from '../assets/images/clock.svg';
import coins from '../assets/images/coins.svg';
import k12darklogo from '../assets/images/k12-dark-logo.png';



const pieChart1 = {
    series: [
        {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
                roundCap: true,
                lineStyle: {
                    width: 12,
                    color: [
                        [0.25, '#197a71'],
                        [0.5, '#197a71'],
                        [0.75, '#197a71'],
                        [1, '#162d419e']
                    ]
                }
            },
            pointer: {

                length: '1%',
                width: 0,

            },
            axisTick: {
                length: 0,
            },
            splitLine: {
                length: 0,

            },
            axisLabel: {
                show: false
            },

            detail: {
                fontSize: 16,
                fontWeight: '500',
                offsetCenter: [0, '0%'],
                valueAnimation: true,
                formatter: function (value) {
                    return Math.round(value * 100) + '%';
                },
                color: '#3a3365'
            },
            data: [
                {
                    value: 0.82,
                }
            ]
        }
    ]
};

const Budget = {
    grid: {
        left: '0',
        right: '0',
        top: '30%',
        bottom: '20%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            show: false
        },

        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    series: [
        {
            data: [0, 150, 200, 10, 100, 0],
            symbolSize: 10,
            itemStyle: {
                color: 'rgb(18, 156, 131)',
            },
            lineStyle: {
                width: 3,
            },
            type: 'line',
            smooth: true
        }
    ]
};

export default function Districtgoals(props) {

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

    const outcomes = (product) => {
        return (
            <div className="mx-2">
                <div className='bg-[#081630] rounded-md text-white overflow-hidden selected_col'>
                    <div className='text-sm min-h-[60px] px-3 pt-3'>
                        <div className="flex gap-1">
                            <i className="pi pi-flag-fill text-[#d9685b] pt-[5px]"></i> Increase Schools with Discipline Foundation Policy Implemented
                        </div>
                    </div>
                    <div className='grid grid-cols-12 px-3'>
                        <div className='col-span-4'>
                            <span className="text-xs font-[300] ">Current Period </span>
                            <p className="text-md font-[600]"> 62.7%</p>
                            <div className='trendingup mt-1'><img src={TreadingarrowUp} className="" />19.3%</div>
                        </div>
                        <div className='col-span-8'>
                            <div className='flex justify-start items-center'>
                                <span className="text-xs font-[300]  mx-2">Target </span>
                                <p className="text-md"> 75%</p>
                                <div className='trendingup ml-2'><img src={TreadingarrowUp} className="" />19.3%</div>
                            </div>
                            <div className='flex justify-start items-center'>
                                <span className="text-xs font-[300]  mx-2">Last Period </span>
                                <p className="text-md"> 43.3%</p>
                                <div className='trendingdown ml-2'><img src={TreadingarrowDown} className="" />-17</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 selectedChart">
                        <ReactEcharts option={Budget} style={{ height: '50%', width: '100%', }} />
                    </div>
                </div>
            </div>
        );
    };

    const actionService = (product) => {
        return (
            <div className="mx-2">
                <div className='bg-white rounded-md text-[#000000] p-3 overflow-hidden selected_col'>
                    <div className='text-sm min-h-[50px] font-light'>Increase Math &  ELA EAP Proficiency</div>
                    <div className='grid grid-cols-12 gap-y-2'>
                        <div className="col-span-12">
                            <div className="flex space-x-2">
                                <div><img src={coins} width="35" alt="" /></div>
                                <div className="">
                                    <div className="text-xs font-light">Amount</div>
                                    <div className="text-xs font-light">261</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex space-x-2">
                                <div><img src={bullseye} width="30" alt="" /></div>
                                <div className="">
                                    <div className="text-xs font-light">Target</div>
                                    <div className="text-xs font-light">All</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex space-x-2">
                                <div><img src={clock} width="30" alt="" /></div>
                                <div className="">
                                    <div className="text-xs font-light">Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <TopNav pagename = "District Goal & Strategy" setUserData={props.setUserData}/>
            <div className="px-1">
                <div className="bg-color-1 p-3 mb-10 h-full max-h-[260px]">
                    <div className="text-base text-white leading-none">Goal: 100% Graduation</div>
                    <div className="text-xs text-white">This goal targets students across all subgroups within our district to progress towards 100% Graduation in next 4 years</div>
                    <div className="px-9 mt-8">
                        <div className="grid grid-cols-5 gap-2 custRow">
                            <div className="bg-[#110d14] rounded text-[#cdcbd5] px-2 py-1">
                                <div className="flex items-start justify-between gap-4 min-h-[50px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="assessment_icon"><img src={assessment_icon} alt="" /></div>
                                        <div className="text-sm">Proficiency for All</div>
                                    </div>
                                    <div className="text-xs">Goals #1</div>
                                </div>
                                <div className="bg-color-2 rounded overflow-hidden relative">
                                    <div className="bg-[rgb(18,156,131)] w-full max-w-[60%] text-xs p-2">Progress</div>
                                    <div className="text-xs absolute right-[10px] top-[10px]">60%</div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <div className="text-xs">Actual Expense</div>
                                    <div>$0.83million</div>
                                </div>
                                <div className="showHide">
                                    <div className="flex items-start justify-center space-x-4 mt-3">
                                        <div>
                                            <div className="flex items-end space-x-3">
                                                <div className="text-xs">Budget</div>
                                                <div className="timer_icon"><img src={timer} alt="" /></div>
                                            </div>
                                            <div className="text-md mt-1">1.38Million</div>
                                        </div>
                                        <div>
                                            <ReactEcharts option={pieChart1} style={{ height: '70px', width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#110d14] rounded text-[#cdcbd5] px-2 py-1 selected">
                                <div className="flex items-start justify-between gap-4 min-h-[50px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="assessment_icon"><img src={studentEngagement} alt="" /></div>
                                        <div className="text-sm">Parent Community & Student Engagement</div>
                                    </div>
                                    <div className="text-xs">Goals #1</div>
                                </div>
                                <div className="bg-color-2 rounded overflow-hidden relative">
                                    <div className="bg-[rgb(18,156,131)] w-full max-w-[56%] text-xs p-2">Progress</div>
                                    <div className="text-xs absolute right-[10px] top-[10px]">56%</div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <div className="text-xs">Actual Expense</div>
                                    <div>$0.33million</div>
                                </div>
                                <div className="showHide">
                                    <div className="flex items-start justify-center space-x-4 mt-3">
                                        <div>
                                            <div className="flex items-end space-x-3">
                                                <div className="text-xs">Budget</div>
                                                <div className="timer_icon"><img src={timer} alt="" /></div>
                                            </div>
                                            <div className="text-md mt-1">1.38Million</div>
                                        </div>
                                        <div>
                                            <ReactEcharts option={pieChart1} style={{ height: '70px', width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#110d14] rounded text-[#cdcbd5] px-2 py-1">
                                <div className="flex items-start justify-between gap-4 min-h-[50px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="assessment_icon"><img src={graduation} alt="" /></div>
                                        <div className="text-sm">100% Graduation</div>
                                    </div>
                                    <div className="text-xs">Goals #1</div>
                                </div>
                                <div className="bg-color-2 rounded overflow-hidden relative">
                                    <div className="bg-[rgb(18,156,131)] w-full max-w-[66%] text-xs p-2">Progress</div>
                                    <div className="text-xs absolute right-[10px] top-[10px]">66%</div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <div className="text-xs">Actual Expense</div>
                                    <div>$0.94million</div>
                                </div>
                                <div className="showHide">
                                    <div className="flex items-start justify-center space-x-4 mt-3">
                                        <div>
                                            <div className="flex items-end space-x-3">
                                                <div className="text-xs">Budget</div>
                                                <div className="timer_icon"><img src={timer} alt="" /></div>
                                            </div>
                                            <div className="text-md mt-1">1.38Million</div>
                                        </div>
                                        <div>
                                            <ReactEcharts option={pieChart1} style={{ height: '70px', width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#110d14] rounded text-[#cdcbd5] px-2 py-1">
                                <div className="flex items-start justify-between gap-4 min-h-[50px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="assessment_icon"><img src={ensureSchoolSafety} alt="" /></div>
                                        <div className="text-sm">Ensure School Safety</div>
                                    </div>
                                    <div className="text-xs">Goals #1</div>
                                </div>
                                <div className="bg-color-2 rounded overflow-hidden relative">
                                    <div className="bg-[rgb(18,156,131)] w-full max-w-[88%] text-xs p-2">Progress</div>
                                    <div className="text-xs absolute right-[10px] top-[10px]">88%</div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <div className="text-xs">Actual Expense</div>
                                    <div>$0.49million</div>
                                </div>
                                <div className="showHide">
                                    <div className="flex items-start justify-center space-x-4 mt-3">
                                        <div>
                                            <div className="flex items-end space-x-3">
                                                <div className="text-xs">Budget</div>
                                                <div className="timer_icon"><img src={timer} alt="" /></div>
                                            </div>
                                            <div className="text-md mt-1">1.38Million</div>
                                        </div>
                                        <div>
                                            <ReactEcharts option={pieChart1} style={{ height: '70px', width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#110d14] rounded text-[#cdcbd5] px-2 py-1">
                                <div className="flex items-start justify-between gap-4 min-h-[50px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="assessment_icon"><img src={attendance} alt="" /></div>
                                        <div className="text-sm">100% Attendance</div>
                                    </div>
                                    <div className="text-xs">Goals #1</div>
                                </div>
                                <div className="bg-color-2 rounded overflow-hidden relative">
                                    <div className="bg-[rgb(18,156,131)] w-full max-w-[65%] text-xs p-2">Progress</div>
                                    <div className="text-xs absolute right-[10px] top-[10px]">65%</div>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-3">
                                    <div className="text-xs">Actual Expense</div>
                                    <div>$0.74million</div>
                                </div>
                                <div className="showHide">
                                    <div className="flex items-start justify-center space-x-4 mt-3">
                                        <div>
                                            <div className="flex items-end space-x-3">
                                                <div className="text-xs">Budget</div>
                                                <div className="timer_icon"><img src={timer} alt="" /></div>
                                            </div>
                                            <div className="text-md mt-1">1.38Million</div>
                                        </div>
                                        <div>
                                            <ReactEcharts option={pieChart1} style={{ height: '70px', width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="districtgoals_tab mt-20 px-4">
                    <TabView>
                        <TabPanel header="Outcomes">
                            <div className="outcome_slider slider_indicators_hide">
                                <Carousel value={products} numScroll={1} numVisible={5} responsiveOptions={responsiveOptions} itemTemplate={outcomes} />
                            </div>
                        </TabPanel>
                        <TabPanel header="Action / Service">
                            <div className="slider_indicators_hide">
                                <Carousel value={products} numScroll={1} numVisible={5} responsiveOptions={responsiveOptions} itemTemplate={actionService} />
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
                <div className="flex justify-end py-4">
                    <img src={k12darklogo} height="50px" width="130px" alt="logo" />
                </div>
            </div>
        </div >
    )
}