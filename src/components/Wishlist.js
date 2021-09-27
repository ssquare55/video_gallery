import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import MovieModal from './MovieModal';
import Zoom from 'react-reveal/Fade';
import './Row.css'


function Wishlist() {


    // to fetch all the movies from Contentslice
    let movies = useSelector((state) => {
        return state.content.contentObj
    })

    // to fetch all teh movies in wishList from Contentslice
    let wishlist = useSelector((state) => {
        return state.wishlist.wishlistObj
    })

    // to get usertype and email of the user
    let { usertype, email } = useSelector((state) => {
        return state.user.userObj
    })

    //to truncate the description
    function truncate(str, n) {
        return (str?.length > n) ? str.substr(0, n - 1) + "..." : str;
    }


    //state to show the wishlist
    let [wishState, setwishState] = useState([])

    //state to show the hover movie name and desc
    const [showrev, setShow] = useState(false)

    // state to show movie in modal form
    const [showMovie, setShowMov] = useState()
    const [modshowMovie, setModShowMov] = useState()
    const [open, setOpen] = React.useState(false);

    const handleOpen = (movie) => {
        setModShowMov(movie)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // in case movie is played
    const [vdoOpen, setVdoOpen] = React.useState(false);
    const handleVdoOpen = () => {
        setVdoOpen(true);
    };
    const handleVdoClose = () => {
        setVdoOpen(false);
    };


    //function activate when the mouse hover over the movie
    function mouseEnter(movie) {
        setShowMov(movie)
        setShow(true)
    }

    // to set state to default when mouse leaves
    function mouseLeave() {
        setShowMov([])
        setShow(false)
    }

    // to set and update the wishlist
    useEffect(() => {
        setwishState([...movies.filter(movie => {
            return wishlist.includes(movie._id)
        })])
    }, [wishlist])


    return (
        <div className="bgcolor" style={{ height: "100% !important" }}>

            <div className=" container-fluid row pt-5 pb-5">
                {/* title */}
                <h2 style={{ textAlign: "center" }}>Wishlist</h2>
                <div className="row_posters">
                    {
                        wishState.length !== 0 &&
                        wishState.map((movie, index) => {
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

            {/* to run the movie modal with other func. */}
            <MovieModal open={open} handleClose={handleClose} usertype={usertype} modshowMovie={modshowMovie} handleVdoOpen={handleVdoOpen} vdoOpen={vdoOpen} handleVdoClose={handleVdoClose} email={email} />

            {/* for the movie desc and name when hovered */}
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

export default Wishlist
