import React from 'react';
import Log from '../components/Log';

const App = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log />
        <div className="img-container">
          <img src="./img/log.svg" alt=""/>
        </div>
      </div>
    </div>

  );
};

export default App;