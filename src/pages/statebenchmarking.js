import React, { useEffect, useState } from "react";
import Complogo from "../assets/images/GoalsStrategyLogo.svg";
import TopNav from "../components/common/topnav.component";
import { ScrollPanel } from "primereact/scrollpanel";
import ReactEcharts from "echarts-for-react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchDistrict_Size,
  fetchOverall_Score,
  fetchNearby_District,
  fetchState_Benchmarking_table,
  fetchState_Benchmarking_top_tile,
  fetchState_Benchmarking_table_Details
} from "../redux/slices/statebenchmarking";
import { useDispatch, useSelector } from "react-redux";
import LoaderContainer from "../components/loaderContainer";
import { fetchCreditRatingRevenue_and_Expenditure } from "../redux/slices/financedashboard";
import { Carousel } from 'primereact/carousel';
import k12darklogo from '../assets/images/k12-dark-logo.png';

export default function StateBenchMarking(props) {
  const dispatch = useDispatch();

  // const district_sizedata = useSelector(
  //   (state) => state.statebenchmarking.District_Size
  // );

  const [Overall_Scoredata] = useSelector(
    (state) => state.statebenchmarking.Overall_Score
  );


  // const {Nearby_District,Nearby_Districtloading} = useSelector(state => state.statebenchmarking);

  const { State_Benchmarking_table, State_Benchmarking_tableloading } = useSelector(state => state.statebenchmarking)

  const [pagedata, setpagedata] = useState({})

  const State_Benchmarking_top_tiledata = useSelector((state) => state.statebenchmarking.State_Benchmarking_top_tile);
  console.log(State_Benchmarking_top_tiledata, 'State_Benchmarking_top_tiledata')



  useEffect(() => {
    const data = State_Benchmarking_table.reduce((acc, item) => {
      console.log(item, 'item')
      let { ["KPI_NAME"]: Tab, ["TYPE"]: section } = item
      if (!acc[Tab]) acc[Tab] = { [section]: [] }
      else if (!acc[Tab][section]) acc[Tab] = { ...acc[Tab], [section]: [] }

      acc[Tab][section].push(item)
      return acc
    }, {})
    setpagedata(data)
  }, [State_Benchmarking_table])



  const [activeTab, setActiveTab] = useState(null);

  const [activeTab1, setActiveTab1] = useState("Top");
  const [topButtonText, setTopButtonText] = useState("Top"); // Initial text for Top button
  const [bottomButtonText, setBottomButtonText] = useState("Bottom"); // Initial text for Bottom button

  console.log(topButtonText, 'topButtonText')
  console.log(bottomButtonText, 'bottomButtonText')

  const handleTopClick = () => {
    setActiveTab1("Top");
    setTopButtonText((prevText) => (prevText === "Top" ? "Top 5" : "Top")); // Toggle text
  };

  const handleBottomClick = () => {
    setActiveTab1("Bottom");
    setBottomButtonText((prevText) => (prevText === "Bottom" ? "Bottom 5" : "Bottom")); // Toggle text
  };

  useEffect(() => {
    dispatch(
      fetchState_Benchmarking_table({
        elasticQueryName: "",
        filters: [{
          "columnName": "SCHOOL_YEAR",
          "columnValue": ["2023"],
          "excludeKeyword": false
        }],
        dynamicColumns: [],
      })
    );

    dispatch(
      fetchState_Benchmarking_top_tile({
        elasticQueryName: "",
        filters: [{
          "columnName": "SCHOOL_YEAR",
          "columnValue": ["2023"],
          "excludeKeyword": false
        }],
        dynamicColumns: [],
      })
    );


  }, [])

  /* On Data Change */
  useEffect(() => setActiveTab(Object.keys(pagedata)[0]), [pagedata])
  /* */
  console.log(pagedata, 'pagedata')

  const itemsPerPage = 5;


  const activeData = pagedata?.[activeTab]?.[activeTab1] || [];


  const topData = activeData.filter((item) => item.TYPE === "Top");
  const bottomData = activeData.filter((item) => item.TYPE === "Bottom");

  const [currentTopPage, setCurrentTopPage] = useState(1);
  const [currentBottomPage, setCurrentBottomPage] = useState(1);

  // Pagination calculation
  const totalTopPages = Math.ceil(topData.length / itemsPerPage);
  const totalBottomPages = Math.ceil(bottomData.length / itemsPerPage);

  const getPageData = (array, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  const currentTopData = getPageData(topData, currentTopPage);
  console.log(currentTopData, 'currentTopData')
  const currentBottomData = getPageData(bottomData, currentBottomPage);

  const handleOuterTabChange = (index) => {
    setActiveTab(index); // Change outer tab
    setActiveTab1("Top");

  };

  console.log(activeTab1, 'activeTab1')

  useEffect(() => {
    dispatch(
      fetchOverall_Score({
        elasticQueryName: "Overall Score",
        filters: [],
        dynamicColumns: [],
        userEmail: "Test.PBI@redingtongroup.com",
      })
    );
  }, [])


  const option = {
    xAxis: {
      max: 100,
      show: false,
    },
    yAxis: {
      type: "category",
      show: false,
    },
    grid: {
      height: 30,
      left: 0,
      right: 0,
      top: "30%",
    },
    series: [
      {
        type: "bar",
        data: [Overall_Scoredata?.PERCENTAGE],
        showBackground: true,
        backgroundStyle: {
          color: "#3e4b68",
          borderRadius: 100,
        },
        itemStyle: {
          color: "#657cd7",
          borderRadius: 100,
        },
        barWidth: "100%",
        label: {
          show: true,
          position: "insideleft",
          padding: [8, 0, 0, 15],
          formatter: "{c}%",
          color: "#fff",
          fontSize: 16,
          // fontWeight: 'bold',
        },
      },
    ],
  };


  // const combineDatabasedOnIndex = (keys, ...datas) => {
  //   const combinedData = []

  //   datas.forEach((data,colno) => {
  //     data.forEach((item,i) => {
  //         keys.forEach(key => {
  //           if(item[key]){
  //             combinedData[i] = {...combinedData[i],[`column_${colno}_${key}`]: item[key]}
  //           }
  //       })
  //     })
  //   })

  //   return combinedData;
  // }
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



  console.log(pagedata, 'pagedata')
  const [activeCarousel, setactiveCarousel] = useState(0);
  useEffect(() => setactiveCarousel(State_Benchmarking_top_tiledata[0]), [State_Benchmarking_top_tiledata])





  const productTemplate = (data) => {
    // console.log(data, 'datadata')
    return (
      <div className={`${data?.METRIC_NAME === activeCarousel?.METRIC_NAME ? 'bg-white text-[#2C363F]' : 'bg-[#16203F] text-[#FFFFFF]'} mr-2 ml-2 p-[16px] 3xl:p-[0.833vw] rounded-[8px] 3xl:rounded-[0.417vw] min-h-[119px] 3xl:min-h-[6.198vw]`}
        onClick={() => setactiveCarousel(data)}
      >
        <div className={`${data?.METRIC_NAME === activeCarousel?.METRIC_NAME && 'text-[#19212A]'} text-[20px] 3xl:text-[0.833vw] font-normal leading-normal mb-[12px] 3xl:mb-[0.625vw] min-h-[24px] 3xl:min-h-[1.25vw]`}>
          {data?.METRIC_NAME || ''}
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className=' text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>State Rank</span>
            <div className='text-[32px] 2xl:text-[1.667vw] font-normal leading-none'>
              {data?.RANK == null || undefined ? '-' : data?.RANK}
            </div>
            
            
           
          </div>
          <div className='flex justify-end'>
          <div className='flex flex-col'>
            <span className=' text-[12px] 3xl:text-[0.625vw] font-normal leading-normal'>PY Rank</span>
            <div className='text-[32px] 2xl:text-[1.667vw] font-normal leading-none'>
              {data?.PY_RANK == 'null' || undefined ? '-' : data?.PY_RANK}
            </div>
          </div>
        </div>

        
        </div>
      
      </div>
    );
  };

  return (
    <>
      <div className="body select-none">
        <TopNav
          pagename="State Benchmarking"
          pagenamedescription=""
          setUserData={props.setUserData}
        />

        <div className="px-[30px] 3xl:px-[1.563vw] py-[18px] 3xl:py-[0.938vw] relative">
          {/* <div className="h-[460px] xl:h-[460px] 2xl:h-[760px] 3xl:h-[45vw] benchmarkScroll "> */}
          <div className="h-auto benchmarkScroll ">
            <div className='cohortboxcarousel'>
              <Carousel value={State_Benchmarking_top_tiledata} numScroll={1} numVisible={5} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
            <div className=" grid grid-cols-12  gap-[16px] xl:gap-[16px] 3xl:gap-[0.833vw]">
              {/* <div className=" col-span-4  p-[16px] xl:p-[16px] 3xl:p-[0.833vw]  bg-[#192D5C] rounded-[8px]"> */}
              <div className="flex justify-between items-center">
                <div>


                </div>

              </div>
            </div>
            <LoaderContainer loading={State_Benchmarking_tableloading} cssClass="min-h-[15rem] max-h-full">
              <div className="flex w-full justify-between mt-[24px] 3xl:mt-[1.25vw]">
                <div className="flex items-center gap-[16px] 3xl:gap-[0.833vw]">
                  {Object.keys(pagedata).map(tab =>
                    <button
                      className={` ${activeTab === tab
                        ? "bg-[#FFF] text-black"
                        : " bg-[#1C2732] text-[#FFFFFF]"
                        } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[14px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw]`}
                      onClick={() => handleOuterTabChange(tab)}
                    >
                      {tab}
                    </button>
                  )}
                </div>

                {/* Inner Tab Section */}
                {/* <div className="flex gap-3">
                  <button
                    className={` ${
                      activeTab1 === "Top"
                        ? "bg-[#FFF] text-black"
                        : " bg-[#1C2732] text-[#FFFFFF]"
                    } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[14px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw]`}
                    onClick={() => setActiveTab1("Top")}
                  >
                    Top 5
                  </button>
                  <button
                    className={` ${
                      activeTab1 === "Bottom"
                        ? "bg-[#FFF] text-black"
                        : " bg-[#1C2732] text-[#FFFFFF]"
                    } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[14px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw]`}
                    onClick={() => setActiveTab1("Bottom")}
                  >
                    Bottom 5
                  </button>
                </div> */}

              </div>

              {Object.keys(pagedata).length ? (
                <div className=" mt-[25px] 3xl:mt-[1.263vw] mb-5">
                  <div className=" rounded-[8px] border border-[rgba(255,255,255,0.10)] bg-[rgba(0,35,64,0.70)] p-[20px] 3xl:p-[1.042vw]">
                    <div className=" space-y-[6px]">
                      <div className="grid grid-cols-3 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[4px] ">
                        <div className=" col-span-1"></div>
                        <div class="col-span-1 flex justify-center">

                          <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">State score</div>
                        </div>
                        <div class="col-span-1 ">
                          <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">

                            District score


                            {/* <div className="flex gap-3 ml-[5px]"> */}

                            {/* </div> */}
                            {/* <button
                              className={` ${activeTab1 === "Top"
                                ? "bg-[#FFF] text-black"
                                : " bg-[#1C2732] text-[#FFFFFF]"
                                } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[20px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw] margin-left-reduce ml-[130px]`}
                              onClick={() => setActiveTab1("Top")}
                            >
                              Top
                            </button>
                            
                            <button
                              className={` ${activeTab1 === "Bottom"
                                ? "bg-[#FFF] text-black"
                                : " bg-[#1C2732] text-[#FFFFFF]"
                                } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[20px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw]`}
                              onClick={() => setActiveTab1("Bottom")}
                            >
                              Bottom
                            </button> */}
                            <button
                              className={` ${activeTab1 === "Top"
                                ? "bg-[#FFF] text-black"
                                : "bg-[#1C2732] text-[#FFFFFF]"
                                } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[20px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw] margin-left-reduce ml-[130px]`}
                              onClick={handleTopClick}
                            >
                              {topButtonText}
                            </button>

                            <button
                              className={` ${activeTab1 === "Bottom"
                                ? "bg-[#FFF] text-black"
                                : "bg-[#1C2732] text-[#FFFFFF]"
                                } text-[14px] 3xl:text-[0.833vw] font-normal rounded-full px-[20px] 3xl:px-[0.833vw] py-[10px] 3xl:py-[0.625vw]`}
                              onClick={handleBottomClick}
                            >
                              {bottomButtonText}
                            </button>
                          </div>
                        </div>



                        {/* <div class="col-span-1">
                        <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">
                          District 1
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">
                          District 2
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">
                          District 3
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">
                          District 4
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div class="text-[#fff] text-[20px] 3xl:text-[1.042vw] font-medium leading-[140%] mb-[4px]">
                          District 5
                        </div>
                      </div> */}


                      </div>
                      {activeTab1 === "Top" ? (
                        currentTopData?.map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]"
                          >
                            {/* Column 1: System Name and Metric Name */}
                            <div className="col-span-1">
                              <div className="text-[#fff] text-[16px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">
                                {item?.SYSTEM_NAME}
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                {item?.METRIC_NAME}
                              </div>
                            </div>

                            {/* Column 2: State Value */}
                            <div className="col-span-1 flex justify-center">
                              <div className="flex items-center gap-[6px]">
                                <div className="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%]">
                                  {item?.METRIC_NAME === "Total Incidents"
                                    ? item?.STATE_VALUE?.toFixed(0)
                                    : `${item?.STATE_VALUE?.toFixed(2) || "-"}%`}
                                </div>
                              </div>
                            </div>

                            {/* Column 3: Value, Rank, and PY Rank */}
                            <div className="col-span-1">
                              <div className="flex items-center gap-[6px]">
                                <div className="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%]">
                                  {item?.METRIC_NAME === "Total Incidents"
                                    ? item?.VALUE?.toFixed(0)
                                    : `${item?.VALUE?.toFixed(2) || "-"}%`}
                                </div>
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                Rank: {item?.RANK || "-"}
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                LY: {item?.PY_RANK || "-"}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        currentBottomData?.map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]"
                          >
                            {/* Column 1: System Name and Metric Name */}
                            <div className="col-span-1">
                              <div className="text-[#fff] text-[16px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">
                                {item?.SYSTEM_NAME}
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                {item?.METRIC_NAME}
                              </div>
                            </div>

                            {/* Column 2: State Value */}
                            <div className="col-span-1 flex justify-center">
                              <div className="flex items-center gap-[6px]">
                                <div className="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%]">
                                  {item?.METRIC_NAME === "Total Incidents"
                                    ? item?.STATE_VALUE?.toFixed(0)
                                    : `${item?.STATE_VALUE?.toFixed(2) || "-"}%`}
                                </div>
                              </div>
                            </div>

                            {/* Column 3: Value, Rank, and PY Rank */}
                            <div className="col-span-1">
                              <div className="flex items-center gap-[6px]">
                                <div className="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%]">
                                  {item?.METRIC_NAME === "Total Incidents"
                                    ? item?.VALUE?.toFixed(0)
                                    : `${item?.VALUE?.toFixed(2) || "-"}%`}
                                </div>
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                Rank: {item?.RANK || "-"}
                              </div>
                              <div className="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">
                                LY: {item?.PY_RANK || "-"}
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {/* <div className=" grid grid-cols-12 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]">
                                        <div class="col-span-2"><div class="text-[#fff] text-[18px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">Student Growth</div><div class="text-[#C9D0DB] text-[14px] 3xl:text-[0.833vw] font-normal leading-[140%]">Learing game in ELA and Math performw</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">5</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">5</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">5</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">5</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div className=" col-span-2 relative">
                                            <div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">5</div></div>
                                            <div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div>
                                            <div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div>
                                            <div className=" absolute top-0 right-0 cursor-pointer">
                                            <i className="pi pi-chevron-circle-down text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-12 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]">
                                        <div class="col-span-2"><div class="text-[#fff] text-[18px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">Graduation</div><div class="text-[#C9D0DB] text-[14px] 3xl:text-[0.833vw] font-normal leading-[140%]">A graduas on rate of 80% is benchmark of sta</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2 relative"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div>
                                            <div class="absolute top-0 right-0 cursor-pointer"><i className="pi pi-chevron-circle-down text-white"></i></div></div>
                                    </div>
                                    <div className=" grid grid-cols-12 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]">
                                        <div class="col-span-2"><div class="text-[#fff] text-[18px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">English Proficiency</div><div class="text-[#C9D0DB] text-[14px] 3xl:text-[0.833vw] font-normal leading-[140%]">Florice targeting 70% proñcience</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2 relative"><div class="flex items-center gap-[6px]"><div class="bg-[#069564] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">8</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div>
                                            <div class="absolute top-0 right-0 cursor-pointer"><i className="pi pi-chevron-circle-down text-white"></i></div></div>
                                    </div>
                                    <div className=" grid grid-cols-12 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]">
                                        <div class="col-span-2"><div class="text-[#fff] text-[18px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">Attendance</div><div class="text-[#C9D0DB] text-[14px] 3xl:text-[0.833vw] font-normal leading-[140%]">Reduction of Chrome absenteeism to less than 10%</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">6</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">6</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">6</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">6</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2 relative"><div class="flex items-center gap-[6px]"><div class="bg-[#D74210] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">6</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div><div class="absolute top-0 right-0 cursor-pointer"><i className="pi pi-chevron-circle-down text-white"></i></div></div>
                                    </div>
                                    <div className=" grid grid-cols-12 gap-[18px] 2xl:gap-[56px] 3xl:gap-[2.917vw] px-[22px] 3xl:px-[1.25vw] py-[12px] 3xl:py-[0.625vw] bg-[#0C1A26]">
                                        <div class="col-span-2"><div class="text-[#fff] text-[18px] 3xl:text-[0.938vw] font-medium leading-[140%] mb-[4px]">Advanced Coursework</div><div class="text-[#C9D0DB] text-[14px] 3xl:text-[0.833vw] font-normal leading-[140%]">Encourage more students to take AP, IB tests</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#F2990E] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">7</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#F2990E] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">7</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#F2990E] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">7</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2"><div class="flex items-center gap-[6px]"><div class="bg-[#F2990E] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">7</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div></div>
                                        <div class="col-span-2 relative"><div class="flex items-center gap-[6px]"><div class="bg-[#F2990E] h-[12px] 3xl:h-[0.625vw] w-[12px] 3xl:w-[0.625vw] rounded-full mt-[2px]"></div><div class="text-[#fff] text-[18px] 3xl:text-[1.042vw] font-medium leading-[140%] ">7</div></div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">Rank : 14</div><div class="text-[#C9D0DB] text-[12px] 3xl:text-[0.729vw] font-normal leading-[140%]">PY : 7</div><div class="absolute top-0 right-0 cursor-pointer"><i className="pi pi-chevron-circle-down text-white"></i></div></div>
                                    </div> */}
                    </div>
                  </div>
                </div>
              ) :
                <></>}
            </LoaderContainer>

            {topButtonText === "Top" && activeTab1 === "Top" ? (
              <div className="pagenation flex justify-around">
                <button
                  className={`paginationprevious1 ${currentTopPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentTopPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentTopPage === 1}
                >
                  <Link className="pointer-events-none">Previous</Link>
                </button>
                <div
                  className="pageinput"
                  style={{ position: "relative", top: "15px", fontSize: "10px" }}
                >
                  Page <span>{currentTopPage}</span> of <span>{totalTopPages}</span>
                </div>
                <button
                  className={`paginationnext1 ${currentTopPage === totalTopPages ? "disabled" : ""}`}
                  onClick={() => setCurrentTopPage((prev) => Math.min(prev + 1, totalTopPages))}
                  disabled={currentTopPage === totalTopPages}
                >
                  <Link className="pointer-events-none">Next</Link>
                </button>
              </div>
            ) : null}

            {bottomButtonText === "Bottom" && activeTab1 === "Bottom" ? (
              <div className="pagenation flex justify-around">
                <button
                  className={`paginationprevious1 ${currentBottomPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentBottomPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentBottomPage === 1}
                >
                  <Link className="pointer-events-none">Previous</Link>
                </button>
                <div
                  className="pageinput"
                  style={{ position: "relative", top: "15px", fontSize: "10px" }}
                >
                  Page <span>{currentBottomPage}</span> of <span>{totalBottomPages}</span>
                </div>
                <button
                  className={`paginationnext1 ${currentBottomPage === totalBottomPages ? "disabled" : ""}`}
                  onClick={() => setCurrentBottomPage((prev) => Math.min(prev + 1, totalBottomPages))}
                  disabled={currentBottomPage === totalBottomPages}
                >
                  <Link className="pointer-events-none">Next</Link>
                </button>
              </div>
            ) : null}

          </div>

          <div class="footer flex justify-between  p-0 mt-0">


            <div className="text-white text-[14px]"><span>Date Source: NYSED,2022-2023</span></div>
            <div class="mr-3  px-4">
              {/* <img
                src={Complogo}
                height="50px"
                width="130px"
                alt="logo"
                className="mr-[2vw]"
              /> */}


              <img src={k12darklogo} height="50px" width="130px" alt="logo" className="mr-[0vw]" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
