
import '../css/pages/SignupLoginPage.css'
import Title from '../assets/images/TitleText.png'
import { useNavigate } from "react-router";
import LoginForm from '../components/core/Auth/LoginForm';
import SignupForm from '../components/core/Auth/SignupForm';


const SignupLoginPage = () => {
const navigate = useNavigate();
   return (
      <div className="SLPage">
      <div className="MainBox">
        <div className="TitleText">
          <img src={Title} alt="YGGDRASIL'S CHRONICLES" />
        </div>
        <div className="SignupLogin">
          <SignupForm />
          <LoginForm />
        </div>
        <button className="Button_Guest" onClick={() => navigate("/guest")}>
          <span>Continue as Guest?</span>
        </button>
      </div>
    </div>
   )
}
   
   export default SignupLoginPage; 