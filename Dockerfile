# Utilisation de l'image Node.js Alpine 18 comme base "dev"
FROM node:18-alpine as dev
# Définition de l'utilisateur actif à 'node' sans aucun accès root
RUN npm install -g nodemon
USER node
# Définition du répertoire de travail actif à /develop
WORKDIR /develop
# Expose le port 3000
EXPOSE 3000

# Utilisation de l'image Node.js Alpine 18 comme base "prod"
FROM node:18-alpine as prod
# Définition de l'utilisateur actif à 'node' (par sécurité)
USER node
 # Définition du répertoire de travail actif à /prod
WORKDIR /prod
# Copie le contenu du code Javascript du PC Local dans le conteneur (ignore les fichiers présent dans le .dockerignore)
COPY . .
# Installe les dépendances du projet avec la commande "clean install" 
# qui permet l'installation des packages sans mettre à jour le package-lock.json
RUN npm ci
# Définition de l'environnement Node.js en mode production
ENV NODE_ENV=production
# Expose le port 3000
EXPOSE 3000
# Commande par défaut pour exécuter l'application Node
CMD [ "node", "." ]