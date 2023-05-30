import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <div className='mx-auto'>
            <div className="text-center">
                <img src={process.env.REACT_APP_RANDOM_IMAGE_URL + '/error'} className="rounded" alt="..." />
                <p className="text-center">Страницы не существует</p>
                <Link to="/" className="text-decoration-none">Вернуться назад</Link>
            </div>
        </div>
    )
}