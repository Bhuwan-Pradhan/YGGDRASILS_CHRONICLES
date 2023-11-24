import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="LeftWala">
      <div className="UserDetails">
        <img src={user.image} alt="" />
        <div style={{ color: "wheat" }}>
          <Link to="/userPosts">
            {user.firstName} {user.lastName}
          </Link>
        </div>
        <div className="SidebarUserStats">
          <button>Following : {user.followers.length}</button>
          <button>Followers : {user.following.length}</button>
        </div>
      </div>
      <div className="Links">
        <div>
          <button onClick={() => navigate("/")}>Home</button>
        </div>
        <div>
          <button onClick={() => navigate("/userPosts")}>My Posts</button>
        </div>
        <div>
          <button onClick={() => navigate("/allGroups")}>Groups</button>
        </div>
        <div>
          <button
            onClick={() => navigate("/profile", { state: { userProfile: user } })}
          >
            Profile
          </button>
        </div>
      </div>
      <div className="Logout">
        <button
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
