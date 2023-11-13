import '../../css/components/DrawerBox.css'

const DrawerBox=(props) =>{
  

  return (
    <div>
      <div className='userDrawer'>
        <div><img src={props.User.image} alt="" /></div>
      
      <div>{props.User.firstName} {props.User.lastName}</div>
      <div>{props.User.email}</div>
      <div style={{borderTop: '1px solid black', margin: '20px 0', width: '100%'}}></div>
      
      
      </div>
   
      
    </div>
  );
}

export default DrawerBox;
