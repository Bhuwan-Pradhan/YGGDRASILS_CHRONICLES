import ReactModal from "react-modal";
import SignupForm from "../core/Auth/SignupForm";
import LoginForm from "../core/Auth/LoginForm";



const LoginFirst = (props) =>{

    const myStyle = {
        width:'100px',
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
         content: {
          color: 'black',
          backgroundColor: 'white',
          width: "35%",
          height: "70%",
          margin: "auto",
          borderRadius: "10px",
        },
      };

return(
    <div>
         <ReactModal
        isOpen={props.isOpen}
        contentLabel="Comment Modal"
        onRequestClose={() => props.modalV(false)}
        style={myStyle}
      >
         <div className="LoginFirstBoxHeader">
            <div>Login Please</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>

            <div>
            <div className="SignupLogin">
          <SignupForm />
          <LoginForm />
        </div>
            </div>
          </div>
      </ReactModal>
    </div>
)
}

export default LoginFirst;