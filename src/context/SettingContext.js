import { useState, createContext } from 'react';
import axios from 'axios';

export const SettingContext = createContext();

const SettingState = ({ children }) => {
  const authToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSetting, setCurrentSetting] = useState(null);

  const postSetting = async data => {
    if (!(data.title && data.description && data.image)) {
      setError('Title, Description and Image URL must be set');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setLoading(true);
      const {
        data: { newSetting }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API}/settings`, data, {headers: {'authorization': `${authToken}`}});
      setCurrentSetting(newSetting);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  return (
    <SettingContext.Provider value={{ loading, error, currentSetting, postSetting }}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingState;