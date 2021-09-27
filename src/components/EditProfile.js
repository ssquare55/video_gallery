import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { editfromUser } from '../store/userSlice'


function EditProfile() {
    let dispatch = useDispatch()
    let user = useSelector((state) => {
        return state.user.userObj
    })

    let { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: user })

    const onEditFormSubmit = async (userObj) => {
        dispatch(editfromUser(userObj))
        alert("user updated")
    }

    return (
        <div className=" container w-75 bg-white text-dark mt-3 pb-3">
            <div className="row mt-1">
                {/* user register status */}
                <form className="col-11 col-sm-8 col-md-6 mx-auto mt-4" onSubmit={handleSubmit(onEditFormSubmit)}>

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

                    {/* email */}
                    <div class="form-floating mb-1">
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="name@example.com"
                            disabled={true}
                            {...register("email", { required: true })}
                        />
                        <label for="email">Email</label>
                    </div>
                    {errors.email?.type && <p className="alert alert-danger">Email is required</p>}


                    <button className="btn btn-warning w-100 mt-3">Update your Flix Account</button>

                </form>
            </div>
        </div>
    )

}

export default EditProfile