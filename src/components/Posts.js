import { Link } from "react-router-dom";
import useJsonFetch from "../hooks/useJsonFetch";
import PostItem from './PostItem'

export default function Posts() {
    const [data, isLoading] = useJsonFetch(process.env.REACT_APP_SERVER_URL + '/posts')
    console.log(process.env.REACT_APP_SERVER_URL)
    return (
    <>
        <Link to={'/posts/new'}>
            <button type='button' className="btn btn-primary m-2">Создать пост</button>
        </Link>
        {isLoading ?
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> 
            : 
            data
            .sort((a,b) => b.created - a.created)
            .map(el => <PostItem key={el.id} data={el} />)}
    </>
    )
}