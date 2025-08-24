import { useState, useRef } from 'react';
import musicImage from '../assets/musicimage.png';
import playIcon from '../assets/playIcon.png';
import pauseIcon from '../assets/pauseIcon.png';
import western from '../assets/Western.mp3';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';


const DashboardLanguages = () => {
  const scrollRef = useRef(null);
  const audioRef = useRef(new Audio());
  const [selected, setSelected] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 8 music cards with western.mp3
  const playlists = [
    {
      image: musicImage,
      title: "Western Country",
      desc: "Classic country western hits",
      language: "English",
      songs: [
        { title: "Riding Home", artist: "Cowboy Band", duration: "2:45", src: western }
      ]
    },
    {
      image: c1,
      title: "Desert Melodies",
      desc: "Songs from the wild west",
      language: "Telugu",
      songs: [
        { title: "Lone Ranger", artist: "Frontier Singers", duration: "3:15", src: western }
      ]
    },
    {
      image: c2,
      title: "Prairie Songs",
      desc: "Music from the great plains",
      language: "Hindi",
      songs: [
        { title: "Open Range", artist: "Ranch Boys", duration: "3:30", src: western }
      ]
    },
    {
      image: c3,
      title: "Mountain Tunes",
      desc: "Folk songs from the west",
      language: "Kanada",
      songs: [
        { title: "High Country", artist: "Trail Blazers", duration: "2:50", src: western }
      ]
    },
    {
      image:c4,
      title: "Ranch Rhythms",
      desc: "Work songs from the ranch",
      language: "Tamil",
      songs: [
        { title: "Cattle Drive", artist: "Wranglers", duration: "3:45", src: western }
      ]
    },
    {
      image: musicImage,
      title: "Frontier Ballads",
      desc: "Stories from the frontier",
      language: "Malayalam",
      songs: [
        { title: "Gold Rush", artist: "Prospectors", duration: "4:10", src: western },
                { title: "Cattle Drive", artist: "Wranglers", duration: "3:45", src: western }

      ]
    },
    {
      image: c1,
      title: "Cowboy Classics",
      desc: "Traditional cowboy songs",
      language: "Kannada",
      songs: [
        { title: "Campfire Song", artist: "Trail Riders", duration: "3:20", src: western }
      ]
    },
    {
      image: c2,
      title: "Wild West Hits",
      desc: "Popular western music",
      language: "English",
      songs: [
        { title: "Sunset Trail", artist: "Outlaws", duration: "2:55", src: western }
      ]
    }
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const playAudio = (src, index) => {
    if (currentPlaying === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = src;
    audioRef.current.play()
      .then(() => {
        setCurrentPlaying(index);
        setIsPlaying(true);
      })
      .catch(error => {
        console.error("Audio playback failed:", error);
      });

    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentPlaying(null);
    };
  };

  return (
    <>

      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{
            backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}>Western Music Collection</h2>
          <div>
            <button
              className="btn btn-outline-primary me-2 rounded-circle"
              onClick={scrollLeft}
              style={{
                width: '40px', height: '40px',
              }}
            >
              &lt;
            </button>
            <button
              className="btn btn-outline-primary rounded-circle"
              onClick={scrollRight}
              style={{ width: '40px', height: '40px' }}
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          className="d-flex overflow-auto gap-4 pb-4"
          ref={scrollRef}
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'

          }}
        >
          {playlists.map((playlist, playlistIndex) => (
            <div
              key={playlistIndex}
              className="card border shadow-sm position-relative border-2 "
              style={{
                width: '280px',
                flex: '0 0 auto',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',

              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              {/* Clickable image area that opens modal */}
              <div
                className="position-relative"
                onClick={() => setSelected(playlist)}
                style={{
                  cursor: 'pointer'

                }}
              >
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="card-img-top img-fluid"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                {/* Play button that controls audio */}
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    playAudio(playlist.songs[0].src, `card-${playlistIndex}`);
                  }}>
                </div>
              </div>

              <div className="card-body" >
                <h5 className="card-title fw-bold mb-2">{playlist.title}</h5>
                <p className="card-text small text-muted mb-2">{playlist.desc}</p>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">{playlist.language}</span>
                  <small className="text-muted">
                    <i className="fas fa-music me-1"></i>
                    {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Playlist Modal */}
        {selected && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1050
            }}
            onClick={() => setSelected(null)} >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={e => e.stopPropagation()}>
              <div className="modal-content rounded-4 overflow-hidden border-0">
                <div className="position-relative">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="img-fluid w-100"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                  ></button>
                  <div
                    className="position-absolute bottom-0 start-0 p-4 text-white w-100"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                    }}
                  >
                    <h3 className="mb-1">{selected.title}</h3>
                    <p className="mb-2">{selected.desc}</p>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary me-2">{selected.language}</span>
                      <small>
                        <i className="fas fa-music me-1"></i>
                        {selected.songs.length} song{selected.songs.length !== 1 ? 's' : ''}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="mb-3">Songs</h5>
                  <div className="list-group">
                    {selected.songs.map((song, songIndex) => (
                      <div
                        key={songIndex}
                        className={`list-group-item list-group-item-action border-0 p-3 mb-2 rounded-3 ${currentPlaying === `modal-${playlists.indexOf(selected)}-${songIndex}` && isPlaying ? 'bg-primary bg-opacity-10' : ''}`}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm btn-light rounded-circle me-3 d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                playAudio(song.src, `modal-${playlists.indexOf(selected)}-${songIndex}`);
                              }}
                            >
                              <img
                                src={currentPlaying === `modal-${playlists.indexOf(selected)}-${songIndex}` && isPlaying ? pauseIcon : playIcon}
                                alt={currentPlaying === `modal-${playlists.indexOf(selected)}-${songIndex}` && isPlaying ? "Pause" : "Play"}
                                style={{ width: '16px', height: '16px' }}
                              />
                            </button>
                            <div>
                              <h6 className="mb-0">{song.title}</h6>
                              <small className="text-muted">{song.artist}</small>
                            </div>
                          </div>
                          <small className="text-muted">{song.duration}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer border-0">

                  <button
                    className="btn btn-outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* CSS for animations */}
      <style jsx>{`
        .pulse-animation {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default DashboardLanguages;