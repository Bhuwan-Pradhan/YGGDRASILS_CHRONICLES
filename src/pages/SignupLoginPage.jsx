import LoginForm from "../components/core/Auth/LoginForm";
import SignupForm from "../components/core/Auth/SignupForm";
import '../css/pages/SignupLoginPage.css'
import Title from '../assets/images/TitleText.png'

const SignupLoginPage = () => {
   return (
      <div className="SLPage">
         <div className="MainBox">
            <div className="TitleText"><img src={Title} alt="YGGDRASIL'S CHRONICLES"/></div>
            <div className="SignupLogin">
               <button className="Signup">Signup</button>
               <button className="Login">Login</button>
            </div>
               <button className="Guest"><span>Continue as Guest?</span></button>
         </div>
      </div>
   )
}
   
   export default SignupLoginPage; 