import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import PostView from './components/PostView'
import PostEdit from './components/PostEdit';
import Page404 from './components/Page404';
import Redirect from './components/Redirect';

function App() {
  return (
    <>
      <div className="container mb-2">
      <Routes>
        <Route path="/posts" exact element={<Posts />} />
        <Route path='/' element={<Redirect />}/>
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/:rId" element={<PostView />} />
        <Route path="/posts/:rId/edit" element={<PostEdit />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
