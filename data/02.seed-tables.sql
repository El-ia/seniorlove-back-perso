BEGIN;
-- Empty the content of the tables.
TRUNCATE TABLE "user_event", "user_label", "event", "label", "message", "role", "user" RESTART IDENTITY;

INSERT INTO "role" ("id", "name") VALUES
(1, 'Admin'),
(2, 'User');

INSERT INTO "user" ("id", "slug", "gender", "firstname", "email", "password", "description", "age", "height", "smoker", "marital", "pet", "city", "music", "picture", "zodiac", "gender_match", "role_id") VALUES
(1, 'jean', 'Homme', 'Jean', 'jean60@example.com', 'Retraité2023!', 'Passionné de jardinage et de cuisine.',  62, 175, false, 'Célibataire', true, 'PARIS', 'Jazz', NULL, 'Gémeaux', 'Femme', 2),
(2, 'marie', 'Femme', 'Marie', 'marie62@example.com', 'Passionnée$2024', 'Aime les randonnées en montagne.', 65, 160, true, 'Veuve', false, 'LYON', 'Classique', NULL, 'Taureau', 'Homme', 2),
(3, 'claude', 'Homme', 'Claude', 'claude65@example.com', 'Cl@ude1958!', 'Enthousiaste de photographie.', 67, 180, false, 'Divorcé', true, 'TOULOUSE', 'Rock', NULL, 'Balance', 'Femme', 2),
(4, 'francoise', 'Femme', 'Françoise', 'francoise66@example.com', 'F@mos2023!', 'Amateur de théâtre.', 68, 155, false, 'Célibataire', false, 'MARSEILLE', 'Pop', NULL, 'Scorpion', 'Homme', 2),
(5, 'pierre', 'Homme', 'Pierre', 'pierre60@example.com', 'Pierr3*1963', 'Passionné de cuisine italienne.', 60, 172, true, 'Séparé', true, 'PARIS', 'Blues', NULL, 'Poissons', 'Femme', 2),
(6, 'helene', 'Femme', 'Hélène', 'helene63@example.com', 'H@l3ne1970!', 'Amatrice de peinture et sculpture.', 64, 162, false, 'Célibataire', true, 'LYON', 'Électro', NULL, 'Cancer', 'Homme', 2),
(7, 'georges', 'Homme', 'Georges', 'georges61@example.com', 'G3orges*2023', 'Amateur de littérature française.', 70, 178, true, 'Veuf', false, 'TOULOUSE', 'Folk', NULL, 'Capricorne', 'Femme', 2),
(8, 'alice', 'Femme', 'Alice', 'alice64@example.com', 'Alic3!1964', 'Passionnée de danse classique.', 69, 157, false, 'Célibataire', true, 'MARSEILLE', 'R&B', NULL, 'Vierge', 'Homme', 2),
(9, 'alain', 'Homme', 'Alain', 'alain68@example.com', 'Al@in1968!', 'Passionné de voyages.', 66, 180, false, 'Séparé', false, 'PARIS', 'Reggae', NULL, 'Verseau', 'Femme', 2),
(10, 'brigitte', 'Femme', 'Brigitte', 'brigitte70@example.com', 'B1g!tte1960', 'Passionnée de jardinage.', 70, 165, false, 'Célibataire', true, 'LYON', 'Jazz', NULL, 'Lion', 'Homme', 2),
(11, 'rene', 'Homme', 'René', 'rene62@example.com', 'R3n3@2023!', 'Amateur de cuisine asiatique.', 62, 173, true, 'Célibataire', false, 'TOULOUSE', 'Classique', NULL, 'Sagittaire', 'Femme', 2),
(12, 'sophie', 'Femme', 'Sophie', 'sophie65@example.com', 'Sophi3#1965', 'Passionnée de photographie.', 65, 158, false, 'Veuve', true, 'MARSEILLE', 'Rock', NULL, 'Bélier', 'Homme', 2),
(13, 'jacques', 'Homme', 'Jacques', 'jacques63@example.com', 'J@cqU3s2024', 'Amateur de vin et gastronomie.', 64, 177, false, 'Veuf', false, 'PARIS', 'Blues', NULL, 'Poissons', 'Homme', 2),
(14, 'isabelle', 'Femme', 'Isabelle','isabelle66@example.com', 'Is@b3lle1966!', 'Passionnée par la lecture et l''écriture.', 67, 170, false, 'Séparé', true, 'LYON', 'Classique', NULL, 'Vierge', 'Homme', 2),
(15, 'michel', 'Homme', 'Michel', 'michel69@example.com', 'M1ch3l@1969', 'Amateur de pêche et de randonnées.', 71, 182, true, 'Célibataire', false, 'PARIS', 'Blues', NULL, 'Cancer', 'Femme', 2),
(16, 'chantal', 'Femme', 'Chantal', 'chantal70@example.com', 'Ch@ntal1970!', 'Passionnée de cuisine française.', 70, 168, false, 'Veuve', false, 'TOULOUSE', 'Pop', NULL, 'Lion', 'Homme', 2),
(17, 'philippe', 'Homme', 'Philippe', 'philippe65@example.com', 'Ph!l1pp3@2023', 'Amateur de vins et de voyages.', 68, 180, true, 'Divorcé', true, 'MARSEILLE', 'Rock', NULL, 'Verseau', 'Femme', 2),
(18, 'laurence', 'Femme', 'Laurence', 'laurence63@example.com', 'L@ur3nce1963', 'Passionnée d''opéra et de musique classique.', 69, 172, false, 'Divorcé', false, 'LYON', 'Classique', NULL, 'Scorpion', 'Homme', 2),
(19, 'daniel', 'Homme', 'Daniel', 'daniel64@example.com', 'D@ni3l2023!', 'Amateur de films classiques et d''histoire.', 66, 175, true, 'Célibataire', false, 'PARIS', 'Jazz', NULL, 'Sagittaire', 'Femme', 2),
(20, 'jaqueline', 'Femme', 'Jacqueline', 'jacqueline66@example.com', 'J@cqu3l!ne1966', 'Passionnée de cuisine et de jardinage.', 70, 163, false, 'Séparé', true, 'TOULOUSE', 'Folk', NULL, 'Taureau', 'Homme', 2);


INSERT INTO "label" ("id", "name") VALUES
(1, 'Nature'),
(2, 'Culturel'),
(3, 'Artistique'),
(4, 'Jeux de société'),
(5, 'soirée à thème');


INSERT INTO "event" ("id", "slug", "title", "description", "date", "time", "city", "street", "street_number", "zip_code", "label_id", "picture") 
VALUES
(1, 'balade-nature-en-foret', 'Balade Nature en Forêt', 'Une promenade guidée dans la forêt de Fontainebleau pour découvrir la faune et la flore locales.', '2025-05-15', '10:00', 'Paris', 'Rue des Écoles', 34, 75005, 1, 'image1.jpg'),
(2, 'soiree-theatre-classique', 'Soirée Théâtre Classique', 'Une soirée de théâtre avec une pièce classique de Molière.', '2025-06-22', '19:30', 'Paris', 'Rue du Faubourg Saint-Martin', 7, 75010, 2, 'image2.jpg'),
(3, 'atelier-peinture-acrylique', 'Atelier de Peinture Acrylique', 'Un atelier pour découvrir et pratiquer la peinture acrylique avec un artiste local.', '2025-07-30', '14:00', 'Paris', 'Avenue de l''Opéra', 15, 75001, 3, 'image3.jpg'),
(4, 'randonnee-parc-tete-d-or', 'Randonnée au Parc de la Tête d''Or', 'Une randonnée matinale dans le parc pour admirer la nature et les paysages.', '2025-05-18', '08:30', 'Lyon', 'Boulevard des Belges', 1, 69006, 1, 'image4.jpg'),
(5, 'concert-musique-classique', 'Concert de Musique Classique', 'Un concert avec l''orchestre philharmonique de Lyon, interprétant des œuvres de Beethoven.', '2025-06-05', '20:00', 'Lyon', 'Rue de la République', 4, 69002, 2, 'image5.jpg'),
(6, 'soiree-jeux-de-societe', 'Soirée Jeux de Société', 'Une soirée conviviale pour jouer à des jeux de société variés.', '2025-07-12', '18:00', 'Lyon', 'Rue des Marronniers', 25, 69002, 3, 'image6.jpg'),
(7, 'balade-nature-jardin-des-plantes', 'Balade Nature au Jardin des Plantes', 'Une promenade guidée pour découvrir les plantes et arbres du jardin botanique.', '2025-05-10', '09:00', 'Toulouse', 'Rue de la Pomme', 31, 31000, 1, 'image7.jpg'),
(8, 'exposition-art-contemporain', 'Exposition d''Art Contemporain', 'Une exposition présentant les œuvres d''artistes contemporains locaux.', '2025-06-17', '15:00', 'Toulouse', 'Rue du Taur', 20, 31000, 3, 'image8.jpg'),
(9, 'soiree-cinema-plein-air', 'Soirée Cinéma en Plein Air', 'Une soirée cinéma en plein air avec projection d''un film classique.', '2025-07-25', '21:00', 'Toulouse', 'Rue Gambetta', 45, 31000, 4, 'image9.jpg'),
(10, 'randonnee-parc-national-calanques', 'Randonnée au Parc National des Calanques', 'Une randonnée pour découvrir les magnifiques paysages du parc national.', '2025-05-20', '07:00', 'Marseille', 'Rue du Prado', 12, 13008, 1, 'image10.jpg'),
(11, 'atelier-sculpture-bois', 'Atelier de Sculpture sur Bois', 'Un atelier pratique pour apprendre les techniques de la sculpture sur bois.', '2025-06-03', '10:00', 'Marseille', 'Avenue du Prado', 18, 13006, 3, 'image11.jpg'),
(12, 'soiree-degustation-vins', 'Soirée Dégustation de Vins', 'Une soirée pour déguster des vins régionaux avec un sommelier expert.', '2025-07-28', '19:00', 'Marseille', 'Rue Sainte', 5, 13001, 2, 'image12.jpg');

COMMIT;




-- Update the ID sequences

BEGIN;

SELECT setval('role_id_seq', (SELECT MAX(id) from "role"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('label_id_seq', (SELECT MAX(id) from "label"));
SELECT setval('event_id_seq', (SELECT MAX(id) from "event"));
SELECT setval('message_id_seq', (SELECT MAX(id) from "message"));

COMMIT;