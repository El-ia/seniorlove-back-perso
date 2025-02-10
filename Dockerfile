
FROM node:lts


WORKDIR /app

# copy prend 2 arguments, premier : le/les fichiers locaux à copier, deuxieme : ou je le copie
COPY  ./package.json ./package-lock.json ./

# installer les dépendances du projet via le package.json
RUN npm install

# je copie le reste des fichiers
# ! JE sépare l'import du package.json et du reste des fichiers pour préserver la couche npm install en cas de changement mineur de code (GAIN DE TEMPS ENORME AU BUILD)
COPY . .

# spécifie sur quel port l'application va tourner dans le container, c'est purement indicatif
EXPOSE 3000

# les commandes qui seront lancés au démarrage du container
CMD ["npm","start"]