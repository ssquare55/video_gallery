import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { contentFetch } from '../store/contentSlice'


function AddProduct() {

    let [file, setFile] = useState(null);
    let [file1, setFile1] = useState(null);
    let { register, handleSubmit } = useForm()
    let history = useHistory()
    let { username } = useParams()
    let { path, url } = useRouteMatch()
    console.log("path: ", path, "url: ", url)
    let dispatch = useDispatch()



    //after image select
    const onFileSelect = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    const onFileSelect1 = (e) => {
        console.log(e.target.files)
        setFile1(e.target.files[0])
    }



    // when form submitted
    const onFormSubmit = async (contentObj) => {
        console.log(contentObj)
        //create formdata obj
        let formData = new FormData();
        // append image to it 
        let arr = []
        arr.push(file)
        arr.push(file1)
        arr.forEach((files, index) => {
            formData.append("poster", files, files.name)
        })
        // append productObj
        formData.append('contentObj', JSON.stringify(contentObj))
        //HTTP POST
        console.log("formdata", formData)
        let response = await axios.post("/content/addcontent", formData)
        alert(response.data.message)
        dispatch(contentFetch());

    }



    return (
        <div className="container w-75 bg-light text-dark pb-5 pt-3 mt-5 ">
            <div className="row mt-5">
                <form className="col-11 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="cname"
                            placeholder="name@example.com"
                            {...register("cname", { required: true })}
                        />
                        <label for="cname">Content Name</label>
                    </div>


                    <div class="form-floating mb-3">
                        <textarea
                            rows="4"
                            type="text"
                            class="form-control"
                            id="cdescription"
                            placeholder="name@example.com"
                            {...register("cdescription", { required: true })}
                        />
                        <label for="cdescription">Content Description</label>
                    </div>
                    {/* {errors.email?.type && <p className="alert alert-danger">Email is required</p> } */}


                    <div class="form-floating mb-3">
                        <input
                            type="file"
                            name="poster"
                            class="form-control mb"
                            id=""
                            onChange={onFileSelect}
                        />
                        <p style={{ "font-size": "10px", }} >Poster*.</p>

                    </div>

                    <div class="form-floating mb-3">
                        <input
                            type="file"
                            name="backdrop"
                            class="form-control mb"
                            id=""
                            onChange={onFileSelect1}
                        />
                        <p style={{ "font-size": "10px", }} >Backdrop*.</p>

                    </div>

                    <h6>Categories</h6>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="home"
                            value="home"
                            {...register("categories")}
                        />
                        <label class="form-check-label" for="home">Home</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="tvshows"
                            value="tvshows"
                            {...register("categories")}
                        />
                        <label class="form-check-label" for="tvshows">Tv Shows</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="movies"
                            value="movies"
                            {...register("categories")}
                        />
                        <label class="form-check-label" for="movies">Movies</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="kids"
                            value="kids"
                            {...register("categories")}
                        />
                        <label class="form-check-label" for="kids">Kids</label>
                    </div>






                    <h6 className="mt-2">Genre</h6>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="original"
                            value="original"
                            {...register("genre")}
                        />
                        <label class="form-check-label" for="original">Original</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="horror"
                            value="horror"
                            {...register("genre")}
                        />
                        <label class="form-check-label" for="horror">horror</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="comedy"
                            value="comedy"
                            {...register("genre")}
                        />
                        <label class="form-check-label" for="comedy">Comedy</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="thriller"
                            value="thriller"
                            {...register("genre")}
                        />
                        <label class="form-check-label" for="thriller">thriller</label>
                    </div>

                    <button className="btn btn-warning mt-3 w-100">Add content</button>




                </form>
            </div>
        </div>
    )
}

export default AddProduct