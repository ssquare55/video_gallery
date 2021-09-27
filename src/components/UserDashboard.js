import React from 'react'
import { useParams, useRouteMatch, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'
import ViewProducts from './ViewProducts'
import Wishlist from './Wishlist'
import { contentFetch } from '../store/contentSlice'
import { wishlistFetch } from '../store/wishlistSlice'
import { useEffect } from 'react'
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import EditProfile from './EditProfile'

function UserDashboard() {


    let user = useSelector((state) => {
        return state.user.userObj
    })


    let dispatch = useDispatch()
    useEffect(async () => {
        dispatch(contentFetch());
        dispatch(wishlistFetch({ email: user.email }));
    }, [])






    return (
        <div>
            {
                (user !== undefined) ?
                    <div>
                        <div div className="featured mt-5 text-center w-50 mx-auto  bg-white text-dark">
                            <div className="featuredItem">
                                <img src={user?.image} style={{ objectFit: "contain" }} width="100%" height="100px" alt="profile image" />
                                <h1 className="featuredTitle">Usertype : {user?.usertype}</h1>
                                <h1 className="featuredTitle">name : {user?.name}</h1>
                                <h1 className="featuredTitle">Username : {user?.username}</h1>
                                <h1 className="featuredTitle">Email : {user?.email}</h1>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <h1>Updating</h1>
                    </div >
            }
            <EditProfile />
        </div>
    )
}

export default UserDashboard
