import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import TopNav from "../components/common/topnav.component";
import { Carousel } from 'primereact/carousel';
import { ProductService } from '../service/ProductService';
import { TabView, TabPanel } from 'primereact/tabview';
import StudentAvatarImg from '../assets/images/student_avatar.png';
import TreadingarrowUp from '../assets/images/treading-arrow-up.png';
import TreadingarrowDown from '../assets/images/treading-arrow-down.png';
import k12darklogo from '../assets/images/k12-dark-logo.png';


const CollegeReadiness = {
  tooltip: {},
  legend: {
    type: "plain",
    show: true,
    bottom: 0,
    left: 0,
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
    data: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6'],
    axisLabel: {
      color: "rgba(255, 255, 255, 1)"
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
  yAxis: {
    type: 'value',
    max: 1400,
    min: 200,
    minInterval: 200,
    axisLabel: {
      color: "rgba(226, 221, 221, 1)"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(90, 87, 87, 1)"
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
  series: [
    {
      name: 'AP enrollment & Pass %',
      data: [900, 1200, 800, 600, 900, 400],
      type: 'bar',
      barWidth: 70,
      barGap: '-68%',
      color: '#223f81',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },

    {
      name: 'SAT enrollment & Pass %',
      data: [542, 843, 510, 460, 460, 360],
      type: 'bar',
      barWidth: 25,
      z: 10,
      color: '#129c83',
      itemStyle: {
        emphasis: {
          barBorderRadius: [10, 10]
        },
        normal: {
          barBorderRadius: [3, 3, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },

  ]
};

const AdvancedExams = {
  tooltip: {},
  legend: {
    type: "plain",
    show: true,
    bottom: 0,
    left: 0,
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
    data: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6'],
    axisLabel: {
      color: "rgba(255, 255, 255, 1)"
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
  yAxis: {
    type: 'value',
    max: 1400,
    min: 200,
    minInterval: 200,
    axisLabel: {
      color: "rgba(226, 221, 221, 1)"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(90, 87, 87, 1)"
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
  series: [
    {
      name: 'AP enrollment & Pass %',
      data: [400, 1200, 800, 900, 560, 800],
      type: 'bar',
      color: '#223f81',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },

    {
      name: 'SAT enrollment & Pass %',
      data: [242, 900, 610, 560, 260, 660],
      type: 'bar',
      color: '#129c83',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },

  ]
};

const MeasuresTaken = {
  tooltip: {},
  legend: {
    type: "plain",
    show: true,
    bottom: 5,
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "rgba(255, 255, 255, 1)"
    }
  },
  grid: {
    height: "70%",
    // width: "80%",
    left: "10%",
    right: "10%",
    top: "5%",
    bottom: "0%"
  },
  xAxis: {
    type: 'category',
    data: ['2011', '2012', '2013', '2014', '2015', '2016'],
    axisLabel: {
      color: "rgba(255, 255, 255, 1)"
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
  yAxis:[ 
    {
    type: 'value',
    max: 10,
    min: 0,
    minInterval: 2,
    axisLabel: {
      color: "rgba(226, 221, 221, 1)"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(90, 87, 87, 1)"
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
    {
    type: 'value',
    max: 10,
    min: 0,
    minInterval: 2,
    axisLabel: {
      color: "rgba(226, 221, 221, 1)",
      formatter:'{value}%',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(90, 87, 87, 1)"
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    }
  },
],
  series: [
    {
      name: 'Internships',
      data: [8, 3, 5, 6, 8, 7],
      type: 'bar',
      color: '#223f81',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg', lineStyle: { color: '#e52a85' }, }],
      },
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }

    },

    {
      name: 'Fairs',
      data: [4, 2, 6, 8, 4, 3],
      type: 'bar',
      color: '#129c83',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },

    {
      name: 'Workshops',
      data: [8, 3, 5, 6, 8, 7],
      type: 'bar',
      color: '#2c83c1',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },
    {
      name: 'Awareness programs',
      data: [8, 3, 5, 6, 8, 7],
      type: 'bar',
      color: '#82316c',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [4, 4, 0, 0]
        }
      }
      // label: {
      //   show: true,
      //   align: "center",
      //   verticalAlign: "middle",
      //   color:'#fff',
      //   position: "outside"
      // }
    },
    {
      name: '% student college ready',
      data: [8, 2, 5, 6, 8, 7],
      type: 'line',
      color: '#2c83c1'
    }

  ]
};

export default function Collegecareerreadiness(props) {

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

  const productTemplate = (product) => {
    return (
      <div className='product-item'>
        <div className='collegecohort-box'>
          <div className='collegecohort-head'>
            <h3> Cohort 2020</h3>
          </div>
          <div className='flex justify-between'>
            <div className=''>
              <span>Current Period</span>
              <h2>15%</h2>
            </div>
            <div className=''>
              <div className='collegecohort-treadingdown'> <img src={TreadingarrowDown} className="" /></div>
            </div>
          </div>
        </div>

      </div>
    );
  };


  return (
    <div className=''>
      <TopNav pagename = "College and Career Readiness" setUserData={props.setUserData}/>
      <div className="carousel-holder cohortboxcarousel">
        <Carousel value={products} numScroll={1} numVisible={5} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
      </div>
      <div className='studentenrolled px-2 py-2 mx-5 my-4'>
        <div className='grid grid-cols-12 max-sm:gap-y-8'>
          <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
            <div className='studentenrolled-box lg:py-0 lg:border-r-2 lg:border-gray-300 sm:border-r-0 max-sm:border-r-0 max-sm:py-4 sm:py-4'>
              <div className='px-2'><img src={StudentAvatarImg} className="" /></div>
              <div className='w-full'>
                <div className='heading'><p># of students</p></div>
                <div className='numberofyear flex'>
                  <div className='counting'><h4>2,400</h4></div>
                  <div className=''>
                    <span>Last Year</span>
                    <div className='flex w-full'>
                      <div className='w-24 text-[14px] text-[#ffffff]'>2,653</div>
                      <div className='trending'><img src={TreadingarrowUp} className="" />3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
            <div className='studentenrolled-box lg:py-0 lg:border-r-2 lg:border-gray-300 sm:border-r-0 max-sm:border-r-0 max-sm:py-4 sm:py-4'>
              <div className='px-2'><img src={StudentAvatarImg} className="" /></div>
              <div className='w-full'>
                <div className='heading'><p># of students enrolled in 2 year college</p></div>
                <div className='numberofyear flex'>
                  <div className='counting'><h4>967</h4></div>
                  <div className=''>
                    <span>Last Year</span>
                    <div className='flex w-full'>
                      <div className='w-24 text-[14px] text-[#ffffff]'>2,653</div>
                      <div className='trending'><img src={TreadingarrowUp} className="" />3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
            <div className='studentenrolled-box br0 max-sm:py-4 lg:py-0 sm:py-4'>
              <div className='px-2'><img src={StudentAvatarImg} className="" /></div>
              <div className='w-full'>
                <div className='heading'><p># of students enrolled in 4 year college</p></div>
                <div className='numberofyear flex'>
                  <div className='counting'><h4>643</h4></div>
                  <div className=''>
                    <span>Last Year</span>
                    <div className='flex w-full'>
                      <div className='w-24 text-[14px] text-[#ffffff]'>2,653</div>
                      <div className='trending'><img src={TreadingarrowUp} className="" />3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="studentMeasures mx-4 my-4">
        <TabView>
          <TabPanel header="Student Performance">
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                <div className='chartbackdrop relative'>
                  <p>College Readiness</p>
                  <ReactEcharts option={CollegeReadiness} />
                  <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'># Of Students</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='chartbackdrop relative'>
                  <p>Advanced Exams</p>
                  <ReactEcharts option={AdvancedExams} />
                  <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'># Of Students</div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Measures & Placement">
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                <div className='chartbackdrop relative'>
                  <p>Measures taken</p>
                  <ReactEcharts option={MeasuresTaken} />
                  <div className='yaxis-text absolute top-[40%] left-[-25px] text-[#fff]'># Of programs</div>
                  <div className='yaxis-text absolute top-[40%] right-[-58px] text-[#fff]'># student college ready</div>
                </div>
              </div>

              <div className='col-span-6'>
                <div className='collegejoined relative'>
                  <p>College joined</p>
                  <div className='flex justify-around items-center '>
                    <div className='text-[#FFFFFF] text-[14px]'> </div>
                    <div className='text-[#FFFFFF] text-[14px]'> </div>
                    <div className='text-[#FFFFFF] text-[14px]'> </div>
                  </div>
                  <div className='collegejoindata'>
                    <table class='table-auto border-collapse'>
                      <thead className='bg-[#081631] h-[40px] border-t-2 border-white'>
                        <tr>
                          <th><Link>Student Group</Link></th>
                          <th><Link>District Performance</Link></th>
                          <th><Link>Target</Link></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='bg-[#1a253b]'>
                          <td><p>Multi-racial</p></td>
                          <td><p>67.2%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr>
                          <td><p>Hispanic</p></td>
                          <td><p>40.3%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr className='bg-[#1a253b]'>
                          <td><p>White, Non-Hispanic</p></td>
                          <td><p>56.5%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr>
                          <td><p>Black, Non-Hispanic</p></td>
                          <td><p>60.0%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr className='bg-[#1a253b]'>
                          <td><p>Asian or Pacific Islander</p></td>
                          <td><p>50.0%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr>
                          <td><p>Black, Non-Hispanic</p></td>
                          <td><p>60.0%</p></td>
                          <td><p>75%</p></td>
                        </tr>
                        <tr className="h-10"></tr>
                      </tbody>
                    </table>
                    {/* <div className='flex justify-around items-center bg-[#1d2634] h-[40px] border-t-4 border-white'>
                      <div className='text-[#898d95] text-[12px]'><Link>Previous</Link> </div>
                      <div className='text-[#898d95] text-[12px]'><Link>Next</Link> </div>
                    </div> */}



                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
      <div className="py-4 flex justify-end">
                    <img src={k12darklogo} height="50px" width="130px" alt="logo" />
                </div>


    </div>
  )
}

