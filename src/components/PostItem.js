import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from 'date-fns'
import Locale from "date-fns/locale/ru"

export default function PostItem({data}) {
    const {created, content, id } = data;

    let timeDistance = formatDistanceToNowStrict(new Date(created), {locale: Locale})
    const [ time, setTime ] = useState(timeDistance)
    const updateTime = () => {
        setTimeout(() => {
            timeDistance = formatDistanceToNowStrict(new Date(created), {locale: Locale})
            setTime(timeDistance)
        })
    }

    useEffect( () => updateTime(), [])
    useEffect(() => {
        const timeout = setTimeout( updateTime, 1 * 1000)
        return () => clearTimeout(timeout)
    }, [time])

    return (
        <Link className="link" to={`/posts/${id}`}>
            <div className="card m-2">
                <div className="card-header">
                    {timeDistance + ' назад'}
                </div>
                <div className="card-body">
                    <p className="card-text">{content}</p>
                </div>
            </div>
        </Link>
    )
}