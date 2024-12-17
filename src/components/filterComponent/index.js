import React from 'react'
import { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudent_Enrollment_Report, fetchStudent_Characterstics, fetchEthnicity_District_at_a_glance, fetchYearwise_Student_Enrollment_Ranking,
  fetchGradewise_Student_Enrollment_Ranking, fetchSchools, fetchSchools_Centers_Report, fetchDistrict_at_a_glance_top_tile,
  fetchTotalTeacherFTE,
  fetchSchool_District_employees,
  fetchStudentTeacherRatio,
  fetchFinancial_Information,
  fetchRevene_for_district,
  fetchExpense_for_district,
  fetchRevenueandExpense
} from '../../redux/slices/counter';
import { Dropdown } from 'primereact/dropdown';

import {
  fetchEnrollment, fetchSpecial_Group, fetchEthnicity_Mix, fetchSPED_Enrollment, fetchNet_Movement, fetchGraduation_To_KG_Enrollment_Ratio,
  fetchInter_School_Conversion, fetchSchools_Biggest_Gainers, fetchSchools_Biggest_Losers, fetchTime_Analysis, fetchEnrollment_Time_Analysis,
  fetchEnrollment_Summary_By_Dimensions,
  fetchEnrollment_Projections
} from '../../redux/slices/enrollment';

import {
  fetchDistrict_Climate_Rating, fetchstudent_behavior_poor_performing_schools, fetchstudent_behavior_top_performing_schools,
  fetchStudent_Behavior_Incident_Type, fetchStudent_Behavior_Chart
} from '../../redux/slices/studentbehavior';

import {
  fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART, fetchImprovement_Tile_Report, fetchStrength_Tile_Report, fetchWeakness_Tile_Report,
  fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION,
  fetchStrength_Weaknesses_Tile_Report
} from '../../redux/slices/strengthweakness';

import {
  fetchstudent_performance_tile_report, fetchstudent_dimension_table_report, fetchstudent_dimension_report,
  fetchstudent_dimension_table_report_graduation,
  fetchstudent_dimension_report_graduation
} from '../../redux/slices/studentperformance';

import {
  fetchSchool_Performance_School_Type_Report,
  fetchSchool_Performance_Metric_Report,
  fetchschool_details_map, fetchSchool_Performance_Pie_Chart_Report,
  fetchSchool_Performance_Map_Report
} from '../../redux/slices/schoolperformance';
import { fetchMenu_School_Year, fetchMenu_School_Level, fetchMenu_School_Name, fetchMenu_Gender, fetchMenu_Grade, fetchMenu_Ethnicity } from '../../redux/slices/filter';
import { fetchState_Benchmarking_table, fetchState_Benchmarking_top_tile } from '../../redux/slices/statebenchmarking';
import { fetchCredit_toptile, fetchCreditRatingRevenue_and_Expenditure, fetchExpensesbycategory, fetchPPE, fetchPPE_toptile, fetchRevenuevsExpenditurechart } from '../../redux/slices/financedashboard';


function FilterComponent() {
  var pagename = window.location.pathname;
  // const yearOptions=[
  //     {name:"2023",value:"2023"},
  //     {name:"2022",value:"2022"},
  //     {name:"2021",value:"2021"},
  //     {name:"2020",value:"2020"},
  //     {name:"2019",value:"2019"},
  // ]
  // let schoolTypeOptions=[
  //     {label:"High School",value:"High School"},
  //     {label:"Middle School",value:"Middle School"},
  //     {label:"Elementory School",value:"Elementory School"},
  //     {label:"Not Reported",value:"Not Reported"},
  //     {label:"Other Combination",value:"Other Combination"},
  // ]

  // let genderOptions=[
  //     {label:"Male",value:"Male"},
  //     {label:"Female",value:"Female"},
  //     {label:"Others",value:"Others"}
  // ]

  // let ethinOption=[
  //     {label:"Hispanic",value:"Hispanic"},
  //     {label:"Not Reported",value:"Not Reported"},
  //     {label:"Multi-racial",value:"Multi-racial"},
  //     {label:"Black Non-Hispanic",value:"Black Non-Hispanic"},
  //     {label:"White Non-Hispanic",value:"White Non-Hispanic"},
  //     {label:"Asian or pasific Islander",value:"Asian or pasific Islander"},
  //     {label:"Amer Indian or Alaskan Native",value:"Amer Indian or Alaskan Native"}
  // ]

  // let gradeOptions=[
  //     {label:"Preschool/Prekindergarten",value:"Preschool/Prekindergarten"},
  //     {label:"KinderGarten",value:"KinderGarten"},
  //     {label:"First Grade",value:"First Grade"},
  //     {label:"Second Grade",value:"Second Grade"},
  //     {label:"Third Grade",value:"Third Grade"},
  //     {label:"Fourth Grade",value:"Fourth Grade"},
  //     {label:"Fifth Grade",value:"Fifth Grade"},
  //     {label:"Sixth Grade",value:"Sixth Grade"},
  //     {label:"Seventh Grade",value:"Seventh Grade"},
  //     {label:"Eighth Grade",value:"Eighth Grade"},
  //     {label:"Ninth Grade",value:"Ninth Grade"},
  //     {label:"Tenth Grade",value:"Tenth Grade"},
  //     {label:"Eleventh Grade",value:"Eleventh Grade"},
  //     {label:"Twelfth Grade",value:"Twelfth Grade"},
  //     {label:"Early Education",value:"Early Education"}
  // ]

  const Menu_School_Yeardata = useSelector(state => state.filter.Menu_School_Year);
  const Menu_School_Leveldata = useSelector(state => state.filter.Menu_School_Level);
  const Menu_School_Namedata = useSelector(state => state.filter.Menu_School_Name);
  const Menu_Gender = useSelector(state => state.filter.Menu_Gender);
  const Menu_Grade = useSelector(state => state.filter.Menu_Grade);
  const Menu_Ethnicity = useSelector(state => state.filter.Menu_Ethnicity);



  const [selectedMenu_School_Year, setselectedMenu_School_Year] = useState(Menu_School_Yeardata)
  const [selectedMenu_School_Level, setSelectedMenu_School_Level] = useState(Menu_School_Leveldata)
  const [selectedMenu_School_Name, setSelectedMenu_School_Name] = useState(Menu_School_Namedata)
  const [selectedMenu_Gender, setSelectedMenu_Gender] = useState(Menu_Gender)
  const [selectedMenu_Grade, setSelectedMenu_Grade] = useState(Menu_Grade)
  const [selectedMenu_Ethnicity, setSelectedMenu_Ethnicity] = useState(Menu_Ethnicity)

  var yearOptions = [];
  selectedMenu_School_Year?.forEach(year => {
    yearOptions.push({ 'name': year.SCHOOL_YEAR?.toString(), 'value': year.SCHOOL_YEAR?.toString() })
  })
  // console.log("yearOptions",yearOptions)

  var schoolTypeOptions = [];
  selectedMenu_School_Level?.forEach(year => {
    schoolTypeOptions.push({ 'label': year.SYSTEM_NAME, 'value': year.SYSTEM_NAME })
  })
  // console.log("schoolTypeOptions",schoolTypeOptions)


  var genderOptions = [];
  selectedMenu_Gender?.forEach(year => {
    genderOptions.push({ 'label': year.GENDER, 'value': year.GENDER })
  })


  var gradeOptions = [];
  selectedMenu_Grade?.forEach(year => {
    gradeOptions.push({ 'label': year.GRADE, 'value': year.GRADE })
  })

  var ethinOption = [];
  selectedMenu_Ethnicity?.forEach(year => {
    ethinOption.push({ 'label': year.ETHNICITY, 'value': year.ETHNICITY })
  })

  var schoolnameOption = [];
  selectedMenu_School_Name?.forEach(year => {
    schoolnameOption.push({ 'label': year.SCHOOL_NAME, 'value': year.SCHOOL_NAME })
  })

  const dispatch = useDispatch();

  const [selectedYearreset, setSelectedYearreset] = useState({
    "columnName": "SCHOOL_YEAR",
    "columnValue": "2023",
    "excludeKeyword": false
  })
  const [selectedSchoolreset, setSelectedSchoolreset] = useState({
    "columnName": "SCHOOL_TYPE",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedGenderreset, setSelectedGenderreset] = useState({
    "columnName": "STUDENT_GENDER",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedEthincityreset, setSelectedEthincityreset] = useState({
    "columnName": "STUDENT_ETHNICITY",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedGradereset, setSelectedGradereset] = useState({
    "columnName": "STUDENT_GRADE",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedschoolnamereset, setSelectedschoolnamereset] = useState({
    "columnName": "SCHOOL_NAME",
    "columnValue": [],
    "excludeKeyword": false
  })

  

  const removeNullFun1 = () => {
    let j = [
      selectedYearreset.columnValue.length && selectedYearreset,
      selectedSchoolreset.columnValue.length && selectedSchoolreset,
      selectedGenderreset.columnValue.length && selectedGenderreset,
      selectedEthincityreset.columnValue.length && selectedEthincityreset,
      selectedGradereset.columnValue.length && selectedGradereset,
      selectedschoolnamereset.columnValue.length && selectedschoolnamereset,
    ]
    //  console.log("jjjjjjjjj",j)
    return j.filter(val => val !== 0);
  }

  const removeNullFunGrad1 = () => {
    let j = [
      selectedMeasure.columnValue.length && selectedMeasure,
      selectedSchoolType.columnValue.length && selectedSchoolType,
      selectedYearreset.columnValue.length && selectedYearreset,
      selectedSchoolreset.columnValue.length && selectedSchoolreset,
      selectedGenderreset.columnValue.length && selectedGenderreset,
      selectedEthincityreset.columnValue.length && selectedEthincityreset,
      selectedGradereset.columnValue.length && selectedGradereset,
      selectedschoolnamereset.columnValue.length && selectedschoolnamereset,
    ]
    console.log("jjjjjjjjj", j)
    return j.filter(val => val !== 0);
  }
  // ---------------------------------------------------------------------------------------------------------
  const [selectedMeasure, setSelectedMeasure] = useState({
    "columnName": "MEASURE_TYPE",
    "columnValue": ["All"],
    "excludeKeyword": false
  })
  const [selectedSchoolType, setSelectedSchoolType] = useState({
    "columnName": "SCHOOL_NAME",
    "columnValue": ["DistrictWide"],
    "excludeKeyword": false
  })
  const [selectedYear, setSelectedYear] = useState({
    "columnName": "SCHOOL_YEAR",
    "columnValue": [],
    "excludeKeyword": false
  })
  const [selectedSchool, setSelectedSchool] = useState({
    "columnName": "SYSTEM_NAME",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedGender, setSelectedGender] = useState({
    "columnName": "STUDENT_GENDER",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedEthincity, setSelectedEthincity] = useState({
    "columnName": "STUDENT_ETHNICITY",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedGrade, setSelectedGrade] = useState({
    "columnName": "STUDENT_GRADE",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedschoolname, setSelectedschoolname] = useState({
    "columnName": "SCHOOL_NAME",
    "columnValue": [],
    "excludeKeyword": false
  })
  // ---------------------------------------------------------------------------------------------
  const [selectedYearFilter, setSelectedYearFilter] = useState({
    "columnName": "SCHOOL_YEAR",
    "columnValue": [],
    "excludeKeyword": false
  })
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState({
    "columnName": "SCHOOL_TYPE",
    "columnValue": [],
    "excludeKeyword": false
  })
  const [selectedGenderFilter, setSelectedGenderFilter] = useState({
    "columnName": "GENDER",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedEthincityFilter, setSelectedEthincityFilter] = useState({
    "columnName": "ETHNICITY",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedGradeFilter, setSelectedGradeFilter] = useState({
    "columnName": "GRADE",
    "columnValue": [],
    "excludeKeyword": false
  })

  const [selectedschoolnameFilter, setSelectedschoolnameFilter] = useState({
    "columnName": "SCHOOL_NAME",
    "columnValue": [],
    "excludeKeyword": false
  })

  // useEffect(()=>{
  //     dispatch(fetchMenu_School_Year({
  //       "elasticQueryName": "Menu_School_Year",
  //       "filters": [],
  //       "dynamicColumns": [],
  //     }));

  //     dispatch(fetchMenu_School_Level({
  //       "elasticQueryName": "Menu_School_Level",
  //       "filters": [{
  //         "columnName": "SCHOOL_YEAR",
  //         "columnValue": ["2022"],
  //         "excludeKeyword": false
  //       },
  //     ],
  //       "dynamicColumns": [],
  //     }));

  //     dispatch(fetchMenu_School_Name({
  //       "elasticQueryName": "Menu_School_Name",
  //       "filters": [{
  //         "columnName": "SCHOOL_YEAR",
  //         "columnValue": ["2022"],
  //         "excludeKeyword": false
  //       }],
  //       "dynamicColumns": [],
  //     }));

  //     dispatch(fetchMenu_Gender({
  //       "elasticQueryName": "Menu_Gender",
  //       "filters": [{
  //         "columnName": "SCHOOL_YEAR",
  //         "columnValue": ["2022"],
  //         "excludeKeyword": false
  //       }],
  //       "dynamicColumns": [],
  //     }));

  //     dispatch(fetchMenu_Grade({
  //       "elasticQueryName": "Menu_Grade",
  //       "filters": [{
  //         "columnName": "SCHOOL_YEAR",
  //         "columnValue": ["2022"],
  //         "excludeKeyword": false
  //       }],
  //       "dynamicColumns": [],
  //     }));

  //     dispatch(fetchMenu_Ethnicity({
  //       "elasticQueryName": "Menu_Ethnicity",
  //       "filters": [{
  //         "columnName": "SCHOOL_YEAR",
  //         "columnValue": ["2022"],
  //         "excludeKeyword": false
  //       }],
  //       "dynamicColumns": [],
  //     }));
  //   },[])

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.sessionStorage.removeItem('SchoolType');
      window.sessionStorage.removeItem('Year');
      window.sessionStorage.removeItem('Gender');
      window.sessionStorage.removeItem('Ethincity');
      window.sessionStorage.removeItem('Grade');
      window.sessionStorage.removeItem('enrollmentdimension');
      window.sessionStorage.removeItem('allfilter');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  let SchoolType = JSON.parse(sessionStorage.getItem("SchoolType"))
  let Year = JSON.parse(sessionStorage.getItem("Year"))
  let Gender = JSON.parse(sessionStorage.getItem("Gender"))
  let Ethincity = JSON.parse(sessionStorage.getItem("Ethincity"))
  let Grade = JSON.parse(sessionStorage.getItem("Grade"))
  let Schoolname = JSON.parse(sessionStorage.getItem("Schoolname"))

  const [selectedYeardata, setSelectedYeardata] = useState(Year ? Year : "2023")
  console.log('selectedYeardata: ', selectedYeardata);
  sessionStorage.setItem("Year", JSON.stringify(selectedYeardata));

  const [selectedSchooldata, setSelectedSchooldata] = useState(SchoolType ? SchoolType : [])
  sessionStorage.setItem("SchoolType", JSON.stringify(selectedSchooldata));

  const [selectedGenderdata, setSelectedGenderdata] = useState(Gender ? Gender : [])
  sessionStorage.setItem("Gender", JSON.stringify(selectedGenderdata));

  const [selectedEthincitydata, setSelectedEthincitydata] = useState(Ethincity ? Ethincity : [])
  sessionStorage.setItem("Ethincity", JSON.stringify(selectedEthincitydata));

  const [selectedGradedata, setSelectedGradedata] = useState(Grade ? Grade : [])
  sessionStorage.setItem("Grade", JSON.stringify(selectedGradedata));

  const [selectedSchoolnamedata, setSelectedSchoolnamedata] = useState(Schoolname ? Schoolname : [])
  sessionStorage.setItem("Schoolname", JSON.stringify(selectedSchoolnamedata));

  // let [selectedmetric, setSelectedmetric] = useState('% of Students with >95% Attendance');


  useEffect(() => {
    setselectedMenu_School_Year(Menu_School_Yeardata)
    let selectedArray = []
    // selectedYeardata?.map((k) => {
    //   selectedArray.push(k.value)
    // })
    setSelectedYear({
      "columnName": "SCHOOL_YEAR",
      "columnValue": selectedYeardata,
      "excludeKeyword": false
    });
    setSelectedYearFilter({
      "columnName": "SCHOOL_YEAR",
      "columnValue": selectedYeardata,
      "excludeKeyword": false
    });
  }, [selectedYeardata, Menu_School_Yeardata.length]);

  useEffect(() => {
    setSelectedMenu_School_Level(Menu_School_Leveldata)
    let selectedArray = []
    selectedSchooldata?.map((k) => {
      selectedArray.push(k.value)
    })
    setSelectedSchool({
      "columnName": "SYSTEM_NAME",
      "columnValue": selectedArray,
      "excludeKeyword": false
    });

    setSelectedSchoolFilter({
      "columnName": "SYSTEM_NAME",
      "columnValue": selectedArray,
      "excludeKeyword": false
    });
  }, [selectedSchooldata, Menu_School_Leveldata.length]);

  // useEffect(() => {
  //   setSelectedMenu_Gender(Menu_Gender)
  //   let selectedArray = []
  //   selectedGenderdata?.map((k) => {
  //     selectedArray.push(k.value)
  //   })
  //   setSelectedGender({
  //     "columnName": "STUDENT_GENDER",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  //   setSelectedGenderFilter({
  //     "columnName": "GENDER",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  // }, [selectedGenderdata, Menu_Gender.length]);

  // useEffect(() => {
  //   setSelectedMenu_Ethnicity(Menu_Ethnicity)
  //   let selectedArray = []
  //   selectedEthincitydata?.map((k) => {
  //     selectedArray.push(k.value)
  //   })
  //   setSelectedEthincity({
  //     "columnName": "STUDENT_ETHNICITY",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  //   setSelectedEthincityFilter({
  //     "columnName": "ETHNICITY",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  // }, [selectedEthincitydata, Menu_Ethnicity.length]);

  // useEffect(() => {
  //   setSelectedMenu_Grade(Menu_Grade)
  //   let selectedArray = []
  //   selectedGradedata?.map((k) => {
  //     selectedArray.push(k.value)
  //   })
  //   setSelectedGrade({
  //     "columnName": "STUDENT_GRADE",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  //   setSelectedGradeFilter({
  //     "columnName": "GRADE",
  //     "columnValue": selectedArray,
  //     "excludeKeyword": false
  //   });
  // }, [selectedGradedata, Menu_Grade.length]);

  useEffect(() => {
    setSelectedMenu_School_Name(Menu_School_Namedata)
    let selectedArray = []
    selectedSchoolnamedata?.map((k) => {
      selectedArray.push(k.value)
    })
    setSelectedschoolname({
      "columnName": "SCHOOL_NAME",
      "columnValue": selectedArray,
      "excludeKeyword": false
    });

    setSelectedschoolnameFilter({
      "columnName": "SCHOOL_NAME",
      "columnValue": selectedArray,
      "excludeKeyword": false
    });
  }, [selectedSchoolnamedata, Menu_School_Namedata?.length]);


  const applyFilterFunc = () => {

    const body = {
      "elasticQueryName": "",
      "filters":
        removeNullFun(),
      "dynamicColumns": [selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0 ? {
        "columnName": "#{sort}",
        "columnValue": "District",
        "excludeKeyword": false
      } : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0 ? {
        "columnName": "#{sort}",
        "columnValue": "School",
        "excludeKeyword": false
      } : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0 ?
        {
          "columnName": "#{sort}",
          "columnValue": "School",
          "excludeKeyword": false
        }
        : {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }

      ],
    };
    handleChange(body)
  }

  useEffect(() => {
    const bodyFilter = {
      "elasticQueryName": "",
      "filters":
        removeNullFunFilter()
      ,
      "dynamicColumns": [],
    };
    handleChangeFilter(bodyFilter)
  }, [selectedYearFilter, selectedSchoolFilter, selectedGenderFilter, selectedEthincityFilter, selectedGradeFilter, selectedschoolnameFilter]);

  const removeNullFunFilter = () => {
    let j = [
      selectedYearFilter.columnValue.length && selectedYearFilter,
      selectedSchoolFilter.columnValue.length && selectedSchoolFilter,
      selectedGenderFilter.columnValue.length && selectedGenderFilter,
      selectedEthincityFilter.columnValue.length && selectedEthincityFilter,
      selectedGradeFilter.columnValue.length && selectedGradeFilter,
      selectedschoolnameFilter.columnValue.length && selectedschoolnameFilter,
    ]
    console.log('.filter(val => val !== 0): ', j.filter(val => val !== 0));
    return j.filter(val => val !== 0);
  }
  let enrollmentdimension = sessionStorage.getItem("enrollmentdimension")
  let selectedoptions = sessionStorage.getItem("selectedoptions")
  let selectedoptions1 = sessionStorage.getItem("selectedoptions1")
  let selectedoptions2 = sessionStorage.getItem("selectedoptions2")
  let selectedoptions3 = sessionStorage.getItem("selectedoptions3")
  let selectedmetric = sessionStorage.getItem("selectedmetric")
  let divRecord = sessionStorage.getItem("divRecord")
  let cityDistrict = sessionStorage.getItem("cityDistrict");
  let schoolType = sessionStorage.getItem("schoolTypeQuery");

  

  let performancesummary = sessionStorage.getItem("performancesummary")

  function removeGradFilter(data) {
    console.log(data, 'datadata')
    // Filter out the object with the specified columnName from grad_filters
    // data.filters = data.filters.filter(f => f.columnName !== "SCHOOL_NAME");
    return data;
  }

  function removeGradFilterFin(data) {
    console.log(data, 'datadata');
    data.filters = data.filters.filter(f => f.columnName !== "SCHOOL_NAME");
    data.filters1 = [
      {
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      }
    ];

    return data;
  }

  const handleChange = (body) => {
    // debugger
    var Yearremove = body;
    Yearremove = Yearremove?.filters?.filter((item) => item.columnName != "SCHOOL_YEAR");
    var data1 = {
      "elasticQueryName": "",
      "filters": body?.filters,
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
            ? "School"  // Both are selected, so pass "School"
            : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
              ? "District"
              : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
                ? "School"
                : "State",  // Default to "State" if neither is selected
          "excludeKeyword": false
        }
      ],
    }

    var data2 = {
      "elasticQueryName": "",
      "filters": Yearremove,
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
            ? "School"  // Both are selected, so pass "School"
            : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
              ? "District"
              : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
                ? "School"
                : "State",  // Default to "State" if neither is selected
          "excludeKeyword": false
        }
      ],
    }

    var dataenrollmentdimension = {
      "elasticQueryName": "",
      "filters": body?.filters,
      "dynamicColumns": [{ columnName: "#{dimension}", columnValue: [enrollmentdimension] }, {
        "columnName": "#{sort}",
        "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
          ? "School"  // Both are selected, so pass "School"
          : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
            ? "District"
            : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
              ? "School"
              : "State",  // Default to "State" if neither is selected
        "excludeKeyword": false
      }],
    }
    var filtereddata = body?.filters
    // console.log("filtereddata",filtereddata)
    var datasankey = {
      "elasticQueryName": "",
      "filters": filtereddata,
      "dynamicColumns": [{ columnName: "#{dimension_1}", columnValue: [selectedoptions], "excludeKeyword": false },
      { columnName: "#{dimension_2}", columnValue: [selectedoptions1] },
      { columnName: "#{dimension_3}", columnValue: [selectedoptions2] },
      { columnName: "#{dimension_4}", columnValue: [selectedoptions3] },
      ],
    }

    var filtereddatastudent = body?.filters
    console.log('filtereddatastudent: ', filtereddatastudent);

    var datastudent = {
      "elasticQueryName": "",
      "filters": filtereddatastudent?.concat({ "columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false }),
      "dynamicColumns": [
        {
          "columnName": "#{dimension}",
          "columnValue": [performancesummary],
          "excludeKeyword": false
        },
        {
          "columnName": "#{sort}",
          "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
            ? "School"  // Both are selected, so pass "School"
            : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
              ? "District"
              : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
                ? "School"
                : "State",  // Default to "State" if neither is selected
          "excludeKeyword": false
        },
        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

    var datastudent1 = {
      "elasticQueryName": "",
      "filters": Yearremove?.concat({ "columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false }),
      "dynamicColumns": [
        {
          "columnName": "#{dimension}",
          "columnValue": [performancesummary],
          "excludeKeyword": false
        },
        {
          "columnName": "#{sort}",
          "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
            ? "School"  // Both are selected, so pass "School"
            : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
              ? "District"
              : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
                ? "School"
                : "State",  // Default to "State" if neither is selected
          "excludeKeyword": false
        },
        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

    var datastudentMap = {
      "elasticQueryName": "",
      "filters": filtereddatastudent,
    //   .concat({
    //     "columnName": "SCHOOL_TYPE",
    //     "columnValue": schoolType,
    //     "excludeKeyword": false
    // }),
      "filters1": [{ "columnName": "METRIC_NAME", "columnValue": [divRecord], "excludeKeyword": false }],
      "dynamicColumns": [
        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

    console.log(datastudentMap,'datastudentMap')


    var normalBody = {
      "elasticQueryName": "",
      "filters": filtereddatastudent,
      "dynamicColumns": []
    };

    var normalBody1 = {
      "elasticQueryName": "",
      "filters": filtereddatastudent,
      "filters1": [
        {
          "columnName": "SCHOOL_YEAR",
          "columnValue": selectedYeardata,
          "excludeKeyword": false
        }
      ],
      "dynamicColumns": [

        {
          "columnName": "#{sort}",
          "columnValue": selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length > 0
            ? "School"  // Both are selected, so pass "School"
            : selectedSchooldata?.length > 0 && selectedSchoolnamedata?.length == 0
              ? "District"
              : selectedSchoolnamedata?.length > 0 && selectedSchooldata?.length == 0
                ? "School"
                : "State",  // Default to "State" if neither is selected
          "excludeKeyword": false
        }
      ]
    };

    sessionStorage.setItem("allfilter", JSON.stringify(body));
    if (pagename == '/dashboard') {
      dispatch(fetchFinancial_Information(body));
      dispatch(fetchRevene_for_district(body));
      dispatch(fetchExpense_for_district(body));
      dispatch(fetchRevenueandExpense(data2));
      dispatch(fetchDistrict_at_a_glance_top_tile(body));
      dispatch(fetchStudent_Enrollment_Report(removeGradFilter(body)));
      dispatch(fetchStudent_Characterstics(removeGradFilter(body)));
      dispatch(fetchEthnicity_District_at_a_glance(removeGradFilter(body)));
      dispatch(fetchYearwise_Student_Enrollment_Ranking(data2));
      dispatch(fetchGradewise_Student_Enrollment_Ranking(removeGradFilter(body)));
      dispatch(fetchTotalTeacherFTE(removeGradFilter(body)));
      dispatch(fetchSchools(removeGradFilter(body)));
      dispatch(fetchSchools_Centers_Report(removeGradFilter(body)));
      dispatch(fetchSchool_District_employees(removeGradFilter(body)));
      dispatch(fetchStudentTeacherRatio(removeGradFilter(body)));
    } else if (pagename == '/enrollment') {
      dispatch(fetchEnrollment(removeGradFilter(body)));
      dispatch(fetchEnrollment_Projections(removeGradFilter(body)));
      dispatch(fetchSpecial_Group(removeGradFilter(body)));
      dispatch(fetchEthnicity_Mix(removeGradFilter(body)));
      dispatch(fetchSPED_Enrollment(removeGradFilter(body)));
      dispatch(fetchNet_Movement(removeGradFilter(body)));
      dispatch(fetchGraduation_To_KG_Enrollment_Ratio(removeGradFilter(body)));
      dispatch(fetchInter_School_Conversion(removeGradFilter(body)));
      dispatch(fetchSchools_Biggest_Gainers(removeGradFilter(body)));
      dispatch(fetchSchools_Biggest_Losers(removeGradFilter(body)));
      dispatch(fetchTime_Analysis(data2));
      dispatch(fetchEnrollment_Time_Analysis(removeGradFilter(body)));
      dispatch(fetchEnrollment_Summary_By_Dimensions(dataenrollmentdimension));
    } else if (pagename == '/studentbehavior') {
      dispatch(fetchDistrict_Climate_Rating(removeGradFilter(body)));
      dispatch(fetchstudent_behavior_poor_performing_schools(removeGradFilter(body)));
      dispatch(fetchstudent_behavior_top_performing_schools(removeGradFilter(body)));
      // dispatch(fetchStudent_Behavior_Incident_Type(removeGradFilter(body)));
      // dispatch(fetchStudent_Behavior_Chart(data1));
    } else if (pagename == '/StrengthWeakness') {
      dispatch(fetchStrength_Weaknesses_Tile_Report(body));
      // dispatch(fetchImprovement_Tile_Report(body));
      // dispatch(fetchStrength_Tile_Report(body));
      // dispatch(fetchWeakness_Tile_Report(body));
      // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART(datasankey));
      // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION(datasankey));
    } else if (pagename == '/StudentPerformance') {
      console.log('datastudent: ', datastudent);
      dispatch(fetchstudent_performance_tile_report(body));
      dispatch(fetchstudent_dimension_table_report(datastudent));
      dispatch(fetchstudent_dimension_report(datastudent1));
      // dispatch(fetchstudent_dimension_table_report_graduation(datastudent));
      // dispatch(fetchstudent_dimension_report_graduation(datastudent));
    }
    else if (pagename == '/statebenchmarking') {
      console.log('datastudent: ', datastudent);
      dispatch(fetchState_Benchmarking_table(normalBody));
      dispatch(fetchState_Benchmarking_top_tile(normalBody));
      // dispatch(fetchstudent_performance_tile_report(body));
      // dispatch(fetchstudent_dimension_table_report(datastudent));
      // dispatch(fetchstudent_dimension_report(datastudent));
      // dispatch(fetchstudent_dimension_table_report_graduation(datastudent));
      // dispatch(fetchstudent_dimension_report_graduation(datastudent));
      // dispatch(fetchState_Benchmarking_table(body));
    } else if (pagename == '/schoolperformance') {
      dispatch(fetchSchool_Performance_School_Type_Report(removeGradFilter(normalBody)));
      dispatch(fetchSchool_Performance_Metric_Report(removeGradFilter(normalBody)));
      dispatch(fetchSchool_Performance_Map_Report(removeGradFilter(datastudentMap)));
      dispatch(fetchSchool_Performance_Pie_Chart_Report(removeGradFilter(datastudentMap)));
    }

    else if (pagename == '/financedashboard') {
      // dispatch(fetchCreditRatingRevenue_and_Expenditure(removeGradFilter(normalBody1)));
      dispatch(fetchRevenuevsExpenditurechart(removeGradFilter(data2)));
      dispatch(fetchExpensesbycategory(removeGradFilter(data1)));
      dispatch(fetchPPE(removeGradFilter(data1)));
      // dispatch(fetchPPE_toptile(removeGradFilter(normalBody1)));
      dispatch(fetchCredit_toptile(removeGradFilter(normalBody)));
    }
  }

  const handleChangeReset = (body) => {
    // debugger
    var Yearremove = body;
    Yearremove = Yearremove?.filters?.filter((item) => item.columnName != "SCHOOL_YEAR");
    var data1 = {
      "elasticQueryName": "",
      "filters": Yearremove,
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }
      ],
    }

    var dataFin = {
      "elasticQueryName": "",
      "filters": body.filters,
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }
      ],
    }

    var dataenrollmentdimension = {
      "elasticQueryName": "",
      "filters": body?.filters,
      "dynamicColumns": [{ columnName: "#{dimension}", columnValue: [enrollmentdimension] }, {
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
      }],
    }
    var filtereddata = body?.filters
    // console.log("filtereddata",filtereddata)
    var datasankey = {
      "elasticQueryName": "",
      "filters": filtereddata,
      "dynamicColumns": [{ columnName: "#{dimension_1}", columnValue: [selectedoptions], "excludeKeyword": false },
      { columnName: "#{dimension_2}", columnValue: [selectedoptions1] },
      { columnName: "#{dimension_3}", columnValue: [selectedoptions2] },
      { columnName: "#{dimension_4}", columnValue: [selectedoptions3] },
      ],
    }

    var filtereddatastudent = body?.filters
    console.log('filtereddatastudent: ', filtereddatastudent);

    var datastudent = {
      "elasticQueryName": "",
      "filters": filtereddatastudent?.concat({ "columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false }),
      "dynamicColumns": [
        {
          "columnName": "#{dimension}",
          "columnValue": [performancesummary],
          "excludeKeyword": false
        },
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        },

        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

    var datastudentBar = {
      "elasticQueryName": "",
      "filters": filtereddatastudent?.filter((item) => item.columnName != "SCHOOL_YEAR")?.concat({ "columnName": "METRIC_NAME", "columnValue": [selectedmetric], "excludeKeyword": false }),
      "dynamicColumns": [
        {
          "columnName": "#{dimension}",
          "columnValue": [performancesummary],
          "excludeKeyword": false
        },
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        },
        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

    var normalBody1 = {
      "elasticQueryName": "",
      "filters": filtereddatastudent,
      "filters1": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      }],
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }
      ]
    };

    var datastudentMap = {
      "elasticQueryName": "",
      "filters": [{
        "columnName": "SCHOOL_YEAR",
        "columnValue": ["2023"],
        "excludeKeyword": false
      },
      {
        "columnName": "SCHOOL_TYPE",
        "columnValue": schoolType,
        "excludeKeyword": false
      }
      ],
      "filters1": [{ "columnName": "METRIC_NAME", "columnValue": [divRecord], "excludeKeyword": false }],
      "dynamicColumns": [

        {
          "columnName": "#{dynamic}",
          "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
          "excludeKeyword": false
        }
      ]
    };

  
    var normalBody = {
      "elasticQueryName": "",
      "filters": body?.filters,
      "dynamicColumns": []
    };

    sessionStorage.setItem("allfilter", JSON.stringify(body));
    if (pagename == '/dashboard') {
      dispatch(fetchRevene_for_district(body));
      dispatch(fetchExpense_for_district(body));
      dispatch(fetchRevenueandExpense(data1));
      dispatch(fetchFinancial_Information(body));
      dispatch(fetchDistrict_at_a_glance_top_tile(body));
      dispatch(fetchStudent_Enrollment_Report(removeGradFilter(body)));
      dispatch(fetchStudent_Characterstics(removeGradFilter(body)));
      dispatch(fetchEthnicity_District_at_a_glance(removeGradFilter(body)));
      dispatch(fetchYearwise_Student_Enrollment_Ranking(data1));
      dispatch(fetchGradewise_Student_Enrollment_Ranking(removeGradFilter(body)));
      dispatch(fetchTotalTeacherFTE(removeGradFilter(body)));
      dispatch(fetchSchools(removeGradFilter(body)));
      dispatch(fetchSchools_Centers_Report(removeGradFilter(body)));
      dispatch(fetchSchool_District_employees(removeGradFilter(body)));
      dispatch(fetchStudentTeacherRatio(removeGradFilter(body)));
    } else if (pagename == '/enrollment') {
      dispatch(fetchEnrollment(removeGradFilter(body)));
      dispatch(fetchEnrollment_Projections(removeGradFilter(body)));
      dispatch(fetchSpecial_Group(removeGradFilter(body)));
      dispatch(fetchEthnicity_Mix(removeGradFilter(body)));
      dispatch(fetchSPED_Enrollment(removeGradFilter(body)));
      dispatch(fetchNet_Movement(removeGradFilter(body)));
      dispatch(fetchGraduation_To_KG_Enrollment_Ratio(removeGradFilter(body)));
      dispatch(fetchInter_School_Conversion(removeGradFilter(body)));
      dispatch(fetchSchools_Biggest_Gainers(removeGradFilter(body)));
      dispatch(fetchSchools_Biggest_Losers(removeGradFilter(body)));
      dispatch(fetchTime_Analysis(data1));
      dispatch(fetchEnrollment_Time_Analysis(removeGradFilter(body)));
      dispatch(fetchEnrollment_Summary_By_Dimensions(dataenrollmentdimension));
    } else if (pagename == '/studentbehavior') {
      dispatch(fetchDistrict_Climate_Rating(removeGradFilter(body)));
      dispatch(fetchstudent_behavior_poor_performing_schools(removeGradFilter(body)));
      dispatch(fetchstudent_behavior_top_performing_schools(removeGradFilter(body)));
      // dispatch(fetchStudent_Behavior_Incident_Type(removeGradFilter(body)));
      // dispatch(fetchStudent_Behavior_Chart(data1));
    } else if (pagename == '/StrengthWeakness') {
      dispatch(fetchStrength_Weaknesses_Tile_Report(body));
      // dispatch(fetchImprovement_Tile_Report(body));
      // dispatch(fetchStrength_Tile_Report(body));
      // dispatch(fetchWeakness_Tile_Report(body));
      // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART(datasankey));
      // dispatch(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION(datasankey));
    } else if (pagename == '/StudentPerformance') {
      console.log('datastudent: ', datastudent);
      dispatch(fetchstudent_performance_tile_report(body));
      dispatch(fetchstudent_dimension_table_report(datastudent));
      dispatch(fetchstudent_dimension_report(datastudentBar));
      // dispatch(fetchstudent_dimension_table_report_graduation(datastudent));
      // dispatch(fetchstudent_dimension_report_graduation(datastudent));
    }
    else if (pagename == '/statebenchmarking') {
      console.log('datastudent: ', datastudent);
      dispatch(fetchState_Benchmarking_table(normalBody));
      dispatch(fetchState_Benchmarking_top_tile(normalBody));
      // dispatch(fetchstudent_dimension_table_report(datastudent));
      // dispatch(fetchstudent_dimension_report(datastudent));
      // dispatch(fetchstudent_dimension_table_report_graduation(datastudent));
      // dispatch(fetchstudent_dimension_report_graduation(datastudent));
      // dispatch(fetchState_Benchmarking_table(body));
    } else if (pagename == '/schoolperformance') {
      dispatch(fetchSchool_Performance_School_Type_Report(removeGradFilter(normalBody)));
      dispatch(fetchSchool_Performance_Metric_Report(removeGradFilter(normalBody)));
      dispatch(fetchSchool_Performance_Map_Report(removeGradFilter(datastudentMap)));
      dispatch(fetchSchool_Performance_Pie_Chart_Report(removeGradFilter(datastudentMap)));
    }
    else if (pagename == '/financedashboard') {
      // dispatch(fetchCreditRatingRevenue_and_Expenditure(removeGradFilter(normalBody1)));
      dispatch(fetchRevenuevsExpenditurechart(removeGradFilter(data1)));
      dispatch(fetchExpensesbycategory(removeGradFilter(dataFin)));
      dispatch(fetchPPE(removeGradFilter(data1)));
      // dispatch(fetchPPE_toptile(removeGradFilter(normalBody1)));
      dispatch(fetchCredit_toptile(removeGradFilter(normalBody)));
    }
  }


  const resetFilterFunc = () => {

    // window.sessionStorage.removeItem('allfilter');
    setSelectedYeardata("2023")

    setSelectedSchooldata([])
    setSelectedGenderdata([])
    setSelectedEthincitydata([])
    setSelectedGradedata([])
    setSelectedSchoolnamedata([])

    let body;

    body = {
      "elasticQueryName": "",
      "filters": removeNullFun1(),
      "dynamicColumns": [
        {
          "columnName": "#{sort}",
          "columnValue": "State",
          "excludeKeyword": false
        }
      ]
    };

    handleChangeReset(body)
  }



  const removeNullFun = () => {
    let j = [
      selectedYear.columnValue.length && selectedYear,
      selectedSchool.columnValue.length && selectedSchool,
      selectedGender.columnValue.length && selectedGender,
      selectedEthincity.columnValue.length && selectedEthincity,
      selectedGrade.columnValue.length && selectedGrade,
      selectedschoolname.columnValue.length && selectedschoolname,
    ]
    return j.filter(val => val !== 0);
  }

  const removeNullFunGrad = () => {
    let j = [
      selectedGender.columnValue.length == 0 && selectedEthincity.columnValue.length == 0 && selectedMeasure.columnValue.length && selectedMeasure,
      selectedGender.columnValue.length == 0 && selectedEthincity.columnValue.length == 0 && selectedSchoolType.columnValue.length && selectedSchoolType,
      selectedYear.columnValue.length && selectedYear,
      selectedSchool.columnValue.length && selectedSchool,
      selectedGender.columnValue.length == 0 && selectedEthincity.columnValue.length && selectedEthincity,
      selectedGender.columnValue.length && selectedGender,
      selectedschoolname.columnValue.length && selectedschoolname,
    ]
    console.log('jjjjjjjjkkkkkkk: ', j);
    return j.filter(val => val !== 0 && val !== false);
  }


  const handleChangeFilter = (body) => {
    var Yearremove = body;
    var removeschoollevel = body;
    var removeschoolname = body;
    var removegrade = body;
    var removegender = body;
    var removeethnicity = body;
    Yearremove = Yearremove?.filters?.filter((item) => item.columnName != "SCHOOL_YEAR");
    var data1 = {
      "elasticQueryName": "",
      "filters": Yearremove,
      "dynamicColumns": [],
    }
    removeschoollevel = removeschoollevel?.filters?.filter((item) => item.columnName != "SYSTEM_NAME" && item.columnName != "SCHOOL_NAME"
      && item.columnName != "GRADE" && item.columnName != "GENDER" && item.columnName != "ETHNICITY"
    );
    var dataremoveschoollevel = {
      "elasticQueryName": "",
      "filters": removeschoollevel,
      "dynamicColumns": [],
    }
    removeschoolname = removeschoolname?.filters?.filter((item) => item.columnName != "SCHOOL_NAME");
    var dataremoveschoolname = {
      "elasticQueryName": "",
      "filters": removeschoolname,
      "dynamicColumns": [],
    }
    removegrade = removegrade?.filters?.filter((item) => item.columnName != "GRADE");
    var dataremovegrade = {
      "elasticQueryName": "",
      "filters": removegrade,
      "dynamicColumns": [],
    }
    removegender = removegender?.filters?.filter((item) => item.columnName != "GENDER");
    var dataremovegender = {
      "elasticQueryName": "",
      "filters": removegender,
      "dynamicColumns": [],
    }
    removeethnicity = removeethnicity?.filters?.filter((item) => item.columnName != "ETHNICITY");
    var dataremoveethnicity = {
      "elasticQueryName": "",
      "filters": removeethnicity,
      "dynamicColumns": [],
    }
    dispatch(fetchMenu_School_Year(data1));
    dispatch(fetchMenu_School_Level(dataremoveschoollevel));
    dispatch(fetchMenu_School_Name(dataremoveschoolname));
    // dispatch(fetchMenu_Gender(dataremovegender));
    // dispatch(fetchMenu_Grade(dataremovegrade));
    // dispatch(fetchMenu_Ethnicity(dataremoveethnicity));
  }


  return (
    <div >
      <div className='p-10'>

        <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          <label className="filterTitle">School Year</label>
          {/* <MultiSelect
                         options={yearOptions}
                        value={selectedYeardata}
                         onChange={setSelectedYeardata}
                         overrideStrings={{
                           allItemsAreSelected: "All",
                         }}
                        labelledBy="Type to Search or Select"
                    /> */}
          <Dropdown value={selectedYeardata} onChange={(e) => setSelectedYeardata(e.value)} options={yearOptions} optionLabel="name"
            placeholder={selectedYeardata} className="w-full md:w-14rem text-xs" style={{ width: 193 }} />

        </form>
        {pagename == '/statebenchmarking' ? '' : <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          <label className="filterTitle">School District Name</label>
          <MultiSelect
            options={schoolTypeOptions}
            value={selectedSchooldata}
            onChange={setSelectedSchooldata}
            overrideStrings={{
              allItemsAreSelected: "All",
            }}
            labelledBy="Type to Search or Select"
          />

        </form>}

        {pagename == '/statebenchmarking' ? '' : <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          <label className="filterTitle">School Name</label>
          <MultiSelect
            options={schoolnameOption}
            value={selectedSchoolnamedata}
            onChange={setSelectedSchoolnamedata}
            overrideStrings={{
              allItemsAreSelected: "All",
            }}
            labelledBy="Type to Search or Select"
          />

        </form>
        }
        <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          {/* <label className="filterTitle">Grade</label>
          <MultiSelect
            options={gradeOptions}
            value={selectedGradedata}
            onChange={setSelectedGradedata}
            overrideStrings={{
              allItemsAreSelected: "All",
            }}
            labelledBy="Type to Search or Select"
          /> */}

        </form>
        <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          {/* <label className="filterTitle">Ethnicity</label>
          <MultiSelect
            options={ethinOption}
            value={selectedEthincitydata}
            onChange={setSelectedEthincitydata}
            overrideStrings={{
              allItemsAreSelected: "All",
            }}
            labelledBy="Type to Search or Select"
          /> */}

        </form>
        <form className="form-floating my-2 px-1" style={{ width: 200 }}>
          {/* <label className="filterTitle">Gender</label>
          <MultiSelect
            options={genderOptions}
            value={selectedGenderdata}
            onChange={setSelectedGenderdata}
            overrideStrings={{
              allItemsAreSelected: "All",
            }}
            labelledBy="Type to Search or Select"
          /> */}

        </form>


        <button className='filterBut py-2 px-1' style={{ position: "relative", left: "20px" }} onClick={applyFilterFunc}>Apply</button>
        <button className='filterBut py-2 px-1' style={{ position: "relative", left: "20px" }} onClick={resetFilterFunc}>Reset</button>
      </div>
    </div>
  )
}

export default FilterComponent
