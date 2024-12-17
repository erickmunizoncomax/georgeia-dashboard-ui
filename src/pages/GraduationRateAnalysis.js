
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Card } from 'primereact/card';
// import ReactEcharts from "echarts-for-react";
import TreadingarrowDown from '../assets/images/treading-arrow-down.png';

import { Dropdown } from 'primereact/dropdown';
import { Carousel } from 'primereact/carousel';
import { ProductService } from '../service/ProductService';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ReactEcharts from "echarts-for-react";
import TopNav from "../components/common/topnav.component";
import caretup from "../assets/images/caret-up.png";
import { TabView, TabPanel } from 'primereact/tabview';
import StudentAvatarImg from '../assets/images/student_avatar.png';
import TreadingarrowUp from '../assets/images/treading-arrow-up.png';
import k12darklogo from '../assets/images/k12-dark-logo.png';



export default function GraduationRateAnalysis(props) {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'School Type', code: 'ST' },
        { name: 'Grade Level', code: 'GL' },
        { name: 'Ethnicity', code: 'EC' },
        { name: 'Gender', code: 'GN' },
        { name: 'Homeless', code: 'HL' },
        { name: 'Economically Disadvantaged', code: 'ED' },
        { name: 'Special Ability', code: 'SA' }
    ];

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


    const TimeSeriesGraph = {
        title: {
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Graduation Rate'],
            type: "plain",
            show: true,
            top: 0,
            right: 150,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    color: "rgba(255, 255, 255, 1)"
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#000"
                    }
                },
                 axisTick: { show: false },
                splitLine: { show: false },
                data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
            }

        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 10,
                interval: 2,
                axisLabel: {
                    color: "rgba(255, 255, 255, 1)"
                },
                splitLine: { show: false },
            }
        ],
        series: [
            {
                name: 'Graduation Rate',
                type: 'line',
                symbolSize: 12,
                symbol: 'circle',
                stack: 'Graduation Rate',
                color: "#2c4089",
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                
                markLine: {
                    data: [{ type: 'average', name: 'Avg', lineStyle: { color: '#e52a85' }, }],
                  },
                data: [8, 6, 2, 1, 2, 3, 6, 6]

            },
            
        ]
    };

    const AdvancedExams = {
        legend: {
            type: "plain",
            show: true,
            bottom: 0,
            left: 50,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        },
        grid: {
            height: "65%",
            width: "85%",
            left: "10%",
            top: "10%",
            bottom: "0%"
        },
        xAxis: {
            type: 'category',
            data: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
            axisLabel: {
                color: "rgba(255, 255, 255, 1)"
            },
            minorTick: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
              },
              minorSplitLine: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
              },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
            }
        },
        yAxis: {
            type: 'value',
            max: 100,
            min: 0,
            minInterval: 50,
            axisLabel: {
                color: "rgba(226, 221, 221, 1)"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#000"
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: "#000"
                }
            }
        },
        series: [
            {
                name: 'Meeting none',
                data: [45, 40, 15, 18],
                stack: 'total',
                type: 'bar',
                barWidth: '80%',
                color: '#892C69',
            },

            {
                name: 'Meeting 2 criterias',
                data: [20, 30, 18, 30],
                stack: 'total',
                type: 'bar',
                barWidth: '80%',
                color: '#2C4089',
            },
            {
                name: 'Meeting 1 criterias',
                data: [25, 25, 20, 22],
                stack: 'total',
                type: 'bar',
                barWidth: '80%',
                color: '#2C82BE',
            },
            {
                name: 'Meeting all criterias',
                data: [10, 5, 47, 40],
                stack: 'total',
                type: 'bar',
                barWidth: '80%',
                color: '#129C83',
                // label: {
                //     show: true,
                //     position: 'inside',
                //     align: 'center',
                //     verticalAlign: 'middle',
                //     color: '#fff'
                // },
            },

        ]
    };
    const AdvancedExams1 = {
        title: {
            // text: 'World Population'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            type: "plain",
            show: true,
            bottom: 0,
            left: 50,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255, 255, 255, 1)"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: "5%",
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: "transparent"
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "transparent"
                },

            },
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',
            data: ['Other', 'White', 'Hispanic', 'Asian', 'African A.'],
            axisLabel: {
                color: "rgba(226, 221, 221, 1)"
            },
            splitLine: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "transparent"
                }
            },
        },
        series: [
            {
                name: 'Graduation ready/Graduation rate',
                type: 'bar',
                color: '#129C83',
                data: [21, 15, 2, 6, 8]
            },
            {
                name: '% Meeting attendance req',
                type: 'bar',
                color: '#2C82BE',
                data: [10, 10, 3, 7, 5]
            },
            {
                name: '% meeting credits req',
                type: 'bar',
                color: '#2C4089',
                data: [68, 23, 100, 14, 38]
            },
            {
                name: '% meeting State exam req',
                type: 'bar',
                color: '#5A37A5',
                data: [3, 85, 29, 82, 70]
            }
        ]
    };


    const GraduationRate = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                // center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: 20,
                        borderRadius: 5,
                        color: [
                            [0.25, '#6A81D1'],
                            [0.5, '#6A81D1'],
                            [0.75, '#6A81D1'],
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
                    fontSize: 20,
                    fontWeight: '500',
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '%';
                    },
                    color: '#fff'
                },
                data: [
                    {
                        value: 0.82,
                    }
                ]
            }
        ]
    };
    const CollectionTrend1 = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                // center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: 20,
                        borderRadius: 5,
                        color: [
                            [0.25, '#E32A88'],
                            [0.5, '#E32A88'],
                            [0.75, '#E32A88'],
                            [1, '#162d419e ']
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
                    fontSize: 20,
                    fontWeight: '500',
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '%';
                    },
                    color: '#fff'
                },
                data: [
                    {
                        value: 0.9,
                    }
                ]
            }
        ]
    };

    useEffect(() => {

    }, []);

    return (
        <div className="pt-0">
            <TopNav pagename = "Graduation Rate Analysis" setUserData={props.setUserData}/>
            <div className='grid grid-cols-12 mx-5 my-2 gap-2'>
                <div className="col-span-3">
                    <div className="bg-[#4a697fa6] flex justify-between items-center px-2 rounded-[5px]">
                        <div className='echart h-[120px] relative '>
                            <div className="title-text flex items-center text-white ml-2 py-2">Graduation Rate</div>
                            <div className="mt-[-20px]" >
                                <ReactEcharts option={GraduationRate} style={{ height: 150, width: 130 }} />
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-12 my-2 flex items-center">
                                <div className="col-span-8 savage-text">State Average</div>
                                <div className="col-span-4 text-md text-white px-1 font-[500]">75%</div>
                            </div>
                            <div className="grid grid-cols-12 my-2 flex items-center">
                                <div className="col-span-8 savage-text">Last Year variance</div>
                                <div className="col-span-4 bg-[#b22222] text-xs text-white px-1 rounded-full">1%<i className="pi pi-arrow-down ml-1 font-bold" style={{ fontSize: 7 }}></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="bg-[#7b546c80] flex justify-between items-center px-2 rounded-[5px]">
                        <div className='echart h-[120px] relative '>
                            <div className="title-text flex items-center text-white ml-2 py-2">Dropout Rate</div>
                            <div className="mt-[-20px]" >
                                <ReactEcharts option={CollectionTrend1} style={{ height: 150, width: 130 }} />
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-12 my-2 flex items-center">
                                <div className="col-span-8 savage-text">State Average</div>
                                <div className="col-span-4 text-md text-white px-1 font-[500]">12%</div>
                            </div>
                            <div className="grid grid-cols-12 my-2 flex items-center">
                                <div className="col-span-8 savage-text">Last Year variance</div>
                                <div className="col-span-4 bg-[#b22222] text-xs text-white px-1 rounded-full">1%<i className="pi pi-arrow-down ml-1 font-bold" style={{ fontSize: 7 }}></i></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-span-3 flex">
                    <div class="vertical mr-1" style={{ background: "linear-gradient(0deg, #1D2C4E 86%, #101B25 60%)" }}>
                        <div class="progress-bar">
                            <div class="progress-track flex justify-center">
                                <div className="">
                                    <div className="text-[28px] font-[500] text-white mt-1">96%</div>
                                    <div className="savage-text">Region 1 and 2 have the best graduation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vertical ml-1" style={{ background: "linear-gradient(0deg, #1D2C4E 56%, #101B25 50%)" }}>
                        <div class="progress-bar">
                            <div class="progress-track flex justify-center">
                                <div className="">
                                    <div className="text-[28px] font-[500] text-white mt-1">69%</div>
                                    <div className="savage-text">Advantage satisfaction Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex">
                    <div class="vertical mr-1" style={{ background: "linear-gradient(0deg, #1D2C4E 95%, #101B25 60%)" }}>
                        <div class="progress-bar">
                            <div class="progress-track flex justify-center">
                                <div className="">
                                    <div className="text-[28px] font-[500] text-white mt-1">99%</div>
                                    <div className="savage-text">Advantage satisfaction Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vertical ml-1" style={{ background: "linear-gradient(0deg, #1D2C4E 52%, #101B25 46%)" }}>
                        <div class="progress-bar">
                            <div class="progress-track flex justify-center">
                                <div className="">
                                    <div className="text-[28px] font-[500] text-white mt-1">52%</div>
                                    <div className="savage-text">Advantage satisfaction Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="studentMeasures mx-4 my-4">
                <TabView>
                    <TabPanel header="Analytical">
                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-12'>
                                <div className='chartbackdrop relative'>
                                    <p>Time Series Graph</p>
                                    <ReactEcharts option={TimeSeriesGraph} />
                                    <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'>Graduation Rate</div>
                                </div>
                            </div>
                            <div className='col-span-12 mt-3'>
                                <div className='chartbackdrop relative'>
                                    <div className='grid grid-cols-12 gap-4'>
                                        <div className='col-span-6'>
                                            <p>Cohort View</p>
                                            <ReactEcharts option={AdvancedExams} />
                                            {/* <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'>% Of Students</div> */}
                                        </div>
                                        <div className='col-span-6'>
                                            <div className="flex justify-end gradselect enrollselect" >
                                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                                    placeholder="View by Ethnicity" className="w-full md:w-14rem text-xs" style={{ width: 180 }} />
                                            </div>
                                            <p>Student Performance</p>
                                            <ReactEcharts option={AdvancedExams1} />
                                            <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'># Of Students</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Descriptive">
                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-6'>
                                <div className='chartbackdrop relative'>
                                    <p style={{ fontSize: 14, paddingLeft: 20 }}>Key Contributing Factors</p>
                                    <div className='graduationtable mt-1 mx-4'>
                                        <table class='table-auto border-collapse'>
                                            <thead className='bg-[#0b18239e] h-[40px] '>
                                                <tr>
                                                    <th><Link>Direct Factors</Link></th>
                                                    <th><Link>Measure</Link></th>
                                                    <th><Link>Correlation factor</Link></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Green Cove Spring</p></td>
                                                    <td className="text-[16px]"><p>26</p></td>
                                                    <td><p className="flex"><span className="mr-4">220</span><div className='trendingdown'><img src={TreadingarrowDown} className="" />-17</div></p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">Orange Park</p></td>
                                                    <td className="text-[16px]"><p>26</p></td>
                                                    <td><p className="flex"><span className="mr-4">223</span><div className='trendingdown'><img src={TreadingarrowDown} className="" />-23</div></p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Grove</p></td>
                                                    <td className="text-[16px]"><p>26</p></td>
                                                    <td><p className="flex"><span className="mr-4">227</span><div className='trendingdown'><img src={TreadingarrowDown} className="" />-25</div></p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">Charles</p></td>
                                                    <td className="text-[16px]"><p>26</p></td>
                                                    <td><p className="flex"><span className="mr-4">227</span><div className='trendingdown'><img src={TreadingarrowDown} className="" />-10</div></p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Lakeside</p></td>
                                                    <td className="text-[16px]"><p>26</p></td>
                                                    <td><p className="flex"><span className="mr-4">231</span><div className='trendingdown'><img src={TreadingarrowDown} className="" />-5</div></p></td>
                                                </tr>
                                            </tbody>
                                        </table>




                                    </div>
                                </div>
                            </div>

                            <div className='col-span-6'>
                                <div className='chartbackdrop relative'>
                                    <p style={{ fontSize: 14, paddingLeft: 20 }}>Key Contributing Factors</p>
                                    <div className='grid grid-cols-12 gap-4'>
                                    <div className='col-span-4'> <div className='graduationtable mt-1 mx-4'>
                                        <table class='table-auto border-collapse'>
                                            <thead className='bg-[#0b18239e] h-[40px] '>
                                                <tr>
                                                    <th><Link>Strategic Measures</Link></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Orange Park Elementary</p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">W.E. Cherry Elementary</p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Orange Park High</p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">Middleburg High</p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Clay High School</p></td>
                                                </tr>
                                            </tbody>
                                        </table>




                                    </div></div>
                                    <div className='col-span-7'> <div className='graduationtable mt-1 mx-4'>
                                        <table class='table-auto border-collapse'>
                                            <thead className='bg-[#0b18239e] h-[40px] '>
                                                <tr>
                                                    <th><Link>Immediate short term measures</Link></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Orange Park Elementary</p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">W.E. Cherry Elementary</p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Orange Park High</p></td>
                                                </tr>
                                                <tr className="bg-[0b18239e]">
                                                    <td><p className="ml-3">Middleburg High</p></td>
                                                </tr>
                                                <tr style={{ background: 'transparent' }}>
                                                    <td><p className="ml-3">Clay High School</p></td>
                                                </tr>
                                            </tbody>
                                        </table>




                                    </div></div>
                                    <div className='col-span-1'></div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            <div className="flex justify-end py-4">
                    <img src={k12darklogo} height="50px" width="130px" alt="logo" />
                </div>
        </div>
    )
}