package com.roborally.model;

public class Joueur {
    private String id;
    private String nom;
    private int x;
    private int y;

    public Joueur() {}

    public Joueur(String id, String nom) {
        this.id = id;
        this.nom = nom;
        this.x = 0;
        this.y = 0;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
}
