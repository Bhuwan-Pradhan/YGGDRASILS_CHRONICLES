import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import "../css/pages/ProfilePage.css";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const { user } = location.state; // Read values passed on state

  return (
    <div className="HomePageDiv">
      <SideBar />
      <div className="RightWala">
        <NavBar />
        <div className="MainContentDiv">
          <div className="UserProfile">
            <div className="ProfileImage">
              <img src={user.image} alt="" />
              <button>Edit Profile</button>
              {/* <button>Follow</button> */}
            </div>
            <div className="UserDetailsProfile">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <h2>{user.email}</h2>
              <p>Following : *121*</p>
              <p>Followers : {user.followers.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
