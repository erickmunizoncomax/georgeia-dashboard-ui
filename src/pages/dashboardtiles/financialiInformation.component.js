
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import Finance_bannerImg from "../../assets/images/finance_banner.jpeg";
import TreadingarrowDown from "../../assets/images/treading-arrow-down.png"
import TreadingarrowUp from '../../assets/images/treading-arrow-up.png';
import { toMillion } from "../../utils";
import { fetchExpense_for_district, fetchFinancial_Information, fetchRevene_for_district, fetchRevenueandExpense } from "../../redux/slices/counter";
import { useDispatch, useSelector } from "react-redux";

export default function FinancialInformation() {

  const dispatch = useDispatch();

  const Financial_Information = useSelector(state => state.netsales.Financial_Information);
  const RevenueandExpensedata = useSelector(state => state.netsales.RevenueandExpense);
  const Revene_for_districtdata = useSelector(state => state.netsales.Revene_for_district);
  const Expense_for_districtdata = useSelector(state => state.netsales.Expense_for_district);
  const Financial_Informationdataloading = useSelector(state => state.netsales.Financial_Informationdataloading);

  useEffect(() => {
    dispatch(fetchFinancial_Information({
      "elasticQueryName": "Financial_Information",
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

    dispatch(fetchRevene_for_district({
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

    dispatch(fetchExpense_for_district({
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

    dispatch(fetchRevenueandExpense({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [{
        "columnName": "#{sort}",
        "columnValue": "State",
        "excludeKeyword": false
      }],
    }));
  }, []);

  const customColors = [
    '#6f2e66',
    '#1f46ac', // Example color 1
    '#66b3ff', // Example color 2
    '#6f2e66', // Example color 3
    '#32a5ac', // Example color 4
    '#27714e', // Example color 5
    '#2b79b3',
    '#2b3d82',
    '#6f2e66',
    '#359760',
    '#402B50',
    '#2C7AB8'

  ];


  const data = Revene_for_districtdata?.map((item, index) => {
    return {
      name: item["DIMENSION_NAME"],
      value: item["PER"],
      actualValue: item["VALUE"].toLocaleString(), // Set the value as the calculated percentage
      itemStyle: {
        color: customColors[index] // Set custom color based on index
      }
    };
  });

  const data1 = Expense_for_districtdata?.map((item, index) => {
    return {
      name: item["DIMENSION_NAME"],
      value: item["PER"],
      actualValue: item["VALUE"].toLocaleString(), // Set the value as the calculated percentage
      itemStyle: {
        color: customColors[index] // Set custom color based on index
      }
    };
  });

  const FinInfo1 = {
    // tooltip: {
    //   trigger: 'item',
    //   backgroundColor: 'rgba(50,50,50,0.7)',
    //   borderColor: "#333",
    //   textStyle: {
    //     fontSize: 12,
    //     fontWeight: "normal",
    //     color: '#fff',
    //   },
    // axisPointer: {
    //   type: 'shadow'
    // }

    // },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return (
          params.name + " : " + params.percent.toFixed(2) + "%"
        );
      },
      axisPointer: {
        type: 'shadow'
      },
      confine: true
    },
    legend: {
      itemGap: 4,
      orient: 'vertical',
      bottom: "-1%",
      right: '-25%',
      itemWidth: 6,
      itemHeight: 6,
      height: '40%',
      formatter: function (name, index) {
        // Only show the first 5 items
        if (index < 5) {
          return customString(name);
        }
        return customString(name);  // Empty string for items beyond the first 5
      },
      textStyle: {
        color: "#fff",
        fontSize: '9',
        fontStyle: 'normal'
      }
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '75%',
        bottom: '12%',
        center: ['50%', '40%'],

        // top: '0%',
        // left: '0%',
        // right: '0%',
        // bottom: '15%',
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'left',
          formatter: '{d}%',
          position: 'inside',
          textStyle: {
            fontSize: '8',
            color: "#fff"
          }
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 10,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        // data: [
        //   {
        //     value: 35514, name: 'Charges for Services',
        //     itemStyle:
        //     {
        //       color: '#2b79b3'
        //     }

        //   },
        //   {
        //     value: 601834, name: 'Operating Grants',
        //     itemStyle:
        //     {
        //       color: '#2b3d82'
        //     }

        //   },
        //   {
        //     value: 6053, name: 'Capital Grants',
        //     itemStyle:
        //     {
        //       color: '#6f2e66'
        //     }
        //   },
        //   {
        //     value: 760080, name: 'Taxes',
        //     itemStyle:
        //     {
        //       color: '#359760'
        //     }
        //   },
        //   {
        //     value: 270963, name: 'Others',
        //     itemStyle:
        //     {
        //       color: '#402B50'
        //     }

        //   }

        //   // {
        //   //   value: 207645552, name: 'Operating Grants',
        //   //   itemStyle:
        //   //   {
        //   //     color: '#2b3d82'
        //   //   }

        //   // },
        //   // {
        //   //   value: 169823805, name: 'Property Taxes for Debt Purposes',
        //   //   itemStyle:
        //   //   {
        //   //     color: '#6f2e66'
        //   //   }
        //   // },


        //   // {
        //   //   value: 22826145, name: 'Extra Curricular Activites',
        //   //   itemStyle:
        //   //   {
        //   //     color: '#359760'
        //   //   }
        //   // },

        //   // {
        //   //   value: 27130323, name: 'Others',
        //   //   itemStyle:
        //   //   {
        //   //     color: '#2C7AB8'
        //   //   }
        //   // },

        //   // {
        //   //   value: 8188337, name: 'Others',
        //   //   itemStyle:
        //   //   {
        //   //     color: '#402B50'
        //   //   }
        //   // },

        // ]
        data: data
      }
    ]
  };

  const customString = (param) => {
    var first15Chars = param.slice(0, 10);
    if (param.length > 5) {
      var dottedString = first15Chars + '....'
      return dottedString;
    } else {
      return param
    }
  }

  const customStringExp = (param) => {
    var first15Chars = param.slice(0, 4);
    if (param.length > 5) {
      var dottedString = first15Chars + '....'
      return dottedString;
    } else {
      return param
    }
  }

  const FinInfo2 = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return params.name + " : " + params.percent.toFixed(2) + "%";
      },
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      itemGap: 4,
      orient: 'vertical',
      bottom: "-2%",
      right: '10%',
      itemWidth: 6,
      itemHeight: 6,
      height: '40%',
      formatter: function (name, index) {
        // Only show the first 5 items
        if (index < 5) {
          return customStringExp(name);
        }
        return customStringExp(name);  // Empty string for items beyond the first 5
      },
      textStyle: {
        color: "#fff",
        fontSize: '9',
        fontStyle: 'normal'
      }
    },
    series: [
      {
        type: 'pie',
        radius: '75%',
        bottom: '12%',
        center: ['50%', '40%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          textStyle: {
            fontSize: '8',
            color: "#fff"
          }
        },
        labelLine: {
          show: false
        },
        // data: [
        //   {
        //     value: 889258, name: 'Instruction',
        //     itemStyle: { color: '#39839c' }
        //   },
        //   {
        //     value: 96562, name: 'Pupil Services',
        //     itemStyle: { color: '#2b3d82' }
        //   },
        //   {
        //     value: 88488, name: 'Improvement of Instructional Services',
        //     itemStyle: { color: '#6f2e66' }
        //   },
        //   {
        //     value: 133521, name: 'Maintainance and operation of plant',
        //     itemStyle: { color: '#359760' }
        //   },
        //   {
        //     value: 295404, name: 'Other Expenses',
        //     itemStyle: { color: '#2C7AB8' }
        //   },

        // ]
        data: data1
      }
    ]
  };

  const revenueValues = RevenueandExpensedata
    .filter(item => item.METRIC_NAME === 'Revenues') 
    .map(item => (item.VALUE)); 

    const expenseValues = RevenueandExpensedata
    .filter(item => item.METRIC_NAME === 'Expenditures') // Filter for expenditures
    .map(item => (item.VALUE)); 

console.log("expenseValues", expenseValues);

  const series = [
    {
        name: 'Revenue',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
            show: false,
            position: 'top',
            color: '#fff'
        },
        data: revenueValues
    },
    {
        name: 'Expense',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        label: {
            show: false,
            position: 'top',
            color: '#fff'
        },
        data: expenseValues
    }
];

  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        setScreenWidth(screenWidth);
        console.log(screenWidth, "setScreenWidth");
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const RevenueExpense = {
    title: {
      text: 'Revenue and Expense over the year',
      left: 10,
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
    },
    legend: {
      data: RevenueandExpensedata?.map(item => item?.METRIC_NAME),

      left: 0,
      right: "0%",
      // bottom:"10%",
      itemWidth: 6,
      itemHeight: 6,
      top: '24%',
      textStyle: {
        color: "#fff",
        fontSize: '11',
        fontStyle: 'normal',
      },
    },


    tooltip: {

      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: "#333",
      textStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: '#fff',
      },
      trigger: 'axis',
      // formatter: function(params) {
      //   console.log(params,'params')
      //   return (
      //     params.seriesName + " : " + toMillion(params.data)
      //   );
      // },
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: "line"
        }
      },


    },
    grid: {
      tooltip: {
        padding: [50, 100, 100, 100],
        color: '#fff'
      }
    },

    // grid: {

    //   right: '0%',
    //   bottom: '0%',
    //   top: '0%',
    //   width: '150%',
    //   height: '120%',
    //   left: '-22%',
    //   containLabel: true
    // },

    // yAxis: [
    //  { type: 'value'}
    // ],
    // xAxis: {
    //   boundaryGap: false,
    //   type: 'category',
    //   data: ['2015', '2016', '2017', '2018'],

    // },
    // color: ['#359760','#2b3d82'],
    // series: [
    //   {
    //     data: [2000, 1000, 2000, 500],
    //     type: 'line',
    //     colorBy: "data",
    //     areaStyle: {},
    //     label: {
    //       show: true,
    //       position: 'top',
    //       textShadowBlur: 0,
    //       color: '#fff'
    //     },
    //   },
    //   {
    //     data: [1000, 500, 2000, 3000],
    //     type: 'line',
    //     colorBy: "data",
    //     areaStyle: {},
    //     label: {
    //       show: true,
    //       position: 'top',
    //       textShadowBlur: 0,
    //       color: '#fff'
    //     },
    //   },
    // ]
    grid: {
      left: '8%',
      right: '2%',
      bottom: '0%',
      width: '80%',
      containLabel: true,
      // top:'3%'
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [...new Set(RevenueandExpensedata?.map(item => item?.SCHOOL_YEAR))],
        splitLine: { show: false },
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        z: 10
      }
    ],
    yAxis: [
      {
        type: 'value', splitLine: { show: false }, axisLabel: {
          show: false
        }

      }
    ],
    color: ['#2b3d82', '#359760'],
    series : series

  };
  console.log("calculate", (66133000 / 202341000) * 100)

  console.log("Financial Data:", Financial_Information);


  const findValueByType = (type) => {
    const item = Financial_Information?.find(d => d.REVENUES_AND_EXPENDITURES === type);
    return item ? toMillion(item.VALUE) : '-';  // Return the formatted value, or '-' if not found
  };


  return (
    <div className="bg-[#081630] text-[#fff] h-[100%]">
      <div className="relative h-[160px]">
        <div className=" h-[160px] ">
          <img src={Finance_bannerImg} className="h-[160px] w-full " />
        </div>
        <div className="w-full absolute bottom-0 h-[40px] bg-[#1d192f9c] py-2 px-3">
          <h3 className="text-[14px] text-[#fff] opacity-[0.8] slider-innertitle">Financial Information</h3>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-1 px-3 mt-3 gap_reduce">
        <div className="flex items-start gap-3">

          <div className="pt-0">
            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-0">
              Revenue</p>
            <div className="flex items-center gap-1 reduce_inner_gap">
              {/* <h4 className="text-[13px] text-[#fff]">$1851.6 M</h4> */}
              <h4 className="text-[12px] text-[#fff]">{Financial_Information[0]?.VALUE ? toMillion(Financial_Information[0]?.VALUE) : '-'}</h4>
              {/* <div className='h-4 trendingdown'>
                    <img src={TreadingarrowUp} className="" /> 3.90%</div>
                  </div> */}

              <div className='h-4 trendingup'>
                <img src={TreadingarrowUp} className="" /> {Financial_Information[0]?.VAR?.toFixed(2)}%
              </div>
            </div>

          </div>
        </div>


        <div className="flex items-start gap-3">

          <div className="pt-0">
            <p className="text-[9.5px] text-[#ebebeb] font-light opacity-80 mb-0">
              Expense</p>

            <div className="flex items-center gap-1 reduce_inner_gap">
              {/* <h4 className="text-[13px] text-[#fff]">$1806.2 M</h4> */}
              <h4 className="text-[12px] text-[#fff]"> {Financial_Information[1]?.VALUE ? toMillion(Financial_Information[1]?.VALUE) : '-'}</h4>
              <div className='h-4 trendingup'>
                <img src={TreadingarrowUp} className="" /> {Financial_Information[1]?.VAR?.toFixed(2)}%</div>
            </div>

          </div>


        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-2 mt-2 mb-2 border-t border-[#ffffff26] finnace_main">
        <div className="FinInfo1">
          <ReactEcharts style={{ width: 120 }} option={FinInfo1} />
        </div>
        <div className="FinInfo2">
          <ReactEcharts style={{ width: 120 }} option={FinInfo2} />
        </div>
      </div>
      <div className="border-t border-[#ffffff26]">
        <div className="mb-0 RevenueExpense">
          <ReactEcharts style={{ width: '18vw', height: screenWidth <= 1450 && screenWidth >= 1100 ? 120 : 120 }} option={RevenueExpense} />
        </div>
      </div>



    </div>
  )
}