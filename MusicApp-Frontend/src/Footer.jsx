import {  useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {

const navigate=useNavigate();    

     return (
          <footer
               className="footer text-white pt-5 pb-3"
               style={{
                    background:
                         "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                    color: "white",
               }}
          >
               <div className="container">
                    <div className="row">

                         {/* Logo & About */}
                         <div className="col-md-4 col-sm-12">
                              <img src={logo} alt="Logo" className="img-fluid mb-3 footer-logo" />
                              <p className="footer-text">
                                   About: Explore the best of music with our platform — curated, trending, and timeless hits.
                              </p>
                         </div>

                         {/* Services */}
                         <div className="col-md-4 col-sm-12 mb-4 ">
                              <h5 className="footer-title mb-3">Services</h5>
                              <ul className="list-unstyled footer-links">
                                  <li><Link to="/">Home</Link></li>
                                   <li><Link to="/musictypes">Music Types</Link></li>
                                   {/* <li><a onClick={()=>{navigate('/')}}>Random Play</a></li> */}
                                   {/* <li><a onClick={()=>{navigate('/')}}>Contact</a></li> */}
                              </ul>
                         </div>

                         {/* Contact */}
                         <div className="col-md-4 col-sm-12 mb-4">
                              <h5 className="footer-title mb-3">Contact Us</h5>
                              <p><i className="bi bi-telephone"></i> Mobile: 1234567890</p>
                              <p><i className="bi bi-envelope"></i> Email: sdfg@gmail.com</p>
                              <p><i className="bi bi-geo-alt"></i> Location: 123 Music Street, Harmony City</p>
                         </div>

                    </div>
               </div>

               <hr className="border-light container-fluid" />
               <p className="text-center small">&copy; 2025 Music App. All rights reserved.</p>
          </footer>
     );
};

export default Footer;
