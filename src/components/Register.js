import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

function Register() {
    // state handling the file/Photo
    let [file, setFile] = useState(null);
    let { register, handleSubmit, formState: { errors } } = useForm()
    let history = useHistory()

    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    const onRegisterFormSubmit = async (userObj) => {
        //create formdata obj
        let formData = new FormData();
        // append image to it 
        formData.append('photo', file, file.name)
        // append userObj
        formData.append('userObj', JSON.stringify(userObj))
        let responseObj;
        // on basis of response redirect to user/admin api
        if (userObj.usertype === "user") {
            responseObj = await axios.post("/users/register", formData)
        }
        if (userObj.usertype === "admin") {
            responseObj = await axios.post("/admin/register", formData)
        }
        let payload = responseObj.data
        if (payload.message === "success") {
            //redirect to login comp
            alert("register success")
            history.push("/login")
        }
        else {
            alert("username already taken")
            // setUserRegisterStatus("username already exists")
        }
    }

    return (
        <div className="container w-75 bg-light text-dark pb-5 pt-3 mt-5 ">
            <div className="row mt-1">
                {/* user register status */}
                {/* <p className="display-2 text-center text-danger">{userRegisterStatus}</p> */}
                <form className="col-11 col-sm-8 col-md-6 mx-auto mt-4" onSubmit={handleSubmit(onRegisterFormSubmit)}>
                    <h6>UserType</h6>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            id="user"
                            value="user"
                            {...register("usertype")}
                        />
                        <label class="form-check-label" for="user">User</label>
                    </div>

                    {/* User type */}
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            id="admin"
                            value="admin"
                            {...register("usertype")}
                        />
                        <label class="form-check-label" for="admin">Admin</label>
                    </div>

                    {/* Name */}
                    <div class="form-floating mb-1">
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="name@example.com"
                            {...register("name", { required: true })}
                        />
                        <label for="name">Name</label>
                    </div>
                    {errors.name?.type && <p className="alert alert-danger">*Name is required</p>}

                    {/* username */}
                    <div class="form-floating mb-1">
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="name@example.com"
                            {...register("username", { required: true, minLength: 3 })}//this id is used for error gen
                        />
                        <label for="username">User Name</label>
                    </div>
                    {errors.username?.type === "required" && <p className="alert alert-danger">*UserName is required</p>}
                    {errors.username?.type === "minLength" && <p className="alert alert-danger">*MinLength is required</p>}

                    {/* Password */}
                    <div class="form-floating mb-1">
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="name@example.com"
                            {...register("password", { required: true, minLength: 3 })}
                        />
                        <label for="password">Password</label>
                    </div>
                    {errors.password?.type && <p className="alert alert-danger">*Password is required</p>}

                    {/* Email */}
                    <div class="form-floating mb-1">
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="name@example.com"
                            {...register("email", { required: true })}
                        />
                        <label for="email">Email</label>
                    </div>
                    {errors.email?.type && <p className="alert alert-danger">Email is required</p>}

                    {/* DP */}
                    <div class="form-floating mb-3">
                        <input
                            type="file"
                            name="photo"
                            class="form-control mb"
                            id=""
                            onChange={onFileSelect}
                        />
                    </div>
                    {errors.dob?.type && <p className="alert alert-danger">Date of Birth is required</p>}


                    <button className="btn btn-warning w-100">Create your Flix Account</button>
                    <hr className="mt-4" />
                    <p className="text-center" style={{ "font-size": "10px", }} >Already have an account?</p>
                    <NavLink className="btn btn-secondary w-100 " to="/login">Sign-In now</NavLink>

                </form>
            </div>
        </div>
    )

}

export default Register