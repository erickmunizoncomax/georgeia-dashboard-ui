import { Link, useNavigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import ProgressBar from "@ramonak/react-progress-bar";
import TopNav from "../components/common/topnav.component";
import { TabView, TabPanel } from 'primereact/tabview';
import CaretarrowUp from '../assets/images/caret-arrow-up.png';
import TreadingarrowUp from '../assets/images/treading-arrow-up.png';
import TreadingarrowDown from '../assets/images/treading-arrow-down.png';
import StrictdressCode from '../assets/images/strict-dress-code.svg';
import ControlledaccessSchools from '../assets/images/controlled-access-to-schools.svg';
import FacultyBadges from '../assets/images/faculty-badges.svg';
import RandomdogSniff from '../assets/images/random-dog-sniff.svg';
import StudentIDs from '../assets/images/student-IDs.svg';
import SecurityCameras from '../assets/images/security-cameras.svg';
import MetaldetectorChecks from '../assets/images/metal-detector-checks.svg';


const MediumLevel={
    tooltip: {},
  legend: {
    top:'10',
    left:'10',
    icon: "circle",
    width:'400',
    textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 10
      }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top:'0%',
    width:'100%',
    height:'200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show:false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show:false
  },
  series: [
    {
      name: 'Bord L2 2018:534',
      type: 'bar',
      stack: 'total',
      color:'#8a2c6a',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: true,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: [800]
    },
    {
      name: 'Inappropriate Conduct (L2) 2018:656',
      type: 'bar',
      stack: 'total',
      color:'#129c83',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: true,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      },
      data: [200]
    }
  ]
};

const MediumLevellineArea={
    legend: {
        top:'110',
        right:'10',
        icon: "circle",
        textStyle: {
            color: "rgba(255, 255, 255, 1)",
            fontSize: 10
          }
      },
    grid: {
      left: '-10%',
      right: '0%',
      bottom: '0%',
      top:'20%',
      width:'120%',
      height:'100%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show:'false',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show:'false',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name:'Confront',
        data: [100,100,100,100,100,100,100,],
        type: 'line',
        linewidth:'40px',
        areaStyle: {}
      }
    ]
  };


  const MajorSeverity={
    tooltip: {},
  legend: {
    top:'10',
    left:'10',
    icon: "circle",
    width:'400',
    textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 10
      }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top:'0%',
    width:'100%',
    height:'200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show:false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show:false
  },
  series: [
    {
      name: 'Tabacco (S3)',
      type: 'bar',
      stack: 'total',
      color:'#8a2c6a',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [1000]
    },
    {
      name: 'Inapprop use of Technology (L3)',
      type: 'bar',
      stack: 'total',
      color:'#129c83',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [0]
    }
  ]
};


  const MajorseverityArea={
    legend: {
        top:'110',
        right:'10',
        icon: "circle",
        textStyle: {
            color: "rgba(255, 255, 255, 1)",
            fontSize: 10
          }
      },
    grid: {
      left: '-10%',
      right: '0%',
      bottom: '0%',
      top:'20%',
      width:'120%',
      height:'100%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show:'false',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show:'false',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name:'Bd Emp(L3)',
        data: [100,100,100,100,100,100,120,],
        type: 'line',
        linewidth:'40px',
        areaStyle: {}
      }
    ]
  };

  const Minorclassroom={
    tooltip: {},
  legend: {
    top:'10',
    left:'10',
    icon: "circle",
    width:'400',
    textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 10
      }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top:'0%',
    width:'100%',
    height:'200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show:false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show:false
  },
  series: [
    {
      name: '',
      type: 'bar',
      stack: 'total',
      color:'#8a2c6a',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [300]
    },
    {
      name: 'Behavior incident Tracking (L10)',
      type: 'bar',
      stack: 'total',
      color:'#5470c6',
      itemStyle: {
        emphasis: {
            barBorderRadius: [50, 50]
        },
        normal: {
            barBorderRadius: [50, 50, 50 ,50 ]
        }
    },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [900]
    }
  ]
};


const MinorclassroomArea={
  legend: {
      top:'110',
      right:'10',
      icon: "circle",
      textStyle: {
          color: "rgba(255, 255, 255, 1)",
          fontSize: 10
        }
    },
  grid: {
    left: '-10%',
    right: '0%',
    bottom: '0%',
    top:'20%',
    width:'120%',
    height:'100%',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show:'false',
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    show:'false',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name:'Violation of Behaviour Contract',
      data: [120,120,120,120,120,100,100,],
      type: 'line',
      linewidth:'40px',
      areaStyle: {}
    }
  ]
};


const MinorSeverity={
  tooltip: {},
legend: {
  top:'10',
  left:'10',
  icon: "circle",
  width:'400',
  textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
},
grid: {
  left: '0%',
  right: '0%',
  bottom: '3%',
  top:'0%',
  width:'100%',
  height:'200%',
  containLabel: true
},
xAxis: {
  type: 'value',
  show:false
},
yAxis: {
  type: 'category',
  // data: ['2018 534' ],
  show:false
},
series: [
  {
    name: 'Violation of classroom Rule (L1)',
    type: 'bar',
    stack: 'total',
    color:'#8a2c6a',
    barWidth: '20px',
    itemStyle: {
      emphasis: {
          barBorderRadius: [50, 50]
      },
      normal: {
          barBorderRadius: [50, 50, 50 ,50 ]
      }
  },
    label: {
      show: false
    },
    emphasis: {
      focus: 'series'
    },
    data: [700]
  },
  {
    name: 'Tardy (L1)',
    type: 'bar',
    stack: 'total',
    color:'#5470c6',
    itemStyle: {
      emphasis: {
          barBorderRadius: [50, 50]
      },
      normal: {
          barBorderRadius: [50, 50, 50 ,50 ]
      }
  },
    label: {
      show: false
    },
    emphasis: {
      focus: 'series'
    },
    data: [300]
  }
]
};

const MinorSeverityArea={
  legend: {
      top:'110',
      right:'10',
      icon: "circle",
      textStyle: {
          color: "rgba(255, 255, 255, 1)",
          fontSize: 10
        }
    },
  grid: {
    left: '-10%',
    right: '0%',
    bottom: '0%',
    top:'20%',
    width:'120%',
    height:'100%',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show:'false',
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    show:'false',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name:'Skip School-Not no Campus (L2)',
      data: [100,100,100,100,100,100,100,],
      type: 'line',
      linewidth:'40px',
      areaStyle: {}
    }
  ]
};

const Severeseverity={
  tooltip: {},
legend: {
  top:'10',
  left:'10',
  icon: "circle",
  width:'400',
  textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
},
grid: {
  left: '0%',
  right: '0%',
  bottom: '3%',
  top:'0%',
  width:'100%',
  height:'200%',
  containLabel: true
},
xAxis: {
  type: 'value',
  show:false
},
yAxis: {
  type: 'category',
  // data: ['2018 534' ],
  show:false
},
series: [
  {
    name: 'Drug Use Possess exc alc(S4)',
    type: 'bar',
    stack: 'total',
    color:'#8a2c6a',
    barWidth: '20px',
    itemStyle: {
      emphasis: {
          barBorderRadius: [50, 50]
      },
      normal: {
          barBorderRadius: [50, 50, 50 ,50 ]
      }
  },
    label: {
      show: false
    },
    emphasis: {
      focus: 'series'
    },
    data: [1000]
  },
  {
    name: 'Alcohol (S4)',
    type: 'bar',
    stack: 'total',
    color:'#5470c6',
    itemStyle: {
      emphasis: {
          barBorderRadius: [50, 50]
      },
      normal: {
          barBorderRadius: [50, 50, 50 ,50 ]
      }
  },
    label: {
      show: false
    },
    emphasis: {
      focus: 'series'
    },
    data: [0]
  }
]
};

const SevereseverityArea={
  legend: {
      top:'110',
      right:'10',
      icon: "circle",
      textStyle: {
          color: "rgba(255, 255, 255, 1)",
          fontSize: 10
        }
    },
  grid: {
    left: '-10%',
    right: '0%',
    bottom: '0%',
    top:'20%',
    width:'120%',
    height:'100%',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show:'false',
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    show:'false',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name:'Weapon Possession (S4)',
      data: [100,110,120,100,100,100,110,],
      type: 'line',
      linewidth:'40px',
      areaStyle: {}
    }
  ]
};





export default function studentbehaviour(props) {
    
    
    return (
        <div className=''>
            <TopNav setUserData={props.setUserData}/>
            <div className='district-Neighborhood mx-4 my-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                <div className='districtclimaterating'>
                <div className='score'><span>SCORE</span><h4>B</h4></div>
                <div className='dist-data space-y-2'>
                <h5>District Climate Rating</h5>
                <div className='border-b-[1px] border-[#2c4089]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p>% of students with suspensions</p></div>
                <div className='col-span-2'><p>8874</p></div>
                </div>
                </div>
                <div className='border-b-[1px] border-[#2c4089]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p># of students with multiple suspensions</p></div>
                <div className='col-span-2'><p>1379</p></div>
                </div>
                </div>
                <div className='border-b-[1px] border-[#2c4089]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p># of Expulsions</p></div>
                <div className='col-span-2'><p>4</p></div>
                </div>
                </div>
                </div>
                </div>
              </div>

              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                <div className='neighborhoodcrimeindex'>
                <div className='score'><span>SCORE</span><h4>B</h4></div>
                <div className='dist-data space-y-2'>
                <h5>Neighborhood crime index</h5>
                <div className='border-b-[1px] border-[#129c83]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p>Crime index</p></div>
                <div className='col-span-2'><p>113</p></div>
                </div>
                </div>
                <div className='border-b-[1px] border-[#129c83]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p># of Property crimes</p></div>
                <div className='col-span-2'><p>67</p></div>
                </div>
                </div>
                <div className='border-b-[1px] border-[#129c83]'>
                <div className='grid grid-cols-12'>
                <div className='col-span-10'><p># of Violent crimes</p></div>
                <div className='col-span-2'><p>20</p></div>
                </div>
                </div>
                </div>
                </div>
              </div>

            </div>       
            </div>


            <div className="incidents-measures mx-4 my-4">
            <TabView>
            <TabPanel header="Incidents Summary">
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='incimea-box'>
                        <h4># of Medium level (Severity 2) incidents</h4>
                        <div className='flex px-4 items-center'>
                            <div className=''><p>1659</p></div>
                            <div className='uptolasty'><img src={CaretarrowUp} className=""/> 1659 upto Last Year</div>
                        </div>
                        <div className='echartMediumLevellineArea'><ReactEcharts option={MediumLevellineArea} style={{ height: '100%', width: '100%', }} /></div>
                        
                        <div className='echartMediumLevel'>
                         
                        <ReactEcharts option={MediumLevel} style={{ height: '100%', width: '100%', }} /></div>
                        <div className="flex justify-between items-center" >
                            <div className="text-xl text-white">255</div>
                            <div className="text-xl text-white">255</div>
                            <div className="text-xl text-white">255</div>
                          </div>
                    </div>
                </div>
                <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='incimea-box'>
                        <h4># of Major (Severity 3) incidents</h4>
                        <div className='flex px-4 items-center'>
                            <div className=''><p>153</p></div>
                            <div className='uptolasty'><img src={CaretarrowUp} className=""/> 153 upto Last Year</div>
                        </div>
                        <div className='echartMediumLevellineArea'><ReactEcharts option={MajorseverityArea} style={{ height: '100%', width: '100%', }} /></div>
                        <div className='echartMediumLevel'><ReactEcharts option={MajorSeverity} style={{ height: '100%', width: '100%', }} /></div>
                    </div>
                </div>                
                <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='incimea-box'>
                        <h4># of Minor classroom (Severity 0) incidents</h4>
                        <div className='flex px-4 items-center'>
                            <div className=''><p>146</p></div>
                            <div className='uptolasty'><img src={CaretarrowUp} className=""/> 146 upto Last Year</div>
                        </div>
                        <div className='echartMediumLevellineArea'><ReactEcharts option={MinorclassroomArea} style={{ height: '100%', width: '100%', }} /></div>
                        <div className='echartMediumLevel'><ReactEcharts option={Minorclassroom} style={{ height: '100%', width: '100%', }} /></div>
                    </div>
                </div>
                <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='incimea-box'>
                        <h4># of Minor (Severity 1) incidents</h4>
                        <div className='flex px-4 items-center'>
                            <div className=''><p>1004</p></div>
                            <div className='uptolasty'><img src={CaretarrowUp} className=""/> 1004 upto Last Year</div>
                        </div>
                        <div className='echartMediumLevellineArea'><ReactEcharts option={MinorSeverityArea} style={{ height: '100%', width: '100%', }} /></div>
                        <div className='echartMediumLevel'><ReactEcharts option={MinorSeverity} style={{ height: '100%', width: '100%', }} /></div>
                    </div>
                </div>
                <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='incimea-box'>
                        <h4># of Severe (Severity 4) incidents</h4>
                        <div className='flex px-4 items-center'>
                            <div className=''><p>22</p></div>
                            <div className='uptolasty'><img src={CaretarrowUp} className=""/> 22 upto Last Year</div>
                        </div>
                        <div className='echartMediumLevellineArea'><ReactEcharts option={SevereseverityArea} style={{ height: '100%', width: '100%', }} /></div>
                        <div className='echartMediumLevel'><ReactEcharts option={Severeseverity} style={{ height: '100%', width: '100%', }} /></div>
                    </div>
                </div>
            </div>
            </TabPanel>
            <TabPanel header="Measures">
            <div className=''>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>                    
                    <div className='Measures-taken bg-[#101b29] rounded-md'>
                    <h4>Measures taken</h4>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={ControlledaccessSchools} className=""/></div>
                        </div>
                        <div className='col-span-11'>                        
                        <h5>Controlled access to schools</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="60" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={StrictdressCode} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Strict dress code</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="50" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={StudentIDs} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Student IDs</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="50" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={MetaldetectorChecks} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Metal detector checks</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="60" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={SecurityCameras} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Security Cameras</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="20" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={RandomdogSniff} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Random dog sniff</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="30" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>
                    <div className='measures-progressbar'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                        <div className='flex justify-center items-center'><img src={FacultyBadges} className=""/></div>
                        </div>
                        <div className='col-span-11'>
                        <h5>Faculty badges</h5>
                        <ProgressBar className="relative" labelClassName="progresslabel" completed="30" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333"/>
                        </div>
                    </div>
                    </div>


                    
                    
                    </div>
                    </div>


                    <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='performingschools bg-[#101b29] rounded-md'>
                    <h4>Poor performing Schools</h4>
                    <table class="table-auto">
                    <thead>
                    <tr>
                    <th>School Name</th>
                    <th># of incidents</th>
                    <th>Measures Taken</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td><p>Green Cove Springs Junior High</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>220</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -17</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>2</p></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>                    
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Orange Park Junior High</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>223</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -23</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>2</p></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    <div className=''><img src={FacultyBadges} className="" width="10"/></div>                    
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Charles E. Bennett Elementary</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>227</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -10</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>4</p></div>
                    <div className=''><img src={RandomdogSniff} className="" width="10"/></div>
                    <div className=''><img src={StudentIDs} className="" width="10"/></div>
                    <div className=''><img src={FacultyBadges} className="" width="10"/></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Grove Park Elementary</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>227</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -25</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>1</p></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Lakeside Junior High</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>231</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -5</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>3</p></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>
                    <div className=''><img src={SecurityCameras} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div className='pagenation flex justify-around'>
                      <div className=''><Link>Previous</Link></div>
                      <div className='pageinput'>Page <input type="number" aria-label="Current Page" value="1"></input> of <span>2</span></div>
                      <div className=''><Link>Next</Link></div>
                    </div>
                    </div>
                    </div>
                    <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                    <div className='performingschools bg-[#101b29] rounded-md'>
                    <h4>Top Performing schools</h4>
                    <table class="table-auto">
                    <thead>
                    <tr>
                    <th>School Name</th>
                    <th># of incidents</th>
                    <th>Measures Taken</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td><p>Orange Park Elementary</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>259</div>
                    <div className='trendingup'> <img src={TreadingarrowUp} className=""/> -5</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>2</p></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    <div className=''><img src={SecurityCameras} className="" width="10"/></div>
                    <div className=''><img src={FacultyBadges} className="" width="10"/></div>                    
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>W.E. Cherry Elementary</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>259</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -4</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>3</p></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    <div className=''><img src={RandomdogSniff} className="" width="10"/></div>                    
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Orange Park High</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>242</div>
                    <div className='trendingup'> <img src={TreadingarrowUp} className=""/> -14</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>5</p></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>
                    <div className=''><img src={StudentIDs} className="" width="10"/></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    <div className=''><img src={RandomdogSniff} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Middleburg High</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>238</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -2</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>2</p></div>
                    <div className=''><img src={StudentIDs} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><p>Clay High School</p></td>
                    <td>
                    <div className='flex gap-4'>
                    <div className=''>234</div>
                    <div className='trendingdown'> <img src={TreadingarrowDown} className=""/> -22</div>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-2 items-center'>
                    <div className=''><p>3</p></div>
                    <div className=''><img src={StrictdressCode} className="" width="10"/></div>
                    <div className=''><img src={StudentIDs} className="" width="10"/></div>
                    <div className=''><img src={ControlledaccessSchools} className="" width="10"/></div>
                    <div className=''><img src={MetaldetectorChecks} className="" width="10"/></div>
                    </div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div className='pagenation flex justify-around'>
                      <div className=''><Link>Previous</Link></div>
                      <div className='pageinput'>Page <input type="number" aria-label="Current Page" value="1"></input> of <span>2</span></div>
                      <div className=''><Link>Next</Link></div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </TabPanel>
            </TabView>
            </div>


        </div>
    )
}

