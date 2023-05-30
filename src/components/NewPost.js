import { useState } from "react"
import {Link} from 'react-router-dom'

export default function NewPost() {
    const [postContent, setPostContent] = useState('')
    
    const handleClick = (e) => {
        const reqOptions = {
            method: 'POST',
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: postContent
            })
        }

        fetch(process.env.REACT_APP_SERVER_URL + '/posts', reqOptions)
        .then(res => {
            if (res.status < 200 && res.status >= 300) {
                throw `Server error: [${res.status}] [${res.statusText}] [${res.url}]`;
            }
        }).catch(err => {
            console.debug(err)
        });
    }

    return (
            <div className="modal-dialog m-2">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Новый пост</h1>
                    <Link to='/'>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </Link>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <textarea 
                                name='postContent' 
                                className="form-control" 
                                value={postContent} 
                                onChange={e => setPostContent(e.target.value)} 
                                rows={4} 
                                cols={40} 
                                id="postContent"
                                required></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <Link to='/'>
                        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-primary me-2" onClick={(e) => handleClick(e)}>Опубликовать</button>
                    </Link>
                </div>
                </div>
            </div>
    )
}