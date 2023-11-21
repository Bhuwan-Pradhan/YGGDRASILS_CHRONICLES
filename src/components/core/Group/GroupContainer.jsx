
import SearchUser from '../../popUp/SearchUser';
import "../../../css/components/GroupContainer.css"
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";



const GroupContainer = (props) => {
 

  return (
    <div className="GroupContainer">
    <div className='GroupInfo'>
      <h1>{props.name}</h1>
      <p>Created By : {props.admin.firstName} {props.admin.lastName}</p>
      <button>{props.followers.length} Members</button>
      {/* <SearchUser id={props.id}/> */}
    </div>
    <div className='JoinGroup'>
      <button>
        <IoMdAdd size={"40px"}/>
        <p>Join</p>
        {/* <IoMdCheckmark size={"40px"}/>
        <p>Joined</p> */}
      </button>
    </div>
    </div>
  );
};

export default GroupContainer;
