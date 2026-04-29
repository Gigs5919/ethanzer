# 👑 Ethan'Zer — Guide de démarrage

## 🎮 Mode démo (test rapide, 1 appareil)

Ouvre `index.html` directement dans ton navigateur et clique **"Mode démo"**.  
Tout fonctionne en local (localStorage), sans réseau. Idéal pour tester l'app.

---

## 🌐 Mode multijoueur (EVG réel — plusieurs téléphones)

### Étape 1 — Créer un projet Firebase (gratuit)

1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. **Add project** → donne un nom (ex: `ethanzer-evg`)
3. Désactive Google Analytics (optionnel) → **Create project**

### Étape 2 — Activer Realtime Database

1. Menu gauche → **Build** → **Realtime Database**
2. **Create Database** → choisir une région → **Next**
3. Sélectionne **Start in test mode** → **Enable**
4. Note l'URL affichée : `https://ethanzer-evg-default-rtdb.firebaseio.com`

### Étape 3 — Récupérer les clés

1. Roue dentée → **Project settings** → onglet **General**
2. Scroll bas → **Your apps** → **Add app** → icône `</>` (Web)
3. Registre l'app (nom libre) → copie ton **apiKey** et **databaseURL**

### Étape 4 — Configurer les règles Firebase (sécurité)

Dans **Realtime Database** → onglet **Rules**, remplace par :

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "parties": {
      ".indexOn": ["code"]
    }
  }
}
```

Clique **Publish**.

### Étape 5 — Lancer le serveur local

Dans le dossier `Ethan'Zer`, ouvre un Terminal et lance :

```bash
python3 -m http.server 8080
```

Trouve ton IP locale :

```bash
ipconfig getifaddr en0    # Mac Wi-Fi
# ou
ifconfig | grep "inet "
```

### Étape 6 — Connecter tous les téléphones

1. Assure-toi que tous les téléphones sont sur le **même Wi-Fi**
2. Ouvre `http://[TON-IP]:8080` sur chaque téléphone (ex: `http://192.168.1.42:8080`)
3. Au premier lancement, entre ton **API Key** et ton **Database URL** Firebase
4. C'est parti ! 🎉

---

## 🎯 Comment jouer

### Créateur de la partie (Gold Ourson / Ethan'Zer)
1. **Créer une partie** → remplis le formulaire → notes le code généré
2. Partage le code avec tes compagnons
3. Attends que tout le monde soit connecté
4. La quête démarre automatiquement quand le nombre de joueurs attendus est atteint

### Rejoindre la partie (Oursons)
1. **Rejoindre une partie** → entre le code reçu → ton blaze → ton rôle
2. Rejoins une existante ou entre le code manuellement

### Déroulement
- Onglet **Histoire** : lis les diapositives en swipant
- Onglet **Défi** : vote sur le défi en cours
- Onglet **Boosters** : consulte l'historique des résultats

### Règle des votes
- Seuls les **Oursons** votent (pas le Gold Ourson)
- Seuil : **80 % des Oursons** doivent valider (arrondi au supérieur)
- Ex : 7 Oursons → 6 votes favorables minimum requis
- Un vote est **définitif** — impossible de le modifier

---

## 📁 Structure des fichiers

```
Ethan'Zer/
├── index.html      ← Point d'entrée de l'application
├── styles.css      ← Design system complet
├── app.js          ← Logique complète de l'application
└── README.md       ← Ce guide
```

---

## ✏️ Personnaliser l'histoire et les défis

Ouvre `app.js` et modifie les tableaux en haut du fichier :

```javascript
const STORY_SLIDES = [...];     // Diapositives de l'histoire (emojis, chapitres, texte)
const DEFAULT_CHALLENGES = [...]; // Défis (emoji, titre, description, maxBoosters)
```

---

*Conçu pour l'EVG d'Ethan'Zer — Que la quête commence ! 👑*
