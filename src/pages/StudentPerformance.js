import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Dropdown} from 'primereact/dropdown';
import {Carousel} from 'primereact/carousel';
import 'primeicons/primeicons.css';
import {Chip} from 'primereact/chip';
import TopNav from "../components/common/topnav.component";
import k12darklogo from '../assets/images/k12-dark-logo.png';
import {useDispatch, useSelector} from "react-redux";
import {
  fetchstudent_dimension_report,
  fetchstudent_dimension_table_report,
  fetchstudent_performance_tile_report
} from '../redux/slices/studentperformance';
import StachedBarChart from "../components/stachedbarchart";
import {getPivotChartArray} from "../utils";
import LoaderContainer from "../components/loaderContainer";
import StudentPerformanceProgressKpiCarousel from "../components/StudentPerformanceProgressKpiCarousel";

const mapKpisDataByMetricGroup = (data) => {
  const mapping = {}
  const groups = []
  data.forEach(item => {
    const groupName = item.METRIC_GROUP
    if (!mapping[groupName]) mapping[groupName] = []
    item.parent = groupName
    mapping[groupName].push(item)
  })
  Object.entries(mapping).forEach(([name, items]) => groups.push({name, items}))
  return groups
}

export default function StrengthWeakness(props) {

  const dispatch = useDispatch();
  const Performance_Summary_By_Dimensionsdata = useSelector(state => state.studentperformance.Performance_Summary_By_Dimensions);
  const Performance_Summary_By_Dimensionsdataloading = useSelector(state => state.studentperformance.Performance_Summary_By_Dimensionsloading);
  const student_performance_tile_reportdata = useSelector(state => state.studentperformance.student_performance_tile_report);
  const student_performance_tile_reportdataloading = useSelector(state => state.studentperformance.student_performance_tile_reportloading);
  const student_dimension_table_reportdata = useSelector(state => state.studentperformance.student_dimension_table_report);
  const student_dimension_table_reportdataloading = useSelector(state => state.studentperformance.student_dimension_table_reportloading);
  const student_dimension_reportdata = useSelector(state => state.studentperformance.student_dimension_report);
  const student_dimension_reportdataloading = useSelector(state => state.studentperformance.student_dimension_reportloading);
  const student_dimension_table_report_graduationdata = useSelector(state => state.studentperformance.student_dimension_table_report_graduation);
  const student_dimension_table_report_graduationdataloading = useSelector(state => state.studentperformance.student_dimension_table_report_graduationloading);
  console.log('student_dimension_table_report_graduationdata: ', student_dimension_table_report_graduationdata);
  const student_dimension_report_graduationdata = useSelector(state => state.studentperformance.student_dimension_report_graduation);
  const student_dimension_report_graduationdataloading = useSelector(state => state.studentperformance.student_dimension_report_graduationloading);
  console.log('student_dimension_report_graduationdata: ', student_dimension_report_graduationdata);

  console.log("student_performance_tile_reportdata", student_performance_tile_reportdata)


  let student_performance_tile_reportdatanew = JSON.parse(JSON.stringify(student_performance_tile_reportdata))

  if (student_performance_tile_reportdatanew) {
    student_performance_tile_reportdatanew = student_performance_tile_reportdatanew.slice().sort((a, b) => {
      return a.METRIC_GROUP_ORDER - b.METRIC_GROUP_ORDER
    })
  }
  console.log(student_performance_tile_reportdatanew, 'student_performance_tile_reportdatanew')

  const [performance, setPerformance] = useState("Ethnicity");
  sessionStorage.setItem("performancesummary", performance);
  const [page, setPage] = useState(0);
  const options = [
    {name: 'Ethnicity', value: 'Ethnicity'},
    {name: 'Gender', value: 'Gender'},
    // { name: 'Grade', value: 'Grade' },
    {name: 'Economical Status', value: 'Economical Status'},
    {name: 'Special Ability', value: 'Disability Status'},
    // { name: 'Language Classification', value: 'student_language_classification' },
    // { name: 'ELL', value: 'student_ell' },
    // { name: 'Special Ability', value: 'student_special_ability' }
  ];
  const [selectedmetric, setSelectedmetric] = useState('% of Students with >95% Attendance');
  sessionStorage.setItem("selectedmetric", selectedmetric);
  const [selectedmetricname, setSelectedmetricname] = useState("% of Students with >95% Attendance");
  // console.log("selectedmetric",selectedmetricname)
  useEffect(() => {
    dispatch(fetchstudent_performance_tile_report({
      "elasticQueryName": "student_performance_tile_report",
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


    dispatch(fetchstudent_dimension_table_report({
      "elasticQueryName": "",
      "filters": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      }, {"columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false}],
      "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}, {
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
      }, {
        "columnName": "#{dynamic}",
        "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
        "excludeKeyword": false
      }],
    }));


    dispatch(fetchstudent_dimension_report({
      "elasticQueryName": "",
      "filters": [{"columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false}],
      "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}, {
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
      }, {
        "columnName": "#{dynamic}",
        "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
        "excludeKeyword": false
      }]
    }));

    // dispatch(fetchstudent_dimension_table_report({
    //     "elasticQueryName": "student_dimension_table_report",
    //     "filters": [{ "columnName": "metric_id", "columnValue": [selectedmetric], "excludeKeyword": false }],
    //     "dynamicColumns": [{ columnName: "#{dimension}", columnValue: ["student_ethnicity"]}],
    // }));

    // dispatch(fetchstudent_dimension_report({
    //     "elasticQueryName": "student_dimension_report",
    //     "filters": [{ "columnName": "metric_id", "columnValue": [selectedmetric], "excludeKeyword": false }],
    //     "dynamicColumns": [{ columnName: "#{dimension}", columnValue: ["student_ethnicity"]}],
    // }));

  }, [selectedmetric, performance])

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.removeItem('allfilter');
      window.sessionStorage.removeItem('selectedmetric');
      window.sessionStorage.removeItem('performancesummary');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  var defaultallfilter = JSON.parse(sessionStorage.getItem("allfilter"));
  console.log(defaultallfilter, "defaultallfilter")


  useEffect(() => {
    let body;
    if (defaultallfilter) {
      body = {
        "elasticQueryName": "",
        "filters": defaultallfilter.filters.concat([{"columnName": "METRIC_NAME", "columnValue": [selectedmetric]}]),
        "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}],
      };


    } else {
      body = {
        "elasticQueryName": "",
        "filters": [{
          "columnName": "SCHOOL_YEAR",
          "columnValue": ["2023"],
          "excludeKeyword": false
        }, {"columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false}],
        "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}, {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }, {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }],
      };
    }
    handleperformance(body)
  }, [selectedmetric, performance]);

  const handleperformance = (body) => {
    let bodyData;
    if (defaultallfilter) {
      bodyData = {
        "elasticQueryName": "",
        "filters": defaultallfilter.filters?.length === 1 ? defaultallfilter.filters.concat([
          {"columnName": "METRIC_ID", "columnValue": [selectedmetric]},
          {"columnName": "SCHOOL_OFFICIAL_NAME", "columnValue": "DistrictWide", "excludeKeyword": false}
        ]) : defaultallfilter.filters.concat([
          {"columnName": "METRIC_ID", "columnValue": [selectedmetric]}
        ]),
        "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}],
      };
    } else {
      bodyData = {
        "elasticQueryName": "",
        "filters": [{
          "columnName": "SCHOOL_YEAR",
          "columnValue": ["2023"],
          "excludeKeyword": false
        }, {"columnName": "SCHOOL_OFFICIAL_NAME", "columnValue": "DistrictWide", "excludeKeyword": false},
          {"columnName": "METRIC_ID", "columnValue": [selectedmetric], "excludeKeyword": false}],
        "dynamicColumns": [{columnName: "#{dimension}", columnValue: [performance]}, {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }],
      };
    }


    // dispatch(fetchPerformance_Summary_By_Dimensions(body));


    // dispatch(fetchstudent_dimension_report(body));

    // dispatch(fetchstudent_dimension_table_report_graduation(bodyData));
    // dispatch(fetchstudent_dimension_report_graduation({
    //     "elasticQueryName": "",
    //     "filters": body?.filters?.filter(item => item.columnName != "SCHOOL_YEAR"),
    //     "dynamicColumns": body?.dynamicColumns

    // }));
    // dispatch(fetchstudent_dimension_report_graduation({
    //     "elasticQueryName": "",
    //     "filters": bodyData?.filters?.filter(item => item.columnName != "SCHOOL_YEAR"),
    //     "dynamicColumns": body?.dynamicColumns

    // }));

  }

  var tpivot = (data, groupBy, key, value) => {

    let pivotObj = {};
    let grouped = [];
    data.forEach(a => {
      if (!pivotObj[a[groupBy]]) {
        pivotObj[a[groupBy]] = {[groupBy]: a[groupBy]};
        grouped.push(pivotObj[a[groupBy]]);
      }
      let obj = {[a[key]]: a[value]};
      Object.assign(pivotObj[a[groupBy]], obj, a);
    }, Object.create(null));


    return grouped;
  };
  let finalData;
  let finalDatatile;
  let tableReportData = selectedmetric == 10097 ? student_dimension_table_reportdata : student_dimension_table_reportdata
  console.log("tableReportData", tableReportData)
  if (tableReportData && tableReportData.length) {
    finalData = tpivot(tableReportData, "DIMENSION_NAME", "METRIC_NAME", "VALUE");
    //  finalDatatile = tpivot(student_dimension_reportdata, "DIMENSION", "TARGET_TOTAL", "ACTUAL_TOTAL");
    console.log("finalData", finalData)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const items = finalData; // your array of items
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

  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: '1600px',
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '1441px',
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '1439px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 3
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

  const handleTopTileFilterClick = (tile) => {
    console.log('tile: ', tile);
    setSelectedmetric(tile?.METRIC_NAME)
    setSelectedmetricname(tile?.METRIC_NAME)
  }

  const barColors = useRef({})
  const getBarColors = (value) => {
    barColors.current = value
  }

  const productTemplates = (finalData) => {
    const isActive = selectedDimensions.includes(finalData.DIMENSION_NAME);

    return (
      <div className='cohortbox-carousel pt-0'
           onClick={() => handleTileClick(finalData.DIMENSION_NAME)}>
        <div className='product-item'>
          <div className={`!p-2 ${isActive ? `legendbox !bg-[#081630]` : 'legendbox'}`}
               style={{ borderLeftColor: isActive ? '#081630' : `${barColors.current?.[finalData?.DIMENSION_NAME] || '#2B3D82'}` }}>
            <div className="text-[10px] font-light">
              <p className={`${isActive ? 'text-white' : ''}`}>
                { finalData?.DIMENSION_NAME }
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className='flex justify-start items-center'>
                <span className={`mr-2 ${isActive ? 'text-white' : ''}`}>
                  { finalData?.VALUE?.toFixed(1) }%
                </span>
                {
                  finalData?.VARIANCE > 0 ? (
                    <Chip label={finalData?.VARIANCE ? finalData?.VARIANCE?.toFixed(1) + "%" : "-"}
                          icon="pi pi-arrow-up-right !text-[8px]"
                          style={{background: "#129b83", fontSize: 9, height: 14, color: '#fff'}}/>
                  ) : finalData?.VARIANCE === 0 ? (
                    <Chip label={finalData?.VARIANCE ? finalData?.VARIANCE?.toFixed(1) + "%" : "-"}
                          icon="pi pi-minus !text-[8px]"
                          style={{background: "#808080", fontSize: 9, height: 14, color: '#fff'}}/>
                  ) : (
                    <Chip label={finalData?.VARIANCE ? finalData?.VARIANCE?.toFixed(1) + "%" : "-"}
                          icon="pi pi-arrow-down-right !text-[8px]"
                          style={{background: "#d9685b", fontSize: 9, height: 14, color: '#fff'}}/>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const columnsMapping = (tempObj, a, column, columnsRestored) => {
    Object.keys(a).forEach((keys) => {
      if (column.includes(keys)) {
        console.log(keys, 'keyskeys')
        tempObj[keys + "_" + a.METRIC_BAND_ORDER] = a[keys];
      }
      if (columnsRestored.includes(keys)) {
        tempObj[keys] = a[keys];
      }
    });
  };

  const groupByTimeSeries = (data, row, column, columnsRestored) => {
    let tempObj = {};
    let finalData1 = [];
    let dimensions = [];
    if (data) {
      data.forEach((item) => {
        if (!dimensions.includes(item[row])) {
          dimensions.push(item[row]);
        }
      });
      dimensions.forEach((m) => {
        let flag = false;
        tempObj = {};
        data.forEach((a, index) => {
          if (!flag) {
            tempObj[row] = a[row];
          }
          if (m == a[row]) {
            columnsMapping(tempObj, a, column, columnsRestored);
            flag = true;
          }
        });
        if (flag) {
          finalData1.push(tempObj);
        }
      });
    }

    return finalData1;

  };

  let sudentDimensionFinalData = selectedmetric == 10097 ? student_dimension_reportdata : student_dimension_reportdata
  let student_dimension_reportdatanew = JSON.parse(JSON.stringify(sudentDimensionFinalData));

  console.log(student_dimension_reportdatanew, 'student_dimension_reportdatanew')
  student_dimension_reportdatanew.map(itr => {
    if (itr) {
      if (itr["SCHOOL_MONTH"] > 0) {
        itr["overallvalue"] = itr["SCHOOL_YEAR"] + "/" + itr["SCHOOL_MONTH"]
      } else {
        itr["overallvalue"] = itr["SCHOOL_YEAR"]
      }
      itr["TARGET"] = Number(itr["TARGET"])?.toFixed(1)
      itr["VALUE"] = Number(itr["VALUE"])?.toFixed(1)
    }
  })


  if (performance == "Ethnicity") {
    student_dimension_reportdatanew?.map(itr => {
      if (itr["DIMENSION_NAME"] == "Asian or Pacific Islander") {
        itr["METRIC_BAND_COLOR"] = "#019049";
        itr["METRIC_BAND_ORDER"] = 1
      } else if (itr["DIMENSION_NAME"] == "Amer. Indian or Alaskan Native") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 2
      } else if (itr["DIMENSION_NAME"] == "Hispanic") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 3
      } else if (itr["DIMENSION_NAME"] == "Black, Non-Hispanic") {
        itr["METRIC_BAND_COLOR"] = "#E6DE32";
        itr["METRIC_BAND_ORDER"] = 4
      } else if (itr["DIMENSION_NAME"] == "Multi-racial") {
        itr["METRIC_BAND_COLOR"] = "#E6DE32";
        itr["METRIC_BAND_ORDER"] = 5
      } else if (itr["DIMENSION_NAME"] == "White, Non-Hispanic") {
        itr["METRIC_BAND_COLOR"] = "#E6DE32";
        itr["METRIC_BAND_ORDER"] = 6
      } else if (itr["DIMENSION_NAME"] == "Not Reported") {
        itr["METRIC_BAND_COLOR"] = "#E6DE32";
        itr["METRIC_BAND_ORDER"] = 7
      }
      return itr;
    })
  } else if (performance == "Gender") {
    student_dimension_reportdatanew?.map(itr => {
      if (itr["DIMENSION_NAME"] == "Male") {
        itr["METRIC_BAND_COLOR"] = "#019049";
        itr["METRIC_BAND_ORDER"] = 1
      } else if (itr["DIMENSION_NAME"] == "Female") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 2
      }
      return itr;
    })
  }
    // else if (performance == "student_homeless") {
    //     student_dimension_reportdatanew?.map(itr => {
    //         if (itr["DIMENSION_NAME"] == "Not Reported") {
    //             itr["METRIC_BAND_COLOR"] = "#019049";
    //             itr["METRIC_BAND_ORDER"] = 1
    //         } else if (itr["DIMENSION_NAME"] == "Yes") {
    //             itr["METRIC_BAND_COLOR"] = "#2DE78B";
    //             itr["METRIC_BAND_ORDER"] = 2
    //         }
    //         return itr;
    //     })
    // }
    //  else if (performance == "student_economically_disadvantaged") {
    //     student_dimension_reportdatanew?.map(itr => {
    //         if (itr["DIMENSION_NAME"] == "Qualified Free") {
    //             itr["METRIC_BAND_COLOR"] = "#019049";
    //             itr["METRIC_BAND_ORDER"] = 1
    //         } else if (itr["DIMENSION_NAME"] == "Not Reported") {
    //             itr["METRIC_BAND_COLOR"] = "#2DE78B";
    //             itr["METRIC_BAND_ORDER"] = 2
    //         }
    //         return itr;
    //     })
    // }
    // else if (performance == "student_ell") {
    //     student_dimension_reportdatanew?.map(itr => {
    //         if (itr["DIMENSION_NAME"] == "Not Reported") {
    //             itr["METRIC_BAND_COLOR"] = "#019049";
    //             itr["METRIC_BAND_ORDER"] = 1
    //         } else if (itr["DIMENSION_NAME"] == "No") {
    //             itr["METRIC_BAND_COLOR"] = "#2DE78B";
    //             itr["METRIC_BAND_ORDER"] = 2
    //         } else if (itr["DIMENSION_NAME"] == "Yes") {
    //             itr["METRIC_BAND_COLOR"] = "#2DE78B";
    //             itr["METRIC_BAND_ORDER"] = 3
    //         }
    //         return itr;
    //     })
  // }
  else if (performance == "Disability Status") {
    student_dimension_reportdatanew?.map(itr => {
      if (itr["DIMENSION_NAME"] == "Yes") {
        itr["METRIC_BAND_COLOR"] = "#019049";
        itr["METRIC_BAND_ORDER"] = 1
      } else if (itr["DIMENSION_NAME"] == "No") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 2
      }
      return itr;
    })
  } else if (performance == "Grade") {
    student_dimension_reportdatanew?.map(itr => {
      if (itr["DIMENSION_NAME"] == "Preschool/Prekindergarten") {
        itr["METRIC_BAND_COLOR"] = "#019049";
        itr["METRIC_BAND_ORDER"] = 1
      } else if (itr["DIMENSION_NAME"] == "KinderGarten") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 2
      } else if (itr["DIMENSION_NAME"] == "First Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 3
      } else if (itr["DIMENSION_NAME"] == "Second Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 4
      } else if (itr["DIMENSION_NAME"] == "Third Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 5
      } else if (itr["DIMENSION_NAME"] == "Fourth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 6
      } else if (itr["DIMENSION_NAME"] == "Fifth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 7
      } else if (itr["DIMENSION_NAME"] == "Sixth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 8
      } else if (itr["DIMENSION_NAME"] == "Seventh Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 9
      } else if (itr["DIMENSION_NAME"] == "Eighth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 10
      } else if (itr["DIMENSION_NAME"] == "Ninth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 11
      } else if (itr["DIMENSION_NAME"] == "Tenth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 12
      } else if (itr["DIMENSION_NAME"] == "Eleventh Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 13
      } else if (itr["DIMENSION_NAME"] == "Twelfth Grade") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 14
      } else if (itr["DIMENSION_NAME"] == "Early Education") {
        itr["METRIC_BAND_COLOR"] = "#2DE78B";
        itr["METRIC_BAND_ORDER"] = 15
      }
      return itr;
    })
  }


  let barChartData = getPivotChartArray(student_dimension_reportdatanew, 'SCHOOL_YEAR', 'DIMENSION_NAME', 'VALUE')
  let lineChartData = getPivotChartArray(student_dimension_reportdatanew, 'SCHOOL_YEAR', 'DIMENSION_NAME', 'TARGET')

  console.log("barChartData", barChartData)

  const dimensions = [...new Set(student_dimension_reportdatanew.map(item => item.DIMENSION))];
  const years = [...new Set(student_dimension_reportdatanew.map(item => item.SCHOOL_YEAR))];

  let targetData = years.map(year => {
    const entry = student_dimension_reportdatanew.find(item => item.SCHOOL_YEAR === year);
    return {
      SCHOOL_YEAR: year,
      TARGET: entry ? parseFloat(entry.TARGET) : 0
    }

  })


  const combinedData = barChartData.map(absence => {
    const target = targetData.find(t => t.SCHOOL_YEAR.toString() === absence.SCHOOL_YEAR);
    return {
      ...absence,
      TARGET: target ? target.TARGET : null
    };
  });

  console.log(combinedData, 'combinedData')

  let columns = ["VALUE"];
  let columnsRestored = [
    "TARGET",
  ];
  let finalData1 = groupByTimeSeries(
    student_dimension_reportdatanew,
    "overallvalue",
    columns,
    columnsRestored
  );
  console.log("finalData1", finalData1)

  let data;
  if (performance == "Ethnicity") {
    data = [
      {
        name: 'Asian or Pacific Islander',
        type: 'bar',
        stack: 'Asian or Pacific Islander',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Amer. Indian or Alaskan Native',
        type: 'bar',
        stack: 'Amer. Indian or Alaskan Native',
        barWidth: "10%",
        color: '#2b3d82',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Hispanic',
        type: 'bar',
        stack: 'Hispanic',
        barWidth: "10%",
        color: '#802a64',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_3
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Black, Non-Hispanic',
        type: 'bar',
        stack: 'Black, Non-Hispanic',
        barWidth: "10%",
        color: '#13917c',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_4
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Multi-racial',
        type: 'bar',
        stack: 'Multi-racial',
        barWidth: "10%",
        color: '#cac2f9',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_5
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'White, Non-Hispanic',
        type: 'bar',
        stack: 'White, Non-Hispanic',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_6
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Not Reported',
        type: 'bar',
        stack: 'Not Reported',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_7
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },

    ]
  } else if (performance == "Gender") {
    data = [
      {
        name: 'Male',
        type: 'bar',
        stack: 'Male',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Female',
        type: 'bar',
        stack: 'Female',
        barWidth: "10%",
        color: '#2b3d82',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  } else if (performance == "student_homeless") {
    data = [
      {
        name: 'Not Reported',
        type: 'bar',
        stack: 'Not Reported',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Yes',
        type: 'bar',
        stack: 'Yes',
        barWidth: "10%",
        color: '#2b3d82',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  } else if (performance == "student_economically_disadvantaged") {
    data = [
      {
        name: 'Qualified Free',
        type: 'bar',
        stack: 'Qualified Free',
        barWidth: "10%",
        color: '#2b79b3',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Not Reported',
        type: 'bar',
        stack: 'Not Reported',
        barWidth: "10%",
        color: '#2b3d82',
        animation: false,
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  } else if (performance == "student_ell") {
    data = [
      {
        name: 'Not Reported',
        type: 'bar',
        stack: 'Not Reported',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'No',
        type: 'bar',
        stack: 'No',
        barWidth: "10%",
        color: '#2b3d82',
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Yes',
        type: 'bar',
        stack: 'Yes',
        barWidth: "10%",
        color: '#802a64',
        data: finalData1?.map(itr =>
          itr?.VALUE_3
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  } else if (performance == "Disability Status") {
    data = [
      {
        name: 'Yes',
        type: 'bar',
        stack: 'Yes',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'No',
        type: 'bar',
        stack: 'No',
        barWidth: "10%",
        color: '#2b3d82',
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  } else if (performance == "Grade") {
    data = [
      {
        name: 'Preschool/Prekindergarten',
        type: 'bar',
        stack: 'Preschool/Prekindergarten',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_1
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'KinderGarten',
        type: 'bar',
        stack: 'KinderGarten',
        barWidth: "10%",
        color: '#2b3d82',
        data: finalData1?.map(itr =>
          itr?.VALUE_2
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'First Grade',
        type: 'bar',
        stack: 'First Grade',
        barWidth: "10%",
        color: '#802a64',
        data: finalData1?.map(itr =>
          itr?.VALUE_3
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Second Grade',
        type: 'bar',
        stack: 'Second Grade',
        barWidth: "10%",
        color: '#13917c',
        data: finalData1?.map(itr =>
          itr?.VALUE_4
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Third Grade',
        type: 'bar',
        stack: 'Third Grade',
        barWidth: "10%",
        color: '#cac2f9',
        data: finalData1?.map(itr =>
          itr?.VALUE_5
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Fourth Grade',
        type: 'bar',
        stack: 'Fourth Grade',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_6
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Fifth Grade',
        type: 'bar',
        stack: 'Fifth Grade',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_7
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Sixth Grade',
        type: 'bar',
        stack: 'Sixth Grade',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_8
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Seventh Grade',
        type: 'bar',
        stack: 'Seventh Grade',
        barWidth: "10%",
        color: '#2b3d82',
        data: finalData1?.map(itr =>
          itr?.VALUE_9
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Eighth Grade',
        type: 'bar',
        stack: 'Eighth Grade',
        barWidth: "10%",
        color: '#802a64',
        data: finalData1?.map(itr =>
          itr?.VALUE_10
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Ninth Grade',
        type: 'bar',
        stack: 'Ninth Grade',
        barWidth: "10%",
        color: '#13917c',
        data: finalData1?.map(itr =>
          itr?.VALUE_11
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Tenth Grade',
        type: 'bar',
        stack: 'Tenth Grade',
        barWidth: "10%",
        color: '#cac2f9',
        data: finalData1?.map(itr =>
          itr?.VALUE_12
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Eleventh Grade',
        type: 'bar',
        stack: 'Eleventh Grade',
        barWidth: "10%",
        color: '#2b79b3',
        data: finalData1?.map(itr =>
          itr?.VALUE_13
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Twelfth Grade',
        type: 'bar',
        stack: 'Twelfth Grade',
        barWidth: "10%",
        color: '#2b3d82',
        data: finalData1?.map(itr =>
          itr?.VALUE_14
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Early Education',
        type: 'bar',
        stack: 'Early Education',
        barWidth: "10%",
        color: '#802a64',
        data: finalData1?.map(itr =>
          itr?.VALUE_15
        ),
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 2, 2],
          }
        }
      },
      {
        name: 'Actual',
        type: 'line',
        stack: 'Actual',
        color: '#fff',
        symbolSize: 10,
        symbol: 'circle',
        data: finalData1?.map(itr =>
          itr?.TARGET
        ),
        lineStyle: {
          width: 3,
        },
      },
    ]
  }

  const [filteredData, setFilteredData] = useState(finalData);
  const [filteredCombinedData, setFilteredCombinedData] = useState(combinedData);
  const [selectedDimensions, setSelectedDimensions] = useState([]);

  const handleTileClick = (dimension) => {
    setSelectedDimensions((prevSelectedDimensions) => {
      let newSelectedDimensions;

      if (prevSelectedDimensions.includes(dimension)) {
        // Remove the dimension if it was already selected
        newSelectedDimensions = prevSelectedDimensions.filter(dim => dim !== dimension);
      } else {
        // Add the dimension to the selection
        newSelectedDimensions = [...prevSelectedDimensions, dimension];
      }

      let newFilteredCombinedData = combinedData;

      if (newSelectedDimensions.length > 0) {
        newSelectedDimensions.forEach(dimensionToFilter => {
          newFilteredCombinedData = newFilteredCombinedData?.map(item => {
            const {[dimensionToFilter]: removedField, ...rest} = item;
            return rest;
          });
        });
      }

      setFilteredCombinedData(newFilteredCombinedData);
      return newSelectedDimensions;
    });
  };

  const groupedKpiData = mapKpisDataByMetricGroup(student_performance_tile_reportdatanew)

  return (
    <div className="pb-10 !bg-[#242b3d]">
      <TopNav pagename="Student Performance & Progress"
              pagenamedescription="Provides an overview of Student Performance in the key areas like attendance and academics"
              setUserData={props.setUserData} />

      <LoaderContainer loading={student_performance_tile_reportdataloading}>
        <StudentPerformanceProgressKpiCarousel groups={groupedKpiData}
                                               activeKpiName={selectedmetricname}
                                               onKpiClick={(kpi) => handleTopTileFilterClick(kpi)} />
      </LoaderContainer>

      <div className="card wrapper-card text-white mx-5 mt-5 mb-1">
        <div className="flex justify-between max-tablet:flex-col max-tablet:items-start">
          <div style={{ position: "relative", top: "10px" }}>
            <div className="title-text text-xl flex items-center">Student's Dimension Analysis</div>
            <div className="text-[12px] flex items-center font-light">Selected Indicator: {selectedmetricname}</div>
          </div>
          <div className="flex justify-center">
            <div className="mx-1 enrollselect">
              <label htmlFor="dd-city"
                     className="labeltext">
                Analyze by
              </label>
              <Dropdown className="w-full md:w-14rem"
                        value={performance}
                        onChange={(e) => setPerformance(e.value)}
                        options={options}
                        optionLabel="name"
                        placeholder="Ethnicity"
                        style={{width: 250}} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mx-5 mt-2 gap-3">
        <div className="col-span-8 max-tablet:!col-span-12 shadow-lg">
          <LoaderContainer loading={student_dimension_reportdataloading}>
            <div className='echart h-full relative bg-[#0c1c3b] rounded'>
              <div className="title-text flex items-center text-white px-4 py-2 font-light text-base">
                Time Trending View
              </div>

              <div className="card timetreanding-carousel px-4 mb-4 ">
                {
                  finalData && (
                    <Carousel value={finalData}
                              numScroll={1}
                              numVisible={4}
                              indicators={false}
                              responsiveOptions={responsiveOptions}
                              itemTemplate={productTemplates}/>
                  )
                }
              </div>

              <StachedBarChart data={data}
                               finalData1={finalData1}
                               barDimensions={[...new Set(student_dimension_reportdatanew?.map(item => item["DIMENSION_NAME"]))]}
                               lineDimensions={["TARGET"]}
                               pivotData={selectedDimensions.length > 0 ? filteredCombinedData : combinedData}
                               getBarColor={getBarColors}
                               selectDimension={performance}/>
            </div>
          </LoaderContainer>
        </div>

        <div className="card col-span-4 max-tablet:!col-span-12 bg-[#0c1c3b] rounded-lg shadow-lg">
          <div className="title-text flex items-center text-white px-4 py-2 font-light text-base">
            Performance Summary View
          </div>
          <div className="w-full">
            <div className='graduationtable relative'>
              <div className='flex justify-around items-center '>
                <div className='text-[#FFFFFF] text-[14px]'></div>
                <div className='text-[#FFFFFF] text-[14px]'></div>
                <div className='text-[#FFFFFF] text-[14px]'></div>
              </div>
              <LoaderContainer loading={selectedmetric == 10097 ? student_dimension_report_graduationdataloading : student_dimension_table_reportdataloading}>
                <div className="collegejoindata">
                  <table className="w-full">
                    <thead className="bg-[#081630] h-[40px]">
                    <tr>
                      <th>
                        <Link>
                          <p className="text-white !text-xs !font-normal text-left">
                            Student Group
                          </p>
                        </Link>
                      </th>
                      <th>
                        <Link>
                          <p className="text-white !text-xs !font-normal text-left">
                            District Performance
                          </p>
                        </Link>
                      </th>
                      <th>
                        <Link>
                          <p className="text-white !text-xs !font-normal text-left">
                            Target
                          </p>
                        </Link>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      currentItems && currentItems?.map(itr => (
                        <tr className="bg-[#0c1c3b] border-b border-white last:border-b-0 border-opacity-10">
                          <td>
                            <p className="text-white !text-xs !font-light">
                              {itr?.DIMENSION_NAME}
                            </p>
                          </td>
                          <td>
                            <p className="text-white !text-xs !font-light">
                              {itr?.VALUE?.toFixed(1)}%
                            </p>
                          </td>
                          <td>
                            <p className="text-white !text-xs !font-light">
                              {itr?.TARGET}%
                            </p>
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>

                  <div className="flex justify-around items-center bg-[#081630] h-[40px]">
                    <button className={`paginationprevious ${currentPage === 1 ? 'disabled' : ''}`}
                            style={{fontSize: "10px", color: "white"}}
                            onClick={handlePrevClick}
                            disabled={currentPage === 1}>
                      Previous
                    </button>
                    <button className={`paginationnext ${currentPage === totalPages ? 'disabled' : ''}`}
                            style={{fontSize: "10px", color: "white"}}
                            onClick={handleNextClick}
                            disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </div>
                </div>
              </LoaderContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <img src={k12darklogo} height="50px" width="130px" alt="logo"/>
      </div>
    </div>
  )
}