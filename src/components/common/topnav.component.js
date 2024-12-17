
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import whiteLogoImg from '../../assets/brands/Artboard.svg';
// import whiteLogoImg from '../../assets/brands/sfps_logo.png';
import whiteLogoImg from '../../assets/brands/geogia_img-one.png';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TabView, TabPanel } from 'primereact/tabview';
// import AppLogo from '../AppLogo';
import HRProfile from "./profile.component";
import { Sidebar } from 'primereact/sidebar';
import FilterComponent from "../filterComponent";

export default function TopNav(props) {
    const [visible, setVisible] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    var pagename = window.location.pathname
    // console.log("pagename",pagename)
    const handleClick = () => {
        window.sessionStorage.removeItem('SchoolType');
        window.sessionStorage.removeItem('Schoolname');
        window.sessionStorage.removeItem('Year');
        window.sessionStorage.removeItem('Gender');
        window.sessionStorage.removeItem('Ethincity');
        window.sessionStorage.removeItem('Grade');
        window.sessionStorage.removeItem('allfilter');
        window.sessionStorage.removeItem('selectedoptions');
        window.sessionStorage.removeItem('selectedoptions1');
        window.sessionStorage.removeItem('selectedoptions2');
        window.sessionStorage.removeItem('selectedoptions3');
        window.sessionStorage.removeItem('selectedmetric');
      };
    useEffect(() => {
        const handleBeforeUnload = () => {
          window.sessionStorage.removeItem('SchoolType');
          window.sessionStorage.removeItem('Schoolname');
          window.sessionStorage.removeItem('Year');
          window.sessionStorage.removeItem('Gender');
          window.sessionStorage.removeItem('Ethincity');
          window.sessionStorage.removeItem('Grade');
          window.sessionStorage.removeItem('allfilter');
          window.sessionStorage.removeItem('selectedoptions');
          window.sessionStorage.removeItem('selectedoptions1');
          window.sessionStorage.removeItem('selectedoptions2');
          window.sessionStorage.removeItem('selectedoptions3');
          window.sessionStorage.removeItem('selectedmetric');
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    const BarHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-bars"></i>
            </div>
        )
    };
    const FilterHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-sliders-v"></i>
            </div>
        )
    };
    const SettingHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-cog"></i>
            </div>
        )
    };

    useEffect(() => {

    }, []);
    const navigate = useNavigate();

    const hangleLogOut=()=>{
        console.log('Logout is done')
        // sessionStorage.removeItem("userInfo")
        // props.setUserData(null)
        navigate("/")
    }



    return (
        <div className=" w-full text-gray-700 py-4  top-0 z-10 headar-wrapper dark:bg-[#232528] dark:shadow-md">
            <div x-data="{ open: false }" className="flex flex-col mx-auto md:items-center md:justify-between md:flex-row">
                <div className="flex flex-row items-center justify-between py-0 px-4">
                    <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                        {/* <AppLogo /> */}
                        {/* <img src={whiteLogoImg} className="" width={250}/> */}
                        <img src={whiteLogoImg} className="main_logo" width={250} style={{height:80}} />
                    </Link>
                    <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                            <path x-show="!open" fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            <path x-show="open" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <nav className="flex-col flex-grow hidden h-16 pb-4 md:flex md:items-center md:pb-0 md:justify-end md:flex-row">
                    <div className="flex-col items-center justify-end">
                        <h2 className="title text-right">{props.pagename}</h2>
                        <p className="subtitle">{props?.pagenamedescription}</p>


                    </div>

                    <div className="relative flex items-center gap-3 ml-5 profile-block" x-data="{ open: false }">
                        <div className="px-2 baricon"><button onClick={() => setVisibleRight(true)}><i className="pi pi-bars"></i></button></div>
                        <HRProfile />
                    </div>
                </nav>
            </div>
            <div>
            <Sidebar visible={visibleRight}  position="right" onHide={() => setVisibleRight(false)}>
             
                
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="  " headerTemplate={BarHeaderTemplate} headerClassName="flex align-items-center">
                        <div className="bg-[#0d234c] p-5 h-[120px]">
                                <h2 className="text-[18px] text-[#fff]">Navigation Menu</h2>
                                <p className="text-[14px] text-[#fff]">Search through the list of Navigation menus</p>
                        </div>
                        <div className="px-3 py-3 menu">
                            <ul onClick={handleClick}>
                                <li className={pagename == "/dashboard"?"active":''}><Link  to='/dashboard'>District at a Glance</Link></li>
                                <li className={pagename == "/StrengthWeakness"?"active":''}><Link to='/StrengthWeakness'>Strength & Weakness</Link></li>
                                <li className={pagename == "/StudentPerformance"?"active":''}><Link to='/StudentPerformance'>Student Performance & Progress</Link></li>
                                {/* <li><Link to='/collegecareerreadiness'>College and Career Readiness</Link></li> */}
                                {/* <li><Link to='/humanResources'>Human Resources</Link></li> */}
                                <li className={pagename == "/enrollment"?"active":''}><Link to='/enrollment'>Enrollment</Link></li>
                                {/* <li><Link to='/districtgoals'>District Goal & Strategy</Link></li> */}
                                <li className={pagename == "/studentbehavior"?"active":''}><Link to='/studentbehavior'>Student Behavior</Link></li>
                                <li className={pagename == "/schoolperformance"?"active":''}><Link to='/schoolperformance'>School Performance</Link></li>
                                <li className={pagename == "/statebenchmarking"?"active":''}><Link to='/statebenchmarking'>State Benchmarking</Link></li>
                                <li className={pagename == "/financedashboard"?"active":''}><Link to='/financedashboard'>Financial Dashboard</Link></li>
                                {/* <li><Link to='/GraduationRateAnalysis'>Graduation Rate Analysis</Link></li> */}
                                
                            </ul>

                        </div>
                        
                    </TabPanel>
                    <TabPanel header="" headerTemplate={FilterHeaderTemplate} headerClassName="flex align-items-center">
                    <div className="bg-[#0d234c] p-5 h-[auto]">
                        
                                <h2 className="text-[18px] text-[#fff]">Filters</h2>
                                <p className="text-[14px] text-[#fff]">Apply filters for Advanced Search</p>
                                <FilterComponent />
                               
                   </div>
                       
                             
                    </TabPanel>
                    <TabPanel header="" headerTemplate={SettingHeaderTemplate} headerClassName="flex align-items-center">
                    <div className="bg-[#0d234c] p-5 h-[120px]">
                                <div className="text-[18px] text-[#fff] mb-3" style={{cursor:"pointer"}} onClick={hangleLogOut}>LogOut</div>

                                <h2 className="text-[18px] text-[#fff]">Resources</h2>
                               
                                {/* <p className="text-[14px] text-[#fff]">SApply filters for Advanced Search</p> */}
                        </div>
                    </TabPanel>
                </TabView>


                 
            </Sidebar>
            </div>
        </div>
    )

}