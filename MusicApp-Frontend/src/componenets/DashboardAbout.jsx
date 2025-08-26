import image2 from '../assets/image2.png';
import 'animate.css';
import { useNavigate } from 'react-router-dom';


const DashboardAbout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{
        background:
          "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        color: "white",
      }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 mb-4 animate__animated animate__fadeInUp animate__slow">
              <img src={image2} alt="DashboardAbout us" className="img-fluid" />
            </div>
            <div className="col-md-6 col-sm-12 animate__animated animate__fadeInUp animate__slow animate__delay-1s">
              <h1
                className="mb-5 fa-1"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgb(146, 49, 110), #3B82F6, #6e2daa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                What is Agenda and why choose our services?
              </h1>
              <p>
                Vestibulum eget lacus at mauris sagittis varius. Etiam ut venenatis dui. Nullam tellus risus, pellentesque at facilisis et, scelerisque sit amet metus. Duis vel semper turpis, ac tempus libero. Maecenas id ultrices risus. Aenean nec ornare ipsum, lacinia volutpat urna. Maecenas ut aliquam purus, quis sodales dolor.
              </p>
              <button
                type="button"
                className="btn text-white px-4 py-3 rounded-3 border-0"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #92316e, #3B82F6, #6e2daa)',
                }}
                onClick={() => navigate('/dashboard/musictypes')}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAbout;
