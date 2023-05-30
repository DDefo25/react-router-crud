import { useState } from "react"
import { Link, useLocation } from 'react-router-dom'

export default function PostEdit() {
    const { state } = useLocation();
    const {post: {content, id}} = state.data;
    const [postContent, setPostContent] = useState(content)

    
    const handleClick = (e) => {
        const reqOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                content: postContent
            })
        }
        console.log(reqOptions)
        fetch(process.env.REACT_APP_SERVER_URL + `/posts/${id}`, reqOptions)
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
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Редактирование</h1>
                    <Link to='..' relative="path">
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
                                id="postContent"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <Link to='..' relative="path">
                        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-warning me-2" onClick={(e) => handleClick(e)}>Сохранить</button>
                    </Link>
                </div>
                </div>
            </div>
    )
}