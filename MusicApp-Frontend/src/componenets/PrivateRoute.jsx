import { Navigate, Outlet } from "react-router-dom";


const Privateroute=()=>{
      const isAuthenticated=sessionStorage.getItem("loggedInUser");
      return isAuthenticated ? <Outlet/>:<Navigate to='/'/>

      
      
}
export default Privateroute;