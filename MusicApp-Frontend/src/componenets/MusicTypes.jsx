import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from './Navbar';

const MusicTypes = () => {
  const navigate = useNavigate();
  const [musicTypes, setMusicTypes] = useState([]);

  const handleMusicType = (type) => {
    navigate(`/musicPlaylist/${type}`);
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
      <Navbar />
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
            <Footer />

    </>
  );
};

export default MusicTypes;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Footer';
// import Navbar from './Navbar';

// const MusicTypes = () => {
//   const navigate = useNavigate();
//   const [musicTypes, setMusicTypes] = useState([]);

   

//   useEffect(() => {
//   const fetchMusicTypes = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/musicApp/musicTypes/getMusicTypes");
//       const data = await response.json();
//       setMusicTypes(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchMusicTypes();
// }, []);

// const handleMusicType = (title)=>{
//   navigate(`/musicPlaylist/${title}`);
// }

//   const formatImg = (item) =>
//     `data:${item.type};base64,${item.data}`;

//   return (
//     <>
//       <Navbar />
//       <section className="py-5">
//         <div className="container">
//           <h2
//             className="text-center mb-5"
//             style={{
//               backgroundImage:
//                 'linear-gradient(135deg, #e62cdaff, #ad98eaff)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontWeight: 'bold',
//             }}
//           >
//             Explore Music Genres
//           </h2>
//           <div className="row g-4">
//             {musicTypes.map((type, index) => (
//               <div className="col-md-3 col-sm-6" key={index}>
//                 <div
//                   className="card h-100 text-center shadow-sm border border-2"
//                   style={{
//                     backgroundColor: type.bgColor,
//                     borderRadius: '15px',
//                     transition: 'transform 0.3s ease',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'scale(1.08)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <div className="card-body d-flex flex-column align-items-center justify-content-center">
//                     <img
//                       src={formatImg(type)}
//                       alt={type.title}
//                       className="img-fluid mb-3"
//                       style={{
//                         height: '120px',
//                         width: '120px',
//                         objectFit: 'contain',
//                         borderRadius: '50%',
//                         backgroundColor: '#fff',
//                         padding: '10px',
//                       }}
//                      onClick={handleMusicType(type.title)}
//                     />
//                     <h5 className="card-title fw-semibold">{type.title}</h5>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default MusicTypes;







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Footer';
// import Navbar from './Navbar';
// import type1 from '../assets/type1.png';
// import type2 from '../assets/type2.png';
// import type3 from '../assets/type3.png';
// import type4 from '../assets/type4.png';
// import type5 from '../assets/type5.png';
// import type6 from '../assets/type6.png';
// import type7 from '../assets/type7.png';
// import type8 from '../assets/type8.png';

// const MusicTypes = () => {
//   const navigate = useNavigate();

//   const [musicTypes] = useState([
//     { image: type1, title: "Pop", bgColor: "#ffe6f0" },
//     { image: type2, title: "Rock", bgColor: "#f2f2f2" },
//     { image: type3, title: "Jazz", bgColor: "#e6ccff" },
//     { image: type4, title: "Hip-Hop", bgColor: "#d0f0fd" },
//     { image: type5, title: "Folk", bgColor: "#fff2cc" },
//     { image: type6, title: "Classical", bgColor: "#fce4ec" },
//     { image: type7, title: "K-Pop", bgColor: "#e8f5e9" },
//     { image: type8, title: "Electronic", bgColor: "#ffe0e0" },
//   ]);

//   return (
//     <>
//       <Navbar />
//       <section className="py-5">
//         <div className="container">
//           <h2
//             className="text-center mb-5"
//             style={{
//               backgroundImage: 'linear-gradient(135deg, #e62cdaff, #ad98eaff)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontWeight: 'bold',
//             }}
//           >
//             Explore Music Genres
//           </h2>
//           <div className="row g-4">
//             {musicTypes.map((type, index) => (
//               <div className="col-md-3 col-sm-6" key={index}>
//                 <div
//                   className="card h-100 text-center shadow-sm border border-2"
//                   style={{
//                     backgroundColor: type.bgColor,
//                     borderRadius: '15px',
//                     transition: 'transform 0.3s ease',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'scale(1.03)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <div className="card-body d-flex flex-column align-items-center justify-content-center">
//                     <img
//                       src={type.image}
//                       alt={type.title}
//                       className="img-fluid mb-3"
//                       style={{
//                         height: '120px',
//                         width: '120px',
//                         objectFit: 'contain',
//                         borderRadius: '50%',
//                         backgroundColor: '#fff',
//                         padding: '10px',
//                       }}
//                       onClick={() =>
//                         navigate('/musicplaylist', { state: { genre: type.title } })
//                       }
//                     />
//                     <h5 className="card-title fw-semibold">{type.title}</h5>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default MusicTypes;









// // import { useState } from "react";
// // import type1 from '../assets/type1.png';
// // import type2 from '../assets/type2.png';
// // import type3 from '../assets/type3.png';
// // import type4 from '../assets/type4.png';
// // import type5 from '../assets/type5.png';
// // import type8 from '../assets/type8.png';
// // import type6 from '../assets/type6.png';
// // import type7 from '../assets/type7.png';

// // import { useNavigate } from "react-router-dom";



// // import Navbar from "../Navbar";
// // import Footer from "../Footer";

// // const MusicTypes = () => {


// //      const navigate=useNavigate()

// //      const types = [
// //           { image: type1, title: "Pop", bgColor: "black" },
// //           { image: type2, title: "Rock", bgColor: "lightpink" },
// //           { image: type3, title: "Jazz", bgColor: "#bd99e6ff" },
// //           { image: type4, title: "Hip Hop", bgColor: "#63cae1ff" },
// //           { image: type5, title: "Folk", bgColor: "#f8961e" },
// //           { image: type6, title: "Classical", bgColor: "#a30c76ff" },
// //           { image: type7, title: "Hip-Hop", bgColor: "#42f138ff" },
// //           { image: type8, title: "Electronic", bgColor: "#ea1515ff" },

// //      ];

// //      const renderCard = (type, index) => (
// //           <div className="col-md-3 col-6 mb-4 text-center" key={index}>
// //                <div className="rounded-circle border border-4 border-primary shadow-lg mx-auto d-flex align-items-center justify-content-center"
// //                     style={{
// //                          width: "200px",
// //                          height: "200px",
// //                          backgroundColor: type.bgColor,
// //                          transition: "transform 0.3s ease",
// //                          cursor: "pointer"
// //                     }}
// //                     onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
// //                     onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
// //                >
// //                     <img
// //                          src={type.image}
// //                          alt={type.title}
// //                          style={{
// //                               maxWidth: "80%",
// //                               maxHeight: "80%",
// //                               width: "auto",
// //                               height: "auto",
// //                               objectFit: "contain",
// //                          }}
// //                     />
// //                </div>
// //                <h4 className="mt-3 text-primary">{type.title}</h4>
// //           </div>
// //      );

// //      return (
// //           <>
// //                <Navbar />
// //                <div className="container mt-4">
// //                     <div className="mb-4 text-center" >
// //                          <h1 className="mb-4" style={{
// //                               backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
// //                               WebkitBackgroundClip: 'text',
// //                               WebkitTextFillColor: 'transparent',
// //                               display: 'inline-block',
// //                          }}>Music Genres</h1>
// //                     </div>
// //                          <div className="row mb-4">{types.slice(0, 4).map(renderCard)}</div>
// //                          <div className="row">{types.slice(4, 8).map(renderCard)}</div>
// //                     </div>
// //                     <Footer />
// //                </>
// //                );
// // };

// //                export default MusicTypes;