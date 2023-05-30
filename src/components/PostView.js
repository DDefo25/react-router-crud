import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from 'date-fns'
import Locale from "date-fns/locale/ru"
import useJsonFetch from "../hooks/useJsonFetch";

export default function Post() {
    const { rId } = useParams()
    const [data, isLoading] = useJsonFetch(process.env.REACT_APP_SERVER_URL + '/posts/' + rId)
    
    const handleRemove = () => {
        fetch(process.env.REACT_APP_SERVER_URL + `/posts/${rId}`, { method: 'DELETE' })
        .then(res => {
            if (res.status < 200 && res.status >= 300) {
                throw `Server error: [${res.status}] [${res.statusText}] [${res.url}]`;
            }
        }).catch(err => {
            console.debug(err)
        });
    }

    return (isLoading ? (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <div className="card m-2">
                <div className="card-header">
                    {formatDistanceToNowStrict(new Date(data.post.created), {locale: Locale}) + ' назад'}
                </div>
                <div className="card-body">
                    <p className="card-text">{data.post.content}</p>
                    <Link to={`/posts/${rId}/edit`} state={{ data }} className="btn btn-warning link me-2">Изменить</Link>
                    <Link to='/' className="btn btn-danger link me-2" onClick={() => handleRemove()}>Удалить</Link>
                    <Link to='..' relative="path" className="btn btn-secondary link">Назад</Link>
                </div>
            </div>
        )
    )
}