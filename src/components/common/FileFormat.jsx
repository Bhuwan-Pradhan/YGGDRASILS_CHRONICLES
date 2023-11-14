

const FileFormat=()=>{
    const cloudinaryLink = "https://res.cloudinary.com/dt9s8r6wz/image/upload/v1699935127/ozo3lga8eapourgod2sf.mp4";

// Extract the file format from the Cloudinary link

 
 


  const fileFormat = cloudinaryLink.split('.').pop().toLowerCase();


// Check if the file format indicates an image or video
if (fileFormat === 'jpg' || fileFormat === 'jpeg' || fileFormat === 'png' || fileFormat === 'gif') {
  console.log('Its an image.');
} else if (fileFormat === 'mp4' || fileFormat === 'webm' || fileFormat === 'ogg') {
  console.log('Its a video');
} else {
  console.log('Unknown file type.');
}
return(
    <div>

    </div>
);
}

export default FileFormat;