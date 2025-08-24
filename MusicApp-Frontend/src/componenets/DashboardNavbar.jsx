import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MdAccountCircle, MdOutlineAccountCircle, MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import logo1 from '../assets/logo1.png';
import western from '../assets/Western.mp3';
import music2 from '../assets/music2.mp3';
import music3 from '../assets/music3.mp3';
import music4 from '../assets/music4.mp3';
import music5 from '../assets/music5.mp3';
import music6 from '../assets/music6.mp3';
import music7 from '../assets/music7.mp3';
import music8 from '../assets/music8.mp3';
import music9 from '../assets/music9.mp3';
import music10 from '../assets/music10.mp3';
import c1 from '../assets/c1.png';
import playIcon from '../assets/playIcon.png';
import pauseIcon from '../assets/pauseIcon.png';

const DashboardNavbar = () => {
  const navigate = useNavigate();

   const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

   

  // Form States
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const musicList = [
    { file: western, name: 'Western' },
    { file: music2, name: 'Music 2' },
    { file: music3, name: 'Music 3' },
    { file: music4, name: 'Music 4' },
    { file: music5, name: 'Music 5' },
    { file: music6, name: 'Music 6' },
    { file: music7, name: 'Music 7' },
    { file: music8, name: 'Music 8' },
    { file: music9, name: 'Music 9' },
    { file: music10, name: 'Music 10' },
  ];

  // Handle Input Change
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
 

  // Music Functions
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    setCurrentTrackIndex(randomIndex);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentTrackIndex]);



  const handlelogout=()=>{
    sessionStorage.removeItem("loggedInUser");
   navigate('/');
  }

  return (
    <>
      {/* Sticky Navbar */}
      <section
        className="sticky-top shadow-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 1030,
        }}
      >
        <div className="container">
          <div className="row align-items-center py-2">
            {/* Logo */}
            <div className="col-md-6 col-sm-12 d-flex align-items-center">
              <img
                src={logo1}
                alt="Logo"
                className="img-fluid"
                onClick={() => navigate('/dashboard')}
                style={{ maxHeight: '80px', width: 'auto', cursor: 'pointer' }}
              />
            </div>

            {/* Nav Links */}
            <div className="col-md-6 col-sm-12 pt-md-0 pt-3">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav gap-2">
                      <li className="nav-item">
                        <button
                          className="btn px-2 py-2 fw-bold  "
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                          onClick={() => navigate('/dashboard')}
                        >
                          Home
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="btn px-2 py-2 fw-bold  "
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                          onClick={() => navigate('/dashboard/musictypes')}
                        >
                          Music Types
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#randomModal"
                          className="btn px-2 py-2 fw-bold  "
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          Random Play
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="btn px-2 py-2 fw-bold "
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#contactModal"
                        >
                          Contact
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="btn px-2 py-2 fw-bold  "
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                          onClick={handlelogout}
                        >
                          Logout
                        </button>
                      </li>

                      
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <div className="modal fade" id="contactModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div
              className="modal-header text-white text-center"
              style={{
                background: 'linear-gradient(135deg,rgb(146, 49, 110), #3B82F6, #6e2daa)',
              }}
            >
              <h5 className="modal-title">Contact Us</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="m-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" id="name" required style={{ borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5', }} />
                </div>
                <div className="m-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" required style={{ borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5', }} />
                </div>
                <div className="m-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea className="form-control" id="message" rows="4" required style={{ borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5', }}></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-3 py-2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Random Play Modal */}
      <div className="modal fade" id="randomModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="container d-flex flex-column justify-content-center align-items-center bg-light p-4">
                <h1 className="mb-4 text-dark">Random Music Player</h1>
                <div className="card p-4 shadow" style={{ width: '300px' }}>
                  <div className="position-relative mb-3">
                    <img
                      src={c1}
                      alt="Album cover"
                      className="w-100"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <button
                      onClick={togglePlayPause}
                      className="position-absolute top-50 start-50 translate-middle rounded-circle p-0"
                      style={{ width: '60px', height: '60px' }}
                    >
                      <img
                        src={isPlaying ? pauseIcon : playIcon}
                        alt={isPlaying ? 'Pause' : 'Play'}
                        style={{ width: '30px', height: '30px' }}
                      />
                    </button>
                  </div>
                  <h5 className="text-center my-3 text-secondary">
                    {musicList[currentTrackIndex].name}
                  </h5>
                  <audio
                    ref={audioRef}
                    src={musicList[currentTrackIndex].file}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <button onClick={playRandomTrack} className="w-100 py-2 fw-bold btn btn-success">
                    Shuffle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};
export default DashboardNavbar;
