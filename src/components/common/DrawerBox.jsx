import '../../css/components/DrawerBox.css'
import { Link, useNavigate } from 'react-router-dom';

const DrawerBox=(props) =>{
  const navigate = useNavigate();

  return (
    <div>
      <div className='userDrawer'>
        <div><img src={props.User.image} alt="" /></div>
      
      <div>{props.User.firstName} {props.User.lastName}</div>
      <div>{props.User.email}</div>
      <div style={{borderTop: '1px solid black', margin: '20px 0', width: '100%'}}></div>
      <button onClick={navigate("/userPosts")}> Yours Posts</button>
      
      
      </div>
   
      
    </div>
  );
}

export default DrawerBox;
