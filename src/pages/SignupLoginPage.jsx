import LoginForm from "../components/core/Auth/LoginForm";
import SignupForm from "../components/core/Auth/SignupForm";
import '../css/pages/SignupLoginPage.css'

const SignupLoginPage = () =>{
    let logged = true;
    return(
       <div className="Container-SL">
       {logged?<LoginForm className="loginPage"/>:<SignupForm className="signPage"/>}
           
           
       </div>
    )
   }
   
   export default SignupLoginPage; 