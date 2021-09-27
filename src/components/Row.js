import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieModal from './MovieModal';
import Zoom from 'react-reveal/Fade';
import './Row.css'


function Row({ title, filterGenre, filterCat, isLargeRow }) {

    let movies = useSelector((state) => {
        return state.content.contentObj
    })

    let { usertype, email } = useSelector((state) => {
        return state.user.userObj
    })

    let filterData = movies.filter((movie) => {
        let genre = movie.genre
        let cat = movie.categories
        let genData = genre.filter(type => type == filterGenre)
        let catData = cat.filter(type => type == filterCat)
        return (genData[0] === filterGenre && catData[0] === filterCat)
    })


    function truncate(str, n) {
        return (str?.length > n) ? str.substr(0, n - 1) + "..." : str;
    }


    const [showrev, setShow] = useState(false)
    const [showMovie, setShowMov] = useState()
    const [modshowMovie, setModShowMov] = useState()

    function mouseEnter(movie) {
        setShowMov(movie)
        setShow(true)
    }
    function mouseLeave() {
        setShowMov([])
        setShow(false)
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = (movie) => {
        setModShowMov(movie)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [vdoOpen, setVdoOpen] = React.useState(false);

    const handleVdoOpen = () => {
        setVdoOpen(true);
    };

    const handleVdoClose = () => {
        setVdoOpen(false);
    };



    return (
        <div className="bgcolor">

            <div className=" container-fluid row">
                {/* title */}
                <h2 style={{ textAlign: "center" }}>{title}</h2>
                <div className="row_posters">
                    {
                        movies.length !== 0 &&
                        filterData.map((movie, index) => {
                            return <span>
                                <img key={index}
                                    onClick={() => { handleOpen(movie) }}
                                    onMouseEnter={() => mouseEnter(movie)} onMouseLeave={() => mouseLeave()}
                                    className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                                    src={isLargeRow ? movie.image[0] : movie.image[1]} />
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

export default Row
