import { useSelector, useDispatch } from 'react-redux'
import { clearLoginStatus } from '../store/userSlice';
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom'
import Searchbar from './SearchBar';


function NavBar() {
    // to check if the login was success
    let { userObj, isSuccess } = useSelector(state => state.user)
    let dispatch = useDispatch();
    let history = useHistory()

    const onUserLogout = () => {
        //remove token from storage
        localStorage.clear();
        dispatch(clearLoginStatus());
        history.push('/login')

    }

    let usertype = useSelector((state) => {
        return state.user?.userObj?.usertype
    })


    let activeLinkStyles = {
        color: "#FFF",
        fontWeight: "bold",
    }

    let activenavLinkStyles = {
        textDecoration: "underline",
        color: "#FFF",
        fontWeight: "bold",
    }

    return (
        <div className="fluid">
            {/* navbar */}
            <nav className="navbar d-block navbar-expand-sm navbar-dark bg-dark">
                <div >

                    {/* collapse button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* menu */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {!isSuccess ?
                            <>
                                <NavLink style={{ fontWeight: "700", fontSize: "2rem" }} className=" navbar-brand ms-1 ms-md-5" to="/front" >
                                    Flix
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink style={{ fontWeight: "700", fontSize: "2rem" }} className="text-danger navbar-brand ms-1 ms-md-5" to="/home" >
                                    Flix
                                </NavLink>
                            </>
                        }

                        {isSuccess ?
                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                <li className="nav-item nav-size">
                                    <NavLink activeStyle={activenavLinkStyles} className="nav-link" to="/home">Home</NavLink>
                                </li>
                                <li className="nav-item nav-size">
                                    <NavLink activeStyle={activenavLinkStyles} className="nav-link" to="/tvshows">TV Shows</NavLink>
                                </li>
                                <li className="nav-item nav-size">
                                    <NavLink activeStyle={activenavLinkStyles} className="nav-link" to="/movies">Movies</NavLink>
                                </li>
                                <li className="nav-item nav-size">
                                    <NavLink activeStyle={activenavLinkStyles} className="nav-link" to="/kids">Kids</NavLink>
                                </li>
                            </ul>
                            :
                            <span></span>
                        }

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!isSuccess ?
                                <>
                                    <li className="nav-item  nav-size me-5">
                                        <NavLink activeStyle={activeLinkStyles} className="nav-link" to="/login">Sign in</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <div className="me-5">
                                        <Searchbar />
                                    </div>
                                    <div style={{ color: "white" }} class="dropdown me-6">
                                        <li style={{ color: "white" }} class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img style={{ height: "30px", width: "30px", borderRadius: "50%", marginRight: "10px" }} src={userObj?.image} />
                                            <span activeStyle={activeLinkStyles} >{userObj?.username}</span>
                                        </li>
                                        <ul style={{ color: "white" }} class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            {(usertype === "user") && <li><Link class="dropdown-item" style={{ textDecoration: 'none', color: "black", cursor: "pointer" }} to="/view-wishlist">Wishlist</Link></li>}
                                            {(usertype === "admin") &&
                                                <li><Link className=" dropdown-item mx-auto" style={{ textDecoration: 'none', color: "black", cursor: "pointer" }} to="/add-products">Add Content</Link></li>}
                                            {(usertype === "user") &&
                                                <li><Link class="dropdown-item mx-auto" style={{ textDecoration: 'none', color: "black", cursor: "pointer" }} to="/userdashboard">Account </Link></li>}
                                            {(usertype === "admin") &&
                                                <li><Link class="dropdown-item mx-auto" style={{ textDecoration: 'none', color: "black", cursor: "pointer" }} to="/admindashboard/admin">Account </Link></li>}
                                            <li><a className="dropdown-item mx-auto" style={{ textDecoration: 'none', color: "black", cursor: "pointer" }} onClick={onUserLogout}>Logout</a>
                                            </li>
                                        </ul>
                                    </div>

                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>



    )
}

export default NavBar
