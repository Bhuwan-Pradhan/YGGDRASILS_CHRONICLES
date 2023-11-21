import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/core/Auth/SignupForm";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupLoginPage from "./pages/SignupLoginPage";
import NewPost from "./components/core/Post/NewPost";
import Comment from "./components/popUp/Comment";
import UserPosts from "./pages/UserPosts"
import ProfilePage from "./pages/ProfilePage";
import GuestPage from "./pages/GuestPage";
import GroupPage from "./pages/GroupPage";
import SearchUser from "./components/popUp/SearchUser";
import NewGroup from "./components/popUp/NewGroup";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupLoginPage />} />
        <Route path="/guest" element={<GuestPage />}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/comment"  element={<Comment />} />
        <Route path="/userPosts"  element={<UserPosts />} />
        <Route path="/profile"  element={<ProfilePage />} />
        <Route path="/group"  element={<NewGroup />} />
     
        <Route path="/allGroups"  element={<GroupPage />} />
        <Route path="/search"  element={<SearchUser />} />

        
      </Routes>
    </div>
  );
}

export default App;
