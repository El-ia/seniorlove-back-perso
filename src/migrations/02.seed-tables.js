import 'dotenv/config';
import { sequelize } from '../models/client.js';
import { User, Event, Role, Label, Message } from '../models/associations.js';

console.log("🔄 Seeding started...");

// Création des Labels
const labels = await Label.bulkCreate([
  { name: 'Nature' },
  { name: 'Culturel' },
  { name: 'Artistique' },
  { name: 'Jeux de société' },
  { name: 'Soirée à thème' }
]);

// Création des Rôles
const roles = await Role.bulkCreate([
  { name: 'Admin' },
  { name: 'User' },
]);

// Création des Utilisateurs en batch
const users = await User.bulkCreate([
    { gender: 'Homme', firstname: 'Jean', email: 'jean60@example.com', password: 'Retraité2023!', city: 'PARIS', smoker: false, pet: true, description: 'Passionné de jardinage et de cuisine.', height: 175, age: 62, music: 'Jazz', zodiac: 'Gémeaux', gender_match: 'Femme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Femme', firstname: 'Marie', email: 'marie62@example.com', password: 'Passionnée$2024', city: 'LYON', smoker: true, pet: false, description: 'Aime les randonnées en montagne.', height: 160, age: 65, music: 'Classique', zodiac: 'Taureau', gender_match: 'Homme', marital: 'Veuve', role_id: 2 },
    { gender: 'Homme', firstname: 'Claude', email: 'claude65@example.com', password: 'Cl@ude1958!', city: 'TOULOUSE', smoker: false, pet: true, description: 'Enthousiaste de photographie.', height: 180, age: 67, music: 'Rock', zodiac: 'Balance', gender_match: 'Femme', marital: 'Divorcé', role_id: 2 },
    { gender: 'Femme', firstname: 'Françoise', email: 'francoise66@example.com', password: 'F@mos2023!', city: 'MARSEILLE', smoker: false, pet: false, description: 'Amateur de théâtre.', height: 155, age: 68, music: 'Pop', zodiac: 'Scorpion', gender_match: 'Homme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Homme', firstname: 'Pierre', email: 'pierre60@example.com', password: 'Pierr3*1963', city: 'PARIS', smoker: true, pet: true, description: 'Passionné de cuisine italienne.', height: 172, age: 60, music: 'Blues', zodiac: 'Poissons', gender_match: 'Femme', marital: 'Séparé', role_id: 2 },
    { gender: 'Femme', firstname: 'Hélène', email: 'helene63@example.com', password: 'H@l3ne1970!', city: 'LYON', smoker: false, pet: true, description: 'Amatrice de peinture et sculpture.', height: 162, age: 64, music: 'Électro', zodiac: 'Cancer', gender_match: 'Homme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Homme', firstname: 'Georges', email: 'georges61@example.com', password: 'G3orges*2023', city: 'TOULOUSE', smoker: true, pet: false, description: 'Amateur de littérature française.', height: 178, age: 70, music: 'Folk', zodiac: 'Capricorne', gender_match: 'Femme', marital: 'Veuf', role_id: 2 },
    { gender: 'Femme', firstname: 'Alice', email: 'alice64@example.com', password: 'Alic3!1964', city: 'MARSEILLE', smoker: false, pet: true, description: 'Passionnée de danse classique.', height: 157, age: 69, music: 'R&B', zodiac: 'Vierge', gender_match: 'Homme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Homme', firstname: 'Alain', email: 'alain68@example.com', password: 'Al@in1968!', city: 'PARIS', smoker: false, pet: false, description: 'Passionné de voyages.', height: 180, age: 66, music: 'Reggae', zodiac: 'Verseau', gender_match: 'Femme', marital: 'Séparé', role_id: 2 },
    { gender: 'Femme', firstname: 'Brigitte', email: 'brigitte70@example.com', password: 'B1g!tte1960', city: 'LYON', smoker: false, pet: true, description: 'Passionnée de jardinage.', height: 165, age: 70, music: 'Jazz', zodiac: 'Lion', gender_match: 'Homme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Homme', firstname: 'René', email: 'rene62@example.com', password: 'R3n3@2023!', city: 'TOULOUSE', smoker: true, pet: false, description: 'Amateur de cuisine asiatique.', height: 173, age: 62, music: 'Classique', zodiac: 'Sagittaire', gender_match: 'Femme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Femme', firstname: 'Sophie', email: 'sophie65@example.com', password: 'Sophi3#1965', city: 'MARSEILLE', smoker: false, pet: true, description: 'Passionnée de photographie.', height: 158, age: 65, music: 'Rock', zodiac: 'Bélier', gender_match: 'Homme', marital: 'Veuve', role_id: 2 },
    { gender: 'Homme', firstname: 'Jacques', email: 'jacques63@example.com', password: 'J@cqU3s2024', city: 'PARIS', smoker: false, pet: false, description: 'Amateur de vin et gastronomie.', height: 177, age: 64, music: 'Blues', zodiac: 'Poissons', gender_match: 'Homme', marital: 'Veuf', role_id: 2 },
    { gender: 'Femme', firstname: 'Isabelle', email: 'isabelle66@example.com', password: 'Is@b3lle1966!', city: 'LYON', smoker: false, pet: true, description: 'Passionnée par la lecture et l\'écriture.', height: 170, age: 67, music: 'Classique', zodiac: 'Vierge', gender_match: 'Homme', marital: 'Séparé', role_id: 2 },
    { gender: 'Homme', firstname: 'Michel', email: 'michel69@example.com', password: 'M1ch3l@1969', city: 'PARIS', smoker: true, pet: false, description: 'Amateur de pêche et de randonnées.', height: 182, age: 71, music: 'Blues', zodiac: 'Cancer', gender_match: 'Femme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Femme', firstname: 'Chantal', email: 'chantal70@example.com', password: 'Ch@ntal1970!', city: 'TOULOUSE', smoker: false, pet: false, description: 'Passionnée de cuisine française.', height: 168, age: 70, music: 'Pop', zodiac: 'Lion', gender_match: 'Homme', marital: 'Veuve', role_id: 2 },
    { gender: 'Homme', firstname: 'Philippe', email: 'philippe65@example.com', password: 'Ph!l1pp3@2023', city: 'MARSEILLE', smoker: true, pet: true, description: 'Amateur de vins et de voyages.', height: 180, age: 68, music: 'Rock', zodiac: 'Verseau', gender_match: 'Femme', marital: 'Divorcé', role_id: 2 },
    { gender: 'Femme', firstname: 'Laurence', email: 'laurence63@example.com', password: 'L@ur3nce1963', city: 'LYON', smoker: false, pet: false, description: 'Passionnée d\'opéra et de musique classique.', height: 172, age: 69, music: 'Classique', zodiac: 'Scorpion', gender_match: 'Homme', marital: 'Divorcé', role_id: 2 },
    { gender: 'Homme', firstname: 'Daniel', email: 'daniel64@example.com', password: 'D@ni3l2023!', city: 'PARIS', smoker: true, pet: false, description: 'Amateur de films classiques et d\'histoire.', height: 175, age: 66, music: 'Jazz', zodiac: 'Sagittaire', gender_match: 'Femme', marital: 'Célibataire', role_id: 2 },
    { gender: 'Femme', firstname: 'Jacqueline', email: 'jacqueline66@example.com', password: 'J@cqu3l!ne1966', city: 'TOULOUSE', smoker: false, pet: true, description: 'Passionnée de cuisine et de jardinage.', height: 163, age: 70, music: 'Folk', zodiac: 'Taureau', gender_match: 'Homme', marital: 'Séparé', role_id: 2 }
  ]);
  
 

// Création des Événements en batch
await Event.bulkCreate([
    { title: 'Balade Nature en Forêt', description: 'Une promenade guidée dans la forêt de Fontainebleau pour découvrir la faune et la flore locales.', date: '2025-05-15', time: '10:00', city: 'Paris', street: 'Rue des Écoles', street_number: 34, zip_code: 75005, picture: 'image1.jpg', label_id: 1 },
    { title: 'Soirée Théâtre Classique', description: 'Une soirée de théâtre avec une pièce classique de Molière.', date: '2025-06-22', time: '19:30', city: 'Paris', street: 'Rue du Faubourg Saint-Martin', street_number: 7, zip_code: 75010, picture: 'image2.jpg', label_id: 2 },
    { title: 'Atelier de Peinture Acrylique', description: 'Un atelier pour découvrir et pratiquer la peinture acrylique avec un artiste local.', date: '2025-07-30', time: '14:00', city: 'Paris', street: 'Avenue de l\'Opéra', street_number: 15, zip_code: 75001, picture: 'image3.jpg', label_id: 3 },
    { title: 'Randonnée au Parc de la Tête d\'Or', description: 'Une randonnée matinale dans le parc pour admirer la nature et les paysages.', date: '2025-05-18', time: '08:30', city: 'Lyon', street: 'Boulevard des Belges', street_number: 1, zip_code: 69006, picture: 'image4.jpg', label_id: 1 },
    { title: 'Concert de Musique Classique', description: 'Un concert avec l\'orchestre philharmonique de Lyon, interprétant des œuvres de Beethoven.', date: '2025-06-05', time: '20:00', city: 'Lyon', street: 'Rue de la République', street_number: 4, zip_code: 69002, picture: 'image5.jpg', label_id: 2 },
    { title: 'Soirée Jeux de Société', description: 'Une soirée conviviale pour jouer à des jeux de société variés.', date: '2025-07-12', time: '18:00', city: 'Lyon', street: 'Rue des Marronniers', street_number: 25, zip_code: 69002, picture: 'image6.jpg', label_id: 3 },
    { title: 'Balade Nature au Jardin des Plantes', description: 'Une promenade guidée pour découvrir les plantes et arbres du jardin botanique.', date: '2025-05-10', time: '09:00', city: 'Toulouse', street: 'Rue de la Pomme', street_number: 31, zip_code: 31000, picture: 'image7.jpg', label_id: 1 },
    { title: 'Exposition d\'Art Contemporain', description: 'Une exposition présentant les œuvres d\'artistes contemporains locaux.', date: '2025-06-17', time: '15:00', city: 'Toulouse', street: 'Rue du Taur', street_number: 20, zip_code: 31000, picture: 'image8.jpg', label_id: 3 },
    { title: 'Soirée Cinéma en Plein Air', description: 'Une soirée cinéma en plein air avec projection d\'un film classique.', date: '2025-07-25', time: '21:00', city: 'Toulouse', street: 'Rue Gambetta', street_number: 45, zip_code: 31000, picture: 'image9.jpg', label_id: 4 },
    { title: 'Randonnée au Parc National des Calanques', description: 'Une randonnée pour découvrir les magnifiques paysages du parc national.', date: '2025-05-20', time: '07:00', city: 'Marseille', street: 'Rue du Prado', street_number: 12, zip_code: 13008, picture: 'image10.jpg', label_id: 1 },
    { title: 'Atelier de Sculpture sur Bois', description: 'Un atelier pratique pour apprendre les techniques de la sculpture sur bois.', date: '2025-06-03', time: '10:00', city: 'Marseille', street: 'Avenue du Prado', street_number: 18, zip_code: 13006, picture: 'image11.jpg', label_id: 3 },
    { title: 'Soirée Dégustation de Vins', description: 'Une soirée pour déguster des vins régionaux avec un sommelier expert.', date: '2025-07-28', time: '19:00', city: 'Marseille', street: 'Rue Sainte', street_number: 5, zip_code: 13001, picture: 'image12.jpg', label_id: 2 }
  ]);
  
console.log("✅ Seed done with success !");
console.log("🧹 Clean up by closing database connection");
await sequelize.close();
