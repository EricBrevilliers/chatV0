package com.roborally.controller;

import com.roborally.model.Joueur;
import com.roborally.model.Partie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class PartieController {
    private Partie partie = new Partie();

    @PostMapping("/joueurs")
    public ResponseEntity<?> inscrireJoueur(@RequestBody Joueur joueur) {
        if (partie.estPleine()) {
            return ResponseEntity.badRequest().body("La partie est déjà pleine (4 joueurs max).");
        }
        joueur.setId(UUID.randomUUID().toString());
        partie.ajouterJoueur(joueur);

        // La partie commence uniquement quand 4 joueurs sont inscrits
        if (partie.estPleine()) {
            partie.setEstCommencée(true);
        }

        return ResponseEntity.ok(joueur.getId());
    }

    @GetMapping("/partie")
    public ResponseEntity<Partie> getPartie() {
        return ResponseEntity.ok(partie);
    }

    @PostMapping("/deplacer")
    public ResponseEntity<Void> deplacerRobot(
            @RequestParam String idJoueur,
            @RequestParam int x,
            @RequestParam int y
    ) {
        partie.deplacerRobot(idJoueur, x, y);
        return ResponseEntity.ok().build();
    }
}
