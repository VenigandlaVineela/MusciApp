import { useState, useRef, useEffect } from 'react';
import musicImage from '../assets/musicimage.png';
import playIcon from '../assets/playIcon.png';
import pauseIcon from '../assets/pauseIcon.png';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import { FaCloudDownloadAlt } from "react-icons/fa";


const DashboardLanguages = () => {
  const scrollRef = useRef(null);
  const audioRef = useRef(new Audio());
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [singers, setSingers] = useState([]);
  const [selectedSinger, setSelectedSinger] = useState(null);
  const [singerSongs, setSingerSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  // Dummy playlists
  const playlists = [
    { image: c1, title: "Desert Melodies", desc: "Songs from the wild west", name: "Queen" },
    { image: c2, title: "Prairie Songs", desc: "Music from the great plains", name: "Arijit Singh" },
    { image: c3, title: "Mountain Tunes", desc: "Folk songs from the west", name: "Taylor Swift" },
    { image: c4, title: "Ranch Rhythms", desc: "Work songs from the ranch", name: "Shawn Mendes" },
    { image: musicImage, title: "Frontier Ballads", desc: "Stories from the frontier", name: "Dua Lipa" },
    { image: c1, title: "Cowboy Classics", desc: "Traditional cowboy songs", name: "Billie Eilish" },
    { image: c2, title: "Wild West Hits", desc: "Popular western music", name: "Justin Bieber" },
    { image: musicImage, title: "Western Country", desc: "Classic country western hits", name: "Ariana Grande" },
    { image: c1, title: "Melody Nights", desc: "Romantic vibes", name: "Selena Gomez" },
    { image: c2, title: "Soulful Tunes", desc: "Heartfelt songs", name: "Sam Smith" },
    { image: c3, title: "Rock Legends", desc: "Classic rock vibes", name: "Linkin Park" },
    { image: c4, title: "Electric Energy", desc: "Hard rock hits", name: "AC/DC" },
    { image: musicImage, title: "Metal Mayhem", desc: "Heavy metal classics", name: "Metallica" },
    { image: c1, title: "Rock n Roll", desc: "Legendary hits", name: "Guns N' Roses" },
    { image: c2, title: "Grunge Vibes", desc: "Alternative vibes", name: "Nirvana" }
  ];

  // Fetch singers list
  useEffect(() => {
    const sampleSingers = playlists.map(p => ({ name: p.name, imageName: p.image }));
    setSingers(sampleSingers);
    setLoading(false);
  }, []);

  // Fetch songs by singer
  useEffect(() => {
    const fetchSingerSongs = async () => {
      if (!selectedSinger) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/musicApp/singer/${encodeURIComponent(selectedSinger)}`);
        if (!response.ok) throw new Error("Failed to fetch songs");

        const data = await response.json();
        setSingerSongs(data);
      } catch (error) {
        console.error("Error fetching singer songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingerSongs();
  }, [selectedSinger]);

  // Play audio
  const playAudio = async (songId, key) => {
    if (currentPlaying === key && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      const audioUrl = `http://localhost:8080/musicApp/music/${songId}/audio`;
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      setCurrentPlaying(key);
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }

    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentPlaying(null);
    };
  };

  // Get image URL for songs
  const getSongImageUrl = (songId) => {
    if (imageErrors[`song-${songId}`]) {
      return 'https://via.placeholder.com/50x50/3B82F6/FFFFFF?text=No+Image';
    }
    return `http://localhost:8080/musicApp/music/${songId}/image`;
  };

  const handleImageError = (type, identifier) => {
    setImageErrors(prev => ({
      ...prev,
      [`${type}-${identifier}`]: true
    }));
  };


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
      <div className="py-5" style={{
        background:
          "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        color: "white",
      }}>
        <div className="container py-5" >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0" style={{
              backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Western Music Collection
            </h2>
          </div>

          {/* Singer Cards - hidden scrollbar + hover animations */}
          <div
            className="d-flex gap-4 pb-4"
            ref={scrollRef}
            style={{
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {playlists.map((playlist, i) => (
              <div
                key={i}
                className="card border shadow-sm"
                style={{
                  width: '280px',
                  flex: '0 0 auto',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onClick={() => setSelectedSinger(playlist.name)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="card-img-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{playlist.title}</h5>
                  <p className="card-text small text-muted">{playlist.desc}</p>
                  <span className="badge bg-primary">{playlist.name}</span>
                </div>
              </div>
            ))}
          </div>
          <style>
            {`
            div[ref=scrollRef]::-webkit-scrollbar {
              display: none;
            }
          `}
          </style>

          {/* Singer Modal */}
          {selectedSinger && (
            <div className="modal show d-block" tabIndex="-1"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              onClick={() => setSelectedSinger(null)}>
              <div className="modal-dialog modal-dialog-centered modal-lg"
                onClick={e => e.stopPropagation()}>
                <div className="modal-content rounded-4 overflow-hidden border-0 animate__animated animate__fadeInUp">

                  <div>
                    <div style={{
                      background:
                        "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                      color: "white",
                      boxShadow: "0px 4px 25px rgba(0,0,0,0.4)",
                    }} className="text-center mb-4 p-5">
                      <h1 className="mb-5 text-center" style={{
                        backgroundImage:
                          "linear-gradient(135deg, #e62cda, #6e2daa, #3B82F6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                      }}>Songs by {selectedSinger}</h1>
                    </div>

                    {loading ? (
                      <div className="text-center">Loading songs...</div>
                    ) : singerSongs.length === 0 ? (
                      <div className="text-center">No songs found for this singer.</div>
                    ) : (
                      <div className="list-group "  >
                        {singerSongs.map(song => (
                          <div
                            key={song.id}
                            className={`list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded-3 ${currentPlaying === `modal-${song.id}` && isPlaying ? 'bg-primary bg-opacity-10' : ''
                              }`}
                            style={{
                              transition: 'background 0.3s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                          >
                            <div className="d-flex align-items-center border-0 rounded-3 px-5 me-5">
                              <img
                                src={getSongImageUrl(song.id)}
                                alt={song.title}
                                className="rounded me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={() => handleImageError('song', song.id)}
                              />
                              <div>
                                <h6 className="mb-0">{song.title}</h6>
                                <small className="text-muted">{song.musicType}</small>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <button
                                className="btn btn-sm btn-light rounded-circle"
                                style={{ width: '40px', height: '40px' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playAudio(song.id, `modal-${song.id}`);
                                }}
                              >
                                <img
                                  src={currentPlaying === `modal-${song.id}` && isPlaying ? pauseIcon : playIcon}
                                  alt="Play/Pause"
                                  style={{ width: '20px', height: '20px' }}
                                />
                              </button>

                              {/* Download Button */}
                              <button
                                className="btn btn-sm btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                                style={{
                                  width: '35px',
                                  height: '35px',
                                  background: "linear-gradient(135deg, #4caf50, #81c784)",
                                  border: "none",
                                  color: "white",
                                  fontSize: "18px"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadSong(song.id, song.title);
                                }}
                              >
                                <FaCloudDownloadAlt />
                              </button>

                            </div>


                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer border-0">
                    <button className="btn btn-outline-secondary" onClick={() => setSelectedSinger(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div></div>

    </>
  );
};

export default DashboardLanguages;
