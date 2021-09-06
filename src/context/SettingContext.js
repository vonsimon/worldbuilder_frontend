import { useState, createContext } from "react";
import axios from "axios";

export const SettingContext = createContext();

const SettingState = ({ children }) => {
  const authToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSetting, setCurrentSetting] = useState(null);

  const getSingleSetting = async (id) => {
    try {
      setLoading(true);
      const { data: setting } = await axios.get(
        `${process.env.REACT_APP_BLOG_API}/settings/${id}`,
        { headers: { authorization: `${authToken}` } }
      );
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

  const postSetting = async (data) => {
    try {
      setLoading(true);
      const { data: newSetting } = await axios.post(
        `${process.env.REACT_APP_BLOG_API}/settings`,
        data,
        { headers: { authorization: `${authToken}` } }
      );
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

  const createMap = async (data) => {
    const mock = {
      setting: currentSetting._id,
      type: "",
      title: "",
      description: "",
      image: "",
      plane: "",
    };
    try {
      setLoading(true);
      const { data: newMap } = await axios.post(
        `${process.env.REACT_APP_BLOG_API}/map`,
        mock,
        { headers: { authorization: `${authToken}` } }
      );
      setCurrentSetting((prev) => ({ ...prev, maps: [newMap, ...prev.maps] }));
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
    <SettingContext.Provider
      value={{
        loading,
        error,
        currentSetting,
        setCurrentSetting,
        postSetting,
        getSingleSetting,
        createMap,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingState;
