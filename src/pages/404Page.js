import { useNavigate } from "react-router-dom";
import PageNotFoundImage from '../assets/images/404.png'
const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="pt-16" >
            <div className="dashboard-main-wrapper mt-3">
                <div className="flex flex-wrap flex-row align-center justify-center content-center auto-rows-max ">
                        <img src={PageNotFoundImage} alt="Page not found" />
                </div>
                <div className="flex mt-5 flex-wrap flex-row align-center justify-center content-center auto-rows-max">
                        <button className="py-2 px-6 text-[#000] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md" onClick={() => navigate(-1)}>Go back</button>
                </div>
            </div>
        </div>
    )
}
export default PageNotFound