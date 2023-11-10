import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/core/Auth/SignupForm";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createUser" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
