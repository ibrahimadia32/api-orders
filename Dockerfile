# Utiliser une image de base officielle de Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Compiler le TypeScript en JavaScript
RUN npm run build

# Exposer le port sur lequel l'application va écouter
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
