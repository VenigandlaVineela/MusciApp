import React from 'react';
import image3 from '../assets/image3.png';
import Navbar from './Navbar';
import Footer from '../Footer';

const Subscribe = () => {
  return (
    <>
       <div className="card text-white position-relative border-0 ">
        <img
          src={image3}
          className="card-img img-fluid"
          alt="Subscribe background"
          style={{ objectFit: 'cover', height: '70vh' }}
        />

        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center h-100 bg-overlay">
          <h2 className="card-title fw-bold mb-3 px-3">
            Subscribe to our newsletter to get the latest trends & news
          </h2>
          <p className="card-text mb-2">Join our database NOW!</p>
          <p className="card-text mb-4">
            <small>Last updated 3 mins ago</small>
          </p>

          <form className="container px-3">
            <div className="row g-4 justify-content-center">
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="First name"
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="email"
                  className="form-control p-3"
                  placeholder="Your Email"
                />
              </div>
              <div className="col-12 col-md-2">
                <button
                  type="submit"
                  className="btn w-100 py-3 text-white border-0 btn-subscribe"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
     </>
  );
};

export default Subscribe;
