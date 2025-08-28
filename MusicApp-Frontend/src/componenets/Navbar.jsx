import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MdAccountCircle, MdOutlineAccountCircle, MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPlay, FaPause } from 'react-icons/fa';
import { CgPlayButtonO } from "react-icons/cg";
import { GiPauseButton } from "react-icons/gi";
import logo from '../assets/logo.png'

const Navbar = () => {
     const navigate = useNavigate();


     // Auth State
     const [showPassword, setShowPassword] = useState(false);
     const [showLogin, setShowLogin] = useState(false);

     //contact
     const [contactData, setContactData] = useState({ name: "", email: "", message: "" });


     // Form States
     const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
     const [registerDateError, setRegisterDateError] = useState({});
     const [loginData, setLoginData] = useState({ email: '', password: '' });

     const nameRegex = /^[a-zA-Z0-9]{3,}$/;
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;


     // Music Player State
     const [musicList, setMusicList] = useState([]);
     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
     const [isPlaying, setIsPlaying] = useState(false);
     const audioRef = useRef(null);

     // Fetch songs from API
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

     // ✅ Shuffle random song
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
          setRegisterDateError({ ...registerDateError, [e.target.name]: '' });
     };

     const handleLoginChange = (e) => {
          setLoginData({ ...loginData, [e.target.name]: e.target.value });
     };


     // Validate Register Data
     const validateRegisterData = () => {
          const errors = {};
          if (!nameRegex.test(registerData.username)) {
               errors.username = "Username must be at least 3 characters long and contain only letters and numbers.";
          }

          if (!emailRegex.test(registerData.email)) {
               errors.email = "Invalid email format.";
          }

          if (!passwordRegex.test(registerData.password)) {
               errors.password = "Password must be 6-8 characters long and contain at least one letter and one number.";
          }

          setRegisterDateError(errors);

     }

     // Register User
     const handleRegister = async () => {
          validateRegisterData();
          try {
               const response = await fetch("http://127.0.0.1:8080/musicApp/registration/createuserRegistration", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(registerData)

               });
               if (response.ok) {
                    const data = await response.json();
                    alert("Registration successful! Please log in.");
                    console.log("Created user:", data);
                    setShowLogin(true); // Switch to login form
               } else {
                    const error = await response.text();
                    alert("Registration failed: " + error);
               }
          } catch (err) {
               console.log("Error during registration:", err);
               alert("An error occurred. Please try again.");
          }
     };

     //   const users = JSON.parse(localStorage.getItem('users')) || [];
     //   const exists = users.find(u => u.email === registerData.email);
     //   if (exists) {
     //     alert('User already exists! Please log in.');
     //     return;
     //   }
     //   users.push(registerData);
     //   localStorage.setItem('users', JSON.stringify(users));
     //   alert('Registration successful! Please log in.');
     //   setShowLogin(true);
     // };



     // Login User


     const handleLogin = async () => {
          try {
               const response = await fetch("http://127.0.0.1:8080/musicApp/login/validateLogin", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
               });

               const result = await response.text();

               if (result.includes("Login successful")) {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(loginData));
                    
                    // Close the modal before navigating
                    const modalEl = document.getElementById("signUpModal");
                    const modal = window.bootstrap.Modal.getInstance(modalEl);
                    modal.hide();
                    
                    // Reset login form
                    setLoginData({ email: '', password: '' });
                    
                    navigate('/dashboard');
               } else {
                    alert(result);
               }
          } catch (error) {
               console.log("Error during login:", error);
               alert('Invalid username or password');
          }
     };

     // const handleLogin = async () => {
     //      try {

     //           const response = await fetch("http://127.0.0.1:8080/musicApp/login/validateLogin", {
     //                method: 'POST',
     //                headers: { 'Content-Type': 'application/json' },
     //                body: JSON.stringify(loginData)
     //           });

     //           const result = await response.text();

     //           if (result.includes("Login successful")) {
     //                sessionStorage.setItem('loggedInUser', JSON.stringify(loginData));
     //                const modalEl = loginModalRef.current;
     //                if (modalEl) {
     //                     let modalInstance = bootstrap.Modal.getInstance(modalEl);
     //                     if (!modalInstance) {
     //                          modalInstance = new bootstrap.Modal(modalEl);
     //                     }
     //                     modalInstance.hide();
     //                }
     //                navigate('/dashboard');
     //           } else {
     //                alert(result);
     //           }
     //      } catch (error) {
     //           console.log("Error during login:", error);
     //           alert('Invalid username or password');
     //      }
     // };


     // const handleLogin = () => {
     //   const users = JSON.parse(localStorage.getItem('users')) || [];
     //   const user = users.find(
     //     u => u.email === loginData.email
     //   );
     //   if (user) {
     //     sessionStorage.setItem('loggedInUser', JSON.stringify(user));
     //     navigate('/dashboard');
     //     setShowLogin(false)

     //   } else {
     //     alert('Invalid username or password');
     //   }
     // };



     // Music Functions
     return (
          <>
               {/* Sticky Navbar */}
               <section
                    className="sticky-top shadow-sm"
                    // style={{
                    //      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    //      backdropFilter: 'blur(10px)',
                    //      WebkitBackdropFilter: 'blur(10px)',
                    //      zIndex: 1030,
                    // }}
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
                                        onClick={() => navigate('/')}
                                        style={{ maxHeight: '80px', width: 'auto', cursor: 'pointer' }}
                                   />
                              </div>

                              {/* Nav Links */}
                              <div className="col-md-6 col-sm-12 pt-md-0 pt-3">
                                   <nav className="navbar navbar-expand-lg">
                                        <div className="container-fluid">
                                             <button
                                                  className="navbar-toggler border border-white p-2"
                                                  type="button"
                                                  data-bs-toggle="collapse"
                                                  data-bs-target="#navbarNav"
                                             >
                                                  <span className="navbar-toggler-icon "  
                                                  ></span>
                                             </button>
                                             <div className="collapse navbar-collapse" id="navbarNav">
                                                  <ul className="navbar-nav gap-2">
                                                       <li className="nav-item">
                                                            <button
                                                                 className="btn px-1 py-2 fw-bold fs-5 "
                                                                 style={{
                                                                      backgroundImage:
                                                                           'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                                                                      WebkitBackgroundClip: 'text',
                                                                      WebkitTextFillColor: 'transparent',
                                                                 }}
                                                                 onClick={() => navigate('/')}
                                                            >
                                                                 Home
                                                            </button>
                                                       </li>
                                                       <li className="nav-item">
                                                            <button
                                                                 className="btn px-1 py-2 fw-bold fs-5  "
                                                                 style={{
                                                                      backgroundImage:
                                                                           'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                                                                      WebkitBackgroundClip: 'text',
                                                                      WebkitTextFillColor: 'transparent',
                                                                 }}
                                                                 onClick={() => navigate('/musictypes')}
                                                            >
                                                                 Music Types
                                                            </button>
                                                       </li>
                                                       <li className="nav-item">
                                                            <button
                                                                 data-bs-toggle="modal"
                                                                 data-bs-target="#randomModal"
                                                                 className="btn px-1 py-2 fw-bold fs-5  "
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
                                                                 className="btn px-1 py-2 fw-bold fs-5  "
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
                                                                 className="btn px-1 py-2 fw-bold fs-5 "
                                                                 style={{
                                                                      backgroundImage:
                                                                           'linear-gradient(150deg, rgba(156, 15, 104, 1), #3B82F6, #aa2d87ff)',
                                                                      WebkitBackgroundClip: 'text',
                                                                      WebkitTextFillColor: 'transparent',
                                                                 }}
                                                                 data-bs-toggle="modal"
                                                                 data-bs-target="#signUpModal"
                                                            >
                                                                 Sign Up
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
                                        background:
                                             "linear-gradient(135deg,rgb(146, 49, 110), #3B82F6, #6e2daa)"
                                   }}
                              >
                                   <h5 className="modal-title">Contact Us</h5>
                                   <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="modal"
                                   ></button>
                              </div>

                              <div className="modal-body">
                                   <form onSubmit={handleContact}>
                                        <div className="m-3">
                                             <label htmlFor="name" className="form-label">
                                                  Name
                                             </label>
                                             <input
                                                  type="text"
                                                  id="name"
                                                  className="form-control"
                                                  required
                                                  value={contactData.name}
                                                  onChange={handleContactChange}
                                                  style={{
                                                       border: "2px solid skyblue",
                                                       borderRadius: "8px",
                                                       overflow: "hidden",
                                                       borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                  }}
                                             />
                                        </div>

                                        <div className="m-3">
                                             <label htmlFor="email" className="form-label">
                                                  Email
                                             </label>
                                             <input
                                                  type="email"
                                                  id="email"
                                                  className="form-control"
                                                  required
                                                  value={contactData.email}
                                                  onChange={handleContactChange}
                                                  style={{
                                                       border: "2px solid skyblue",
                                                       borderRadius: "8px",
                                                       overflow: "hidden",
                                                       borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                  }}
                                             />
                                        </div>

                                        <div className="m-3">
                                             <label htmlFor="message" className="form-label">
                                                  Message
                                             </label>
                                             <textarea
                                                  id="message"
                                                  className="form-control"
                                                  rows="4"
                                                  required
                                                  value={contactData.message}
                                                  onChange={handleContactChange}
                                                  style={{
                                                       border: "2px solid skyblue",
                                                       borderRadius: "8px",
                                                       overflow: "hidden",
                                                       borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                  }}
                                             ></textarea>
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

                                                  {/* ✅ Song Title + Singer */}
                                                  <h5 className="text-center my-3 "
                                                       style={{
                                                            backgroundImage: 'linear-gradient(135deg, #e62cdaff, #ad98eaff)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            fontWeight: 'bold',
                                                       }}>
                                                       {/* style={{
                                                            backgroundImage:
                                                                 "linear-gradient(135deg, #e62cda, #6e2daa, #3B82F6)",
                                                            WebkitBackgroundClip: "text",
                                                            WebkitTextFillColor: "transparent",
                                                            fontWeight: "bold",
                                                       }} */}

                                                       {musicList[currentTrackIndex].singer}

                                                  </h5>

                                                  {/* ✅ Audio File */}
                                                  <audio
                                                       ref={audioRef}
                                                       src={`http://localhost:8080/musicApp/music/${musicList[currentTrackIndex].id}/audio`}
                                                       onEnded={() => setIsPlaying(false)}
                                                  />

                                                  {/* ✅ Shuffle Button */}
                                                  <button
                                                       onClick={playRandomTrack}
                                                       className="w-100 py-2 fw-bold btn rounded rounded-3 text-white"
                                                  //  style={{
                                                  //      backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #ea5e86ff)',
                                                  //      WebkitBackgroundClip: 'text',
                                                  //      WebkitTextFillColor: 'transparent',
                                                  //      fontWeight: "bold",
                                                  // }}
                                                  >
                                                       Shuffle
                                                  </button>
                                             </div>
                                        ) : (
                                             <p className="text-center">Loading songs...</p>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>


               {/* Sign Up Modal */}
               <div className="modal fade" id="signUpModal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                         <div className="modal-content">
                              <div
                                   className="modal-header text-white text-center"
                                   style={{
                                        background: 'linear-gradient(135deg,rgb(146, 49, 110), #3B82F6, #6e2daa)',
                                   }} >
                                   <h5 className="modal-title">{showLogin ? "Login" : "Register"}</h5>
                                   <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                              </div>
                              <div className="modal-body">
                                   {showLogin ? (
                                        // Login Form
                                        <div className="container">
                                             <h1 className='mt-3 text-center'><MdAccountCircle size={80} color="#B33791" /></h1>
                                             <h4 className="m-3 text-center" style={{
                                                  backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                                                  WebkitBackgroundClip: 'text',
                                                  WebkitTextFillColor: 'transparent',
                                             }}>Login</h4>
                                             <form>
                                                  <div className="mb-3">
                                                       <label className="form-label">Email</label>
                                                       <div
                                                            className="input-group"
                                                            style={{
                                                                 border: "2px solid skyblue",
                                                                 borderRadius: "8px",
                                                                 overflow: "hidden",
                                                                 borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                            }} >
                                                            <span className="input-group-text bg-white border-0">
                                                                 <IoIosMail size={20} color="#0096FF" />
                                                            </span>
                                                            <input
                                                                 type="email"
                                                                 name='email'
                                                                 className="form-control border-0"
                                                                 placeholder="email"
                                                                 value={loginData.email}
                                                                 onChange={handleLoginChange}
                                                            />
                                                       </div>
                                                  </div>

                                                  <div className="mb-3">
                                                       <label className="form-label">Password</label>
                                                       <div
                                                            className="input-group"
                                                            style={{
                                                                 border: "2px solid skyblue",
                                                                 borderRadius: "8px",
                                                                 overflow: "hidden",
                                                                 borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                            }}
                                                       >
                                                            <span className="input-group-text bg-white border-0">
                                                                 <RiLockPasswordFill size={20} color="#0096FF" />
                                                            </span>

                                                            <input
                                                                 type={showPassword ? "text" : "password"}
                                                                 name="password"
                                                                 className="form-control border-0"
                                                                 placeholder="Password"

                                                                 value={loginData.password}
                                                                 onChange={handleLoginChange}
                                                                 style={{
                                                                      border: "2px solid skyblue",
                                                                      borderRadius: "8px",
                                                                      overflow: "hidden",
                                                                      borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                                 }}
                                                            />

                                                            <span
                                                                 className="input-group-text bg-white border-0"
                                                                 style={{ cursor: "pointer" }}
                                                                 onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                 {showPassword ? (
                                                                      <FaEye size={20} color="#0096FF" />
                                                                 ) : (
                                                                      <FaEyeSlash size={20} color="skyblue" />
                                                                 )}
                                                            </span>
                                                       </div>
                                                  </div>

                                                  <div className="text-center">
                                                       <button type="button" className="btn btn-danger me-2" onClick={handleLogin}>
                                                            Login
                                                       </button>
                                                       <button
                                                            type="button"
                                                            className="btn text-white"
                                                            style={{ backgroundImage: 'linear-gradient(135deg, #92316e, #3B82F6, #6e2daa)' }}
                                                            onClick={() => setShowLogin(false)}
                                                       >
                                                            Register
                                                       </button>
                                                  </div>
                                             </form>
                                        </div>
                                   ) : (
                                        // Register Form
                                        <div className="container">
                                             <h1 className='mt-3 text-center'><MdAccountCircle size={80} color="#B33791" /></h1>
                                             <h4 className="m-3 text-center" style={{
                                                  backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                                                  WebkitBackgroundClip: 'text',
                                                  WebkitTextFillColor: 'transparent',
                                             }}>Register</h4>
                                             <form>
                                                  <div className="mb-3">
                                                       <label className="form-label">Username</label>
                                                       <div
                                                            className="input-group"
                                                            style={{
                                                                 border: "2px solid skyblue",
                                                                 borderRadius: "8px",
                                                                 overflow: "hidden",
                                                                 borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                            }} >
                                                            <span className="input-group-text bg-white border-0">
                                                                 <MdOutlineAccountCircle size={20} color="#0096FF" />
                                                            </span>
                                                            <input
                                                                 type="text"
                                                                 name="username"
                                                                 className="form-control"
                                                                 placeholder="Username"
                                                                 value={registerData.username}
                                                                 onChange={handleRegisterChange}
                                                            />
                                                       </div>
                                                       {registerDateError.username && <p className="text-danger">{registerDateError.username} </p>}

                                                  </div>

                                                  <div className="mb-3">
                                                       <label className="form-label">Email</label>
                                                       <div
                                                            className="input-group"
                                                            style={{
                                                                 border: "2px solid skyblue",
                                                                 borderRadius: "8px",
                                                                 overflow: "hidden",
                                                                 borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                            }} >
                                                            <span className="input-group-text bg-white border-0">
                                                                 <IoIosMail size={20} color="#0096FF" />
                                                            </span>
                                                            <input
                                                                 type="email"
                                                                 name='email'
                                                                 className="form-control border-0"
                                                                 placeholder="email"
                                                                 value={registerData.email}
                                                                 onChange={handleRegisterChange}
                                                            />
                                                       </div>
                                                       {registerDateError.email && <p className="text-danger">{registerDateError.email} </p>}

                                                  </div>

                                                  <div className="mb-3">
                                                       <label className="form-label">Password</label>
                                                       <div
                                                            className="input-group"
                                                            style={{
                                                                 border: "2px solid skyblue",
                                                                 borderRadius: "8px",
                                                                 overflow: "hidden",
                                                                 borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                            }}
                                                       >
                                                            <span className="input-group-text bg-white border-0">
                                                                 <RiLockPasswordFill size={20} color="#0096FF" />
                                                            </span>

                                                            <input
                                                                 type={showPassword ? "text" : "password"}
                                                                 name="password"
                                                                 className="form-control border-0"
                                                                 placeholder="Password"
                                                                 value={registerData.password}
                                                                 onChange={handleRegisterChange}
                                                                 style={{
                                                                      border: "2px solid skyblue",
                                                                      // borderRadius: "8px",
                                                                      overflow: "hidden",
                                                                      borderImage: 'linear-gradient(to right, violet, deeppink, skyblue) 5'
                                                                 }}
                                                            />



                                                            {/* <span
                                                                 className="input-group-text bg-white border-0"
                                                                 style={{ cursor: "pointer" }}
                                                                 onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                 {showPassword ? (
                                                                      <FaEye size={20} color="#0096FF" />
                                                                 ) : (
                                                                      <FaEyeSlash size={20} color="skyblue" />
                                                                 )}
                                                            </span> */}
                                                       </div>
                                                       {registerDateError.password && <p className="text-danger">{registerDateError.password} </p>}

                                                  </div>

                                                  <div className="text-center">
                                                       <button type="button" className="btn btn-danger me-2" onClick={handleRegister}>
                                                            Register
                                                       </button>
                                                       <button
                                                            type="button"
                                                            className="btn text-white"
                                                            style={{ backgroundImage: 'linear-gradient(135deg, #92316e, #3B82F6, #6e2daa)' }}
                                                            onClick={() => setShowLogin(true)}
                                                       >
                                                            Login
                                                       </button>
                                                  </div>
                                             </form>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default Navbar;
