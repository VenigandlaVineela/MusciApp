import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
 import type1 from '../assets/type1.png';
import type2 from '../assets/type2.png';
import type3 from '../assets/type3.png';
import type4 from '../assets/type4.png';
import type5 from '../assets/type5.png';
import type6 from '../assets/type6.png';
import type7 from '../assets/type7.png';
import type8 from '../assets/type8.png';
import DashboardNavbar from './DashboardNavbar';

const DashboardMusicTypes = () => {
  const navigate = useNavigate();

  const [DashboardMusicTypes] = useState([
    { image: type1, title: "Pop", bgColor: "#ffe6f0" },
    { image: type2, title: "Rock", bgColor: "#f2f2f2" },
    { image: type3, title: "Jazz", bgColor: "#e6ccff" },
    { image: type4, title: "Hip-Hop", bgColor: "#d0f0fd" },
    { image: type5, title: "Folk", bgColor: "#fff2cc" },
    { image: type6, title: "Classical", bgColor: "#fce4ec" },
    { image: type7, title: "K-Pop", bgColor: "#e8f5e9" },
    { image: type8, title: "Electronic", bgColor: "#ffe0e0" },
  ]);

  return (
    <>
      <DashboardNavbar/>
      <section className="py-5">
        <div className="container">
          <h2
            className="text-center mb-5"
            style={{
              backgroundImage: 'linear-gradient(135deg, #e62cdaff, #ad98eaff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Explore Music Genres
          </h2>
          <div className="row g-4">
            {DashboardMusicTypes.map((type, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div
                  className="card h-100 text-center shadow-sm border border-2"
                  style={{
                    backgroundColor: type.bgColor,
                    borderRadius: '15px',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="img-fluid mb-3"
                      style={{
                        height: '120px',
                        width: '120px',
                        objectFit: 'contain',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        padding: '10px',
                      }}
                      onClick={() =>
                        navigate('/dashboard/musicplaylist', { state: { genre: type.title } })
                      }
                    />
                    <h5 className="card-title fw-semibold">{type.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DashboardMusicTypes;









 