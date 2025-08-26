import React, { useState, useRef } from 'react';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import western from "../assets/western.mp3";



const Categories = () => {
  const [categories] = useState([
    { image: c1, title: "Pop Music" },
    { image: c2, title: "Hip-hop Music" },
    { image: c3, title: "Electronic Music" },
    { image: c4, title: "Rhythm and Blues" },
    { image: c1, title: "Classic Music" },
    { image: c2, title: "Western Music" },
    { image: c3, title: "Traditional Music" },
    { image: c4, title: "Folk Music" }
  ]);

  const audioRef = useRef(new Audio(western));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className='py-5' style={{
        background:
          "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        color: "white",
      }}>
        <div className="container py-5">
          <div className="text-center">
            <h1
              className="mb-5 fa-1"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            //   style={{
            //   backgroundImage: 'linear-gradient(135deg, #e31cd5ff, #ad98eaff)',
            //   WebkitBackgroundClip: 'text',
            //   WebkitTextFillColor: 'transparent',
            //   fontWeight: 'bold',
            // }}
            >
              Popular Music
            </h1>
          </div>

          <div
            className="d-flex flex-nowrap overflow-auto px-4 gap-4 hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map((item, index) => (
              <div key={index} className="card-container" >
                <button
                  type="button"
                  className="btn category-card"
                  data-bs-toggle="modal"
                  data-bs-target={`#modal${index}`}
                >
                  <div className="image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ height: '300px', width: '300px', objectFit: 'cover', }}
                      className='pulse-img rounded border border-3 border-primary shadow-lg' />
                    <div className="overlay-text">{item.title}</div>
                  </div>
                </button>

                {/* Modal */}
                <div
                  className="modal fade"
                  id={`modal${index}`}
                  tabIndex="-1"
                  aria-labelledby={`modalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id={`modalLabel${index}`}>
                          {item.title}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                            setIsPlaying(false);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body text-center">
                        <img
                          src={item.image}
                          className="img-fluid mb-3"
                          alt={item.title}
                          style={{ maxHeight: '250px', objectFit: 'cover' }}
                        />
                        <p>{item.title}</p>

                        {/* Audio Visualizer */}
                        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`bar ${isPlaying ? 'animate-bar' : ''}`}></div>
                          ))}
                        </div>

                        <button className="btn btn-primary" onClick={toggleMusic}>
                          {isPlaying ? 'Stop Music' : 'Play Music'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Categories;
