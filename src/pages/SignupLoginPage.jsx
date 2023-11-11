import LoginForm from "../components/core/Auth/LoginForm";
import SignupForm from "../components/core/Auth/SignupForm";
import '../css/pages/SignupLoginPage.css'

const SignupLoginPage = () =>{
    let logged = false;
    return(
       <div className="Container-SL">
       {logged?<LoginForm />:<SignupForm />}
           
           
       </div>
    )
   }
   
   export default SignupLoginPage; 