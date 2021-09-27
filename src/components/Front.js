import React from 'react'
import { NavLink } from 'react-router-dom';

function Front() {
  return (

    < div className=" colbody" >
      {/*  static card 1 */}
      <div className="container">
        <img src="https://res.cloudinary.com/ssquare55/image/upload/v1631596272/FINAL_PROJECT/amazon1_sstui8.png" className="s" data-aos="flip-up" />
        <div className="container">
          <p className="k" data-aos="zoom-in">Lorem ipsum dolor sit.</p>
          <p className="t">Lorem ipsum dolor sit amet consectetur  <br />Lorem ipsum dolor sit amet.</p>
          <NavLink className="btn btn-success button" to="/login">Login</NavLink>
        </div>
      </div>

      {/* static card 2 */}
      <div className="container">
        <img src="https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/IN-Living-Room-V2._CB524587855_SY1200_FMJPG_.jpg" className="s" data-aos="flip-up" />
        <div className="container">
          <p className="k" data-aos="zoom-in">Lorem ipsum dolor sit.</p>
          <p className="t">Lorem ipsum dolor sit amet consectetur  <br />Lorem ipsum dolor sit amet.</p>
          <NavLink className="btn btn-success button" to="/login">Login</NavLink>
        </div>
      </div>


      {/* static card 3 */}
      <div className="container">
        <img src="https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/PRIME_multi-benefit_MAGNET_2X._CB1519820207_SY1200_FMJPG_.jpg" className="s1" data-aos="flip-up" />
        <div className="container">
          <p className="k" data-aos="zoom-in">Lorem ipsum dolor sit.</p>
          <p className="t">Lorem ipsum dolor sit amet consectetur  <br />Lorem ipsum dolor sit amet.</p>
          <NavLink className="btn btn-success button" to="/login">Login</NavLink>
        </div>
      </div>

    </ div>
  );
}

export default Front
