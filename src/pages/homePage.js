import { useNavigate } from "react-router-dom";
import logoImage from '../assets/images/logo.png'
const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="pt-16" >
            <div className="dashboard-main-wrapper pl-20 pr-4 mt-3">
                <div className="flex flex-wrap flex-row align-center justify-center content-center auto-rows-max ">
                        <img src={logoImage} alt="Page not found" />
                </div>
                
            </div>
        </div>
    )
}
export default HomePage