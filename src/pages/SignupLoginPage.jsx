import LoginForm from "../components/core/Auth/LoginForm";
import SignupForm from "../components/core/Auth/SignupForm";

const SignupLoginPage = () =>{
    return(
       <div>
           <h1>welcome to Room 88</h1>
           <h2>SignUp</h2>
           <SignupForm />
           <h2>Login</h2>
           <LoginForm />
           
       </div>
    )
   }
   
   export default SignupLoginPage; 