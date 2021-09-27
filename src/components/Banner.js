import React from 'react'
import { useSelector } from 'react-redux';
import './Banner.css'

function Banner() {

    // select a random movie for the banner
    let BanMovie = useSelector((state) => {
        let contentObj = state.content.contentObj;
        return contentObj[Math.floor((Math.random() * 20))]
    })

    // to trucate the movie desc
    function truncate(str, n) {
        return (str?.length > n) ? str.substr(0, n - 1) + "..." : str;
    }


    return (
        //  background image 
        <header className="container-fluid banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${BanMovie?.image[1]})`,
                backgroundPosition: "center center"
            }}>

            {/* title */}
            <span className="banner_content">
                <h1 className="banner_title">{BanMovie.cname}</h1>
            </span>
            {/* buttons */}
            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>


            {/* description */}
            <h1 className="banner description">
                {truncate(BanMovie?.cdescription, 150)}
            </h1>


        </header>
    )
}

export default Banner
