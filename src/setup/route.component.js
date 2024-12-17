import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard.component";
import StrengthWeakness from "../pages/StrengthWeakness";
import StudentPerformance from "../pages/StudentPerformance";
import PageNotFound from "../pages/404Page";
import HumanResources from "../pages/humanResources";
import CollegeCareerReadiness from "../pages/CollegeCareerReadiness";
import StudentBehaviour from "../pages/studentbehaviour";
import GraduationRateAnalysis from "../pages/GraduationRateAnalysis";
import Districtgoals from "../pages/districtgoals";
import Enrollment from "../pages/enrollment";
import Studentbehaviorexecutive from "../pages/studentbehaviorexecutive";
import Schoolperformance from "../pages/schoolperformance";
import LogIn from "../setup/login";
import StateBenchMarking from "../pages/statebenchmarking";
import Financedashboard from "../pages/financedashboard";
 
export default function RouteComponent({ setUserData }) {
  return (
<Routes>
<Route path="/" element={<LogIn setUserData={setUserData} />} />
<Route path="/dashboard" element={<Dashboard setUserData={setUserData} />} />
<Route path="/collegecareerreadiness" element={<CollegeCareerReadiness setUserData={setUserData} />} />
<Route path="/studentbehavior" element={<StudentBehaviour setUserData={setUserData} />} />
<Route path="/StrengthWeakness" element={<StrengthWeakness setUserData={setUserData} />} />
<Route path="/StudentPerformance" element={<StudentPerformance setUserData={setUserData} />} />
<Route path="/humanResources" element={<HumanResources setUserData={setUserData} />} />
<Route path="/GraduationRateAnalysis" element={<GraduationRateAnalysis setUserData={setUserData} />} />
<Route path="/districtgoals" element={<Districtgoals setUserData={setUserData} />} />
<Route path="/enrollment" element={<Enrollment setUserData={setUserData} />} />
<Route path="/studentbehaviorexecutive" element={<Studentbehaviorexecutive setUserData={setUserData} />} />
<Route path="/schoolperformance" element={<Schoolperformance setUserData={setUserData} />} />
<Route path="/statebenchmarking" element={<StateBenchMarking setUserData={setUserData} />} />
<Route path="/financedashboard" element={<Financedashboard setUserData={setUserData} />} />
<Route path="*" element={<PageNotFound />} />
</Routes>

  );
}