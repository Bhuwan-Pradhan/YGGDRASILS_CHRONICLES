import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/core/Auth/SignupForm";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupLoginPage from "./pages/SignupLoginPage";
import NewPost from "./components/core/Post/NewPost";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/slPage" element={<SignupLoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/newPost" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default App;
