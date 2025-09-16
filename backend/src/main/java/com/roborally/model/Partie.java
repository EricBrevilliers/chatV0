package com.roborally.model;

import java.util.ArrayList;
import java.util.List;

public class Partie {
    private List<Joueur> joueurs = new ArrayList<>();
    private boolean estCommencée = false;
    private final int NB_JOUEURS_MAX = 4;
    private final int TAILLE_PLATEAU = 10;

    // Positions de départ fixes pour 4 joueurs
    private final int[][] positionsDepart = {
            {0, 0}, {9, 0}, {0, 9}, {9, 9}
    };

    public boolean ajouterJoueur(Joueur joueur) {
        if (joueurs.size() < NB_JOUEURS_MAX) {
            int idx = joueurs.size();
            joueur.setX(positionsDepart[idx][0]);
            joueur.setY(positionsDepart[idx][1]);
            joueurs.add(joueur);
            return true;
        }
        return false;
    }

    public boolean estPleine() {
        return joueurs.size() == NB_JOUEURS_MAX;
    }

    public void deplacerRobot(String idJoueur, int x, int y) {
        for (Joueur j : joueurs) {
            if (j.getId().equals(idJoueur)) {
                j.setX(x);
                j.setY(y);
                break;
            }
        }
    }

    public List<Joueur> getJoueurs() {
        return joueurs;
    }

    public boolean isEstCommencée() {
        return estCommencée;
    }

    public void setEstCommencée(boolean estCommencée) {
        this.estCommencée = estCommencée;
    }
}
