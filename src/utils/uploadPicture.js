import axios from 'axios';

const uploadPicture = async (e, setValue, setError) => {
  const formData = new FormData();
  formData.append('image', e.target.files[0]);
  try {
    const {
      data: { location }
    } = await axios.post(`${process.env.REACT_APP_BLOG_API}/image-upload`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setValue('image', location);
  } catch (error) {
    if (error.response) {
      setError('image', { type: 'manual', message: error.response.data.error });
    } else {
      setError('image', { type: 'manual', message: error.message });
    }
  }
};
export default uploadPicture;
