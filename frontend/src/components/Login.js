import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [nom, setNom] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Envoi de la requête à :", "http://localhost:8080/api/joueurs");
            const response = await axios.post("http://localhost:8080/api/joueurs", { nom });
            console.log("Réponse complète du backend :", response); // <-- Ajoute ce log
            if (response && response.data) {
                onLogin(response.data);
            } else {
                console.error("Réponse vide ou incomplète :", response);
                alert("Erreur : réponse vide du serveur.");
            }
        } catch (error) {
            console.error("Erreur complète :", error); // <-- Ce log est crucial
            if (error.response) {
                // Le backend a répondu avec un code d'erreur (ex: 400, 500)
                console.error("Statut HTTP :", error.response.status);
                console.error("Données d'erreur :", error.response.data);
                alert(`Erreur serveur : ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // La requête n'a pas atteint le backend
                console.error("Aucune réponse du serveur. Le backend est-il lancé ?");
                alert("Le backend ne répond pas. Est-il lancé sur http://localhost:8080 ?");
            } else {
                // Autre erreur (ex: problème de configuration Axios)
                console.error("Erreur Axios :", error.message);
                alert(`Erreur : ${error.message}`);
            }
        }
    };

    return (
        <div>
            <h1>Rejoindre la partie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ton nom"
                    required
                />
                <button type="submit">Rejoindre</button>
            </form>
        </div>
    );
}

export default Login;
