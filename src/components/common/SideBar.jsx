import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authApi";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="LeftWala">
      <div className="UserDetails">
        <img src={user.image} alt="" />
        <div style={{ color: "wheat" }}>
          <Link to="/userPosts">
            {user.firstName} {user.lastName}
          </Link>
        </div>
        <div className="Stats">
          <p>Following : 22</p>
          <p>Followers : 2000</p>
        </div>
      </div>
      <div className="Links">
        <div><Link to="/home">
          Home
        </Link></div>
        <div><Link to="/userPosts">
          My posts
        </Link></div>
        <div><Link to="/allGroups">
          Groups
        </Link></div>
        <div><Link to="/profile">
          Profile
        </Link></div>
        <div> <button onClick={() => {dispatch(logout(navigate))}}>Logout</button></div>
      </div>
      <div className="Logout">
       
      </div>
     
    </div>
  )
}

export default SideBar;