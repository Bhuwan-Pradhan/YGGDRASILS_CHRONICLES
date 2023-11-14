import '../css/pages/ProfilePage.css'
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {

    // const user = JSON.parse(localStorage.getItem("user"));
    const location= useLocation();
    const { user } = location.state; // Read values passed on state


  return (
    <div className='profile'>
        <div className="user">
        <img src={user.image} alt="" />
        <h1>{user.firstName} {user.lastName}</h1>
        <h2>{user.email}</h2>
        <p>{user.followers.length}</p>

        </div>
    </div>
    
  )
}

export default ProfilePage; 