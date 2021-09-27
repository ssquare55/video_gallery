import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../store/userSlice'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
// import bcryptjs from 'bcryptjs';

function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm()

    let { isSuccess, isError, isLoading, invalidLoginMessage } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let history = useHistory()


    let [userCredentialsObj, setUserCredentialsObj] = useState();
    function onLoginFormSubmit(userObj) {
        setUserCredentialsObj(userObj);
        dispatch(userLogin(userObj))
    }

    useEffect(() => {
        if (isSuccess && userCredentialsObj?.userType === "user") {
            //navigate to user dashboard
            // localStorage.setItem("isSuccess",true)
            history.push('/userdashboard')

        }
        if (isSuccess && userCredentialsObj?.userType === "admin") {
            //navigate to admin dashboard
            // localStorage.setItem("isSuccess",true)
            history.push(`/admindashboard/${userCredentialsObj.username}`)

        }
    }, [isSuccess, userCredentialsObj])

    return (
        // login form
        <div className="container w-75 bg-light text-dark pb-5 pt-3 mt-5 ">
            <div className="row mt-5">
                <form className="col-11 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                    {invalidLoginMessage && <p className="text-center alert alert-danger">{invalidLoginMessage}</p>}
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="user" value="user" {...register("userType")} />
                        <label className="form-check-label" for="user">User</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="admin" value="admin" {...register("userType")} />
                        <label className="form-check-label" for="admin">Admin</label>
                    </div>
                    {errors.userType?.type === "required" && <p className="text-danger">Select a type</p>}

                    {/* name */}
                    <h5 className="mt-2">Sign-In</h5>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="name@example.com"
                            {...register("username", { required: true, minLength: 3 })}
                        />
                        <label for="username">User Name</label>
                    </div>
                    {errors.username?.type === "required" && <p className="alert alert-danger">UserName is required</p>}
                    {errors.username?.type === "minLength" && <p className="alert alert-danger">MinLength is required</p>}


                    {/* passwors */}
                    <div class="form-floating mb-3">
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="name@example.com"
                            {...register("password", { required: true, minLength: 3 })}
                        />
                        <label for="password">Password</label>
                    </div>
                    {errors.password?.type && <p className="alert alert-danger">Password is required</p>}


                    {/* Login Button */}
                    <button className="btn btn-warning w-100 mt-2">Login</button>
                    <p className="text-center" style={{ "font-size": "10px", }} >By continuing, you agree to Flix's Conditions of Use and Privacy Notice.</p>
                    <hr className="mt-4" />
                    <p className="text-center" style={{ "font-size": "10px", }} >New to Flix?</p>
                    <NavLink className="btn btn-secondary w-100 " to="/register">Create a new Flix account</NavLink>

                </form>
            </div>
        </div>
    )

}

export default Login