import React, { useState } from 'react';
import axios from 'axios';

// const ImageUploadForm = () => {
  // const [image, setImage] = useState(null);

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', image);

  //   try {
  //     await axios.post('http://your-django-backend.com/upload-image/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Image uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button type="submit">Upload Image</button>
//     </form>
//   );
// };

export default ImageUploadForm;