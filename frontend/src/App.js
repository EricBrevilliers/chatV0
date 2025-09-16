import React, { useState } from 'react';
import Login from './components/Login';
import Jeu from './components/Jeu';

function App() {
    const [idJoueur, setIdJoueur] = useState(null);

    return (
        <div>
            {!idJoueur ? (
                <Login onLogin={setIdJoueur} />
            ) : (
                <Jeu idJoueur={idJoueur} />
            )}
        </div>
    );
}

export default App;

