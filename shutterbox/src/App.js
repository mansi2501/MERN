import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import EditProfile from './components/profile/EditProfile';
import AddPost from './components/post/AddPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
