import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editfromContent } from '../store/contentSlice'



function EditContent() {

    // to fetch all the movies from the slice
    let movies = useSelector((state) => {
        return state.content.contentObj
    })

    let { index, cid } = useParams();

    let value = movies.find((value) =>
        value._id === cid
    )

    let { register, handleSubmit } = useForm({ defaultValues: value })
    let dispatch = useDispatch()
    let history = useHistory()





    // when form submitted
    const onFormSubmit = async (contentObj) => {

        //create formdata obj
        contentObj.image = value.image
        dispatch(editfromContent({ content: contentObj, index: index }))
        alert("content updated")
        history.goBack();
    }



    return (
        // form for editing the content
        <div className="container w-75 bg-light text-dark pb-5 pt-3 mt-5 ">
            <div className="row mt-5">
                {/* content name */}
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

                    {/* content description */}
                    <div class="form-floating mb-3">
                        <textarea
                            style={{ height: "100px" }}
                            type="text"
                            class="form-control"
                            id="cdescription"
                            placeholder="name@example.com"
                            {...register("cdescription", { required: true })}
                        />
                        <label for="cdescription">Content Description</label>
                    </div>

                    {/* content description */}
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

                    {/* Tv shows Cat. */}
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

                    {/* Movies */}
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

                    {/* Kids */}
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

                    {/* Genre */}
                    <h6 className="mt-2">Genre</h6>

                    {/* Original */}
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

                    {/* Horror */}
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

                    {/* comedy */}
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

                    {/* thriller */}
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

export default EditContent