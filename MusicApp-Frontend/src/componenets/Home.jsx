import Footer from "../Footer"
import Navbar from "./Navbar"
import About from "./About"
import Categories from "./Categories"
import Gallery from "./Gallery"
import Languages from "./Languages"
import Slides from "./slides"
import Subscribe from "./Subscribe"



const Home=()=>{
     return(
          <>
          <Navbar/>
          <Slides/>
          <Categories/>
          {/* <Gallery/> */}
          <About/>
          <Languages/>
          <Subscribe/>
          <Footer/>
          </>
     )
}
export default Home