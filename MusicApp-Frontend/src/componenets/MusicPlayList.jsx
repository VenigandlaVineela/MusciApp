// import React, { useState, useEffect, useRef } from 'react';
// import Navbar from './Navbar';
// import Footer from '../Footer';
// import { motion } from 'framer-motion';
// import playIcon from '../assets/playIcon.png';
// import pauseIcon from '../assets/pauseIcon.png';

// const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
// };

// const MusicPlayList = () => {
//     const [allMusic, setAllMusic] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentSong, setCurrentSong] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const audioRef = useRef(null);

//     // === Fetch music using async/await ===
//     useEffect(() => {
//         const fetchMusic = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/musicApp/music/all');
//                 const data = await response.json();

//                 const musicData = data.map(song => {
//                     // Convert binary data to Base64
//                     let base64Data = '';
//                     if (song.data) {
//                         const bytes = new Uint8Array(song.data);
//                         base64Data = btoa(String.fromCharCode(...bytes));
//                     }
//                     return {
//                         ...song,
//                         music: song.data ? `data:${song.type};base64,${base64Data}` : null,
//                         image: song.imageData ? `data:${song.imageType};base64,${song.imageData}` : null
//                     };
//                 });

//                 setAllMusic(musicData);
//             } catch (error) {
//                 console.error('Error fetching music:', error);
//             }
//         };

//         fetchMusic();
//     }, []);

//     const filteredMusic = allMusic;
//     const totalPages = Math.ceil(filteredMusic.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredMusic.slice(indexOfFirstItem, indexOfLastItem);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     };

//     const openModal = (song) => {
//         setCurrentSong(song);
//         setIsModalOpen(true);
//         setIsPlaying(false);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setIsPlaying(false);
//         if (audioRef.current) audioRef.current.pause();
//     };

//     const togglePlay = () => {
//         if (!audioRef.current) return;
//         if (isPlaying) audioRef.current.pause();
//         else audioRef.current.play();
//         setIsPlaying(!isPlaying);
//     };

//     return (
//         <>
//             <Navbar />
//             <motion.section className="py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
//                 <div className="container">
//                     <h1 className="text-center mb-4 ">Music Playlist</h1>
//                     <div className="row g-4">
//                         {currentItems.map((song, index) => (
//                             <motion.div className="col-md-4 col-sm-6" key={index} variants={cardVariants} initial="hidden" animate="visible">

//                                 <div className="card h-100 shadow rounded-4 border-0 p-3 d-flex flex-column align-items-center" style={{ cursor: "pointer" }} onClick={() => openModal(song)}>
//                                     <img src={song.image} alt={song.title} className="img-fluid rounded-3 mb-3" style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
//                                     <h5 className="text-center fw-bold">{song.singer}</h5>
//                                 </div>
//                             </motion.div>  
//                         ))}
//                         {filteredMusic.length === 0 && <div className="text-center"><p>No songs available.</p></div>}
//                     </div>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <nav className="mt-5">
//                             <ul className="pagination justify-content-center">
//                                 <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                     <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//                                 </li>
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                                         <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
//                                     </li>
//                                 ))}
//                                 <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                                     <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//                                 </li>
//                             </ul>
//                         </nav>
//                     )}
//                 </div>
//             </motion.section>

//             {/* Modal */}
//             {isModalOpen && currentSong && (
//                 <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.7)" }}>
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content rounded-4 p-4 text-center">
//                             <button className="btn-close ms-auto" onClick={closeModal}></button>
//                             <img src={currentSong.image} alt={currentSong.title} className="img-fluid rounded-3 mb-3" style={{ height: '250px', objectFit: 'cover', width: '100%' }} />
//                             <h5 className="fw-bold mb-3">{currentSong.title}</h5>
//                             <div className='text-center'>
//                                 <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" style={{ height: "50px", width: "50px", cursor: "pointer" }} onClick={togglePlay} />
//                             </div>
//                             <audio ref={audioRef} src={currentSong.music} />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Footer />
//         </>
//     );
// };

// export default MusicPlayList;








// // import React, { useState, useEffect, useRef } from 'react';
// // import Navbar from './Navbar';
// // import Footer from '../Footer';
// // import { motion } from 'framer-motion';
// // import { useLocation } from 'react-router-dom';
// // import playIcon from '../assets/playIcon.png';
// // import pauseIcon from '../assets/pauseIcon.png';

// // const cardVariants = {
// //   hidden: { opacity: 0, y: 30 },
// //   visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
// // };

// // const MusicPlayList = () => {
// //   const [allMusic, setAllMusic] = useState([]);
// //   const location = useLocation();
// //   const selectedGenre = location.state?.genre || 'Pop';

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 3;

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [currentSong, setCurrentSong] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const audioRef = useRef(null);

// //   // === Fetch music ===
// //   useEffect(() => {
// //     const fetchMusic = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8080/musicApp/music/all');
// //         const data = await response.json();

// //         const musicData = data.map(song => {
// //           // Convert audio bytes → Base64
// //           let base64Audio = '';
// //           if (song.data) {
// //             const bytes = new Uint8Array(song.data);
// //             base64Audio = btoa(String.fromCharCode(...bytes));
// //           }

// //           // Convert image bytes → Base64
// //           let base64Image = '';
// //           if (song.imageData) {
// //             const bytes = new Uint8Array(song.imageData);
// //             base64Image = btoa(String.fromCharCode(...bytes));
// //           }

// //           return {
// //             ...song,
// //             music: song.data ? `data:${song.type};base64,${base64Audio}` : null,
// //             image: song.imageData ? `data:${song.imageType};base64,${base64Image}` : null
// //           };
// //         });

// //         setAllMusic(musicData);
// //       } catch (error) {
// //         console.error('Error fetching music:', error);
// //       }
// //     };

// //     fetchMusic();
// //   }, []);

// //   // ✅ Genre filter (case-insensitive, supports "Rock,Rock")
// //   const filteredMusic = allMusic.filter((item) => {
// //     if (!item.musicType) return false;
// //     const genres = item.musicType.split(",").map(g => g.trim().toLowerCase());
// //     return genres.includes(selectedGenre.toLowerCase());
// //   });

// //   const totalPages = Math.ceil(filteredMusic.length / itemsPerPage);
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredMusic.slice(indexOfFirstItem, indexOfLastItem);

// //   const handlePageChange = (pageNumber) => {
// //     if (pageNumber >= 1 && pageNumber <= totalPages) {
// //       setCurrentPage(pageNumber);
// //     }
// //   };

// //   const openModal = (song) => {
// //     setCurrentSong(song);
// //     setIsModalOpen(true);
// //     setIsPlaying(false);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setIsPlaying(false);
// //     if (audioRef.current) audioRef.current.pause();
// //   };

// //   const togglePlay = () => {
// //     if (!audioRef.current) return;
// //     if (isPlaying) {
// //       audioRef.current.pause();
// //     } else {
// //       audioRef.current.play();
// //     }
// //     setIsPlaying(!isPlaying);
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <motion.section className="py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
// //         <div className="container">
// //           <h1 className="text-center mb-4 text-white" style={{
// //             backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
// //             WebkitBackgroundClip: 'text',
// //             WebkitTextFillColor: 'transparent',
// //           }}>
// //             {selectedGenre} Music Playlist
// //           </h1>

// //           <div className="row g-4">
// //             {currentItems.map((song, index) => (
// //               <motion.div className="col-md-4 col-sm-6" key={index} variants={cardVariants} initial="hidden" animate="visible" whileHover={{
// //                 scale: 1.03,
// //                 transition: { type: 'spring', stiffness: 300 },
// //               }}>
// //                 <div className="card h-100 shadow rounded-4 border-0 p-3 d-flex flex-column align-items-center"
// //                   style={{ cursor: "pointer" }}
// //                   onClick={() => openModal(song)}
// //                 >
// //                   <img src={song.imageName} alt={song.title} className="img-fluid rounded-3 mb-3"
// //                     style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
// //                   <h5 className="text-center fw-bold">{song.singer}</h5>
// //                   <p className="text-muted">{song.title}</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //             {filteredMusic.length === 0 && <div className="text-center"><p>No songs available.</p></div>}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <nav className="mt-5">
// //               <ul className="pagination justify-content-center">
// //                 <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
// //                   <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
// //                 </li>
// //                 {Array.from({ length: totalPages }, (_, index) => (
// //                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
// //                     <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
// //                   </li>
// //                 ))}
// //                 <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
// //                   <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
// //                 </li>
// //               </ul>
// //             </nav>
// //           )}
// //         </div>
// //       </motion.section>

// //       {/* Modal */}
// //       {isModalOpen && currentSong && (
// //         <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.7)" }}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content rounded-4 p-4 text-center">
// //               <button className="btn-close ms-auto" onClick={closeModal}></button>
// //               <img src={currentSong.imageName} alt={currentSong.title} className="img-fluid rounded-3 mb-3"
// //                 style={{ height: '250px', objectFit: 'cover', width: '100%' }} />
// //               <h5 className="fw-bold mb-2">{currentSong.title}</h5>
// //               <p className="text-muted">{currentSong.singer}</p>
// //               <div className="text-center">
// //                 <img src={isPlaying ? pauseIcon : playIcon}
// //                   alt="Play/Pause"
// //                   style={{ height: "50px", width: "50px", cursor: "pointer" }}
// //                   onClick={togglePlay}
// //                 />
// //               </div>
// //               <audio ref={audioRef} src={currentSong.music} />
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </>
// //   );
// // };

// // export default MusicPlayList;












// // import React, { useState, useRef } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import Navbar from './Navbar';
// // import Footer from '../Footer';
// // import { motion } from 'framer-motion';
// // import playIcon from '../assets/playIcon.png';
// // import pauseIcon from '../assets/pauseIcon.png';

// // // Music files
// // import western from '../assets/Western.mp3';
// // import music2 from '../assets/music2.mp3';
// // import music3 from '../assets/music3.mp3';
// // import music4 from '../assets/music4.mp3';
// // import music5 from '../assets/music5.mp3';
// // import music6 from '../assets/music6.mp3';
// // import music7 from '../assets/music7.mp3';
// // import music8 from '../assets/music8.mp3';
// // import music9 from '../assets/music9.mp3';
// // import music10 from '../assets/music10.mp3';

// // // Images
// // import musicimage from '../assets/musicimage.png';
// // import c1 from '../assets/c1.png';
// // import c2 from '../assets/c2.png';
// // import c3 from '../assets/c3.png';
// // import c4 from '../assets/c4.png';
// // import { div } from 'framer-motion/client';

// // const cardVariants = {
// //      hidden: { opacity: 0, y: 30 },
// //      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
// // };

// // const MusicPlayList = () => {
// //      const location = useLocation();
// //      const selectedGenre = location.state?.genre || 'Pop';

// //      const [currentPage, setCurrentPage] = useState(1);
// //      const itemsPerPage = 5;

// //      const [isModalOpen, setIsModalOpen] = useState(false);
// //      const [currentSong, setCurrentSong] = useState(null);
// //      const [isPlaying, setIsPlaying] = useState(false);
// //      const audioRef = useRef(null);

// //      const [allMusic] = useState([
// //           // Pop
// //           { music: western, image: musicimage, title: "Pop Hit 1", genre: "Pop" },
// //           { music: music2, image: c1, title: "Pop Hit 2", genre: "Pop" },
// //           { music: music3, image: c2, title: "Pop Hit 3", genre: "Pop" },
// //           { music: music4, image: c3, title: "Pop Hit 4", genre: "Pop" },
// //           { music: music5, image: c4, title: "Pop Hit 5", genre: "Pop" },
// //           { music: music6, image: c1, title: "Pop Hit 6", genre: "Pop" },
// //           { music: music10, image: musicimage, title: "Pop Hit 7", genre: "Pop" },
// //           { music: music7, image: c1, title: "Pop Hit 8", genre: "Pop" },
// //           { music: music8, image: c2, title: "Pop Hit 9", genre: "Pop" },
// //           { music: music9, image: c3, title: "Pop Hit 10", genre: "Pop" },

// //           // Rock
// //           { music: music10, image: c2, title: "Rock Vibes", genre: "Rock" },
// //           { music: music9, image: c3, title: "Rock Legend", genre: "Rock" },
// //           { music: music8, image: c2, title: "Rock Fire", genre: "Rock" },
// //           { music: music7, image: c3, title: "Rock Live", genre: "Rock" },
// //           { music: music6, image: c2, title: "Rock Anthem", genre: "Rock" },
// //           { music: music5, image: c3, title: "Rock Classic", genre: "Rock" },
// //           { music: music4, image: c2, title: "Rock Vibes", genre: "Rock" },
// //           { music: music3, image: c3, title: "Rock Legend", genre: "Rock" },
// //           { music: music2, image: c2, title: "Rock Fire", genre: "Rock" },
// //           { music: western, image: c3, title: "Rock Live", genre: "Rock" },

// //           // Jazz
// //           { music: music5, image: c4, title: "Jazz Standard", genre: "Jazz" },
// //           { music: music6, image: musicimage, title: "Jazz Improv", genre: "Jazz" },
// //           { music: music5, image: c1, title: "Jazz Soul", genre: "Jazz" },
// //           { music: music6, image: c2, title: "Jazz Cool", genre: "Jazz" },
// //           { music: music5, image: c3, title: "Jazz Fusion", genre: "Jazz" },
// //           { music: music6, image: c4, title: "Jazz Light", genre: "Jazz" },
// //           { music: music5, image: c4, title: "Jazz Standard", genre: "Jazz" },
// //           { music: music6, image: musicimage, title: "Jazz Improv", genre: "Jazz" },
// //           { music: music5, image: c1, title: "Jazz Soul", genre: "Jazz" },
// //           { music: music6, image: c2, title: "Jazz Cool", genre: "Jazz" },

// //           // Hip-Hop
// //           { music: music10, image: c3, title: "Hip-Hop Beat", genre: "Hip-Hop" },
// //           { music: music5, image: c1, title: "Hip-Hop Groove", genre: "Hip-Hop" },
// //           { music: music3, image: c2, title: "Hip-Hop Flow", genre: "Hip-Hop" },
// //           { music: music7, image: c4, title: "Hip-Hop Vibe", genre: "Hip-Hop" },
// //           { music: music9, image: c2, title: "Hip-Hop Mix", genre: "Hip-Hop" },
// //           { music: western, image: c3, title: "Hip-Hop Beat", genre: "Hip-Hop" },
// //           { music: music2, image: c1, title: "Hip-Hop Groove", genre: "Hip-Hop" },
// //           { music: music4, image: c2, title: "Hip-Hop Flow", genre: "Hip-Hop" },
// //           { music: music6, image: c4, title: "Hip-Hop Vibe", genre: "Hip-Hop" },
// //           { music: music8, image: c1, title: "Hip-Hop Drop", genre: "Hip-Hop" },

// //           // Electronic
// //           { music: music3, image: c1, title: "Electronic Dance", genre: "Electronic" },
// //           { music: music10, image: c2, title: "Electronic Bass", genre: "Electronic" },
// //           { music: music8, image: c3, title: "Electronic Wave", genre: "Electronic" },
// //           { music: music6, image: c4, title: "Electronic Chill", genre: "Electronic" },
// //           { music: music4, image: c1, title: "Electronic Pop", genre: "Electronic" },
// //           { music: music2, image: c2, title: "Electronic Pulse", genre: "Electronic" },
// //           { music: western, image: c1, title: "Electronic Dance", genre: "Electronic" },
// //           { music: music5, image: c2, title: "Electronic Bass", genre: "Electronic" },
// //           { music: music7, image: c3, title: "Electronic Wave", genre: "Electronic" },
// //           { music: music9, image: c4, title: "Electronic Chill", genre: "Electronic" },


// //           // Folk
// //           { music: music2, image: c2, title: "Folk Song", genre: "Folk" },
// //           { music: music4, image: c3, title: "Folk Harmony", genre: "Folk" },
// //           { music: music6, image: c4, title: "Folk Strings", genre: "Folk" },
// //           { music: music8, image: c1, title: "Folk Tune", genre: "Folk" },
// //           { music: music10, image: c2, title: "Folk Melody", genre: "Folk" },
// //           { music: music3, image: c3, title: "Folk Rhythm", genre: "Folk" },
// //           { music: music5, image: c2, title: "Folk Song", genre: "Folk" },
// //           { music: music7, image: c3, title: "Folk Harmony", genre: "Folk" },
// //           { music: music9, image: c4, title: "Folk Strings", genre: "Folk" },
// //           { music: western, image: c1, title: "Folk Tune", genre: "Folk" },


// //           // Classical
// //           { music: western, image: c4, title: "Classical Piece", genre: "Classical" },
// //           { music: music10, image: c1, title: "Classical Symphony", genre: "Classical" },
// //           { music: music8, image: c2, title: "Classical Harmony", genre: "Classical" },
// //           { music: music6, image: c3, title: "Classical Strings", genre: "Classical" },
// //           { music: music4, image: c4, title: "Classical Flow", genre: "Classical" },
// //           { music: music2, image: c1, title: "Classical Rhythm", genre: "Classical" },
// //           { music: music9, image: c4, title: "Classical Piece", genre: "Classical" },
// //           { music: music7, image: c1, title: "Classical Symphony", genre: "Classical" },
// //           { music: music5, image: c2, title: "Classical Harmony", genre: "Classical" },
// //           { music: music3, image: c3, title: "Classical Strings", genre: "Classical" },

// //           // K-Pop
// //           { music: music5, image: c1, title: "K-Pop Hit", genre: "K-Pop" },
// //           { music: music6, image: c2, title: "K-Pop Vibe", genre: "K-Pop" },
// //           { music: music7, image: c3, title: "K-Pop Groove", genre: "K-Pop" },
// //           { music: music8, image: c4, title: "K-Pop Idol", genre: "K-Pop" },
// //           { music: music9, image: c1, title: "K-Pop Dance", genre: "K-Pop" },
// //           { music: music10, image: c2, title: "K-Pop Love", genre: "K-Pop" },
// //           { music: music2, image: c1, title: "K-Pop Hit", genre: "K-Pop" },
// //           { music: music3, image: c2, title: "K-Pop Vibe", genre: "K-Pop" },
// //           { music: music4, image: c3, title: "K-Pop Groove", genre: "K-Pop" },
// //           { music: music5, image: c4, title: "K-Pop Idol", genre: "K-Pop" },
// //      ]);

// //      const filteredMusic = allMusic.filter((item) => item.genre === selectedGenre);
// //      const totalPages = Math.ceil(filteredMusic.length / itemsPerPage);

// //      const indexOfLastItem = currentPage * itemsPerPage;
// //      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //      const currentItems = filteredMusic.slice(indexOfFirstItem, indexOfLastItem);

// //      const handlePageChange = (pageNumber) => {
// //           if (pageNumber >= 1 && pageNumber <= totalPages) {
// //                setCurrentPage(pageNumber);
// //           }
// //      };

// //      const openModal = (song) => {
// //           setCurrentSong(song);
// //           setIsModalOpen(true);
// //           setIsPlaying(false);
// //      };

// //      const closeModal = () => {
// //           setIsModalOpen(false);
// //           setIsPlaying(false);
// //           if (audioRef.current) {
// //                audioRef.current.pause();
// //           }
// //      };

// //      const togglePlay = () => {
// //           if (!audioRef.current) return;
// //           if (isPlaying) {
// //                audioRef.current.pause();
// //           } else {
// //                audioRef.current.play();
// //           }
// //           setIsPlaying(!isPlaying);
// //      };

// //      return (
// //           <>

// //                <Navbar />

// //                <motion.section
// //                     className="py-5"
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{ duration: 0.6 }}
// //                >

// //                     <div className="container">
// //                          <h1 className="text-center mb-4 text-white" style={{
// //                               backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
// //                               WebkitBackgroundClip: 'text',
// //                               WebkitTextFillColor: 'transparent',
// //                          }} >{selectedGenre} Playlist</h1>

// //                          <div className="row g-4  ">
// //                               {currentItems.map((song, index) => (
// //                                    <motion.div
// //                                         className="col-md-4 col-sm-6"
// //                                         key={index}
// //                                         variants={cardVariants}
// //                                         initial="hidden"
// //                                         animate="visible"
// //                                         whileHover={{
// //                                              scale: 1.03,
// //                                              transition: { type: 'spring', stiffness: 300 },
// //                                         }}
// //                                    >
// //                                         <div
// //                                              className="card h-100 shadow rounded-4 border-0 p-3 d-flex flex-column align-items-center"
// //                                              style={{ background: "#fff", cursor: "pointer" }}
// //                                              onClick={() => openModal(song)}
// //                                         >
// //                                              <img
// //                                                   src={song.image}
// //                                                   alt={song.title}
// //                                                   className="img-fluid rounded-3 mb-3 "
// //                                                   style={{ height: '200px', objectFit: 'cover', width: '100%' }}
// //                                              />
// //                                              <h5 className="text-center fw-bold" style={{
// //                                                   backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
// //                                                   WebkitBackgroundClip: 'text',
// //                                                   WebkitTextFillColor: 'transparent',
// //                                                   display: 'inline-block',
// //                                              }}>{song.title}</h5>
// //                                         </div>
// //                                    </motion.div>
// //                               ))}

// //                               {filteredMusic.length === 0 && (
// //                                    <div className="text-center">
// //                                         <p>No songs available in this genre.</p>
// //                                    </div>
// //                               )}
// //                          </div>

// //                          {totalPages > 1 && (
// //                               <motion.nav
// //                                    aria-label="Page navigation"
// //                                    className="mt-5"
// //                                    initial={{ opacity: 0 }}
// //                                    animate={{ opacity: 1 }}
// //                                    transition={{ duration: 0.5, delay: 0.2 }}
// //                               >
// //                                    <ul className="pagination justify-content-center">
// //                                         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
// //                                              <button className="page-link text-white" onClick={() => handlePageChange(currentPage - 1)} style={{
// //                                                   backgroundImage: 'linear-gradient(135deg, #92316e, #3B82F6, #6e2daa)',
// //                                              }}>
// //                                                   Previous
// //                                              </button>
// //                                         </li>

// //                                         {Array.from({ length: totalPages }, (_, index) => (
// //                                              <li
// //                                                   key={index}
// //                                                   className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
// //                                              >
// //                                                   <button className="page-link" onClick={() => handlePageChange(index + 1)}>
// //                                                        {index + 1}
// //                                                   </button>
// //                                              </li>
// //                                         ))}

// //                                         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
// //                                              <button className="page-link text-white" onClick={() => handlePageChange(currentPage + 1)} style={{
// //                                                   backgroundImage: 'linear-gradient(135deg, #92316e, #3B82F6, #6e2daa)',
// //                                              }}>
// //                                                   Next
// //                                              </button>
// //                                         </li>
// //                                    </ul>
// //                               </motion.nav>
// //                          )}
// //                     </div>

// //                </motion.section>

// //                {/* Modal */}
// //                {isModalOpen && currentSong && (
// //                     <div
// //                          className="modal fade show"
// //                          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
// //                     >
// //                          <div className="modal-dialog modal-dialog-centered">
// //                               <div className="modal-content rounded-4 p-4 text-center">
// //                                    <button
// //                                         className="btn-close ms-auto"
// //                                         onClick={closeModal}
// //                                    ></button>
// //                                    <img
// //                                         src={currentSong.image}
// //                                         alt={currentSong.title}
// //                                         className="img-fluid rounded-3 mb-3"
// //                                         style={{ height: '250px', objectFit: 'cover', width: '100%' }}
// //                                    />
// //                                    <h5 className="fw-bold mb-3">{currentSong.title}</h5>
// //                                    <div className='text-center'>
// //                                         <img
// //                                              src={isPlaying ? pauseIcon : playIcon}
// //                                              alt="Play/Pause"
// //                                              style={{ height: "50px", width: "50px", cursor: "pointer" }}
// //                                              onClick={togglePlay} />
// //                                    </div>
// //                                    <audio ref={audioRef} src={currentSong.music} />
// //                               </div>
// //                          </div>
// //                     </div>
// //                )}

// //                <Footer />

// //           </>
// //      );
// // };

// // export default MusicPlayList;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "../Footer";

// const MusicPlaylist = () => {
//   const { type} = useParams(); // get musicType from route (e.g. /musicplaylist/pop)
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);

//  console.log("Music Playlist for:", type);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/musicApp/music/type/${type}`
//         );
//         const data = await response.json();
//         console.log("Fetched songs:", data);
//         setSongs(data);
//       } catch (err) {
//         console.error("Error fetching songs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSongs();
//   }, [type]);

//   return (
//     <>
//       <Navbar />
//       <section className="py-5">
//         <div className="container">
//           <h2
//             className="text-center mb-5"
//             style={{
//               backgroundImage: "linear-gradient(135deg, #ff5f6d, #ffc371)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "bold",
//             }}
//           >
//             {type} Playlist
//           </h2>

//           {loading ? (
//             <p className="text-center">Loading...</p>
//           ) : songs.length === 0 ? (
//             <p className="text-center">No songs available for {type}</p>
//           ) : (
//             <div className="row g-4">
//               {songs.map((song) => (
//                 <div className="col-md-3 col-sm-6" key={song.id}>
//                   <div
//                     className="card h-100 text-center shadow-sm border border-2"
//                     style={{ borderRadius: "15px" }}
//                   >
//                     <div className="card-body d-flex flex-column align-items-center">
//                       {/* Image from backend (static folder assumed as /images/) */}
//                       <img
//                         src={`http://localhost:8080/musicApp/images/${song.imageName}/image`}
//                         alt={song.title}
//                         className="img-fluid mb-3"
//                         style={{
//                           height: "120px",
//                           width: "120px",
//                           objectFit: "cover",
//                           borderRadius: "50%",
//                           backgroundColor: "#fff",
//                           padding: "8px",
//                         }}
//                       />
//                       <h5 className="fw-semibold">{song.title}</h5>
//                       <p className="text-muted mb-2">{song.singer}</p>

//                       {/* Audio Player */}
//                       <audio controls style={{ width: "100%" }}>
//                         <source
//                           src={`http://localhost:8080/musicApp/musicFiles/${song.file}/audio`}
//                           type="audio/mpeg"
//                         />
//                         Your browser does not support the audio element.
//                       </audio>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default MusicPlaylist;












// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "../Footer";

// const MusicPlaylist = () => {
//   const { type } = useParams(); // get musicType from route (e.g. /musicplaylist/pop)
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   console.log("Music Playlist for:", type);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/musicApp/music/type/${type}`
//         );
//         const data = await response.json();
//         console.log("Fetched songs:", data);
//         setSongs(data);
//       } catch (err) {
//         console.error("Error fetching songs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSongs();
//   }, [type]);

//   return (
//     <>
//       <Navbar />
//       <section className="py-5">
//         <div className="container">
//           <h2
//             className="text-center mb-5"
//             style={{
//               backgroundImage: "linear-gradient(135deg, #ff5f6d, #ffc371)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "bold",
//             }}
//           >
//             {type} Playlist
//           </h2>

//           {loading ? (
//             <p className="text-center">Loading...</p>
//           ) : songs.length === 0 ? (
//             <p className="text-center">No songs available for {type}</p>
//           ) : (
//             <div className="row g-4">
//               {songs.map((song) => (
//                 <div className="col-md-3 col-sm-6" key={song.id}>
//                   <div
//                     className="card h-100 text-center shadow-sm border border-2"
//                     style={{ borderRadius: "15px" }}
//                   >
//                     <div className="card-body d-flex flex-column align-items-center">
//                       {/* ✅ Correct Image endpoint */}
//                       <img
//                         src={`http://localhost:8080/musicApp/music/${song.id}/image`}
//                         alt={song.title}
//                         className="img-fluid mb-3"
//                         style={{
//                           height: "120px",
//                           width: "120px",
//                           objectFit: "cover",
//                           borderRadius: "50%",
//                           backgroundColor: "#fff",
//                           padding: "8px",
//                         }}
//                       />
//                       <h5 className="fw-semibold">{song.title}</h5>
//                       <p className="text-muted mb-2">{song.singer}</p>

//                       {/* ✅ Correct Audio endpoint */}
//                       <audio controls style={{ width: "100%" }}>
//                         <source
//                           src={`http://localhost:8080/musicApp/music/${song.id}/audio`}
//                           type="audio/mpeg"
//                         />
//                         Your browser does not support the audio element.
//                       </audio>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default MusicPlaylist;



import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Footer";
 
const MusicPlaylist = () => {
    const { type } = useParams();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 3;

    // ✅ Modal
    const [selectedSong, setSelectedSong] = useState(null);

    // ✅ Audio Ref
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/musicApp/music/type/${type}`
                );
                const data = await response.json();
                setSongs(data);
            } catch (err) {
                console.error("Error fetching songs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [type]);

    // ✅ Pagination logic
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    const totalPages = Math.ceil(songs.length / songsPerPage);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // ✅ Play / Pause sync
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    return (
        <>
            <Navbar />
            <section className="py-5">
                <div className="container">
                    <h2
                        className="text-center mb-5"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                        }}
                    >
                        {type} Playlist
                    </h2>

                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : currentSongs.length === 0 ? (
                        <p className="text-center">No songs available for {type}</p>
                    ) : (
                        <>
                            <div className="row g-4">
                                {currentSongs.map((song) => (
                                    <div className="col-md-4" key={song.id}>
                                        <div
                                            className="card h-100 text-center shadow-sm border border-2"
                                            style={{ borderRadius: "15px" }}
                                        >
                                            <div className="card-body d-flex flex-column align-items-center">
                                                {/* ✅ Square image - opens modal */}
                                                <img
                                                    src={`http://localhost:8080/musicApp/music/${song.id}/image`}
                                                    alt={song.title}
                                                    className="img-fluid mb-3 rounded rounded-3"
                                                    style={{
                                                        height: "300px",
                                                        width: "300px",
                                                        objectFit: "cover",
                                                        cursor: "pointer",
                                                    }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#songModal"
                                                    onClick={() => setSelectedSong(song)}
                                                />
                                                <h4
                                                    className="fw-semibold"
                                                    style={{
                                                        backgroundImage:
                                                            "linear-gradient(135deg, #e62cdaff, #ad98eaff)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {song.singer}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ✅ Pagination */}
                            <nav aria-label="Page navigation" className="mt-4">
                                <ul className="pagination justify-content-center">
                                    <li
                                        className={`page-item ${
                                            currentPage === 1 ? "disabled" : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => goToPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li
                                            key={i + 1}
                                            className={`page-item ${
                                                currentPage === i + 1 ? "active" : ""
                                            }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => goToPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li
                                        className={`page-item ${
                                            currentPage === totalPages ? "disabled" : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => goToPage(currentPage + 1)}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
            </section>

            {/* ✅ Modal */}
            <div
                className="modal fade"
                id="songModal"
                tabIndex="-1"
                aria-labelledby="songModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div
                        className="modal-content p-3"
                        style={{
                            borderRadius: "20px",
                            background:
                                "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                            color: "white",
                            boxShadow: "0px 4px 25px rgba(0,0,0,0.4)",
                        }}
                    >
                        {selectedSong && (
                            <>
                                <div className="modal-header border-0">
                                    <h5
                                        className="modal-title fw-bold"
                                        id="songModalLabel"
                                    >
                                        {selectedSong.title}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body text-center">
                                    {/*  Animated Circle Album Art */}
                                    <div className="music-image-container">
                                        <img
                                            src={`http://localhost:8080/musicApp/music/${selectedSong.id}/image`}
                                            alt={selectedSong.title}
                                            className={`music-image ${
                                                isPlaying ? "playing" : ""
                                            }`}
                                        />
                                    </div>

                                    <h5
                                        className="mt-3"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(135deg, #e62cda, #6e2daa, #3B82F6)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {selectedSong.singer}
                                    </h5>

                                    {/*  Audio Player */}
                                    <audio
                                        ref={audioRef}
                                        controls
                                        style={{ width: "50%", marginTop: "15px" }}
                                        onPlay={handlePlay}
                                        onPause={handlePause}
                                    >
                                        <source
                                            src={`http://localhost:8080/musicApp/music/${selectedSong.id}/audio`}
                                            type="audio/mpeg"
                                        />
                                        Your browser does not support the audio element.
                                    </audio>

                                    {/* 🎵 Equalizer Animation */}
                                    {isPlaying && (
                                        <div className="equalizer mt-4">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MusicPlaylist;


