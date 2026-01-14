<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

## Prérequis
Pour démarrer l'application, vous devez avoir :
- Docker
- NodeJs
- NPM

## Installation et démarrage

### Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
### Démarrer l’API et la base de données
```
docker compose up -d
```
### Démarrer le frontend
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm install
```
Démarrer le projet
```
npm start
```
L’application est alors accessible à l’adresse :
```
http://localhost:4200
```
## Tests automatisés
Les tests automatisés sont réalisés avec **Cypress**.

### Lancer les tests
Mode interactif
```
npx cypress open
```
Mode headless
```
npx cypress run
```

### Structure des tests
Les tests sont organisés comme ceci :

api/ : tests d’API (orders, products, reviews)

functional/ : tests fonctionnels (connexion utilisateur)

smoke/ : smoke tests (chargement de la page d’accueil)

### Résultats des tests
Les résultats des tests sont visibles :

directement dans l’interface Cypress (mode open)
ou
dans la sortie console (mode run)

Les anomalies identifiées sont détaillées dans le **bilan de campagne de tests**.

## Technologies utilisées
- Cypress
- Docker
- Symfony (API)
- Angular (Frontend)
- MariaDB

