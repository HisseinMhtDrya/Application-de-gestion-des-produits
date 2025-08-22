const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let produits = [
  { id: 1, nom: "Ordinateur Portable", description: "16Go RAM, SSD 512Go", prix: 1200, categorie: "Informatique", stock: 10 },
  { id: 2, nom: "Smartphone", description: "Caméra 108MP", prix: 800, categorie: "Téléphonie", stock: 25 },
  { id: 3, nom: "Casque Audio", description: "Bluetooth, réduction de bruit", prix: 150, categorie: "Audio", stock: 40 },
  { id: 4, nom: "Clavier Mécanique", description: "RGB, switches rouges", prix: 90, categorie: "Informatique", stock: 15 },
  { id: 5, nom: "Souris Gamer", description: "16000 DPI, RGB", prix: 60, categorie: "Informatique", stock: 20 },
  { id: 6, nom: "Écran 27 pouces", description: "144Hz, Full HD", prix: 300, categorie: "Informatique", stock: 8 },
  { id: 7, nom: "Tablette Android", description: "10 pouces, 64Go", prix: 250, categorie: "Téléphonie", stock: 12 },
  { id: 8, nom: "Enceinte Bluetooth", description: "20W, étanche", prix: 75, categorie: "Audio", stock: 30 },
  { id: 9, nom: "Disque Dur Externe", description: "1To, USB 3.0", prix: 100, categorie: "Informatique", stock: 18 },
  { id: 10, nom: "Webcam HD", description: "1080p, micro intégré", prix: 50, categorie: "Informatique", stock: 22 }
];


// Récupérer tous les produits
app.get('/products', (req, res) => {
  res.json(produits);
});

// Ajouter un produit
app.post('/products', (req, res) => {
  const newProduit = { id: produits.length + 1, ...req.body };
  produits.push(newProduit);
  res.status(201).json(newProduit);
});

// Modifier un produit
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);                
  const index = produits.findIndex(p => p.id === id); 

  if (index !== -1) {                              
    produits[index] = { id, ...req.body };         
    res.json(produits[index]);                     
  } else {                                        
    res.status(404).json({ message: "Produit non trouvé" }); 
  }
});

// Supprimer un produit par ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  const produitExist = produits.find(p => p.id === id);

  if (!produitExist) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  produits = produits.filter(p => p.id !== id);
  res.status(200).json({ message: "Produit supprimé avec succès" });
});


app.listen(3000, () => {
  console.log('Backend démarré sur http://localhost:3000');
});
