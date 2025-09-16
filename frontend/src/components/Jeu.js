import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jeu({ idJoueur }) {
    const [partie, setPartie] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/partie");
                setPartie(response.data);
                if (response.data.estCommencée) {
                    setMessage("La partie a commencé !");
                }
            } catch (error) {
                console.error(error);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCaseClick = async (x, y) => {
        try {
            await axios.post("http://localhost:8080/api/deplacer", null, {
                params: { idJoueur, x, y }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Plateau de jeu</h1>
            <p>{message}</p>
            {partie && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(10, 50px)",
                    gridTemplateRows: "repeat(10, 50px)",
                    gap: "2px",
                    margin: "20px auto",
                    width: "fit-content"
                }}>
                    {Array.from({ length: 10 }).map((_, y) =>
                        Array.from({ length: 10 }).map((_, x) => {
                            const joueurIci = partie.joueurs.find(j => j.x === x && j.y === y);
                            return (
                                <div
                                    key={`${x}-${y}`}
                                    onClick={() => handleCaseClick(x, y)}
                                    style={{
                                        backgroundColor: joueurIci ? getColorForJoueur(joueurIci.id) : "white",
                                        border: "1px solid black",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    {joueurIci && joueurIci.nom.charAt(0)}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

function getColorForJoueur(id) {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
    return colors[parseInt(id.charAt(0), 16) % 4];
}

export default Jeu;
