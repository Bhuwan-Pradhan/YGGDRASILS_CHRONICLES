import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/core/Auth/SignupForm";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupLoginPage from "./pages/SignupLoginPage";
import NewPost from "./components/core/Post/NewPost";
import Comment from "./components/core/Post/Comment";
import UserPosts from "./pages/UserPosts"
import ProfilePage from "./pages/ProfilePage";
import FileFormat from "./components/common/FileFormat";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/comment"  element={<Comment />} />
        <Route path="/userPosts"  element={<UserPosts />} />
        <Route path="/profile"  element={<ProfilePage />} />
        <Route path="/test"  element={<FileFormat />} />
        
      </Routes>
    </div>
  );
}

export default App;
