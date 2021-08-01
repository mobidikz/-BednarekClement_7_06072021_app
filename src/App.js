import React, {useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from "./actions/user.actions";


const App = () => {
  const [uid,setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {   //vérification du token

      await axios({
        method : "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials : true
      })
      .then((res) => { 
        setUid(res.data);
      })
      .catch((err) => console.log("No token"))
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
    
  }, []); // [] pour ne pas faire la requète à l'infinie

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
