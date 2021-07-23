import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfil from '../components/Profil/UpdateProfil';

const Profil = () => {
const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? ( // si uid est vrais
        <UpdateProfil />
      ) : ( // sinon
        <div className="log-container">
          <Log signin={false} signup={true}/> {/*sur sign up à l'ouverture de la page profil*/}
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log"/>
          </div>
        </div>
      )}
    </div>

  );
};

export default Profil;