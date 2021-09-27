import React from 'react'
import { contentFetch } from '../store/contentSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Dashboard.css'

function AdminDashboard() {

    let dispatch = useDispatch()
    useEffect(async () => {
        dispatch(contentFetch());
    }, [])

    // fetch the user details
    let user = useSelector((state) => {
        return state.user.userObj
    })


    // hello
    return (
        // to display all the details in admin dashboard
        <div>
            <div className="featured mt-5 text-center w-50 mx-auto bg-white text-dark">
                <div className="featuredItem">
                    <img src={user.image} style={{ objectFit: "contain" }} width="100%" height="100px" alt="profile image" />
                    <h1 className="featuredTitle">Usertype : {user.usertype}</h1>
                    <h1 className="featuredTitle">name : {user.name}</h1>
                    <h1 className="featuredTitle">Username : {user.username}</h1>
                    <h1 className="featuredTitle">Email : {user.email}</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
