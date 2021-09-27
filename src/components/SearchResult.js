import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import MovieModal from './MovieModal';
import Zoom from 'react-reveal/Fade';



function SearchResult() {

    let { state } = useLocation()

    const [showrev, setShow] = useState(false)
    const [showMovie, setShowMov] = useState()
    const [modshowMovie, setModShowMov] = useState()

    const [open, setOpen] = React.useState(false);

    let { usertype, email } = useSelector((state) => {
        return state.user.userObj
    })


    const handleOpen = (movie) => {
        setModShowMov(movie)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function truncate(str, n) {
        return (str?.length > n) ? str.substr(0, n - 1) + "..." : str;
    }




    function mouseEnter(movie) {
        setShowMov(movie)
        setShow(true)
    }
    function mouseLeave() {
        setShowMov([])
        setShow(false)
    }


    const [vdoOpen, setVdoOpen] = React.useState(false);

    const handleVdoOpen = () => {
        setVdoOpen(true);
    };

    const handleVdoClose = () => {
        setVdoOpen(false);
    };



    return (
        <div className="bgcolor" style={{ height: "100% !important" }}>

            <div className=" container-fluid row pt-5 pb-5">
                {/* title */}
                <h2 style={{ textAlign: "center" }}>Search Result</h2>
                <div className="row_posters">
                    {
                        state.length !== 0 &&
                        state.map((movie, index) => {
                            return <span>
                                <img key={index}
                                    onClick={() => { handleOpen(movie) }}
                                    onMouseEnter={() => mouseEnter(movie)} onMouseLeave={() => mouseLeave()}
                                    className="row_poster row_posterLarge"
                                    src={movie.image[0]} />
                            </span>
                        })
                    }

                </div>
            </div>


            <MovieModal open={open} handleClose={handleClose} usertype={usertype} modshowMovie={modshowMovie} handleVdoOpen={handleVdoOpen} vdoOpen={vdoOpen} handleVdoClose={handleVdoClose} email={email} />

            <Zoom bottom when={showrev}>

                <div className="card container bgcolor">

                    <div className="card-body container text-light text-center ">
                        <h5 className="card-title">{showMovie?.cname}</h5>
                        <p className="card-text">{truncate(showMovie?.cdescription, 90)}</p>
                    </div>
                </div>
            </Zoom>


        </div >
    )
}

export default SearchResult
