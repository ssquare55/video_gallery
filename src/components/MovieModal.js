import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addtoWishlist, deletefromWishlist } from '../store/wishlistSlice';
import { Modal } from 'react-bootstrap'
import { deletefromContent } from '../store/contentSlice';
import { useHistory } from 'react-router-dom'



function MovieModal({ open, handleClose, usertype, modshowMovie, handleVdoOpen, vdoOpen, handleVdoClose, email }) {
    let history = useHistory()
    let dispatch = useDispatch();

    // to fetch all the movies from slice
    let movies = useSelector((state) => {
        return state.content.contentObj
    })

    // to fetch all the movies in wishlist from slice
    let wishlist = useSelector((state) => {
        return state.wishlist.wishlistObj
    })

    // to filter the movies that still exist in the content slice
    function check(cid) {
        let list = wishlist.find((id) => id === cid)
        return list;
    }

    // to delete from wishlist
    function deleteWishlist(cid) {
        let index = wishlist.indexOf(cid);
        dispatch(deletefromWishlist({ id: cid, email: email, index: index }))
    }

    // to delete from content
    function deleteContent(cid) {
        let index = movies.findIndex(obj => obj._id == cid)
        dispatch(deletefromContent({ id: cid, index: index }))
        handleClose()
    }

    // to edit content from the content slice
    function editContent(cid) {
        let index = movies.findIndex(obj => obj._id == cid)
        history.push(`/editcontent/${cid}/${index}`)
    }

    return (
        <>
            <Modal
                show={open}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => { handleClose() }}
            >
                <Modal.Header>
                    {
                        // conitional render on the basis of usertype
                        (usertype === "user") ?
                            <>
                                {
                                    (check(modshowMovie?._id) !== undefined) ?
                                        <>

                                            <i className="far fs-3 fa-heart text-danger"
                                                onClick={() => deleteWishlist(modshowMovie._id)}>
                                            </i>
                                        </> :
                                        <>
                                            <i className="far fs-3 fa-heart text-dark"
                                                onClick={() => dispatch(addtoWishlist({ id: modshowMovie._id, email: email }))}>
                                            </i>
                                        </>

                                }
                            </> :
                            <>
                                <i
                                    class="far fs-3 fa-trash-alt text-dark hover-danger"
                                    onClick={() => deleteContent(modshowMovie._id)}
                                ></i>
                            </>
                    }

                    {/* X */}
                    <i onClick={() => { handleClose() }} className="fas fs-3 fa-times text-dark"></i>
                </Modal.Header>
                <Modal.Body>
                    <img src={modshowMovie?.image[0]} style={{ objectFit: "contain" }} width="100%" height="400px" alt="modal header image" />
                    <h5 className="text-dark">{modshowMovie?.cdescription}</h5>
                </Modal.Body>

                <Modal.Footer>
                    {(usertype === "admin") && <i onClick={() => { editContent(modshowMovie._id) }} class="fas me-auto fs-3 fa-edit text-dark hover-warning"></i>}
                    <i onClick={() => { handleClose(); handleVdoOpen() }} class="fas fs-3 fa-play text-dark hover-success"></i>
                </Modal.Footer>
            </Modal>


            {/* modal video */}
            <Modal show={vdoOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => { handleVdoClose() }}>

                <Modal.Body>
                    <iframe width="100%" height="460" src="https://www.youtube.com/embed/5OyF5c-ZX3o?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Modal.Body>

            </Modal>


        </>

    )
}

export default MovieModal
