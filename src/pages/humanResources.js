import TopNav from "../components/common/topnav.component";
import ReactEcharts from "echarts-for-react";
import caretup from "../assets/images/caret-up.png";
import workforce from "../assets/images/workforce.png";
import employeerelative from "../assets/images/employeerelative.png";
import compensation from "../assets/images/compensation.png";
import mobility from "../assets/images/mobility.png";
import assessment_icon from "../assets/images/assessment_icon.png";
import students from "../assets/images/students.png";
import student_avatar_man from "../assets/images/student_avatar_man.png";
import vacancies from "../assets/images/vacancies.png";
import completion from "../assets/images/completion.png";
import k12darklogo from '../assets/images/k12-dark-logo.png';


const AverageSalary = {
    height: '120px',
    grid: {
        left: '0%',
        right: '0%',
        top: '0',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
    },


    yAxis: [{
            type: 'category',
            data: ['Central Office', 'Principal', 'Counselor', 'Teacher', ],
            axisLine: {
                show: false,
            },
          
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "white",  inside:'true',
            },
            z:10
        },
        {
            type: 'category',
            data: ['$110 K', '$125 K', '$82 K', '$65 K'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "white", inside:'true',
            },
            z:10
        },

    ],
    series: [{
        name: 'Direct',
        type: 'bar',
        barWidth: "18px",
        barGap: "0%",
        itemStyle: {
            normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: '#4f2980',
            }
        },
        emphasis: {
            focus: 'series'
        },
        data: [820, 902, 801, 734]
    }, ]
};

const EmployeeSeperation = {
    height: '120px',
    grid: {
        left: '0',
        right: '0',
        top: '0',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
    },


    yAxis: [{
            type: 'category',
            data: ['Central Office', 'Principal', 'Counselor', 'Teacher', ],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "white",
                inside:'true'
            },
            z:10
        },
        {
            type: 'category',
            data: ['$110 K', '$125 K', '$82 K', '$65 K'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                inside:'true',
                color:'#fff'

            },
            z:10
        },

    ],
    series: [{
        name: 'Direct',
        type: 'bar',
        barWidth: "18px",
        barGap: "0%",
        itemStyle: {
            normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: '#7b285e',
            }
        },
        emphasis: {
            focus: 'series'
        },
        data: [220, 302, 201, 234]
    }, ]
};

const TeacherRetention = {
    height: '120px',
    grid: {
        left: '0',
        right: '0',
        top: '0',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
    },


    yAxis: [{
            type: 'category',
            data: ['5 Yr Exp:', '4 Yr Exp:', '3 Yr Exp:', '2 Yr Exp:', '1 Yr Exp:', ],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                inside:'true',
                color:'#fff'

            },
            z:10
        },
        {
            type: 'category',
            data: ['98%', '95%', '90%', '82%', '80%'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                inside:'true',
                color:'#fff'
            },
            z:10
        },

    ],
    series: [{
        name: 'Direct',
        type: 'bar',
        barWidth: "14px",
        barGap: "0%",
        itemStyle: {
            normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: '#7b285e',
            }
        },
        emphasis: {
            focus: 'series'
        },
        data: [320, 302, 301, 334, 298]
    }, ]
};

const Employees1 = {
    height: '50px',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    grid: {
        left: '0',
        right: '0',
        top: '0',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
    },


    yAxis: [{
            type: 'category',
            data: ['FTE/contract'],
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: "#fff",
                inside:'true'
            },
            z:10
        },
        {
            type: 'category',
            data: ['98%'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color:'#fff',
                inside:'true'
            },
            z:10
        },

    ],
    series: [{
            type: 'bar',
            stack: 'total',
            itemStyle: {
                normal: {
                    barBorderRadius: [30, 30, 30, 30],
                    color: '#2c82bd',
                }
            },
            label: {
                show: false
            },
            emphasis: {
                focus: 'series'
            },
            data: [75]
        },
        {

            type: 'bar',
            stack: 'total',
            itemStyle: {
                normal: {
                    barBorderRadius: [30, 30, 30, 30],
                    color: '#3a3365',
                }
            },
            label: {
                show: false
            },
            emphasis: {
                focus: 'series'
            },
            data: [25]
        },
    ]
};

const Employees2 = {
    height: '120px',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    grid: {
        left: '0',
        right: '0',
        top: '0',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
    },


    yAxis: [
        {
            type: 'category',
            data: ['Early Educ', 'Adult Educ.', 'K12'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#fff",
                inside:'true',
                left:'20%',
                position:'center',
                padding:30
            },
            z:10
        },
        {
            type: 'category',
            data: ['78', '50', '75'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#fff",
                inside:'true'
            },
            z:10
        },
      

    ],
    series: [{
        name: 'Teachers',
        type: 'bar',
        stack: 'total',
        barWidth: "25px",
        barGap: "0%",
        avoidLabelOverlap: false,
        itemStyle: {
            normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: '#7b285e',
            }
        },
        label: {
            show: true,
            position: 'center',
            color:'#fff',
            padding:8
        },
        emphasis: {
            focus: 'series'
        },
        data: [90, 91, 88]
    },
    {

        type: 'bar',
        barWidth: "25px",
        right:0,
        stack: 'total',
        barGap: "0%",
        itemStyle: {
            normal: {
                barBorderRadius: [30, 30, 30, 30],
                color: '#176ab7',
            }
        },
        label: {
            show: false,
        },
        emphasis: {
            focus: 'series'
        },
        data: [10,9,12],
    }, ]
};

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
                    width: 15,
                    color: [
                        [0.25, '#552c89'],
                        [0.5, '#552c89'],
                        [0.75, '#552c89'],
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
                    value: 0.78,
                }
            ]
        }
    ]
};


export default function Humanresources(props) {

    return (
        <div className="">
            <TopNav pagename = "Human Resources" setUserData={props.setUserData}/>
            <div className="px-1 top-[10px] relative">
                {/* first row */}
                <div className="relative z-10 px-4"> {/*-mb-7 */}
                    <div className="grid grid-cols-12">
                        <div className="col-span-7">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-3">
                                    <div className="bg-[rgb(12,27,40)] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={workforce} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Teachers</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">% With National Board Certification</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">76%</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="bg-[rgb(12,27,40)] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={workforce} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Teachers</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">% With National Board Certification</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">16%</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="bg-[rgb(12,27,40)] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={workforce} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Teachers</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">Substitute Placement Rate</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">8%</div>
                                            <div className="bg-[#d9685b] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-3">
                                    <div className="bg-[#0e2521] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={employeerelative} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Advantage satisfaction Score</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">Teacher</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-lg font-semibold">76%</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="bg-[#0e2521] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={employeerelative} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Advantage satisfaction Score</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">Counselors</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-lg font-semibold">3.5 / 5</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="bg-[#0e2521] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={employeerelative} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Advantage satisfaction Score</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">Principals</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-lg font-semibold">4.1 / 5</div>
                                            <div className="bg-[#d9685b] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="bg-[#0e2521] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pt-8 rounded h-full relative">
                                        <div className="absolute -top-[22px] left-0 right-0"><img src={employeerelative} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-[9px] text-white opacity-70">Advantage satisfaction Score</div>
                                        <div className="text-sm text-white opacity-70 mt-1 min-h-[40px]">Central Office</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-lg font-semibold">3.8 / 5</div>
                                            <div className="bg-[#d9685b] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* first row end */}

                <div className="px-4 relative z-10 pt-7">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-3">
                                    <div className="bg-[#1b1422] p-2 ">
                                        <div className="text-white text-sm mb-1">Average Tenure</div>
                                        <div className="space-y-3 average-tenure">
                                            <div className="bg-[#4797d0] p-1 flex justify-between selected cursor-pointer">
                                                <div className="text-white text-xs">5 year</div>
                                                <div className="text-white text-xs">Counselor</div>
                                            </div>
                                            <div className="bg-[#4797d0] p-1 flex justify-between cursor-pointer">
                                                <div className="text-white text-xs">Teacher</div>
                                                <div className="text-white text-xs">3 year</div>
                                            </div>
                                            <div className="bg-[#4797d0] p-1 flex justify-between cursor-pointer">
                                                <div className="text-white text-xs">Teacher</div>
                                                <div className="text-white text-xs">3 year</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    <div className="text-white text-sm mb-1">Assesment</div>
                                    <div className="assesment-table relative pl-11">
                                    <div className="bg-[#0c1b28] text-white -rotate-90 absolute left-0 bottom-[20px] p-3 py-2 text-xs">Potential</div>
                                        <table cellPadding={0} cellSpacing={0} className="w-full">
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td colSpan={3} align="center" className="bg-[#0c1b28] text-white">Performance Level</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td align="center" className="bg-[#24384c] text-white">Under</td>
                                                <td align="center" className="bg-[#24384c] text-white">Effective</td>
                                                <td align="center" className="bg-[#24384c] text-white">Oustanding</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td align="center" className="bg-[#24384c] text-white">High</td>
                                                <td align="center" className="bg-[#4797d0] text-white">6%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">5%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">5%</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td align="center" className="bg-[#24384c] text-white">Medium</td>
                                                <td align="center" className="bg-[#4797d0] text-white">6%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">8%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">5%</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td align="center" className="bg-[#24384c] text-white">Low</td>
                                                <td align="center" className="bg-[#4797d0] text-white">3%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">12%</td>
                                                <td align="center" className="bg-[#4797d0] text-white">5%</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="flex justify-end space-x-4">
                                <div className="w-full max-w-[150px]">
                                    <div><img src={assessment_icon} className="max-w-[24px] mb-2" alt="" /></div>
                                    <div className="text-white text-xs">Discrimination Complaints</div>
                                    <div class="text-white opacity-90 text-2xl font-semibold">145%</div>
                                    <div className="bg-[#9f2d2d] text-xs text-white px-1 rounded-full inline-block"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" /> 1%</div>
                                </div>
                                <div className="w-full max-w-[150px]">
                                    <div><img src={assessment_icon} className="max-w-[24px] mb-2" alt="" /></div>
                                    <div className="text-white text-xs">Misconduct Investigations</div>
                                    <div class="text-white opacity-90 text-2xl font-semibold">89%</div>
                                    <div className="bg-[#9f2d2d] text-xs text-white px-1 rounded-full inline-block"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" /> 1%</div>
                                </div>
                                <div className="w-full max-w-[150px]">
                                    <div><img src={assessment_icon} className="max-w-[24px] mb-2" alt="" /></div>
                                    <div className="text-white text-xs">Avg Time Spent on Professional Development</div>
                                    <div class="text-white opacity-90 text-2xl font-semibold">52%</div>
                                    <div className="bg-[#9f2d2d] text-xs text-white px-1 rounded-full inline-block"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" /> 1%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 relative z-10 pt-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-4">
                                    <div className="bg-[#0b1925] p-2 ">
                                        <div className="text-white text-sm mb-1">Average Salary</div>
                                        <div className="h-full">
                                            <ReactEcharts option={AverageSalary} style={{ height: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    <div className="flex space-x-5">
                                        <div className="">
                                            <div><ReactEcharts option={pieChart1} style={{ height: '100%' }} /></div>
                                            <div className="flex items-center justify-center mt-[-30px]">
                                                <div className="bg-[#9f2d2d] text-xs text-white px-1 rounded-full inline-block"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" /> 1%</div>
                                            </div>
                                            <div className="text-white text-[12px] mt-1 text-center">Benefits Cost per Employee</div>
                                        </div>
                                        <div className="w-full max-w-[100px]">
                                            <div><img src={assessment_icon} className="max-w-[24px] mb-2" alt="" /></div>
                                            <div className="text-white text-xs">Benefits Cost per Employee</div>
                                            <div class="text-white opacity-90 text-2xl font-semibold">$8765</div>
                                            <div className="bg-[#9f2d2d] text-xs text-white px-1 rounded-full inline-block"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" /> 1%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-start-3 col-span-5">
                                    <div className="bg-[#2d0c22] p-2">
                                        <div className="text-white text-sm mb-1">Employee Seperation</div>
                                        <div className="h-full">
                                            <ReactEcharts option={EmployeeSeperation} style={{ height: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    <div className="bg-[#2d0c22] p-2">
                                        <div className="text-white text-sm mb-1">Teacher Retention</div>
                                        <div className="h-full">
                                            <ReactEcharts option={TeacherRetention} style={{ height: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full absolute left-0 right-0 top-[110px]">
                    <div className="donut-chart-wrap w-full relative">
                        <div className="flex flex-wrap h-full grid grid-cols-2">
                            <div id="part1" className="portion-block">
                                <div class="quarter-circle-top-left">
                                    <div class="label-container">
                                        <div class="label">Workforce</div>
                                    </div>
                                </div>
                            </div>
                            <div id="part2" class="portion-block">
                                <div class="quarter-circle-top-right">
                                    <div class="label-container">
                                        <div class="label">Employee Relations</div>
                                    </div>
                                </div>
                            </div>
                            <div id="part3" class="portion-block">
                                <div class="quarter-circle-bottom-left">
                                    <div class="label-container">
                                        <div class="label">Compensation</div>
                                    </div>
                                </div>
                            </div>
                            <div id="part4" class="portion-block">
                                <div class="quarter-circle-bottom-right">
                                    <div class="label-container">
                                        <div class="label">Mobility</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 left-[60px] right-0 flex items-center justify-center z-10 h-full">
                            <div className="center-component">
                                <div className="flex items-start space-x-2">
                                    <div><img src={students} className="max-w-[48px]" alt="" /></div>
                                    <div>
                                        <div className="text-xs text-[#51629e]">Employees</div>
                                        <div className="text-lg text-[#51629e] font-semibold">35,253</div>
                                    </div>
                                </div>
                                <div className=" w-full px-8">
                                    
                                        <div><ReactEcharts option={Employees1} style={{ height: '30px', width: '100%' }} /></div>
                                    

                                     
                                    
                                </div>
                                <div className="flex justify-between w-full px-10">
                                    <div className="text-xs text-[#c3c3c3]">Teacher</div>
                                    <div className="text-xs text-[#c3c3c3]">Administrators</div>
                                </div>
                                <div className="w-full px-6">  <ReactEcharts option={Employees2} style={{ height: '100%', width: '100%' }} /></div>
                                <div className="flex justify-between w-full px-10">
                                    <div className="text-[9px] text-[#2f438b]">Student/Teacher Ratio</div>
                                    <div className="text-[9px] text-[#2f438b]">Teacher to Non-Teaching Ratio</div>
                                </div>

                                <div className="flex justify-between w-full px-16 mt-2">
                                    <div className="">
                                        <div className="flex flex-wrap max-w-[50px] gap-y-[1px]">
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                        </div>
                                        <div className="text-[#435596] text-sm">16:1</div>
                                    </div>
                                    <div className="">
                                        <div className="flex flex-wrap max-w-[50px] gap-y-[1px]">
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                            <div><img src={student_avatar_man} className="max-w-[7px]" alt="" /></div>
                                        </div>
                                        <div className="text-[#435596] text-sm">12:1</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* second row end */}

                <div className="pt-4"> {/* -mt-7 */}
                    <div className="grid grid-cols-12">
                        <div className="col-span-7">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-4">
                                    <div className="bg-[#1f1245] shadow-[1px_2px_3px_rgba(17,17,17)] pb-8 p-2 rounded h-full relative">
                                        <div className="absolute -bottom-[22px] left-0 right-0"><img src={compensation} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-sm text-white mt-1">HR Cost per Direct FTE</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">$ 65</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full">1% <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="bg-[#1f1245] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pb-8 rounded h-full relative">
                                        <div className="absolute -bottom-[22px] left-0 right-0"><img src={compensation} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-sm text-white mt-1">HR Cost per Direct Student</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">$ 198</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full">1% <img src={caretup} width={5} height={5} className="inline-block ml-1" alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-4">
                                    <div className="bg-[#2d0c22] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pb-8 rounded h-full relative">
                                        <div className="absolute -bottom-[22px] left-0 right-0"><img src={mobility} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-sm text-white mt-1">Teacher Mobility</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">145</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />2%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="bg-[#2d0c22] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pb-8 rounded h-full relative">
                                        <div className="absolute -bottom-[22px] left-0 right-0"><img src={vacancies} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-sm text-white mt-1"># of Vacancies</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">89%</div>
                                            <div className="bg-[#d9685b] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />1%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="bg-[#2d0c22] shadow-[1px_2px_3px_rgba(17,17,17)] p-2 pb-8 rounded h-full relative">
                                        <div className="absolute -bottom-[22px] left-0 right-0"><img src={completion} className="max-w-[48px] mx-auto" alt="" /></div>
                                        <div className="text-sm text-white mt-1">Exit Interview Completion</div>
                                        <div className="flex items-center space-x-5">
                                            <div className="text-white opacity-90 text-2xl font-semibold">88%</div>
                                            <div className="bg-[#129c83] text-xs text-white px-1 rounded-full"><img src={caretup} width={5} height={5} className="inline-block mr-1" alt="" />2%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* last row end */}
            </div>
            <div className="py-4 flex justify-end pt-12">
                    <img src={k12darklogo} height="50px" width="130px" alt="logo" />
                </div>
        </div >
    )
}