import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contentFetch } from '../store/contentSlice'
import './Row.css'

function ViewProducts({ title, isLargeRow }) {
    let [movies, setMovies] = useState([])
    let dispatch = useDispatch()

    let content = useSelector((state) => {
        return state.content
    })


    useEffect(async () => {
        dispatch(contentFetch());
    }, [])



    // console.log("movies",movies)



    return (
        <div className="bgcolor">

            view content
        </div>
    )
}

export default ViewProducts
