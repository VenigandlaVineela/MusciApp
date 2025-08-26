import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
 import { CgPlayButtonO } from "react-icons/cg";
import { GiPauseButton } from "react-icons/gi";
import logo from '../assets/logo.png'
import { FaCloudDownloadAlt } from "react-icons/fa";


const DashboardNavbar = () => {
  const navigate = useNavigate();

  //contact
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });

  // Form States
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // Music Player State
  const [musicList, setMusicList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  //  Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:8080/musicApp/music/all");
        const data = await response.json();
        setMusicList(data);
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };
    fetchSongs();
  }, []);

  //  Play/Pause handler
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Shuffle random song
  const playRandomTrack = () => {
    if (musicList.length > 0) {
      const randomIndex = Math.floor(Math.random() * musicList.length);
      setCurrentTrackIndex(randomIndex);
      setIsPlaying(true);
      setTimeout(() => audioRef.current.play(), 200);
    }
  };

  // Handle input change
  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value });
  };

  const handleContact = async (e) => {

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/musicApp/ContactDetails/createUserContactDetails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setContactData({ name: "", email: "", message: "" });

        // Close modal
        const modalEl = document.getElementById("contactModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // Handle Input Change
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const handlelogout = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate('/');
  }


  //download 
  const downloadSong = async (songId, title) => {
  try {
    const response = await fetch(`http://localhost:8080/musicApp/music/${songId}/audio`);
    if (!response.ok) throw new Error("Failed to fetch audio");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


  return (
    <>
      {/* Sticky Navbar */}
      <section
        className="sticky-top shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          color: "white",
        }}>

        <div className="container">
          <div className="row align-items-center py-2">
            {/* Logo */}
            <div className="col-md-6 col-sm-12 d-flex align-items-center">
              <img
                src={logo}
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
                              'linear-gradient(135deg, rgba(37, 8, 27, 1), #3B82F6, #6e2daa)',
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
          <div className="modal-content p-3" style={{
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",

            boxShadow: "0px 4px 25px rgba(0,0,0,0.4)",
          }}>
            <div className="modal-header text-center border-0 ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-center" style={{
              background:
                "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
            }}>
              <div className="container d-flex flex-column justify-content-center align-items-center bg-light p-4" style={{
                background:
                  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",

              }}>
                <h1 className="mb-4 text-dark" style={{
                  backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #ea5e86ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: "bold",
                }}>Random Music Player</h1>

                {musicList.length > 0 ? (
                  <div className=" p-4 " style={{ width: "300px" }}>
                    <div className="position-relative mb-3 music-image-container">
                      {/*  API Image */}
                      <img
                        src={`http://localhost:8080/musicApp/music/${musicList[currentTrackIndex].id}/image`}
                        alt="Album cover"
                        className={` music-image ${isPlaying ? "playing" : ""
                          }`}
                        style={{ objectFit: "cover" }}
                      />

                      {/*  Play/Pause Button */}
                      <button
                        onClick={togglePlayPause}
                        className="position-absolute top-50 start-50 translate-middle rounded-circle border-0 shadow d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginTop: "10px",
                          background: "white",
                        }}
                      >
                        {isPlaying ? (
                          <GiPauseButton size={40} color="#6c2bd9" />
                        ) : (
                          <CgPlayButtonO size={40} color="#6c2bd9" />
                        )}
                      </button>

                    </div>

                    {/*  Song Title + Singer */}
                    <h5 className="text-center my-3 "
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #e62cdaff, #ad98eaff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}>                    
                      {musicList[currentTrackIndex].singer}

                    </h5>

                    {/*  Audio File */}
                    <audio
                      ref={audioRef}
                      src={`http://localhost:8080/musicApp/music/${musicList[currentTrackIndex].id}/audio`}
                      onEnded={() => setIsPlaying(false)}
                    />

                    {/*  Shuffle Button */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
  {/* Shuffle Button */}
  <button
    onClick={playRandomTrack}
    className="px-4 py-2 fw-bold btn rounded rounded-3 text-white"
    style={{
      backgroundImage:
        'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      border: '2px solid white',
    }}
  >
    Shuffle
  </button>

  {/* Download Button */}
  <button
    onClick={() =>
      downloadSong(
        musicList[currentTrackIndex].id,
        musicList[currentTrackIndex].singer
      )
    }
    className="btn border d-flex align-items-center justify-content-center rounded-3"
    style={{
      
      color: "white",
      fontSize: "20px",
      backgroundImage:
        'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      border: '2px solid white',
    }}
  >
    <FaCloudDownloadAlt />
  </button>
</div>
   
                  </div>
                ) : (
                  <p className="text-center">Loading songs...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardNavbar;
