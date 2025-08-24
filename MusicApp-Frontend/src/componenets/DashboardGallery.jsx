import React from 'react';
import bg2 from '../assets/bg2.png';
import image1 from '../assets/image1.png';
import Navbar from './Navbar';
import Footer from '../Footer';

const DashboardGallery = () => {
     return (

          <>
               <div className="position-relative text-white" style={{ height: '100vh', overflow: 'hidden' }}>
                    {/* Background Image */}
                    <img
                         src={bg2}
                         className="w-100 h-100 position-absolute"
                         alt="Background"
                         style={{ objectFit: 'cover', zIndex: 1 }}
                    />

                    {/* Overlay Images and Text */}
                    <div className="position-absolute w-100 h-100" style={{ zIndex: 2 }}>
                         {/* Image with text */}
                         <div className="position-absolute" style={{ top: '7%', left: '10%', width: '22vw', maxWidth: '270px' }}>
                              <img src={image1} alt="img1" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-primary d-inline-block px-2 py-1">MICHAEL SMITH IN CONCERT</div>
                                   <div className="text-white small">August 25</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '20%', left: '33%', width: '19vw', maxWidth: '230px' }}>
                              <img src={image1} alt="img2" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-pink d-inline-block px-2 py-1">STREET ART FEST</div>
                                   <div className="text-white small">November 28</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '7%', left: '53%', width: '21vw', maxWidth: '260px' }}>
                              <img src={image1} alt="img3" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-primary d-inline-block px-2 py-1">ANABELLE IN CONCERT</div>
                                   <div className="text-white small">August 28</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '55%', left: '13%', width: '13vw', maxWidth: '160px' }}>
                              <img src={image1} alt="img4" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-warning text-dark d-inline-block px-2 py-1">Check July Events</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '30%', left: '75%', width: '16vw', maxWidth: '200px' }}>
                              <img src={image1} alt="img6" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-warning text-dark d-inline-block px-2 py-1">Summer Festivals</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '58%', left: '52%', width: '16vw', maxWidth: '200px' }}>
                              <img src={image1} alt="img8" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-primary d-inline-block px-2 py-1">MODERN BALLET</div>
                                   <div className="text-white small">August 25</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '72%', left: '73%', width: '13vw', maxWidth: '160px' }}>
                              <img src={image1} alt="img9" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-warning text-dark d-inline-block px-2 py-1">Autumn Vibes</div>
                              </div>
                         </div>

                         <div className="position-absolute" style={{ top: '62%', left: '28%', width: '18vw', maxWidth: '220px' }}>
                              <img src={image1} alt="img10" className="img-fluid w-100 rounded-3" />
                              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                   <div className="bg-primary d-inline-block px-2 py-1">90's DISCO NIGHT</div>
                                   <div className="text-white small">August 28</div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default DashboardGallery;



