import React from "react";
import "./LandingPage.css";
import getThemeColors from "../Themes/Theme";
import peopleWithDeso from "../../assets/images/peopleWithDeso.svg";
import noAds from "../../assets/images/noAds.svg";
import earnRevenue from "../../assets/images/earnRevenue.svg";

export default function Landing(props) {
  const lightWhite = getThemeColors().lightBorder;

  return (
    <div className='container landing-body '>
      <div className='container my-5' style={{ maxWidth: "93%" }}>
        <h1
          className='text-center font-weight-bold page-headline'
          style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          Publish and own your blog posts like never before! 🔑
        </h1>
        <div className='container' style={{ maxWidth: "93%" }}>
          <h2
            className='text-center sub-heading my-5'
            style={{ color: `${props.mode === "light" ? "grey" : lightWhite}` }}>
            Write blog posts to blockchain, share ideas, and connect with the
            global community without permission!
          </h2>
        </div>
      </div>

      <div className='d-flex container my-5 justify-content-center'>
        <button className='btn getStarted btn-primary btn-lg shadow' onClick={props.loginWithDeso}>
          Start Writing!
        </button>
      </div>

      <div className='my-5 justify-content-center shadow rounded py-5 px-2'>
        <h1
          className='text-center'
          style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
    
          No paywall. No ads. Only Content Ownership with DeSo Blockchain.
        </h1>
        <div
          className='container my-5'
          style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          <div className='row'>
            <div className='d-flex flex-column flex-lg-row justify-content-lg-center panel'>
              <div className='container'>
                <div className='row'>
                  <img
                    src={peopleWithDeso}
                    alt='people with deso'
                    className='img-fluid card-image'
                  />
                  <div className='container'>
                    <h2>Post to DeSo blockchain!</h2>
                    <p>
                      PhrazeApp enables you to post to the &nbsp;
                      <strong>Decentralized Social Blockchain </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='container'>
                <div className='row'>
                  <img
                    src={noAds}
                    alt='no ads'
                    className='img-fluid card-image'
                  />
                  <div className='container'>
                    <h2>No ads!</h2>
                    <p>
                      Ads and annoying popups are such a web2 thing! With PhrazeApp,
                      you can read and write content withot time consuming ads and popups!
                    </p>
                  </div>
                </div>
              </div>
              <div className='container'>
                <div className='row'>
                  <img
                    src={earnRevenue}
                    alt='earn revenue'
                    className='img-fluid card-image'
                  />
                  <div className='container'>
                    <h2>Earn Revenue</h2>
                    <p>
                      Earn revenue through your blog posts through social
                      tippings AKA &nbsp; <strong>diamonds and NFT sales </strong> of your blogs!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
