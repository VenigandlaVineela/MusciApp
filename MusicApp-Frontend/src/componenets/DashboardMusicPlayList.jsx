import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "../DashboardFooter";


const DashboardMusicPlayList = () => {
  const { type } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 3;

  //  Modal
  const [selectedSong, setSelectedSong] = useState(null);

  //  Audio Ref
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

  //  Pagination logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //  Play / Pause sync
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

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
                      className={`page-item ${currentPage === 1 ? "disabled" : ""
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
                        className={`page-item ${currentPage === i + 1 ? "active" : ""
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
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
      </div>

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
                      className={`music-image ${isPlaying ? "playing" : ""
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

      <DashboardFooter />
    </>
  );
};

export default DashboardMusicPlayList;


