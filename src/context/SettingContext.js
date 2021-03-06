import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const SettingContext = createContext();

const SettingState = ({ children }) => {
  const authToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); //ergÃ¤nzt
  const [currentSetting, setCurrentSetting] = useState(null);
  useEffect(() => authToken && setIsSubmitted(true), [authToken]); //ergÃ¤nzt

  const getSingleSetting = async id => {
    try {
      setLoading(true);
      const { data: setting } = await axios.get(`${process.env.REACT_APP_BLOG_API}/settings/${id}`, {
        headers: { authorization: `${authToken}` }
      });
      setCurrentSetting(setting);
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

  const postSetting = async data => {
    try {
      setLoading(true);
      const { data: newSetting } = await axios.post(`${process.env.REACT_APP_BLOG_API}/settings`, data, {
        headers: { authorization: `${authToken}` }
      });
      setCurrentSetting(newSetting);
      setIsSubmitted(true); // ergÃ¤nzt
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

  const createMap = async data => {
    const setting = currentSetting ? currentSetting._id : data.setting

    const myMapData = {
      setting,
      title: data.title,
      description: data.description,
      image: data.image,
      bounds: [[0,0],[data.boundsY, data.boundsX]],
      plane: data.plane,
    }
    try {
      setLoading(true);
      const { data: newMap } = await axios.post(
        `${process.env.REACT_APP_BLOG_API}/map`,
        myMapData,
        { headers: { authorization: `${authToken}` } }
      );
      currentSetting &&  setCurrentSetting(prev => ({ ...prev, maps: [newMap, ...prev.maps] }));
      setLoading(false);
      return newMap
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
    <SettingContext.Provider
      value={{
        loading,
        error,
        currentSetting,
        setCurrentSetting,
        postSetting,
        getSingleSetting,
        createMap
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingState;