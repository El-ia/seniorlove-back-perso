import "dotenv/config";
import express from "express";


const app = express();


app.get('/', (req, res) => {
    res.send('Coucou');
});


// Lancer un serveur
const PORT = process.env.PORT || 3000; // Valeur de rattrapage (fallback) si process.env.PORT === undefined, on lancera par défaut sur le port 3000
app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});