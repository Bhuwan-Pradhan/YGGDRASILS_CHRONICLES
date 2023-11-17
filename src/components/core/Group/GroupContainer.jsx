






const GroupContainer = (props) => {
 

  return (
    <div className="GroupContainer" style={{backgroundColor: 'white', color: 'red', width: '80%', margin: '20px'}}>
      <h1>{props.name}</h1>
      
      <p>admin: {props.admin.firstName} {props.admin.lastName}</p>
      <p>followers: {props.followers.length}</p>
    </div>
  );
};

export default GroupContainer;
