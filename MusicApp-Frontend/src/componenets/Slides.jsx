import { useState } from 'react';
import bg1 from '../assets/bg1.png';
import bg3 from '../assets/bg3.png';
import bg4 from '../assets/bg4.png';
import mic from '../assets/mic.png';
import western from '../assets/western.mp3';
 


const Slides = () => {
  const [currentAudioId, setCurrentAudioId] = useState(null);

  const handleTogglePlay = (audioId) => {
    const newAudio = document.getElementById(audioId);

    ['audio1', 'audio2', 'audio3'].forEach((id) => {
      const audio = document.getElementById(id);
      if (audio && id !== audioId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (newAudio.paused) {
      newAudio.play();
      setCurrentAudioId(audioId);
    } else {
      newAudio.pause();
      setCurrentAudioId(null);
    }
  };

  const isPlaying = (audioId) => currentAudioId === audioId;

  return (
    <>
      {/* Audio Elements */}
      <audio id="audio1" src={western} />
      <audio id="audio2" src={western} />
      <audio id="audio3" src={western} />

      {/* Bootstrap Carousel with Fade Effect */}
      <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 - Western */}
          <div className="carousel-item active">
            <div
              className="d-flex align-items-center justify-content-center text-white fade-in"
              style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
animation: 'zoomIn 1s ease'              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center mb-4 mb-md-0">
                    <h1
                      className="mb-4 display-3 fw-bold text-white"
                      style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.6)' }}
                    >
                      Western Music
                    </h1>
                    <button
                      onClick={() => handleTogglePlay('audio1')}
                      className="btn px-5 py-3 text-white rounded-3"
                      style={{ backgroundColor: "#B33791" }}
                    >
                      {isPlaying('audio1') ? 'Pause it' : 'Play it'}
                    </button>
                  </div>
                  <div className="col-md-6 text-center">
                    <img src={mic} alt="Mic" className="img-fluid"  />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Classic */}
          <div className="carousel-item">
            <div
              className="d-flex align-items-center justify-content-center text-white fade-in"
              style={{
                backgroundImage: `url(${bg3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
animation: 'zoomIn 1s ease'              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center mb-4 mb-md-0">
                    <h1
                      className="mb-4 display-3 fw-bold text-white"
                      style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.6)' }}
                    >
                      Classic Music
                    </h1>
                    <button
                      onClick={() => handleTogglePlay('audio2')}
                      className="btn px-5 py-3 text-white rounded-3"
                      style={{ backgroundColor: "#B33791" }}
                    >
                      {isPlaying('audio2') ? 'Pause it' : 'Play it'}
                    </button>
                  </div>
                  <div className="col-md-6 text-center">
                    <img src={mic} alt="Mic" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Pop with Zoom */}
          <div className="carousel-item">
            <div
              className="d-flex align-items-center justify-content-center text-white zoom-in"
              style={{
                backgroundImage: `url(${bg4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                animation: 'zoomIn 1s ease'
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center mb-4 mb-md-0">
                    <h1
                      className="mb-4 display-3 fw-bold text-white"
                      style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.6)' }}
                    >
                      Pop Music
                    </h1>
                    <button
                      onClick={() => handleTogglePlay('audio3')}
                      className="btn px-5 py-3 text-white rounded-3"
                      style={{ backgroundColor: "#B33791" }}
                    >
                      {isPlaying('audio3') ? 'Pause it' : 'Play it'}
                    </button>
                  </div>
                  <div className="col-md-6 text-center">
                    <img src={mic} alt="Mic" className="img-fluid"  />  
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Inline CSS keyframes */}
      <style>
        {`
          @keyframes zoomIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Slides;
