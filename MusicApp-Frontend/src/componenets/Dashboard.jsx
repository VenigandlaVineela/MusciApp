import DashboardFooter from "../DashboardFooter"
import DashboardNavbar from "./DashboardNavbar"
import DashboardAbout from "./DashboardAbout"
import DashboardLanguages from "./DashboardLanguages"
import DashboardSlides from "./Dashboardslides"
import DashboardSubscribe from "./DashboardSubscribe"
import DashboardCategories from "./DashboardCategories"



const Dashboard=()=>{
     return(
          <>
          <DashboardNavbar/>
          <DashboardSlides/>
          <DashboardCategories/>
          {/* <DashboardGallery/> */}
          <DashboardAbout/>
          <DashboardLanguages/>
          <DashboardSubscribe/>
          <DashboardFooter/>
          </>
     )
}
export default Dashboard