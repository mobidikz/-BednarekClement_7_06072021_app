import React from 'react';
import Log from '../components/Log';

const App = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log signin={false} signup={true}/> {/*sur sign up à l'ouverture de la page profil*/}
        <div className="img-container">
          <img src="./img/log.svg" alt=""/>
        </div>
      </div>
    </div>

  );
};

export default App;