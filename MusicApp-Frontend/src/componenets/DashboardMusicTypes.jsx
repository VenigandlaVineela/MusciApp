import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardFooter from '../DashboardFooter';


const DashboardMusicTypes = () => {
  const navigate = useNavigate();
  const [musicTypes, setMusicTypes] = useState([]);

  const handleMusicType = (type) => {
    navigate(`/dashboard/musicplaylist/${type}`);
  };

  useEffect(() => {
    const fetchMusicTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/musicApp/musicTypes/getMusicTypes");
        const data = await response.json();
        setMusicTypes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMusicTypes();
  }, []);

  const formatImg = (item) =>
    `data:${item.type};base64,${item.data}`;

  return (
    <>
      <DashboardNavbar />
      <div style={{
        background:
          "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        color: "white",
      }}>
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
              {musicTypes.map((type, index) => (
                <div className="col-md-3 col-sm-6" key={index}>
                  <div
                    className="card h-100 text-center shadow-sm border border-2"
                    style={{
                      backgroundColor: type.bgColor,
                      borderRadius: '15px',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <img
                        src={formatImg(type)}
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
                        onClick={() => handleMusicType(type.title)} // ✅ fixed
                      />
                      <h5 className="card-title fw-semibold">{type.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <DashboardFooter />

    </>
  );
};

export default DashboardMusicTypes;

