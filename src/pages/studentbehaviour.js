import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import ProgressBar from "@ramonak/react-progress-bar";
import TopNav from "../components/common/topnav.component";
import { TabView, TabPanel } from 'primereact/tabview';
import CaretarrowUp from '../assets/images/caret-arrow-up.png';
import CaretarrowDown from '../assets/images/caret-down.png';
import TreadingarrowUp from '../assets/images/treading-arrow-up.png';
import TreadingarrowDown from '../assets/images/treading-arrow-down.png';
import StrictdressCode from '../assets/images/strict-dress-code.svg';
import ControlledaccessSchools from '../assets/images/controlled-access-to-schools.svg';
import FacultyBadges from '../assets/images/faculty-badges.svg';
import RandomdogSniff from '../assets/images/random-dog-sniff.svg';
import StudentIDs from '../assets/images/student-IDs.svg';
import SecurityCameras from '../assets/images/security-cameras.svg';
import MetaldetectorChecks from '../assets/images/metal-detector-checks.svg';
import k12darklogo from '../assets/images/k12-dark-logo.png';
import { useDispatch, useSelector } from "react-redux";
import {fetchDistrict_Climate_Rating,fetchstudent_behavior_poor_performing_schools,fetchstudent_behavior_top_performing_schools,
  fetchStudent_Behavior_Incident_Type,fetchStudent_Behavior_Chart
} from '../redux/slices/studentbehavior';
import LoaderContainer from "../components/loaderContainer";

const MediumLevel = {
  tooltip: {},
  legend: {
    top: '10',
    left: '10',
    icon: "circle",
    width: '400',
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top: '0%',
    width: '105%',
    height: '200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show: false
  },
  series: [
    {
      name: 'Bord L2',
      type: 'bar',
      barGap: '-100%',
      color: '#8a2c6a',
      barWidth: '20px',
      z: 10,
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [240]
    },
    {
      name: 'Inappropriate Conduct (L2) 2018:656',
      type: 'bar',
      color: '#687ecd',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [656]
    }
  ]
};




const MajorSeverity = {
  tooltip: {},
  legend: {
    top: '10',
    left: '10',
    icon: "circle",
    width: '400',
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top: '0%',
    width: '100%',
    height: '200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show: false
  },
  series: [
    {
      name: 'Bd Emp (L3)',
      type: 'bar',
      color: '#8a2c6a',
      barGap: '-100%',
      z: 10,
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [40]
    },
    {
      name: 'Tabacco (S3)',
      type: 'bar',
      color: '#129c83',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [800]
    },
    {
      name: 'Inapprop use of technology (L3)',
      type: 'bar',
      color: '#5470c6',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [200]
    }
  ]
};


const MajorseverityArea = {
  title: {
    text: '',
    left: 10,
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
  },
  color: ['#892c69'],
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderColor: "#333",
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: "line"
      }
    }
  },
  grid: {
    tooltip: {
      padding: [100, 100, 100, 100],
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      color: '#fff'
    }
  },

  grid: {
    right: '0%',
    bottom: '0%',
    // top: '-15%',
    width: '128%',
    height: '320%',
    left: '-22%'
  },

  yAxis: [
    {
      type: 'value',
      show: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E0E0E0'
        }
      },
      axisLabel: {
        show: false,
        color: '#4F4F4F'
      },
      splitLine: {
        lineStyle: {
          show: false,
          type: "dashed"
        },
      },
      min: 0,
      max: 100000,
      interval: 1000,
    },
  ],
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018'],
    position: "bottom",
    show: false,
    offset: -30,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#2b3e8b'
      }
    },
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    z: 10
  },
  series: [
    {
      data: [21600, 20743, 19431, 15000, 15000],
      type: 'line',
      areaStyle: {},
      color: '#2b3e8b',
      label: {
        show: true,
        position: 'top',
        textShadowBlur: false,
        color: '#fff'
      },

    },
  ]
};

const Minorclassroom = {
  tooltip: {},
  legend: {
    top: '10',
    left: '10',
    icon: "circle",
    width: '400',
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top: '0%',
    width: '100%',
    height: '200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show: false
  },
  series: [
    {
      name: 'Tobacco (S3)',
      type: 'bar',
      color: '#8a2c6a',
      barWidth: '20px',
      barGap: '-100%',
      z: 10,
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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
      name: 'Bd Emp (L3)',
      type: 'bar',
      color: '#5470c6',
      z: 9,
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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
      color: '#129b82',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [1000]
    }
  ]
};

const MinorSeverity = {
  tooltip: {},
  legend: {
    top: '10',
    left: '10',
    icon: "circle",
    width: '400',
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 8
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top: '0%',
    width: '100%',
    height: '200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show: false
  },
  series: [
    {
      name: 'Violation of Classroom Rule (L1)',
      type: 'bar',
      color: '#8a2c6a',
      barWidth: '20px',
      barGap: '-100%',
      z: 10,
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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
      color: '#5470c6',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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
      name: 'Skip School-Not on campus (L2)',
      type: 'bar',
      color: '#129b82',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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

const MinorSeverityArea = {
  title: {
    text: '',
    left: 10,
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
  },
  color: ['#892c69'],
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderColor: "#333",
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: "line"
      }
    }
  },
  grid: {
    tooltip: {
      padding: [100, 100, 100, 100],
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      color: '#fff'
    }
  },

  grid: {
    right: '0%',
    bottom: '0%',
    // top: '-15%',
    width: '200%',
    height: '650%',
    left: '-25%'
  },

  yAxis: [
    {
      type: 'value',
      show: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E0E0E0'
        }
      },
      axisLabel: {
        show: false,
        color: '#4F4F4F'
      },
      splitLine: {
        lineStyle: {
          show: false,
          type: "dashed"
        },
      },
      min: 0,
      max: 100000,
      interval: 1000,
    },
  ],
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018'],
    position: "bottom",
    show: false,
    offset: -30,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#2b3e8b'
      }
    },
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    z: 10
  },
  series: [
    {
      data: [9140, 9140, 9140, 9140],
      type: 'line',
      areaStyle: {},
      color: '#2b3e8b',
      label: {
        show: true,
        position: 'top',
        textShadowBlur: false,
        color: '#fff'
      },

    },
  ]
};

const Severeseverity = {
  tooltip: {},
  legend: {
    top: '10',
    left: '10',
    icon: "circle",
    width: '400',
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 10
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '3%',
    top: '0%',
    width: '100%',
    height: '200%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    // data: ['2018 534' ],
    show: false
  },
  series: [
    {
      name: 'Drug Use Possess; exc alc (S4)',
      type: 'bar',
      color: '#8a2c6a',
      barWidth: '20px',
      barGap: '-100%',
      z: 10,
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
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
      name: '',
      type: 'bar',
      color: '#129b82',
      barWidth: '20px',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50]
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50]
        }
      },
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [1000]
    }
  ]
};

const SevereseverityArea = {
  title: {
    text: '',
    left: 10,
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
  },
  color: ['#892c69'],
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderColor: "#333",
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
      color: '#fff',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: "line"
      }
    }
  },
  grid: {
    tooltip: {
      padding: [100, 100, 100, 100],
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      color: '#fff'
    }
  },

  grid: {
    right: '0%',
    bottom: '0%',
    // top: '-15%',
    width: '125%',
    height: '385%',
    left: '-22%'
  },

  yAxis: [
    {
      type: 'value',
      show: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E0E0E0'
        }
      },
      axisLabel: {
        show: false,
        color: '#4F4F4F'
      },
      splitLine: {
        lineStyle: {
          show: false,
          type: "dashed"
        },
      },
      min: 0,
      max: 1000,
      interval: 200,
    },
  ],
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018'],
    position: "bottom",
    show: false,
    offset: -30,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#2b3e8b'
      }
    },
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    z: 10
  },
  series: [
    {
      data: [150, 221, 150, 150, 215],
      type: 'line',
      areaStyle: {},
      color: '#2b3e8b',
      label: {
        show: false,
        position: 'top',
        textShadowBlur: false,
        color: '#000'
      },

    },
  ]
};





export default function Studentbehaviour(props) {
  const dispatch = useDispatch();
  const District_Climate_Ratingdata = useSelector(state => state.studentbehavior.District_Climate_Rating);
  const District_Climate_Ratingdataloading = useSelector(state => state.studentbehavior.District_Climate_Ratingloading);
  const student_behavior_poor_performing_schoolsdata = useSelector(state => state.studentbehavior.student_behavior_poor_performing_schools);
  const student_behavior_poor_performing_schoolsdataloading = useSelector(state => state.studentbehavior.student_behavior_poor_performing_schoolsloading);
  const student_behavior_top_performing_schoolsdata = useSelector(state => state.studentbehavior.student_behavior_top_performing_schools);
  const student_behavior_top_performing_schoolsdataloading = useSelector(state => state.studentbehavior.student_behavior_top_performing_schoolsloading);
  const Student_Behavior_Incident_Typedata = useSelector(state => state.studentbehavior.Student_Behavior_Incident_Type);
  const Student_Behavior_Incident_Typedataloading = useSelector(state => state.studentbehavior.Student_Behavior_Incident_Typeloading);
  const Student_Behavior_Chartdata = useSelector(state => state.studentbehavior.Student_Behavior_Chart);
  const Student_Behavior_Chartdataloading = useSelector(state => state.studentbehavior.Student_Behavior_Chartloading);
  // console.log("Student_Behavior_Incident_Typedata",Student_Behavior_Incident_Typedata)
  // console.log("Student_Behavior_Chartdata",Student_Behavior_Chartdata)

  const District_Climate_Ratingdata_suspension = District_Climate_Ratingdata?.filter(item => item.TITLE === "Suspension");
  const District_Climate_RatingdataDistrict = District_Climate_Ratingdata?.filter(item => item.TITLE === "District climate rating");
  console.log(District_Climate_RatingdataDistrict,'District_Climate_RatingdataDistrict')

    useEffect(() => {
      dispatch(fetchDistrict_Climate_Rating({
        "elasticQueryName": "District_Climate_Rating",
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

      dispatch(fetchstudent_behavior_poor_performing_schools({
        "elasticQueryName": "student_behavior_poor_performing_schools",
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

      dispatch(fetchstudent_behavior_top_performing_schools({
        "elasticQueryName": "student_behavior_top_performing_schools",
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

      // dispatch(fetchStudent_Behavior_Incident_Type({
      //   "elasticQueryName": "Student_Behavior_Incident_Type",
      //   "filters": [{
      //     "columnName": "SCHOOL_YEAR",
      //     "columnValue": ["2023"],
      //     "excludeKeyword": false
      //   }],
      //   "dynamicColumns": [],
      // }));

      dispatch(fetchStudent_Behavior_Chart({
        "elasticQueryName": "Student_Behavior_Chart",
        "filters": [],
        "dynamicColumns": [],
      }));
  },[])

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(student_behavior_poor_performing_schoolsdata?.length / itemsPerPage);

  const [currentPage1, setCurrentPage1] = useState(1);
  const totalPages1 = Math.ceil(student_behavior_top_performing_schoolsdata?.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };

  const handlePrevPage1 = () => {
    setCurrentPage1((prevPage) => prevPage - 1);
  };

  const handleNextPage1 = () => {
    setCurrentPage1((prevPage) => prevPage + 1);
  };

  const handlePageChange1 = (event) => {
    setCurrentPage1(parseInt(event.target.value));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = student_behavior_poor_performing_schoolsdata?.slice(startIndex, endIndex);

  const startIndex1 = (currentPage1 - 1) * itemsPerPage;
  const endIndex1 = startIndex1 + itemsPerPage;
  const currentData1 = student_behavior_top_performing_schoolsdata?.slice(startIndex1, endIndex1);
            var Student_Behavior_Chartdatanew = JSON.parse(JSON.stringify(Student_Behavior_Chartdata));
            
            let merticname=[];
            if(Student_Behavior_Incident_Typedata){
              for (let o = 0; o < Student_Behavior_Incident_Typedata.length; o++) {
                merticname.push(Student_Behavior_Incident_Typedata[o].METRIC_NAME)
            }
          }
            const merticnamedum = [...new Set(merticname)];

            // console.log("merticnamedum",merticnamedum)
            
            const dum = merticnamedum;
            var arrnet1 = []
            var arrnet2 = []
            var arrnet3 = []
            var arrnet4 = []
            var arrnet5 = []
            var arrnet6 = []
            if (Student_Behavior_Chartdatanew.length) {
              Student_Behavior_Chartdatanew.forEach(itr => {
                    if (itr.METRIC_NAME == dum[0]) {
                        arrnet1.push({ ...itr });
                    }
                });
                Student_Behavior_Chartdatanew.forEach(itr => {
                    if (itr.METRIC_NAME == dum[1]) {
                        arrnet2.push({ ...itr });
                    }
                });
                Student_Behavior_Chartdatanew.forEach(itr => {
                    if (itr.METRIC_NAME == dum[2]) {
                        arrnet3.push({ ...itr });
                    }
                });
                Student_Behavior_Chartdatanew.forEach(itr => {
                    if (itr.METRIC_NAME == dum[3]) {
                        arrnet4.push({ ...itr });
                    }
                });
                Student_Behavior_Chartdatanew.forEach(itr => {
                  if (itr.METRIC_NAME == dum[4]) {
                      arrnet5.push({ ...itr });
                  }
                });
                Student_Behavior_Chartdatanew.forEach(itr => {
                  if (itr.METRIC_NAME == dum[5]) {
                      arrnet6.push({ ...itr });
                  }
              });
            }

            if(arrnet1){
              arrnet1 = arrnet1.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
            }
            if(arrnet2){
              arrnet2 = arrnet2.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
            }
            if(arrnet3){
              arrnet3 = arrnet3.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
            }
            if(arrnet4){
              arrnet4 = arrnet4.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
            }
            if(arrnet5){
              arrnet5 = arrnet5.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
            }
            if(arrnet6){
              arrnet6 = arrnet6.slice().sort((a, b) => {
                return a.SCHOOL_YEAR - b.SCHOOL_YEAR
            })
          }

            // console.log("arrnet1",arrnet1)
            const CLASSCUTD = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '500%',
                // left: '-36%',
                left: '0%',
                containLabel: true
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 50000,
                  interval: 10000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet1?.map(itr => itr.SCHOOL_YEAR),
                // position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet1?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            const FIGHTD = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                right: '0%',
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '320%',
                left: '0%'
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 20000,
                  interval: 10000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet2?.map(itr => itr.SCHOOL_YEAR),
                position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet2?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            const PHYAGGSTDNTD = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                right: '0%',
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '320%',
                left: '0%'
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 20000,
                  interval: 1000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet3?.map(itr => itr.SCHOOL_YEAR),
                position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet3?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            const DISRUPTD = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                right: '0%',
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '320%',
                left: '0%'
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 15000,
                  interval: 1000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet4?.map(itr => itr.SCHOOL_YEAR),
                position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet4?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            const RUDETOADLTD = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                right: '0%',
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '320%',
                left: '0%'
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 6000,
                  interval: 1000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet5?.map(itr => itr.SCHOOL_YEAR),
                position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet5?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            const Others = {
              title: {
                text: '',
                left: 10,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
              },
              color: ['#892c69'],
              tooltip: {
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: "#333",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: '#fff',
                },
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "line"
                  }
                }
              },
              grid: {
                tooltip: {
                  padding: [100, 100, 100, 100],
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  borderColor: "#333",
                  color: '#fff'
                }
              },
            
              grid: {
                right: '0%',
                bottom: '0%',
                // top: '-15%',
                width: '100%',
                height: '320%',
                left: '0%'
              },
            
              yAxis: [
                {
                  type: 'value',
                  show: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#E0E0E0'
                    }
                  },
                  axisLabel: {
                    show: false,
                    color: '#4F4F4F'
                  },
                  splitLine: {
                    lineStyle: {
                      show: false,
                      type: "dashed"
                    },
                  },
                  min: 0,
                  max: 100000,
                  interval: 1000,
                },
              ],
              xAxis: {
                type: 'category',
                data: arrnet6?.map(itr => itr.SCHOOL_YEAR),
                position: "bottom",
                show: true,
                offset: -30,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#2b3e8b'
                  }
                },
                axisLabel: {
                  inside: true,
                  color: '#FFD700'
                },
                z: 10
              },
              series: [
                {
                  data: arrnet6?.map(itr => itr.NUMERATOR),
                  type: 'line',
                  areaStyle: {},
                  color: '#2b3e8b',
                  label: {
                    show: true,
                    position: 'top',
                    textShadowBlur: false,
                    color: '#fff'
                  },
            
                },
              ]
            };

            

  return (
    <div className='body'>
      <TopNav pagename = "Student Behavior" pagenamedescription = "Showcases a birds eye view of the student behavior, disciplinary issues and measures taken." setUserData={props.setUserData}/>
      <div className='district-Neighborhood mx-4 my-4'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
            <div className='districtclimaterating'>
              {/* <div className='score'><span>SCORE</span><h4>B</h4></div> */}
              <div className='score'><span></span><h4></h4></div>
              <LoaderContainer loading={District_Climate_Ratingdataloading}>
              <div className='dist-data space-y-2'>
                <h5>District Climate Rating</h5>
                <div className='border-b-[1px] border-[#2c4089]'>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-10'><p  className="pb-1" style={{fontSize:"11px"}}>{District_Climate_RatingdataDistrict[0]?.METRIC_NAME}</p></div>
                    <div className='col-span-2'><p className="pb-1" style={{fontSize:"11px"}}>{District_Climate_RatingdataDistrict[0]?.VALUE?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0})}{District_Climate_RatingdataDistrict[0]?.METRIC_SUFFIX}</p></div>
                  </div>
                </div>
              
                <div className=''>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-10'><p className="pb-1" style={{fontSize:"11px"}}>{District_Climate_RatingdataDistrict[1]?.METRIC_NAME}</p></div>
                    <div className='col-span-2'><p className="pb-1" style={{fontSize:"11px"}}>{District_Climate_RatingdataDistrict[1]?.VALUE?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2})}{District_Climate_RatingdataDistrict[1]?.METRIC_SUFFIX}</p></div>
                  </div>
                </div>
              </div>
              
              </LoaderContainer>
            </div>
          </div>

          <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
            <div className='neighborhoodcrimeindex'>
              {/* <div className='score'><span>SCORE</span><h4>B</h4></div> */}
              <div className='score'><span></span><h4></h4></div>
              <div className='dist-data space-y-2'>
                <h5>Suspension</h5>
                <div className='border-b-[1px] border-[#129c83]'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-10'><p className="pb-1" style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[0]?.METRIC_NAME}</p></div>
                    <div className='col-span-2'><p className="pb-1"  style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[0]?.VALUE?.toFixed(2)}{District_Climate_Ratingdata_suspension[0]?.METRIC_SUFFIX}</p></div>
                  </div>
                </div>
                <div className='border-b-[1px] border-[#129c83]'>
                  <div className='grid grid-cols-12'>
                  <div className='col-span-10'><p className="pb-1"  style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[1]?.METRIC_NAME}</p></div>
                    <div className='col-span-2'><p className="pb-1"  style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[1]?.VALUE?.toFixed(2)}{District_Climate_Ratingdata_suspension[1]?.METRIC_SUFFIX}</p></div>
                  </div>
                </div>
                <div className=''>
                  <div className='grid grid-cols-12'>
                  <div className='col-span-10'><p className="pb-1"  style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[2]?.METRIC_NAME}</p></div>
                    <div className='col-span-2'><p  className="pb-1" style={{fontSize:"11px"}}>{District_Climate_Ratingdata_suspension[2]?.VALUE?.toFixed(2)}{District_Climate_Ratingdata_suspension[2]?.METRIC_SUFFIX}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="incidents-measures mx-4 my-4">
        <TabView>
          <TabPanel header="School Performance">
            <div className=''>
              <div className='grid grid-cols-12 gap-4'>
                {/* <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                  <div className='Measures-taken bg-[#101b29] rounded-md'>
                    <h4>Measures taken</h4>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={ControlledaccessSchools} className="" /></div>
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
                          <div className='flex justify-center items-center'><img src={StrictdressCode} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Strict dress code</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="50" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={StudentIDs} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Student IDs</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="50" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={MetaldetectorChecks} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Metal detector checks</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="60" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={SecurityCameras} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Security Cameras</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="20" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={RandomdogSniff} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Random dog sniff</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="30" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>
                    <div className='measures-progressbar'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                          <div className='flex justify-center items-center'><img src={FacultyBadges} className="" /></div>
                        </div>
                        <div className='col-span-11'>
                          <h5>Faculty badges</h5>
                          <ProgressBar className="relative" labelClassName="progresslabel" completed="30" bgColor="#2c82bd" borderRadius="4px" baseBgColor="#1f3333" />
                        </div>
                      </div>
                    </div>




                  </div>
                </div> */}


                <div className='col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                  <LoaderContainer loading={student_behavior_poor_performing_schoolsdataloading}>
                  <div className='performingschools bg-[#101b29] rounded-md'>
                    <h4>Poorly Performing Schools</h4>
                    <table class="table-auto">
                      <thead>
                        <tr>
                          <th style={{fontSize:"13px"}}>School Name</th>
                          <th style={{fontSize:"13px"}}>Expulsion Rate</th>
                          {/* <th>Measures Taken</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentData && currentData?.map(itr => {
                                 return(
                                  <tr>
                                  <td><p style={{fontSize:"13px"}}>{itr?.SCHOOL_NAME}</p></td>
                                  <td>
                                    <div className='flex gap-4 justify-center'>
                                      <div className='' style={{fontSize:"13px"}}>{itr?.VALUE}%</div>
                                      {
                                        itr?.VARIANCE>0 ? <div className='trendingdown'> <img src={TreadingarrowUp} className="" />{itr?.VARIANCE}%</div>:
                                        itr?.VARIANCE==0 ? <div className='trendingup'> <img src={TreadingarrowUp} className="" />{itr?.VARIANCE}%</div>:
                                        <div className='trendingup'> <img src={TreadingarrowDown} className="" />{itr?.VARIANCE}%</div>
                                      }
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className='flex gap-2 items-center'>
                                      <div className=''><p>2</p></div>
                                      <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                                      <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                                    </div>
                                  </td> */}
                                </tr>
                                 )
                        })}
                        {/* <tr>
                          <td><p>Green Cove Springs Junior High</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>220</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -17</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>2</p></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Orange Park Junior High</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>223</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -23</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>2</p></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                              <div className=''><img src={FacultyBadges} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Charles E. Bennett Elementary</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>227</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -10</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>4</p></div>
                              <div className=''><img src={RandomdogSniff} className="" width="10" /></div>
                              <div className=''><img src={StudentIDs} className="" width="10" /></div>
                              <div className=''><img src={FacultyBadges} className="" width="10" /></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Grove Park Elementary</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>227</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -25</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>1</p></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Lakeside Junior High</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>231</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -5</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>3</p></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                              <div className=''><img src={SecurityCameras} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                    {/* <div className='pagenation flex justify-around'>
                      <div className=''><Link>Previous</Link></div>
                      <div className='pageinput'>Page <input type="number" aria-label="Current Page" value="1"></input> of <span>2</span></div>
                      <div className=''><Link>Next</Link></div>
                    </div> */}
                    <div className='pagenation flex justify-around'>
                      <button className= {`paginationprevious1 ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}><Link className="pointer-events-none">Previous</Link></button>
                      {/* <div className='pageinput'>Page {startIndex} of <span>{endIndex}</span></div> */}
                      <div className='pageinput' style={{position:"relative", top:"15px", fontSize:"10px"}}>Page 
                      {/* <input type="number" aria-label="Current Page" value="1"></input>  */}
                      <span> {currentPage}</span>
                      of <span>{totalPages}</span></div>
                      <button className= {`paginationnext1 ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === totalPages}><Link className="pointer-events-none">Next</Link></button>
                    </div>
                  </div>
                  </LoaderContainer>
                </div>
                <div className='col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 max-sm:col-span-12 height-full'>
                  <LoaderContainer loading={student_behavior_top_performing_schoolsdataloading}>
                  <div className='performingschools bg-[#101b29] rounded-md'>
                    <h4>Top Performing Schools</h4>
                    <table class="table-auto">
                      <thead>
                        <tr>
                          <th style={{fontSize:"13px"}}>School Name</th>
                          <th style={{fontSize:"13px"}}>Expulsion Rate</th>
                          {/* <th>Measures Taken</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {currentData1 && currentData1?.map(itr => {
                                 return(
                                  <tr>
                                  <td><p style={{fontSize:"13px"}}>{itr?.SCHOOL_NAME}</p></td>
                                  <td>
                                    <div className='flex gap-4 justify-center'>
                                      <div className='' style={{fontSize:"13px"}}>{itr?.VALUE}%</div>
                                      {
                                        itr?.VARIANCE>0 ? <div className='trendingdown'> <img src={TreadingarrowUp} className="" />{itr?.VARIANCE}%</div>:
                                        itr?.VARIANCE==0 ? <div className='trendingup'> <img src={TreadingarrowUp} className="" />{itr?.VARIANCE}%</div>:
                                        <div className='trendingup'> <img src={TreadingarrowDown} className="" />{itr?.VARIANCE}%</div>
                                      }
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className='flex gap-2 items-center'>
                                      <div className=''><p>2</p></div>
                                      <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                                      <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                                    </div>
                                  </td> */}
                                </tr>
                                 )
                        })}
                        {/* <tr>
                          <td><p>Orange Park Elementary</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>259</div>
                              <div className='trendingup'> <img src={TreadingarrowUp} className="" /> -5</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>2</p></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                              <div className=''><img src={SecurityCameras} className="" width="10" /></div>
                              <div className=''><img src={FacultyBadges} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>W.E. Cherry Elementary</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>259</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -4</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>3</p></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                              <div className=''><img src={RandomdogSniff} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Orange Park High</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>242</div>
                              <div className='trendingup'> <img src={TreadingarrowUp} className="" /> -14</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>5</p></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                              <div className=''><img src={StudentIDs} className="" width="10" /></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                              <div className=''><img src={RandomdogSniff} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Middleburg High</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>238</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -2</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>2</p></div>
                              <div className=''><img src={StudentIDs} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><p>Clay High School</p></td>
                          <td>
                            <div className='flex gap-4'>
                              <div className=''>234</div>
                              <div className='trendingdown'> <img src={TreadingarrowDown} className="" /> -22</div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-2 items-center'>
                              <div className=''><p>3</p></div>
                              <div className=''><img src={StrictdressCode} className="" width="10" /></div>
                              <div className=''><img src={StudentIDs} className="" width="10" /></div>
                              <div className=''><img src={ControlledaccessSchools} className="" width="10" /></div>
                              <div className=''><img src={MetaldetectorChecks} className="" width="10" /></div>
                            </div>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                    {/* <div className='pagenation flex justify-around'>
                      <div className=''><Link>Previous</Link></div>
                      <div className='pageinput'>Page <input type="number" aria-label="Current Page" value="1"></input> of <span>2</span></div>
                      <div className=''><Link>Next</Link></div>
                    </div> */}
                    {/* <div className='pagenation flex justify-around'>
                      <div className='' onClick={handlePrevPage1} disabled={currentPage1 === 1}><Link>Previous</Link></div>
                      <div className='pageinput'>Page <input type="number" aria-label="Current Page" value="1"></input> of <span>2</span></div>
                      <div className='' onClick={handleNextPage1} disabled={currentPage1 === totalPages1}><Link>Next</Link></div>
                    </div> */}

                    <div className='pagenation flex justify-around'>
                      <button className= {`paginationprevious1 ${currentPage1 === 1 ? 'disabled' : ''}`}  onClick={handlePrevPage1} disabled={currentPage1 === 1}><Link className="pointer-events-none">Previous</Link></button>
                      {/* <div className='pageinput'>Page {startIndex} of <span>{endIndex}</span></div> */}
                      <div className='pageinput' style={{position:"relative", top:"15px", fontSize:"10px"}}>Page 
                      {/* <input type="number" aria-label="Current Page" value="1"></input>  */}
                      <span disabled={currentPage1=== 1}> {currentPage1}</span>
                      of <span disabled={currentPage1 === totalPages1}>{totalPages1}</span></div>
                      <button className= {`paginationnext1 ${currentPage1 === totalPages1 ? 'disabled' : ''}`} onClick={handleNextPage1} disabled={currentPage1 === totalPages1}><Link className="pointer-events-none">Next</Link></button>
                    </div>
                  </div>
                  </LoaderContainer>
                </div>
              </div>
            </div>
          </TabPanel>
          { false && 
          <TabPanel header="Incidents Summary">
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                <LoaderContainer loading={Student_Behavior_Incident_Typedataloading && Student_Behavior_Chartdataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[0]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[0]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[0]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[0]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[0]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>534</p></div>
                      <div className=''><p>240</p></div>
                      <div className=''><p>656</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={CLASSCUTD} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={MediumLevel} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
                <LoaderContainer loading={Student_Behavior_Incident_Typedataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[1]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[1]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[1]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[1]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[1]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>4</p></div>
                      <div className=''><p>31</p></div>
                      <div className=''><p>110</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={FIGHTD} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={MajorSeverity} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
              <LoaderContainer loading={Student_Behavior_Incident_Typedataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[2]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[2]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[2]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[2]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[2]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>29</p></div>
                      <div className=''><p>27</p></div>
                      <div className=''><p>44</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={PHYAGGSTDNTD} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={Minorclassroom} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
              <LoaderContainer loading={Student_Behavior_Incident_Typedataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[3]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[3]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[3]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[3]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[3]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>296</p></div>
                      <div className=''><p>432</p></div>
                      <div className=''><p>151</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={DISRUPTD} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={MinorSeverity} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
              <LoaderContainer loading={Student_Behavior_Incident_Typedataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[4]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[4]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[4]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[4]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[4]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>15</p></div>
                      <div className=''><p>2</p></div>
                      <div className=''><p>1</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={RUDETOADLTD} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={Severeseverity} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
              <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 max-sm:col-span-12'>
              <LoaderContainer loading={Student_Behavior_Incident_Typedataloading}>
                <div className='incimea-box'>
                  <h4>{Student_Behavior_Incident_Typedata[5]?.METRIC_NAME}</h4>
                  <div className='flex px-4 items-center'>
                    <div className=''><p>{Student_Behavior_Incident_Typedata[5]?.NUMERATOR?.toLocaleString()}</p></div>
                    {
                      Student_Behavior_Incident_Typedata[5]?.VARIANCE>0?<div className='uptolasty'><img src={CaretarrowUp} className="" /> {Student_Behavior_Incident_Typedata[5]?.VARIANCE}%</div>:
                      <div className='uptolastyup'><img src={CaretarrowDown} className="" /> {Student_Behavior_Incident_Typedata[5]?.VARIANCE}%</div>
                    }
                    <div style = {{fontSize:"12px", position:"relative",left:"5px"}}>Last Year Variance Comparison</div>
                  </div>
                  {/* <div className=' px-5 absolute bottom-10 z-10 w-full'>
                    <div className="flex justify-between items-center">
                      <div className=''><p>15</p></div>
                      <div className=''><p>2</p></div>
                      <div className=''><p>1</p></div>
                    </div>
                  </div> */}
                  <div className='echartMediumLevellineArea'><ReactEcharts option={Others} style={{ height: '100%', width: '100%', }} /></div>
                  {/* <div className='echartMediumLevel'><ReactEcharts option={Severeseverity} style={{ height: '100%', width: '100%', }} /></div> */}
                </div>
                </LoaderContainer>
              </div>
            </div>
          </TabPanel>
          }
        </TabView>
      </div>
      <div className="flex justify-end px-2 py-4">
       
        <img src={k12darklogo} height="50px" width="130px" alt="logo" />
      </div>

    </div>
  )
}

