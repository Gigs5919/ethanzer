/* ================================================================
   ETHAN'ZER — La Quête du Héros · app.js
   SPA complète · Firebase Realtime DB + mode Démo (localStorage)
   ================================================================ */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     VERSION — incrémenter à chaque mise à jour de contenu
     pour vérifier rapidement quelle version tourne sur chaque
     appareil (s'affiche en bas de l'écran d'accueil et dans
     le panneau joueurs en partie).
  ────────────────────────────────────────────── */
  const APP_VERSION = 'v10 · 24 boosters';

  /* ──────────────────────────────────────────────
     CONTENU — Histoire & Défis (personnalisables)
  ────────────────────────────────────────────── */
  const ETHAN_POSES = ['charismatique','serieux','face','salut','mouvement','etone','cote','dos'];
  const EMILIA_POSES = ['charismatique','pensive','seduction','salut','etone','colere','mouvement','cote','dos'];

  const STORY_SLIDES = [
    {
      chapter: 'Slide 1',
      emoji: '🌀',
      portrait: 'serieux',
      title: 'Invocation',
      text: 'Ethan\'Zer pensait vivre une journée normale.\n\nUn instant banal, un bruit de klaxon… puis plus rien.\n\nÀ son réveil, le décor a changé : un monde étrange, où tout semble possible… et dangereux.\n\nUne voix murmure qu\'il a été choisi.\n\nMais pour quoi… et à quel prix ?',
    },
    {
      chapter: 'Slide 2',
      emoji: '🐺',
      portrait: 'etone',
      title: 'Les souvenirs brisés',
      text: 'L\'arrivée d\'Ethan\'Zer n\'était pas sans conséquence.\n\nSon invocation a perturbé l\'équilibre du monde.\n\nUne anomalie s\'est formée… et Emilia en a payé le prix.\n\nSes souvenirs ont été effacés.\n\nComme si leur lien n\'avait jamais existé.',
    },
    {
      chapter: 'Slide 3',
      emoji: '💍',
      portrait: 'face',
      title: 'La prophétie du 22 Août',
      text: 'Une ancienne prophétie mentionne une date précise : le 22 août 2026.\n\nCe jour-là, deux destins doivent s\'unir.\n\nUn lien fort, presque indestructible.\n\nMais sans ses souvenirs, Emilia ne pourra jamais accepter Ethan\'Zer.\n\nEt il sera renvoyé d\'où il vient… seul.',
    },
    {
      chapter: 'Slide 4',
      emoji: '✨',
      portrait: 'charismatique',
      title: 'Les fragments de mémoire',
      text: 'La prophétie ne se limite pas à unir deux destins.\n\nElle évoque aussi 24 fragments dispersés à travers le monde.\n\nDes "boosters", porteurs des souvenirs d\'Emilia.\n\nEn les ouvrant, ses souvenirs seront libérés…\n\nEt sa mémoire peu à peu restaurée.',
    },
    {
      chapter: 'Slide 5',
      emoji: '⚔️',
      portrait: 'mouvement',
      title: 'Les épreuves du destin',
      text: 'Les boosters ne se trouvent pas… ils se méritent.\n\nChacun d\'eux est lié à une épreuve.\n\nUn test de courage, d\'esprit ou de détermination.\n\nRien ne sera donné. Tout devra être gagné.\n\nUn chemin semé d\'obstacles et de décisions.',
    },
    {
      chapter: 'Slide 6',
      emoji: '🐻',
      portrait: 'salut',
      title: 'Le clan répond présent',
      text: 'Mais Ethan\'Zer n\'est pas seul.\n\nÀ ses côtés se tiennent les Oursons.\n\nAlliés fidèles, ils l\'accompagneront dans chaque épreuve.\n\nCe sont eux qui jugeront et valideront chaque victoire.\n\nCar seul, il échouerait… mais unis, ils ont une chance.',
    },
    {
      chapter: 'Slide 7',
      emoji: '🔥',
      portrait: 'cote',
      title: 'La motivation avant tout',
      text: 'Le chemin sera difficile.\n\nLes épreuves mettront la détermination d\'Ethan\'Zer à rude épreuve.\n\nMais abandonner n\'est pas une option.\n\nChaque pas le rapprochera d\'Emilia…\n\nEt de l\'union qui l\'attend.',
    },
    {
      chapter: 'Slide 8',
      emoji: '🌲',
      portrait: 'dos',
      title: 'Le début des épreuves',
      text: 'Le clan est prêt. L\'alliance se met en route…\n\nPlus rien ne peut les arrêter.\n\nEthan\'Zer… tout repose sur toi.\n\nNe sois pas le facteur limitant.\n\nSeras-tu à la hauteur ?',
    },
  ];

  const DEFAULT_CHALLENGES = [
    {
      index: 0,
      kind: 'defi',
      emoji: '🍷',
      title: 'Le Rituel des Cépages',
      description: 'Pour commencer, Ethan\'Zer et son clan vont profiter d\'un moment pour se détendre avant d\'entrer dans l\'aventure. Son défi : déguster à l\'aveugle les vins de Mathieu et reconnaître les cépages cachés dans chaque verre. Le Clan des Oursons validera ses réponses.',
      descriptionGold: 'Pour commencer, ton Clan et toi allez profiter d\'un moment pour vous détendre avant d\'entrer dans l\'aventure. Ton défi, Ethan\'Zer : déguster à l\'aveugle les vins de Mathieu et reconnaître les cépages cachés dans chaque verre. Le Clan des Oursons validera tes réponses.',
      maxBoosters: 2,
    },
    {
      index: 1,
      kind: 'defi',
      emoji: '🎮',
      title: 'L\'Entraînement du Combattant',
      description: 'Manger et boire, c\'est une chose. Mais pour affronter les Wolgarms, Ethan\'Zer doit aussi s\'entraîner au combat. Son défi : remporter deux parties de Mario Smash Bros en mode mêlée face à ses compagnons. Le Clan des Oursons jugera sa stratégie, ses réflexes et sa capacité à garder son sang-froid dans la mêlée.',
      descriptionGold: 'Manger et boire, c\'est une chose. Mais pour affronter les Wolgarms, tu dois aussi t\'entraîner au combat. Ton défi, Ethan\'Zer : remporter deux parties de Mario Smash Bros en mode mêlée face à tes compagnons. Le Clan des Oursons jugera ta stratégie, tes réflexes et ta capacité à garder ton sang-froid dans la mêlée.',
      maxBoosters: 2,
    },
    {
      index: 2,
      kind: 'defi',
      emoji: '🍱',
      title: 'Le Ravitaillement du Clan',
      description: 'Avant le départ, Ethan\'Zer doit s\'assurer que son clan a assez d\'énergie pour l\'accompagner jusqu\'au bout. Son défi : aller chercher le déjeuner pour nourrir le Clan des Oursons. Le Clan jugera sa rapidité, son organisation et sa capacité à revenir avec de quoi satisfaire tout le monde.',
      descriptionGold: 'Avant le départ, tu dois t\'assurer que ton Clan a assez d\'énergie pour t\'accompagner jusqu\'au bout. Ton défi, Ethan\'Zer : aller chercher le déjeuner pour nourrir le Clan des Oursons. Le Clan jugera ta rapidité, ton organisation et ta capacité à revenir avec de quoi satisfaire tout le monde.',
      maxBoosters: 3,
    },
    {
      index: 3,
      kind: 'activite',
      emoji: '🌲',
      title: 'Les Portes de la Forêt',
      description: 'Avant d\'entrer dans la forêt avoisinante, Ethan\'Zer doit franchir un passage semé d\'obstacles. Il devra avancer avec courage, garder son sang-froid et surmonter les obstacles qui se dresseront devant lui. Le Clan des Oursons jugera sa détermination et sa capacité à ne pas reculer devant l\'inconnu.',
      descriptionGold: 'Avant d\'entrer dans la forêt avoisinante, tu dois franchir un passage semé d\'obstacles. Tu devras avancer avec courage, garder ton sang-froid et surmonter les obstacles qui se dresseront devant toi. Le Clan des Oursons jugera ta détermination et ta capacité à ne pas reculer devant l\'inconnu.',
      maxBoosters: 4,
    },
    {
      index: 4,
      kind: 'defi',
      emoji: '🧠',
      title: 'L\'Épreuve du Savoir',
      description: 'Ethan\'Zer a prouvé son agilité lors de l\'épreuve précédente. Mais un héros ne survit pas seulement avec ses réflexes. Son défi : répondre en 2 minutes au plus grand nombre de questions possible. Chaque bonne réponse lui permettra de gagner des boosters. Le Clan des Oursons jugera sa mémoire et sa capacité à rester concentré sous pression.',
      descriptionGold: 'Tu as prouvé ton agilité lors de l\'épreuve précédente. Mais un héros ne survit pas seulement avec ses réflexes. Ton défi, Ethan\'Zer : répondre en 2 minutes au plus grand nombre de questions possible. Chaque bonne réponse te permettra de gagner des boosters. Le Clan des Oursons jugera ta mémoire et ta capacité à rester concentré sous pression.',
      maxBoosters: 2,
    },
    {
      index: 5,
      kind: 'activite',
      emoji: '🐺',
      title: 'Les Hordes de Wolgarms',
      description: 'Ethan\'Zer et son clan sont maintenant entrés dans la forêt. Au loin, une menace approche. Les Wolgarms arrivent. Son défi : plonger dans un monde virtuel et survivre aux hordes ennemies. Le Clan des Oursons jugera ses techniques de combat.',
      descriptionGold: 'Ton Clan et toi êtes maintenant entrés dans la forêt. Au loin, une menace approche. Les Wolgarms arrivent. Ton défi, Ethan\'Zer : plonger dans un monde virtuel et survivre aux hordes ennemies. Le Clan des Oursons jugera tes techniques de combat.',
      maxBoosters: 4,
    },
    {
      index: 6,
      kind: 'defi',
      emoji: '🎤',
      title: 'Le Chant du Clan',
      description: 'Ethan\'Zer et le Clan des Oursons ont réussi à arracher des informations aux Wolgarms. Grâce aux indices récoltés, ils savent enfin où Emilia est retenue. Avant d\'aller la retrouver, Ethan\'Zer doit redonner de la force à son clan après ce périlleux combat. Son défi : chanter une chanson imposée par ses compagnons, à voix haute et avec conviction. Le Clan des Oursons jugera son énergie et sa capacité à motiver les troupes avant l\'ultime étape.',
      descriptionGold: 'Toi et le Clan des Oursons avez réussi à arracher des informations aux Wolgarms. Grâce aux indices récoltés, vous savez enfin où Emilia est retenue. Avant d\'aller la retrouver, tu dois redonner de la force à ton Clan après ce périlleux combat. Ton défi, Ethan\'Zer : chanter une chanson imposée par tes compagnons, à voix haute et avec conviction. Le Clan des Oursons jugera ton énergie et ta capacité à motiver les troupes avant l\'ultime étape.',
      maxBoosters: 3,
    },
    {
      index: 7,
      kind: 'defi',
      emoji: '🤝',
      title: 'Le Serment du Clan',
      description: 'Ethan\'Zer et le Clan des Oursons ont retrouvé Emilia. Elle est là, prisonnière, mais une dernière barrière bloque encore sa libération. Pour l\'ouvrir, Ethan\'Zer doit prouver qu\'il connaît vraiment ceux qui l\'ont accompagné jusqu\'ici. Son défi : citer précisément le métier de chaque membre de son clan. Les Oursons jugeront sa mémoire, sa précision et sa capacité à honorer chacun de ses compagnons avant de libérer Emilia.',
      descriptionGold: 'Toi et le Clan des Oursons avez retrouvé Emilia. Elle est là, prisonnière, mais une dernière barrière bloque encore sa libération. Pour l\'ouvrir, tu dois prouver que tu connais vraiment ceux qui t\'ont accompagné jusqu\'ici. Ton défi, Ethan\'Zer : citer précisément le métier de chaque membre de ton Clan. Les Oursons jugeront ta mémoire, ta précision et ta capacité à honorer chacun de tes compagnons avant de libérer Emilia.',
      maxBoosters: 4,
    },
  ];
  // Total : 2 + 2 + 3 + 4 + 2 + 4 + 3 + 4 = 24 boosters max
  // (8 étapes notées : 6 défis + 2 activités. Portes de la forêt, Hordes de
  // Wolgarms et Serment du Clan = 4 boosters chacun, valeur la plus élevée.)

  /* ──────────────────────────────────────────────
     CONTENU — Conversation Emilia (déverrouillée à 24 boosters)
  ────────────────────────────────────────────── */
  const EMILIA_SLIDES = [
    {
      chapter: 'Delivrance',
      emoji: '✨',
      portrait: 'salut',
      title: 'La lumire revient',
      text: 'Ethanzer… Quand je te regarde… mon cœur s\'accélère. Je ne comprends pas… mais j\'ai l\'impression de t\'avoir perdu… Et de te retrouver… en même temps. Pourquoi est-ce que ça me fait autant d\'effet ?',
    },
    {
      chapter: 'Emilia',
      emoji: '💛',
      portrait: 'charismatique',
      title: 'Enfin réunis',
      text: 'Je… je commence à comprendre… Ce vide que je ressentais… ce n\'était pas normal. J\'avais perdu une partie de moi… Et cette partie… te concernait. Ethanzer… tu m\'as aidée à la retrouver.',
    },
    {
      chapter: 'Emilia',
      emoji: '🥲',
      portrait: 'pensive',
      title: 'Merci !!!',
      text: 'Maintenant je me souviens. Tout ce que tu as fait… tout ce que tu as traversé… pour moi. Tu ne m\'as jamais abandonnée… Merci… d\'être resté à mes côtés.',
    },
    {
      chapter: 'La prophétie',
      emoji: '💍',
      portrait: 'seduction',
      title: 'Le 22 Août',
      text: 'Ethanzer… Ce n\'est pas seulement la prophétie… C\'est ce que je ressens. Même sans mes souvenirs… mon cœur te reconnaissait déjà. Alors aujourd\'hui… je te choisis.',
    },
    {
      chapter: 'Pour Toujours',
      emoji: '👑',
      portrait: 'mouvement',
      title: 'à tes côtés',
      text: 'Grâce à toi, j\'ai retrouvé mes souvenirs. Mais grâce aux Oursons… tout a été possible. Et je n\'y serais jamais arrivée sans vous tous. À ce stade… je me demande si je ne suis pas un peu mariée à vous aussi. Merci, vraiment.',
    },
  ];

  /* ──────────────────────────────────────────────
     MIGRATION — Patch metadata des défis sur parties existantes
     Préserve l'état runtime (status, votes, boostersEarned, etc.) et
     met à jour la metadata (titre, description, emoji, kind, maxBoosters)
     depuis DEFAULT_CHALLENGES. Permet aux parties créées avant une mise
     à jour de contenu de refléter le nouveau texte/score sans perte d'état.
  ────────────────────────────────────────────── */
  function migrateChallengesMetadata() {
    if (!App.challenges || typeof App.challenges !== 'object') {
      App.challenges = {};
      return false;
    }
    let changed = false;
    DEFAULT_CHALLENGES.forEach((def, i) => {
      const cur = App.challenges[i];
      if (!cur) {
        App.challenges[i] = {
          ...def,
          status: i === 0 ? 'active' : 'locked',
          validationPercent: 0,
          boostersEarned: 0,
          voteResetCount: 0,
        };
        changed = true;
        return;
      }
      // Détecte une divergence avec DEFAULT_CHALLENGES → metadata obsolète
      if (cur.title !== def.title || cur.description !== def.description ||
          cur.emoji !== def.emoji || cur.kind !== def.kind ||
          cur.maxBoosters !== def.maxBoosters) {
        changed = true;
      }
      // Détecte aussi les divergences sur descriptionGold
      if (cur.descriptionGold !== def.descriptionGold) changed = true;
      App.challenges[i] = {
        ...cur,
        index: def.index,
        kind: def.kind,
        emoji: def.emoji,
        title: def.title,
        description: def.description,
        descriptionGold: def.descriptionGold,
        maxBoosters: def.maxBoosters,
      };
    });
    return changed;
  }

  /* Le Gold Ourson écrit la migration dans le backend pour que les autres
     clients (téléphones avec ancien cache, etc.) reçoivent la metadata à
     jour via le listener `value` Firebase. */
  function persistMigrationIfHost() {
    if (!App.player || App.player.role !== 'gold_ourson') return;
    if (!App.party || !App.party.id) return;
    const updates = {};
    DEFAULT_CHALLENGES.forEach((def, i) => {
      updates[`challenges/${i}/index`] = def.index;
      updates[`challenges/${i}/kind`] = def.kind;
      updates[`challenges/${i}/emoji`] = def.emoji;
      updates[`challenges/${i}/title`] = def.title;
      updates[`challenges/${i}/description`] = def.description;
      updates[`challenges/${i}/descriptionGold`] = def.descriptionGold;
      updates[`challenges/${i}/maxBoosters`] = def.maxBoosters;
    });
    try {
      if (isDemo()) {
        const all = demoParties();
        const p = all[App.party.id];
        if (!p) return;
        DEFAULT_CHALLENGES.forEach((def, i) => {
          if (!p.challenges) p.challenges = {};
          if (!p.challenges[i]) {
            p.challenges[i] = { ...def, status: i === 0 ? 'active' : 'locked', validationPercent: 0, boostersEarned: 0, voteResetCount: 0 };
          } else {
            p.challenges[i] = {
              ...p.challenges[i],
              index: def.index, kind: def.kind, emoji: def.emoji,
              title: def.title, description: def.description, descriptionGold: def.descriptionGold, maxBoosters: def.maxBoosters,
            };
          }
        });
        all[App.party.id] = p;
        saveDemoParties(all);
      } else if (window.firebase && firebase.database) {
        dbRef(`parties/${App.party.id}`).update(updates).catch(e => console.error('[migration]', e));
      }
    } catch (e) { console.error('[persistMigration]', e); }
  }

  /* ──────────────────────────────────────────────
     HELPERS — Quête (boosters totaux, déverrouillage Emilia)
  ────────────────────────────────────────────── */
  function getTotalBoostersEarned() {
    return Object.values(App.challenges).reduce((s, c) => s + (c.boostersEarned || 0), 0);
  }
  function getMaxBoosters() {
    // Lit les maxBoosters effectivement stockés dans la partie en cours.
    // Fallback sur DEFAULT_CHALLENGES si la partie n'est pas encore chargée.
    const stored = Object.values(App.challenges);
    if (stored.length === DEFAULT_CHALLENGES.length) {
      return stored.reduce((s, c) => s + (c.maxBoosters || 0), 0);
    }
    return DEFAULT_CHALLENGES.reduce((s, c) => s + c.maxBoosters, 0);
  }
  function allChallengesDone() {
    const list = Object.values(App.challenges);
    if (list.length < DEFAULT_CHALLENGES.length) return false;
    return list.every(c => c.status === 'validated' || c.status === 'forfeit');
  }
  function isEmiliaUnlocked() {
    return allChallengesDone() && getTotalBoostersEarned() >= getMaxBoosters();
  }

  // Renvoie l'étiquette type+numéro pour un défi/activité (ex: "Défi 4 / 6", "Activité 1 / 2")
  function challengeLabel(ch) {
    const kind = ch.kind || 'defi';
    const sameKind = Object.values(App.challenges)
      .filter(c => (c.kind || 'defi') === kind)
      .sort((a, b) => a.index - b.index);
    const n = sameKind.findIndex(c => c.index === ch.index) + 1;
    const total = sameKind.length || (kind === 'defi'
      ? DEFAULT_CHALLENGES.filter(c => (c.kind || 'defi') === 'defi').length
      : DEFAULT_CHALLENGES.filter(c => c.kind === 'activite').length);
    const word = kind === 'activite' ? 'Activité' : 'Défi';
    return `${word} ${n} / ${total}`;
  }

  // Choisit la description adressée au Gold Ourson (2e personne) ou la
  // version standard à la 3e personne pour les Oursons votants.
  function getDescription(ch) {
    if (App.player?.role === 'gold_ourson' && ch.descriptionGold) {
      return ch.descriptionGold;
    }
    return ch.description || '';
  }

  // Petit badge sobre devant le titre — gold pour défi, indigo discret pour activité
  function kindBadge(ch) {
    const kind = ch.kind || 'defi';
    return kind === 'activite'
      ? '<span class="kind-badge kind-activite">ACTIVITÉ</span>'
      : '<span class="kind-badge kind-defi">DÉFI</span>';
  }

  /* ──────────────────────────────────────────────
     ÉTAT GLOBAL
  ────────────────────────────────────────────── */
  const App = {
    screen: 'loading',   // loading | setup | home | create | join | game
    party:    null,
    player:   null,      // { id, blaze, role }
    players:  {},
    challenges: {},
    votes:    {},

    currentTab:       'histoire',
    storySlide:       0,
    emiliaSlide:      0,
    showPlayerPanel:  false,

    defiView:        'list',   // list | detail
    selectedChallenge: null,
    boostersView:    'list',   // list | detail
    selectedBooster: null,

    // ephemeral form state
    _createForm:    null,
    _newPartyCode:  null,
    _joinForm:      null,
    _joinGoldLocked: false,
  };

  /* ──────────────────────────────────────────────
     FIREBASE
  ────────────────────────────────────────────── */
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCqs9zk-Pryw75pZjkHRX9vZFAXRchAIq7k',
    databaseURL: 'https://ethanzer-evg-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'ethanzer-evg',
  };

  let firebaseDB = null;
  let activeListeners = []; // { fbRef, event, fn }

  function getFirebaseConfig() {
    try { return JSON.parse(localStorage.getItem('ez_firebase') || 'null'); }
    catch { return null; }
  }
  function saveFirebaseConfig(cfg) {
    localStorage.setItem('ez_firebase', JSON.stringify(cfg));
  }

  function initFirebase(cfg) {
    try {
      if (!firebase || !firebase.initializeApp) return false;
      if (firebase.apps && firebase.apps.length > 0) {
        firebase.app();
      } else {
        firebase.initializeApp(cfg);
      }
      firebaseDB = firebase.database();
      return true;
    } catch (e) {
      console.error('[Firebase init]', e);
      return false;
    }
  }

  function dbRef(path) { return firebaseDB.ref(path); }

  function detachAll() {
    activeListeners.forEach(({ fbRef, event, fn }) => fbRef.off(event, fn));
    activeListeners = [];
  }

  function addListener(fbRef, event, fn) {
    fbRef.on(event, fn);
    activeListeners.push({ fbRef, event, fn });
  }

  /* ──────────────────────────────────────────────
     UTILITIES
  ────────────────────────────────────────────── */
  function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  const WORDS = ['BRAVE','NOBLE','ROYAL','SACRE','GRAND','FIER','FORT','VIEUX'];
  function genCode() {
    return WORDS[Math.floor(Math.random() * WORDS.length)] + '-' + (Math.floor(Math.random() * 9000) + 1000);
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function isDemo() { return localStorage.getItem('ez_demo') === '1'; }

  function genMagicLink(partyCode) {
    const cfg = getFirebaseConfig();
    if (!cfg) return null;
    try {
      const data = { k: cfg.apiKey, d: cfg.databaseURL, c: partyCode };
      return location.origin + location.pathname + '#join=' + btoa(JSON.stringify(data));
    } catch { return null; }
  }

  function isLocalhost() {
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  }

  /* ──────────────────────────────────────────────
     DEMO MODE — localStorage persistence
  ────────────────────────────────────────────── */
  function demoParties() {
    try { return JSON.parse(localStorage.getItem('ez_demo_parties') || '{}'); }
    catch { return {}; }
  }
  function saveDemoParties(p) { localStorage.setItem('ez_demo_parties', JSON.stringify(p)); }

  function demoCheckComplete(partyId) {
    const parties = demoParties();
    const p = parties[partyId];
    if (!p) return;
    const count = Object.keys(p.players || {}).length;
    if (count >= p.expectedPlayers && p.status === 'waiting') {
      p.status = 'active';
      if (p.challenges && p.challenges[0]) p.challenges[0].status = 'active';
      parties[partyId] = p;
      saveDemoParties(parties);
    }
  }

  /* ──────────────────────────────────────────────
     SESSION PERSISTENCE
  ────────────────────────────────────────────── */
  function saveSession() {
    if (!App.party || !App.player) return;
    localStorage.setItem('ez_session', JSON.stringify({
      partyId: App.party.id,
      player: App.player,
      currentTab: App.currentTab,
      selectedChallenge: App.selectedChallenge,
      defiView: App.defiView,
      selectedBooster: App.selectedBooster,
      boostersView: App.boostersView
    }));
  }
  function loadSession() {
    try { return JSON.parse(localStorage.getItem('ez_session') || 'null'); }
    catch { return null; }
  }
  function clearSession() { localStorage.removeItem('ez_session'); }

  function addKnown(party) {
    const known = getKnown();
    const idx = known.findIndex(p => p.id === party.id);
    // On s'assure de sauvegarder le joueur actuel
    const playerToSave = App.player || (idx >= 0 ? known[idx].player : null);
    const entry = {
      id: party.id,
      code: party.code,
      name: party.name,
      ts: Date.now(),
      player: playerToSave,
      isDemo: isDemo()
    };
    if (idx >= 0) known[idx] = entry; else known.unshift(entry);
    localStorage.setItem('ez_known', JSON.stringify(known.slice(0, 8)));
    // On met aussi à jour le profil global pour les anciennes parties
    if (playerToSave) saveProfile(playerToSave.blaze, playerToSave.role);
  }
  function getKnown() {
    try { return JSON.parse(localStorage.getItem('ez_known') || '[]'); }
    catch { return []; }
  }

  function saveProfile(blaze, role) {
    localStorage.setItem('ez_profile', JSON.stringify({ blaze, role }));
  }
  function getProfile() {
    try {
      const p = JSON.parse(localStorage.getItem('ez_profile'));
      if (p) return p;
    } catch {}
    const known = getKnown();
    const withPlayer = known.find(k => k.player);
    if (withPlayer) return { blaze: withPlayer.player.blaze, role: withPlayer.player.role };
    return null;
  }

  /* ──────────────────────────────────────────────
     CHALLENGE LOGIC
  ────────────────────────────────────────────── */
  function getOursons(players) {
    return Object.values(players).filter(p => p.role === 'ourson');
  }

  /**
   * Returns { phase, validateCount, totalCount, percent, threshold, oursonCount }
   * phase: 'waiting' | 'insufficient' | 'validated'
   */
  function getValidationState(challengeIndex, votes, players) {
    const oursons = getOursons(players);
    const oursonCount = oursons.length;
    const threshold = Math.ceil(oursonCount * 0.8);
    const cVotes = (votes && votes[challengeIndex]) || {};

    let validateCount = 0, totalCount = 0;
    oursons.forEach(o => {
      const v = cVotes[o.id];
      if (v !== undefined && v !== null) {
        totalCount++;
        if (v === 'validate') validateCount++;
      }
    });

    const percent = oursonCount > 0 ? Math.round((validateCount / oursonCount) * 100) : 0;
    let phase = totalCount === 0 ? 'waiting'
      : validateCount >= threshold ? 'validated'
      : 'insufficient';

    return { phase, validateCount, totalCount, percent, threshold, oursonCount };
  }

  function getPlayerVote(challengeIndex, playerId, votes) {
    return (votes && votes[challengeIndex] && votes[challengeIndex][playerId]) || null;
  }

  function statusLabel(status) {
    return { active: '⚡ En cours', validated: '✅ Validé', forfeit: '❌ Renoncé', locked: '🔒 À venir', awaiting: '⏳ En attente' }[status] || status;
  }
  function statusClass(status) {
    return { active: 's-active', validated: 's-validated', forfeit: 's-forfeit', locked: 's-locked', awaiting: 's-locked' }[status] || 's-locked';
  }

  /* ──────────────────────────────────────────────
     FIREBASE DATABASE OPS
  ────────────────────────────────────────────── */
  async function fbCreateParty(data) {
    const id = genId();
    const code = genCode();
    const party = {
      id, code, name: data.name, days: data.days,
      expectedPlayers: data.expectedPlayers,
      currentChallengeIndex: 0, status: 'waiting', createdAt: Date.now(),
    };
    await dbRef(`parties/${id}`).set(party);
    const challenges = {};
    DEFAULT_CHALLENGES.forEach((ch, i) => {
      challenges[i] = { ...ch, status: i === 0 ? 'awaiting' : 'locked', validationPercent: 0, boostersEarned: 0, voteResetCount: 0 };
    });
    await dbRef(`parties/${id}/challenges`).set(challenges);
    return { id, code, party };
  }

  async function fbJoinParty(partyId, playerData) {
    const playersSnap = await dbRef(`parties/${partyId}/players`).once('value');
    if (playersSnap.exists()) {
      const players = playersSnap.val();
      for (const [pid, p] of Object.entries(players)) {
        if (p.blaze.toLowerCase() === playerData.blaze.toLowerCase() && p.role === playerData.role) {
          return { playerId: pid, player: p };
        }
      }
    }
    const playerId = genId();
    const player = { id: playerId, ...playerData, joinedAt: Date.now() };
    await dbRef(`parties/${partyId}/players/${playerId}`).set(player);
    const pSnap = await dbRef(`parties/${partyId}`).once('value');
    const pData = pSnap.val();
    const count = Object.keys(pData.players || {}).length;
    if (count >= pData.expectedPlayers && pData.status === 'waiting') {
      await dbRef(`parties/${partyId}/status`).set('active');
      await dbRef(`parties/${partyId}/challenges/0/status`).set('active');
    }
    return { playerId, player };
  }

  async function fbFindByCode(code) {
    const snap = await dbRef('parties').orderByChild('code').equalTo(code).once('value');
    if (!snap.exists()) return null;
    const data = snap.val();
    const id = Object.keys(data)[0];
    return { id, ...data[id] };
  }

  async function fbSubmitVote(partyId, challengeIndex, playerId, vote) {
    await dbRef(`parties/${partyId}/votes/${challengeIndex}/${playerId}`).set(vote);
  }

  async function fbRetry(partyId, challengeIndex) {
    await dbRef(`parties/${partyId}/votes/${challengeIndex}`).remove();
    const snap = await dbRef(`parties/${partyId}/challenges/${challengeIndex}/voteResetCount`).once('value');
    await dbRef(`parties/${partyId}/challenges/${challengeIndex}/voteResetCount`).set((snap.val() || 0) + 1);
  }

  async function fbForfeit(partyId, challengeIndex) {
    await dbRef(`parties/${partyId}/challenges/${challengeIndex}`).update({ status: 'forfeit', boostersEarned: 0 });
    const next = challengeIndex + 1;
    if (next < DEFAULT_CHALLENGES.length) {
      await dbRef(`parties/${partyId}/challenges/${next}/status`).set('active');
      await dbRef(`parties/${partyId}/currentChallengeIndex`).set(next);
    } else { await dbRef(`parties/${partyId}/status`).set('complete'); }
  }

  async function fbValidate(partyId, challengeIndex, percent, boosters) {
    await dbRef(`parties/${partyId}/challenges/${challengeIndex}`).update({ status: 'validated', validationPercent: percent, boostersEarned: boosters });
    const next = challengeIndex + 1;
    if (next < DEFAULT_CHALLENGES.length) {
      await dbRef(`parties/${partyId}/challenges/${next}/status`).set('active');
      await dbRef(`parties/${partyId}/currentChallengeIndex`).set(next);
    } else { await dbRef(`parties/${partyId}/status`).set('complete'); }
  }

  function fbSubscribe(partyId) {
    detachAll();
    addListener(dbRef(`parties/${partyId}`), 'value', snap => {
      const data = snap.val();
      if (!data) return;
      App.party      = { ...data, id: partyId };
      App.players    = data.players    || {};
      App.challenges = data.challenges || {};
      App.votes      = data.votes      || {};
      const migrated = migrateChallengesMetadata();
      // Gold Ourson uniquement : pousse la metadata à jour vers Firebase
      // pour que les autres clients (anciens caches inclus) la reçoivent.
      if (migrated && !App._migrationPushed && App.player?.role === 'gold_ourson') {
        App._migrationPushed = true;
        persistMigrationIfHost();
      }
      if (App.screen !== 'game') return;
      // Update players count in header
      const cntEls = document.querySelectorAll('.game-players-row .cnt');
      const pCount = Object.keys(App.players).length;
      if (cntEls[0]) cntEls[0].textContent = pCount;
      // Update players panel list
      const panelList = document.querySelector('#players-panel .players-list');
      if (panelList) panelList.innerHTML = Object.values(App.players).map(p => `
        <div class="player-item">
          <span class="player-emoji">${p.role === 'gold_ourson' ? '👑' : '🐻'}</span>
          <span class="player-blaze">${esc(p.blaze)}${p.id === App.player?.id ? ' <span style="font-size:11px;color:var(--text-muted)">(toi)</span>' : ''}</span>
          <span class="player-role-pill ${p.role === 'gold_ourson' ? 'pill-gold' : 'pill-ourson'}">${p.role === 'gold_ourson' ? 'Gold Ourson' : 'Ourson'}</span>
        </div>`).join('');
      // Update game body
      const isComplete = pCount >= App.party.expectedPlayers || App.party.status !== 'waiting';
      const body = document.getElementById('game-body');
      if (body) {
        body.innerHTML = isComplete ? rGameContent() : rWaiting(pCount, App.party.expectedPlayers);
        attachGameBodyEvents();
      }
    });
  }

  /* ──────────────────────────────────────────────
     BOOSTER ICON HELPER
  ────────────────────────────────────────────── */
  function boosterIcon(size = 'md') {
    // Forme exacte d'un booster Pokémon :
    // - Corps large rectangulaire (la carte)
    // - Col plus étroit (la soudure)
    // - Bord supérieur ondulé (la découpe d'ouverture)
    const dims = { sm: [13,19], md: [17,25], lg: [28,40], tab: [20,28] }[size] || [17,25];
    const [w, h] = dims;
    const id = `bst-${size}`;

    // Proportions relatives
    const bodyTop  = Math.round(h * 0.30);  // ligne de séparation col/corps
    const neckL    = Math.round(w * 0.18);  // bord gauche du col
    const neckR    = Math.round(w * 0.82);  // bord droit du col
    const bodyL    = Math.round(w * 0.05);  // bord gauche du corps
    const bodyR    = Math.round(w * 0.95);  // bord droit du corps
    const waveTop  = Math.round(h * 0.06);  // sommet de l'ondulation
    const waveAmp  = Math.round(h * 0.07);  // amplitude de l'onde
    const mid      = Math.round(w / 2);
    const q1       = Math.round(w * 0.30);
    const q3       = Math.round(w * 0.70);
    const starY    = Math.round(h * 0.67);
    const starSize = Math.max(4, Math.round(w * 0.32));

    // Ondulation du haut : 3 bosses (gauche, centre, droite)
    const wavePath = `M ${neckL},${bodyTop} L ${neckL},${waveTop + waveAmp} Q ${q1},${waveTop} ${mid},${waveTop + waveAmp} Q ${q3},${waveTop + waveAmp * 2} ${neckR},${waveTop + waveAmp} L ${neckR},${bodyTop}`;

    // Contour complet du booster
    const outline = `
      M ${bodyL},${h - 2} Q ${bodyL},${h} ${bodyL + 2},${h}
      L ${bodyR - 2},${h} Q ${bodyR},${h} ${bodyR},${h - 2}
      L ${bodyR},${bodyTop}
      L ${neckR},${bodyTop}
      L ${neckR},${waveTop + waveAmp}
      Q ${q3},${waveTop + waveAmp * 2} ${mid},${waveTop + waveAmp}
      Q ${q1},${waveTop} ${neckL},${waveTop + waveAmp}
      L ${neckL},${bodyTop}
      L ${bodyL},${bodyTop}
      Z`;

    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0">
      <defs>
        <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="${h}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#fbbf24"/>
          <stop offset="40%"  stop-color="#d946ef"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
        <linearGradient id="${id}-s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.45)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <!-- Remplissage principal -->
      <path d="${outline}" fill="url(#${id}-g)"/>
      <!-- Reflet sur le col -->
      <path d="M ${neckL},${bodyTop} L ${neckL},${waveTop + waveAmp} Q ${q1},${waveTop} ${mid},${waveTop + waveAmp} Q ${q3},${waveTop + waveAmp * 2} ${neckR},${waveTop + waveAmp} L ${neckR},${bodyTop} Z" fill="url(#${id}-s)"/>
      <!-- Ligne de séparation col/corps -->
      <line x1="${bodyL}" y1="${bodyTop}" x2="${bodyR}" y2="${bodyTop}" stroke="rgba(255,255,255,0.35)" stroke-width="0.7"/>
      <!-- Bordure -->
      <path d="${outline}" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.7"/>
      <!-- Étoile centrale -->
      <text x="${mid}" y="${starY}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.88)" font-size="${starSize}" font-family="serif">✦</text>
    </svg>`;
  }

  /* ──────────────────────────────────────────────
     TOAST
  ────────────────────────────────────────────── */
  function toast(msg, type = 'info', dur = 3000) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', gold: '⭐' };
    const cls   = { success: 't-success', error: 't-error', info: 't-info', gold: 't-gold' };
    const el = document.createElement('div');
    el.className = `toast ${cls[type] || 't-info'}`;
    el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => {
      el.classList.add('hiding');
      setTimeout(() => el.remove(), 280);
    }, dur);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    toast('Code copié ! 📋', 'success');
  }

  /* ──────────────────────────────────────────────
     MODAL
  ────────────────────────────────────────────── */
  function showModal({ title, text, confirmLabel, confirmClass = 'btn-danger', cancelLabel = 'Annuler', onConfirm }) {
    const bd = document.createElement('div');
    bd.className = 'modal-backdrop';
    bd.innerHTML = `
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <h2 class="modal-title">${title}</h2>
        <p class="modal-text">${text}</p>
        <div class="modal-actions">
          <button class="btn ${confirmClass}" id="mc">  ${confirmLabel}</button>
          <button class="btn btn-ghost" id="mca">${cancelLabel}</button>
        </div>
      </div>`;
    document.body.appendChild(bd);
    bd.querySelector('#mc').addEventListener('click', () => { bd.remove(); onConfirm && onConfirm(); });
    bd.querySelector('#mca').addEventListener('click', () => bd.remove());
    bd.addEventListener('click', e => { if (e.target === bd) bd.remove(); });
  }

  /* ──────────────────────────────────────────────
     NAVIGATION
  ────────────────────────────────────────────── */
  function navigate(screen, extra = {}) {
    Object.assign(App, extra);
    App.screen = screen;
    render();
  }

  /* ──────────────────────────────────────────────
     RENDER — main dispatcher
  ────────────────────────────────────────────── */
  function render() {
    const app = document.getElementById('app');
    switch (App.screen) {
      case 'loading': app.innerHTML = rLoading(); break;
      case 'setup':   app.innerHTML = rSetup();   break;
      case 'home':    app.innerHTML = rHome();     break;
      case 'create':  app.innerHTML = rCreate();   break;
      case 'join':    app.innerHTML = rJoin();     break;
      case 'game':    app.innerHTML = rGame();     break;
      default:        app.innerHTML = rHome();
    }
    attachEvents();
  }

  /* ──────────────────────────────────────────────
     SCREEN: LOADING
  ────────────────────────────────────────────── */
  function rLoading() {
    return `<div class="home-screen">
      <div class="home-hero">
        <div class="home-hero-bg"></div>
        <div class="home-hero-portrait"><img src="assets/ethan/charismatique.png" alt="Ethan" /></div>
      </div>
      <div class="home-logo">
        <span class="home-eyebrow">La Quête du Héros</span>
        <h1 class="home-title">Ethan<span class="apo">'</span>Zer</h1>
        <div class="home-divider"><span class="home-divider-mark"></span></div>
        <p class="home-subtitle">— En préparation —</p>
      </div>
      <p style="color:var(--text-muted);font-size:13px;font-family:var(--font-mono);letter-spacing:2px;text-transform:uppercase;margin-top:24px;animation:wPulse 1.5s ease-in-out infinite">Chargement…</p>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     SCREEN: SETUP
  ────────────────────────────────────────────── */
  function rSetup() {
    return `<div class="screen setup-scroll">
      <div class="setup-body">
        <span style="font-size:56px">👑</span>
        <h1 style="margin-top:12px">Configuration Firebase</h1>
        <p>Ethan'Zer utilise Firebase pour synchroniser les votes en temps réel sur tous les téléphones.</p>

        <div class="setup-steps">
          <div class="setup-step">
            <div class="step-num">1</div>
            <div>
              <h3>Créer un projet Firebase</h3>
              <p>Rends-toi sur <strong>console.firebase.google.com</strong>, crée un nouveau projet (nom libre).</p>
            </div>
          </div>
          <div class="setup-step">
            <div class="step-num">2</div>
            <div>
              <h3>Activer Realtime Database</h3>
              <p>Build → Realtime Database → Create Database → <strong>Mode Test</strong> → Enable.</p>
            </div>
          </div>
          <div class="setup-step">
            <div class="step-num">3</div>
            <div>
              <h3>Récupérer la config</h3>
              <p>Project Settings → General → Your apps → Web → copie <code>apiKey</code> et <code>databaseURL</code>.</p>
            </div>
          </div>
          <div class="setup-step">
            <div class="step-num">4</div>
            <div>
              <h3>Servir l'app sur ton Wi-Fi</h3>
              <p>Dans ce dossier : <code>python3 -m http.server 8080</code>. Ouvre <code>http://[ton-ip]:8080</code> sur tous les téléphones.</p>
            </div>
          </div>
        </div>

        <div class="setup-inputs">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Firebase API Key</label>
            <input type="text" id="setup-key" class="form-input" placeholder="AIzaSy…" autocomplete="off" />
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Database URL</label>
            <input type="url" id="setup-url" class="form-input" placeholder="https://mon-projet-default-rtdb.firebaseio.com" autocomplete="off" />
          </div>
          <button class="btn btn-primary w-full" id="btn-save-config">🚀 Démarrer Ethan'Zer</button>
        </div>

        <div class="divider-or"><span>ou tester sans Firebase</span></div>
        <button class="btn btn-secondary w-full" id="btn-demo">🎮 Mode démo (un seul appareil)</button>
        <p style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:10px;line-height:1.6">
          Le mode démo fonctionne sans Firebase mais ne synchronise pas entre plusieurs téléphones.
        </p>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     SCREEN: HOME
  ────────────────────────────────────────────── */
  function rHome() {
    const known = getKnown().slice(0, 3);

    return `<div class="home-screen screen">
      <div class="home-hero">
        <div class="home-hero-bg"></div>
        <div class="home-hero-portrait"><img src="assets/ethan/charismatique.png" alt="Ethan, le héros" /></div>
      </div>
      <div class="home-logo">
        <span class="home-eyebrow">La Quête du Héros</span>
        <h1 class="home-title">Ethan<span class="apo">'</span>Zer</h1>
        <div class="home-divider"><span class="home-divider-mark"></span></div>
      </div>

      <div class="home-buttons">
        <button class="btn btn-primary" id="btn-create">⚔️ Créer une partie</button>
        <button class="btn btn-secondary" id="btn-join">🛡️ Rejoindre une partie</button>
      </div>

      ${known.length > 0 ? `
        <div class="home-recent">
          <div class="section-title">⚡ Continuer la quête</div>
          <div class="home-recent-list">
            ${known.map(p => `
              <div class="home-recent-card existing-card" data-code="${esc(p.code)}">
                <div class="hrc-icon">${p.player?.role === 'gold_ourson' ? '👑' : '🐻'}</div>
                <div class="hrc-info">
                  <div class="hrc-name">${esc(p.name)}</div>
                  <div class="hrc-meta">${esc(p.code)} · ${esc(p.player?.blaze || 'Joueur')}</div>
                </div>
                <span class="hrc-arrow">›</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="margin-top:32px;padding:0 0 24px;text-align:center">
        ${isDemo()
          ? `<button id="btn-switch-mode" style="background:none;border:1px solid rgba(251,191,36,.3);color:var(--gold-400);border-radius:8px;padding:8px 16px;font-size:12px;cursor:pointer">
              🎮 Mode démo · Passer en multijoueur
            </button>`
          : `<span style="font-size:11px;color:var(--text-muted)">🌐 Mode multijoueur (Firebase)</span>
             <button id="btn-switch-mode" style="background:none;border:none;color:var(--text-muted);font-size:11px;cursor:pointer;display:block;margin:4px auto">
               Passer en mode démo
             </button>`
        }
        <div style="margin-top:14px;font-size:10px;color:var(--text-muted);letter-spacing:.5px;opacity:.7">${APP_VERSION}</div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     SCREEN: CREATE
  ────────────────────────────────────────────── */
  function rCreate() {
    const f = App._createForm || {};
    const code = App._newPartyCode;

    const dayOpts  = [1,2,3,4,5].map(d => `<option value="${d}" ${f.days == d ? 'selected' : ''}>${d} jour${d > 1 ? 's' : ''}</option>`).join('');
    const cntOpts  = [2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${f.expectedPlayers == n ? 'selected' : ''}>${n} joueurs</option>`).join('');

    return `<div class="form-screen screen">
      <div class="form-header">
        <button class="btn-back" id="btn-back">←</button>
        <h1>Créer une partie</h1>
      </div>
      <div class="form-body">
        <div class="form-group">
          <label class="form-label">Nom de la partie</label>
          <input type="text" id="f-name" class="form-input" placeholder="L'Aventure d'Ethan'Zer" value="${esc(f.name || '')}" maxlength="40" />
        </div>
        <div class="form-group">
          <label class="form-label">Ton blaze</label>
          <input type="text" id="f-blaze" class="form-input" placeholder="Le Légendaire Ethan'Zer" value="${esc(f.blaze || '')}" maxlength="30" />
        </div>
        <div class="form-group">
          <label class="form-label">Ton rôle</label>
          <div class="role-selector">
            <label class="role-option">
              <input type="radio" name="role" value="gold_ourson" ${f.role !== 'ourson' ? 'checked' : ''} />
              <div class="role-card">
                <span class="role-emoji">👑</span>
                <span class="role-name">Gold Ourson</span>
                <span class="role-badge">Unique</span>
              </div>
            </label>
            <label class="role-option">
              <input type="radio" name="role" value="ourson" ${f.role === 'ourson' ? 'checked' : ''} />
              <div class="role-card">
                <span class="role-emoji">🐻</span>
                <span class="role-name">Ourson</span>
                <span class="role-badge">Votant</span>
              </div>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Nombre de jours</label>
          <select id="f-days" class="form-select">${dayOpts}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Nombre de joueurs attendus</label>
          <select id="f-expected" class="form-select">${cntOpts}</select>
        </div>

        ${code ? `
          <div class="party-code-banner" id="code-banner">
            <div class="code-banner-label">🎉 Partie créée !</div>
            <span class="code-banner-value">${esc(code)}</span>
            <button class="btn-copy" id="btn-copy-code">📋 Copier le code</button>
            <p class="code-banner-hint">Partage ce code avec tes compagnons pour qu'ils rejoignent la quête.</p>
          </div>
          ${!isDemo() ? `
          <div class="magic-link-card">
            <div class="magic-link-title">📱 Lien d'invitation rapide</div>
            <p class="magic-link-hint">Tes compagnons ouvrent ce lien → Firebase est configuré automatiquement, le code est pré-rempli. Il reste juste à choisir leur blaze.</p>
            ${isLocalhost() ? `<p class="magic-link-warn">⚠️ Tu es sur <strong>localhost</strong> — le lien ne marchera que sur cet appareil.<br>Lance le serveur sur ton IP locale :<br><code>python3 -m http.server 8080</code><br>puis ouvre <code>http://[ton-ip]:8080</code></p>` : ''}
            <button class="btn btn-outline-gold w-full" id="btn-share-link">🔗 Copier le lien &amp; afficher le QR code</button>
            <div class="qr-wrap" id="qr-wrap"></div>
          </div>` : ''}
          <button class="btn btn-success w-full mt-12" id="btn-enter-game">⚔️ Entrer dans la partie</button>
          <div style="height:20px"></div>
        ` : ''}
      </div>
      ${!code ? `
        <div class="form-footer">
          <button class="btn btn-primary w-full" id="btn-create-submit">Créer et rejoindre →</button>
        </div>
      ` : ''}
    </div>`;
  }

  /* ──────────────────────────────────────────────
     SCREEN: JOIN
  ────────────────────────────────────────────── */
  function rJoin() {
    const known = getKnown();
    const f = App._joinForm || {};
    const goldLocked = App._joinGoldLocked;

    return `<div class="form-screen screen">
      <div class="form-header">
        <button class="btn-back" id="btn-back">←</button>
        <h1>Rejoindre une partie</h1>
      </div>
      <div class="form-body">
        ${known.length > 0 ? `
          <div class="section-title">🕐 Parties récentes</div>
          <div class="existing-list">
            ${known.map(p => `
              <div class="existing-card" data-code="${esc(p.code)}">
                <span class="ec-emoji">⚔️</span>
                <div class="ec-info">
                  <div class="ec-name">${esc(p.name)}</div>
                  <div class="ec-code">${esc(p.code)}</div>
                  <div class="ec-meta">${(p.player || getProfile()) ? 'Toucher pour reprendre la partie' : 'Toucher pour pré-remplir le code'}</div>
                </div>
                <span style="color:var(--text-muted);font-size:18px">›</span>
              </div>`).join('')}
          </div>
          <div class="divider-or"><span>Nouvelle connexion</span></div>
        ` : ''}

        <div class="section-title">🔑 Rejoindre avec un code</div>
        <div class="join-form-card">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Code de la partie</label>
            <input type="text" id="j-code" class="form-input" placeholder="BRAVE-1234" style="text-transform:uppercase;letter-spacing:1px"
              value="${esc(f.code || '')}" maxlength="12" autocomplete="off" autocorrect="off" />
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Ton blaze</label>
            <input type="text" id="j-blaze" class="form-input" placeholder="Gros Bidule" value="${esc(f.blaze || '')}" maxlength="30" />
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Ton rôle</label>
            <div class="role-selector">
              <label class="role-option${goldLocked ? ' locked' : ''}">
                <input type="radio" name="jrole" value="gold_ourson" ${goldLocked || f.role === 'ourson' ? '' : 'checked'} ${goldLocked ? 'disabled' : ''} />
                <div class="role-card">
                  <span class="role-emoji">👑</span>
                  <span class="role-name">Gold Ourson</span>
                  ${goldLocked
                    ? `<span class="role-badge" style="background:rgba(239,68,68,.15);color:var(--danger)">Pris</span>`
                    : `<span class="role-badge">Unique</span>`}
                </div>
              </label>
              <label class="role-option">
                <input type="radio" name="jrole" value="ourson" ${goldLocked || f.role === 'ourson' ? 'checked' : ''} />
                <div class="role-card">
                  <span class="role-emoji">🐻</span>
                  <span class="role-name">Ourson</span>
                  <span class="role-badge">Votant</span>
                </div>
              </label>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-join-submit">Rejoindre la partie →</button>
        </div>
        <div style="height:20px"></div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     SCREEN: GAME
  ────────────────────────────────────────────── */
  function rGame() {
    if (!App.party || !App.player) return rHome();
    const { party, players } = App;
    const pCount = Object.keys(players).length;
    const isComplete = pCount >= party.expectedPlayers || party.status === 'active' || party.status === 'complete';

    return `<div class="game-screen">
      ${rHeader(party, pCount, isComplete)}
      ${rPlayersPanel(players)}
      <div id="game-body" style="flex:1;overflow:hidden;display:flex;flex-direction:column">
        ${isComplete ? rGameContent() : rWaiting(pCount, party.expectedPlayers)}
      </div>
    </div>`;
  }

  function rHeader(party, pCount, isComplete) {
    return `<div class="game-header">
      <div class="game-header-top">
        <button class="btn-back" id="btn-leave-game" style="margin-right:8px; width:30px; height:30px; font-size:16px;">←</button>
        <span class="game-name">⚔️ ${esc(party.name)}</span>
        <div class="game-code-row">
          <span class="game-code-val">${esc(party.code)}</span>
          <button class="btn-copy" id="btn-copy-party">📋</button>
        </div>
      </div>
      <div class="game-players-row">
        <div class="players-count${isComplete ? ' complete' : ''}">
          <span class="live-dot"></span>
          <span><span class="cnt">${pCount}</span> / <span class="cnt">${party.expectedPlayers}</span> joueurs ${isComplete ? '✨' : ''}</span>
        </div>
        <button class="players-toggle" id="btn-toggle-players">🐻 Équipe ${App.showPlayerPanel ? '▲' : '▼'}</button>
      </div>
    </div>`;
  }

  function rPlayersPanel(players) {
    const list = Object.values(players);
    return `<div class="players-panel${App.showPlayerPanel ? ' open' : ''}" id="players-panel">
      <div class="players-list">
        ${list.map(p => `
          <div class="player-item">
            <span class="player-emoji">${p.role === 'gold_ourson' ? '👑' : '🐻'}</span>
            <span class="player-blaze">${esc(p.blaze)}${p.id === App.player?.id ? ' <span style="font-size:11px;color:var(--text-muted)">(toi)</span>' : ''}</span>
            <span class="player-role-pill ${p.role === 'gold_ourson' ? 'pill-gold' : 'pill-ourson'}">${p.role === 'gold_ourson' ? 'Gold Ourson' : 'Ourson'}</span>
          </div>`).join('')}
      </div>
      <div style="margin-top:auto;padding:12px 16px;text-align:center;font-size:10px;color:var(--text-muted);letter-spacing:.5px;opacity:.7;border-top:1px solid rgba(255,255,255,.05)">${APP_VERSION}</div>
    </div>`;
  }

  function rWaiting(current, expected) {
    const pct = Math.min(100, Math.round((current / expected) * 100));
    return `<div class="waiting-overlay">
      <span class="waiting-icon">⏳</span>
      <h2 class="waiting-title">En attente des compagnons</h2>
      <p class="waiting-sub">La quête ne peut commencer que lorsque tous les joueurs sont arrivés.<br/><br/><strong>${current} / ${expected}</strong> joueurs connectés.</p>
      <div class="waiting-bar">
        <div class="waiting-bar-track"><div class="waiting-bar-fill" style="width:${pct}%"></div></div>
        <p class="waiting-code">Partage le code <strong style="color:var(--gold-400)">${esc(App.party?.code)}</strong></p>
      </div>
    </div>`;
  }

  function rGameContent() {
    const emiliaUnlocked = isEmiliaUnlocked();
    return `<div class="game-content">
      <div class="tab-content">
        <div class="tab-pane${App.currentTab === 'histoire' ? ' active' : ''}" id="tab-histoire">${rHistoire()}</div>
        <div class="tab-pane${App.currentTab === 'defi'     ? ' active' : ''}" id="tab-defi"    >${rDefi()}</div>
        <div class="tab-pane${App.currentTab === 'boosters' ? ' active' : ''}" id="tab-boosters">${rBoosters()}</div>
        <div class="tab-pane${App.currentTab === 'emilia'   ? ' active' : ''}" id="tab-emilia"  >${rEmilia()}</div>
      </div>
      <div class="tab-bar">
        <button class="tab-btn${App.currentTab==='histoire'?' active':''}" data-tab="histoire"><span class="tab-icon">📖</span><span class="tab-label">Histoire</span></button>
        <button class="tab-btn${App.currentTab==='defi'    ?' active':''}" data-tab="defi"    ><span class="tab-icon">⚔️</span><span class="tab-label">Épreuves</span></button>
        <button class="tab-btn${App.currentTab==='boosters'?' active':''}" data-tab="boosters"><span class="tab-icon">${boosterIcon('tab')}</span><span class="tab-label">Boosters</span></button>
        <button class="tab-btn${App.currentTab==='emilia'  ?' active':''}${emiliaUnlocked ? '' : ' tab-locked'}" data-tab="emilia"><span class="tab-icon">${emiliaUnlocked ? '💛' : '🔒'}</span><span class="tab-label">Emilia</span></button>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     TAB: HISTOIRE
  ────────────────────────────────────────────── */
  function rHistoire() {
    const s = App.storySlide;
    const slides = STORY_SLIDES;
    return `<div class="histoire-tab">
      <div class="carousel-wrapper" id="carousel-wrap">
        <div class="carousel-track" id="carousel-track" style="transform:translateX(-${s * 100}%)">
          ${slides.map((sl, i) => {
            const pose = sl.portrait || ETHAN_POSES[i % ETHAN_POSES.length];
            return `
            <div class="story-slide">
              <div class="story-portrait" data-pose="${pose}"><img src="assets/ethan/${pose}.png" alt="Ethan'Zer" /></div>
              <h2 class="slide-title">${sl.title}</h2>
              <p class="slide-text">${sl.text}</p>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="carousel-footer">
        <div class="carousel-dots">
          ${slides.map((_,i) => `<div class="c-dot${i===s?' active':''}" data-slide="${i}"></div>`).join('')}
        </div>
        <div class="swipe-hint">${s < slides.length - 1 ? '← Swipe pour lire la suite →' : '🏆 Fin de l\'histoire'}</div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     TAB: EMILIA — verrouillé tant que les 24 boosters ne sont pas réunis
  ────────────────────────────────────────────── */
  function rEmilia() {
    if (!isEmiliaUnlocked()) {
      const total = getTotalBoostersEarned();
      const max = getMaxBoosters();
      const pct = max > 0 ? (total / max * 100) : 0;
      const allDone = allChallengesDone();
      return `<div class="emilia-locked-screen">
        <div class="emilia-locked-card">
          <div class="emilia-locked-icon">🔒</div>
          <h2 class="emilia-locked-title">Emilia est encore prisonnière</h2>
          <p class="emilia-locked-text">${allDone
            ? `La quête est terminée mais il manque des Boosters pour briser les chaînes du Culte. Emilia reste prisonnière des Wolgarms.`
            : `Réunissez les <strong>${max} Boosters</strong> en complétant tous les défis pour libérer Emilia des griffes du Culte.`}</p>
          <div class="emilia-locked-progress">
            <div class="emilia-progress-bar"><div class="emilia-progress-fill" style="width:${pct.toFixed(0)}%"></div></div>
            <div class="emilia-progress-text"><strong>${total}</strong> / ${max} Boosters</div>
          </div>
        </div>
      </div>`;
    }
    // Déverrouillé — carrousel de conversation avec Emilia
    const s = App.emiliaSlide;
    const slides = EMILIA_SLIDES;
    return `<div class="histoire-tab is-emilia">
      <div class="carousel-wrapper" id="emilia-carousel-wrap">
        <div class="carousel-track" id="emilia-carousel-track" style="transform:translateX(-${s * 100}%)">
          ${slides.map((sl, i) => {
            const pose = sl.portrait || EMILIA_POSES[i % EMILIA_POSES.length];
            return `
            <div class="story-slide">
              <div class="story-portrait" data-pose="${pose}"><img src="assets/emilia/${pose}.png" alt="Emilia" /></div>
              <span class="slide-chapter">${sl.chapter}</span>
              <h2 class="slide-title">${sl.title}</h2>
              <p class="slide-text">${sl.text}</p>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="carousel-footer">
        <div class="carousel-dots">
          ${slides.map((_,i) => `<div class="c-dot${i===s?' active':''}" data-slide="${i}"></div>`).join('')}
        </div>
        <div class="swipe-hint">${s < slides.length - 1 ? '← Swipe pour lire la suite →' : '💛 Fin de la conversation'}</div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     TAB: DÉFI
  ────────────────────────────────────────────── */
  function rDefi() {
    if (App.defiView === 'detail' && App.selectedChallenge !== null) return rChallengeDetail(App.selectedChallenge);
    return rDefiList();
  }

  function rDefiList() {
    const chs = Object.values(App.challenges).sort((a, b) => a.index - b.index);
    const isGold = App.player?.role === 'gold_ourson';
    const activeCh = chs.find(c => c.status === 'active');

    return `<div class="defi-scroll">
      ${activeCh ? rCurrentChallenge(activeCh, isGold) : `
        <div class="empty-state">
          <div class="empty-state-icon">${App.party?.status === 'complete' ? '🏆' : '⏳'}</div>
          <p class="empty-state-text">${App.party?.status === 'complete'
            ? (isGold
                ? 'Bravo, tu as accompli toutes les épreuves. Maintenant on va retrouver Emilia.'
                : 'Ethan\'Zer a accompli toutes les épreuves. Il est allé retrouver Emilia.')
            : 'Les épreuves seront disponibles dès que la quête commence.'}</p>
        </div>`}
      ${chs.length > 0 ? `
        <div class="all-ch-section">
          <div class="all-ch-header">📋 Toutes les épreuves</div>
          ${chs.map(ch => {
            if (isGold && (ch.status === 'locked' || ch.status === 'awaiting')) {
              return `<div class="ch-list-item ch-mystery">
                <span class="ch-list-emoji">🎴</span>
                <div class="ch-list-info">
                  <div class="ch-list-name" style="color:var(--text-muted)">Défi Mystère</div>
                  <div class="ch-list-status">🔒 Contenu secret</div>
                </div>
              </div>`;
            }
            return `<div class="ch-list-item" data-ch="${ch.index}">
              <span class="ch-list-emoji">${ch.emoji}</span>
              <div class="ch-list-info">
                <div class="ch-list-name">${kindBadge(ch)}${esc(ch.title)}</div>
                <div class="ch-list-status">${statusLabel(ch.status)}</div>
              </div>
              <span class="ch-list-arrow">›</span>
            </div>`;
          }).join('')}
        </div>` : ''}
    </div>`;
  }

  function rCurrentChallenge(ch, isGold) {
    const vs = getValidationState(ch.index, App.votes, App.players);
    const playerVote = getPlayerVote(ch.index, App.player?.id, App.votes);
    const isAct = (ch.kind || 'defi') === 'activite';
    return `<div class="ch-card-main${isAct ? ' ch-card-activite' : ''}">
      <div class="status-badge s-active">⚡ En cours</div>
      <div class="ch-num">${kindBadge(ch)}<span class="ch-num-text">${challengeLabel(ch)}</span></div>
      <span class="ch-emoji-big">${ch.emoji}</span>
      <h2 class="ch-title">${esc(ch.title)}</h2>
      <p class="ch-desc">${esc(getDescription(ch))}</p>
      ${rVoteSection(ch, vs, isGold, playerVote)}
    </div>`;
  }

  function rVoteSection(ch, vs, isGold, playerVote) {
    const { phase, validateCount, totalCount, percent, threshold, oursonCount } = vs;
    const hasVotes = totalCount > 0;

    const progressBar = hasVotes ? `
      <div class="vote-section">
        <div class="vote-bar-track"><div class="vote-bar-fill" style="width:${percent}%"></div></div>
        <div class="vote-stats">
          <span class="vote-count">${validateCount} / ${oursonCount} votes favorables</span>
          <span class="vote-pct">${percent}%</span>
        </div>
        <div class="vote-threshold">Seuil requis : ${threshold} votes (80 %)</div>
      </div>` : '';

    const goldMsg = `<div class="vote-msg vm-muted">👑 <span>Seuls les autres Oursons peuvent voter</span></div>`;

    if (isGold) {
      let goldContent = '';
      if (phase === 'waiting') {
        goldContent = `
          <div class="vote-msg vm-info">⏳ <span>Aucun vote pour le moment — En attente des votes des Oursons</span></div>
          ${goldMsg}`;
      } else if (phase === 'validated') {
        const isAct = (ch.kind || 'defi') === 'activite';
        const word = isAct ? 'Activité' : 'Défi';
        const reward = `<span style="font-size:13px;color:var(--text-secondary)">+${ch.maxBoosters || 0} booster${(ch.maxBoosters || 0) > 1 ? 's' : ''} gagnés</span>`;
        goldContent = `
          <div class="success-banner">
            <span class="si">🏆</span>
            <span class="st">${word} validé${isAct ? 'e' : ''} ! ${percent}%</span>
            ${reward}
          </div>
          ${goldMsg}
          <div class="gold-actions">
            <button class="btn btn-primary" id="btn-suivant" data-idx="${ch.index}" data-pct="${percent}" data-boost="${ch.maxBoosters || 0}">
              Suivant → Étape ${ch.index + 2 <= Object.keys(App.challenges).length ? ch.index + 2 : '(fin) '}
            </button>
          </div>`;
      } else {
        const isAct = (ch.kind || 'defi') === 'activite';
        const forfeitLabel = isAct ? '❌ Passer cette activité' : '❌ Renoncer au booster';
        goldContent = `
          <div class="vote-msg vm-warning">📊 <span>${validateCount} vote${validateCount !== 1 ? 's' : ''} favorable${validateCount !== 1 ? 's' : ''} sur ${threshold} requis — ${percent}%</span></div>
          ${goldMsg}
          <div class="gold-actions">
            <button class="btn btn-outline-gold" id="btn-retry" data-idx="${ch.index}">🌀 Return by Death</button>
            <button class="btn btn-danger btn-sm" id="btn-forfeit" data-idx="${ch.index}">${forfeitLabel}</button>
          </div>`;
      }
      return `${progressBar}<div class="vote-section" style="${hasVotes ? 'border-top:none;padding-top:0' : ''}">${goldContent}</div>`;
    }

    // Ourson view
    let oursonContent = '';
    if (playerVote === 'validate') {
      oursonContent = `<div class="vote-msg vm-success">✅ <span>Tu as voté <strong>Valider</strong> — Ton vote est enregistré et figé</span></div>`;
    } else if (playerVote === 'refuse') {
      oursonContent = `<div class="vote-msg vm-refuse">❌ <span>Tu as voté <strong>Refuser</strong> — Ton vote est enregistré et figé</span></div>`;
    } else {
      oursonContent = `
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:14px;text-align:center">🗳️ C'est à toi de voter ! Une seule fois, c'est définitif.</p>
        <div class="vote-btns">
          <button class="vbtn vbtn-validate" id="btn-vote-validate">✅ Valider</button>
          <button class="vbtn vbtn-refuse"   id="btn-vote-refuse"  >❌ Refuser</button>
        </div>`;
    }
    return `${progressBar}<div class="vote-section" style="${hasVotes ? 'border-top:none;padding-top:0' : ''}">${oursonContent}</div>`;
  }

  function rChallengeDetail(idx) {
    const ch = Object.values(App.challenges).find(c => c.index === idx);
    if (!ch) return '<div style="padding:24px;text-align:center;color:var(--text-muted)">Défi introuvable.</div>';
    const isGold = App.player?.role === 'gold_ourson';
    const isCurrent = ch.status === 'active';
    const playerVote = getPlayerVote(idx, App.player?.id, App.votes);

    let voteArea = '';
    if (isCurrent) {
      if (isGold) {
        voteArea = `<div class="vote-msg vm-muted mb-16">👑 <span>Seuls les autres Oursons peuvent voter</span></div>`;
      } else if (playerVote === 'validate') {
        voteArea = `<div class="vote-msg vm-success mb-16">✅ <span>Tu as déjà voté <strong>Valider</strong> — Ton vote est figé</span></div>`;
      } else if (playerVote === 'refuse') {
        voteArea = `<div class="vote-msg vm-refuse mb-16">❌ <span>Tu as déjà voté <strong>Refuser</strong> — Ton vote est figé</span></div>`;
      } else {
        voteArea = `
          <div class="vote-msg vm-info mb-16">ℹ️ <span>Vote possible uniquement sur le défi en cours</span></div>
          <div class="vote-btns">
            <button class="vbtn vbtn-validate" id="btn-dv" data-idx="${idx}">✅ Valider</button>
            <button class="vbtn vbtn-refuse"   id="btn-dr" data-idx="${idx}">❌ Refuser</button>
          </div>`;
      }
    } else {
      voteArea = `<div class="vote-msg vm-muted mb-16">${ch.status === 'locked' ? '🔒 Ce défi n\'est pas encore débloqué' : 'ℹ️ Vote possible uniquement sur le défi en cours'}</div>`;
    }

    const resultArea = (ch.status === 'validated' || ch.status === 'forfeit') ? `
      <div class="booster-detail-card text-center mt-12">
        <span style="font-size:40px">${ch.status === 'validated' ? '🏆' : '❌'}</span>
        <div class="font-mono" style="font-size:28px;font-weight:900;color:${ch.status === 'validated' ? 'var(--gold-400)' : 'var(--text-muted)'};margin:8px 0">
          ${ch.boostersEarned || 0} booster${(ch.boostersEarned || 0) !== 1 ? 's' : ''}
        </div>
        <div style="font-size:13px;color:var(--text-secondary)">${ch.status === 'validated' ? 'Validé' : 'Renoncé'} à ${ch.validationPercent || 0}%</div>
      </div>` : '';

    return `<div class="ch-detail-screen">
      <div class="ch-detail-header">
        <button class="btn-back" id="btn-back-defi">←</button>
        <h1>${esc(ch.title)}</h1>
        <span class="status-badge ${statusClass(ch.status)}" style="font-size:10px;padding:3px 9px">${statusLabel(ch.status)}</span>
      </div>
      <div class="ch-detail-body">
        <div class="text-center" style="padding:8px 0 4px">${kindBadge(ch)} <span style="font-size:11px;color:var(--text-muted);letter-spacing:.8px;text-transform:uppercase">${challengeLabel(ch)}</span></div>
        <div class="text-center" style="padding:14px 0"><span style="font-size:60px">${ch.emoji}</span></div>
        <h2 class="font-display text-center mb-16" style="font-size:20px;line-height:1.3">${esc(ch.title)}</h2>
        <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;text-align:center;margin-bottom:22px">${esc(getDescription(ch))}</p>
        ${voteArea}
        ${resultArea}
        <div class="pb-24"></div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     TAB: BOOSTERS
  ────────────────────────────────────────────── */
  function rBoosters() {
    if (App.boostersView === 'detail' && App.selectedBooster !== null) return rBoosterDetail(App.selectedBooster);
    return rBoostersList();
  }

  function rBoostersList() {
    const done = Object.values(App.challenges)
      .filter(c => c.status === 'validated' || c.status === 'forfeit')
      .sort((a, b) => a.index - b.index);
    const total = getTotalBoostersEarned();
    const max = getMaxBoosters();
    const allDone = allChallengesDone();
    const unlocked = isEmiliaUnlocked();
    const isGold = App.player?.role === 'gold_ourson';

    let endBanner = '';
    if (allDone) {
      if (unlocked) {
        const successText = isGold
          ? `Tu as réuni les ${max} Boosters. Emilia est libre. Va lui parler dans l'onglet <strong>Emilia</strong> 💛`
          : `Ethan'Zer a réuni les ${max} Boosters. Emilia est libre. Il peut enfin la retrouver 💛`;
        endBanner = `<div class="quest-end quest-success">
          <span class="qe-icon">🏆</span>
          <h3 class="qe-title">Quête accomplie !</h3>
          <p class="qe-text">${successText}</p>
        </div>`;
      } else {
        const missing = max - total;
        endBanner = `<div class="quest-end quest-fail">
          <span class="qe-icon">💔</span>
          <h3 class="qe-title">Quête échouée</h3>
          <p class="qe-text">Il manque <strong>${missing} Booster${missing>1?'s':''}</strong> sur ${max}. Emilia reste prisonnière des Wolgarms. La prophétie du 22 août reste suspendue...</p>
        </div>`;
      }
    }

    return `<div class="boosters-scroll">
      <div class="total-card">
        <span class="total-icon">${boosterIcon('lg')}</span>
        <span class="total-number">${total}<span class="total-max">/${max}</span></span>
        <span class="total-label">boosters gagnés${allDone ? ' · Quête terminée' : ''}</span>
      </div>
      ${endBanner}
      ${done.length > 0 ? `
        <div class="boosters-list">
          ${done.map(ch => {
            return `
            <div class="booster-item" data-boost="${ch.index}">
              <span class="b-emoji">${ch.emoji}</span>
              <div class="b-info">
                <div class="b-name">${kindBadge(ch)}${esc(ch.title)}</div>
                <div class="b-meta">
                  <span>${ch.status === 'validated' ? '✅' : '❌'} ${ch.validationPercent || 0}%</span>
                  <span>${ch.status === 'validated' ? 'Validé' : 'Renoncé'}</span>
                </div>
              </div>
              <div class="b-count">${ch.boostersEarned || 0} ${boosterIcon('sm')}</div>
            </div>`;
          }).join('')}
        </div>` : `
        <div class="empty-state">
          <div class="empty-state-icon">${boosterIcon('lg')}</div>
          <p class="empty-state-text">Aucun défi terminé pour l'instant. Commence la quête !</p>
        </div>`}
      <div style="height:16px"></div>
    </div>`;
  }

  function rBoosterDetail(idx) {
    const ch = Object.values(App.challenges).find(c => c.index === idx);
    if (!ch) return '';
    const cVotes = (App.votes && App.votes[idx]) || {};
    const playerList = Object.values(App.players).sort((a, b) => {
      if (a.role === 'gold_ourson') return -1;
      if (b.role === 'gold_ourson') return 1;
      return 0;
    });

    return `<div class="ch-detail-screen">
      <div class="ch-detail-header">
        <button class="btn-back" id="btn-back-boosters">←</button>
        <h1>${esc(ch.title)}</h1>
      </div>
      <div class="ch-detail-body">
        <div class="booster-detail-card text-center">
          <div style="margin-bottom:8px">${kindBadge(ch)} <span style="font-size:11px;color:var(--text-muted);letter-spacing:.8px;text-transform:uppercase">${challengeLabel(ch)}</span></div>
          <span style="font-size:54px">${ch.emoji}</span>
          <h2 class="font-display" style="font-size:19px;margin:12px 0 8px">${esc(ch.title)}</h2>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.65;margin-bottom:18px">${esc(getDescription(ch))}</p>
          <div style="display:flex;justify-content:center;gap:30px;padding-top:16px;border-top:1px solid var(--border)">
            <div>
              <div class="font-mono" style="font-size:30px;font-weight:900;color:var(--gold-400)">${ch.boostersEarned || 0}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Boosters</div>
            </div>
            <div>
              <div class="font-mono" style="font-size:30px;font-weight:900;color:${ch.status==='validated'?'var(--success)':'var(--danger)'}">${ch.validationPercent || 0}%</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Validation</div>
            </div>
          </div>
        </div>

        <div class="votes-breakdown">
          <div class="vb-header">🗳️ Qui a voté quoi ?</div>
          ${playerList.map(p => {
            const v = p.role === 'gold_ourson' ? null : (cVotes[p.id] || null);
            const chip = p.role === 'gold_ourson'
              ? `<span class="vote-chip vc-novote">Ne vote pas</span>`
              : v === 'validate' ? `<span class="vote-chip vc-validate">✅ Validé</span>`
              : v === 'refuse'   ? `<span class="vote-chip vc-refuse">❌ Refusé</span>`
              :                    `<span class="vote-chip vc-novote">Pas voté</span>`;
            return `<div class="vb-item">
              <span style="font-size:20px">${p.role === 'gold_ourson' ? '👑' : '🐻'}</span>
              <span class="vb-blaze">${esc(p.blaze)}${p.id === App.player?.id ? ' <span style="font-size:11px;color:var(--text-muted)">(toi)</span>' : ''}</span>
              ${chip}
            </div>`;
          }).join('')}
        </div>
        <div class="pb-24"></div>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────────
     GAME BODY EVENTS (game-body-specific only)
  ────────────────────────────────────────────── */
  /* Event delegation sur #app — attaché UNE SEULE FOIS au démarrage.
     #app n'est jamais remplacé donc le listener survit à tous les innerHTML
     (render() / Firebase pushes). Plus jamais de "bouton mort après vote". */
  function attachAppClickDelegation() {
    const app = document.getElementById('app');
    if (!app || app.dataset.clickDelegated === '1') return;
    app.dataset.clickDelegated = '1';
    app.addEventListener('click', handleAppClick);
  }

  function handleAppClick(e) {
    const t = e.target;

    // ── Tab switching (game body) ──
    const tabBtn = t.closest('.tab-btn[data-tab]');
    if (tabBtn) {
      const newTab = tabBtn.dataset.tab;
      // Si on re-clique sur l'onglet déjà actif, ne pas reset les vues détail
      if (App.currentTab !== newTab) {
        App.defiView = 'list'; App.boostersView = 'list';
        App.selectedChallenge = null; App.selectedBooster = null;
      }
      App.currentTab = newTab;
      saveSession();
      qAll('.tab-btn', b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      qAll('.tab-pane', p => p.classList.remove('active'));
      const pane = document.getElementById(`tab-${newTab}`);
      if (pane) pane.classList.add('active');
      // Re-render le contenu du tab actif si on a changé de tab (vue list refresh)
      if (newTab === 'defi' && pane) { pane.innerHTML = rDefi(); }
      if (newTab === 'boosters' && pane) { pane.innerHTML = rBoosters(); }
      return;
    }

    // ── Carousel dots ──
    const dot = t.closest('.c-dot[data-slide]');
    if (dot) {
      const inEmilia = !!t.closest('#tab-emilia');
      const scope = inEmilia ? 'emiliaSlide' : 'storySlide';
      App[scope] = parseInt(dot.dataset.slide);
      updateCarouselUI(scope);
      return;
    }

    // ── Challenge list item → détail ──
    const chItem = t.closest('.ch-list-item[data-ch]');
    if (chItem) {
      App.selectedChallenge = parseInt(chItem.dataset.ch);
      App.defiView = 'detail';
      saveSession();
      const pane = document.getElementById('tab-defi');
      if (pane) pane.innerHTML = rDefi();
      return;
    }

    // ── Booster item → détail ──
    const bItem = t.closest('.booster-item[data-boost]');
    if (bItem) {
      App.selectedBooster = parseInt(bItem.dataset.boost);
      App.boostersView = 'detail';
      saveSession();
      const pane = document.getElementById('tab-boosters');
      if (pane) pane.innerHTML = rBoosters();
      return;
    }

    // ── Retour depuis détail défi ──
    if (t.closest('#btn-back-defi')) {
      App.defiView = 'list'; App.selectedChallenge = null;
      saveSession();
      const pane = document.getElementById('tab-defi');
      if (pane) pane.innerHTML = rDefi();
      return;
    }

    // ── Retour depuis détail booster ──
    if (t.closest('#btn-back-boosters')) {
      App.boostersView = 'list'; App.selectedBooster = null;
      saveSession();
      const pane = document.getElementById('tab-boosters');
      if (pane) pane.innerHTML = rBoosters();
      return;
    }

    // ── Vote buttons (vue list / current challenge) ──
    if (t.closest('#btn-vote-validate')) { handleVote('validate'); return; }
    if (t.closest('#btn-vote-refuse'))   { handleVote('refuse');   return; }

    // ── Vote buttons (vue détail) ──
    const dv = t.closest('#btn-dv');
    if (dv) { handleVoteInDetail('validate', parseInt(dv.dataset.idx)); return; }
    const dr = t.closest('#btn-dr');
    if (dr) { handleVoteInDetail('refuse',   parseInt(dr.dataset.idx)); return; }

    // ── Suivant (validation Gold Ourson) ──
    const sv = t.closest('#btn-suivant');
    if (sv) {
      handleSuivant(parseInt(sv.dataset.idx), parseInt(sv.dataset.pct), parseInt(sv.dataset.boost));
      return;
    }

    // ── Retry ──
    const rt = t.closest('#btn-retry');
    if (rt) {
      const idx = parseInt(rt.dataset.idx);
      showModal({ title:'🌀 Return by Death', text:'Ethan\'Zer revient au point de départ. Tous les votes sont remis à zéro et les Oursons pourront revoter.',
        confirmLabel:'Return by Death', confirmClass:'btn-outline-gold', onConfirm: () => handleRetry(idx) });
      return;
    }

    // ── Forfeit ──
    const ff = t.closest('#btn-forfeit');
    if (ff) {
      const idx = parseInt(ff.dataset.idx);
      const ch = Object.values(App.challenges).find(c => c.index === idx);
      const isAct = ch && (ch.kind || 'defi') === 'activite';
      showModal({
        title: isAct ? '❌ Passer cette activité' : '❌ Renoncer au booster',
        text: isAct
          ? 'L\'activité sera marquée comme passée. L\'étape suivante sera débloquée.'
          : 'Le défi sera clôturé avec 0 booster gagné. Le défi suivant sera débloqué.',
        confirmLabel: isAct ? 'Passer l\'activité' : 'Renoncer (0 booster)',
        confirmClass: 'btn-danger',
        onConfirm: () => handleForfeit(idx)
      });
      return;
    }
  }

  /* Réattache uniquement les listeners NON délégables (touch/mouse pour le carousel).
     Tous les clics passent par la délégation #app via handleAppClick. */
  function attachGameBodyEvents() {
    attachAppClickDelegation();
    const cWrap = document.getElementById('carousel-wrap');
    const cTrack = document.getElementById('carousel-track');
    if (cWrap && cTrack) attachCarousel(cWrap, cTrack, 'storySlide');
    const eWrap = document.getElementById('emilia-carousel-wrap');
    const eTrack = document.getElementById('emilia-carousel-track');
    if (eWrap && eTrack) attachCarousel(eWrap, eTrack, 'emiliaSlide');
  }

  /* ──────────────────────────────────────────────
     EVENT LISTENERS
  ────────────────────────────────────────────── */
  function attachEvents() {
    q('#btn-save-config',   el => el.addEventListener('click', handleSaveConfig));
    q('#btn-demo',          el => el.addEventListener('click', () => { localStorage.setItem('ez_demo','1'); navigate('home'); }));
    q('#btn-create',        el => el.addEventListener('click', () => { App._createForm = null; App._newPartyCode = null; navigate('create'); }));
    q('#btn-join',          el => el.addEventListener('click', () => { App._joinForm = null; App._joinGoldLocked = false; navigate('join'); }));
    q('#btn-back',          el => el.addEventListener('click', () => navigate('home')));
    q('#btn-create-submit', el => el.addEventListener('click', handleCreate));
    q('#btn-copy-code',     el => el.addEventListener('click', () => copyText(App._newPartyCode)));
    q('#btn-enter-game',    el => el.addEventListener('click', enterGame));
    q('#btn-join-submit',   el => el.addEventListener('click', () => handleJoin()));
    q('#btn-copy-party',    el => el.addEventListener('click', () => copyText(App.party?.code)));
    q('#btn-leave-game',    el => el.addEventListener('click', () => { App._migrationPushed = false; navigate('home'); }));

    q('#btn-switch-mode', el => el.addEventListener('click', () => {
      if (isDemo()) {
        showModal({
          title: '🌐 Passer en mode multijoueur',
          text: 'Les parties en mode démo ne seront plus accessibles. Le mode multijoueur utilise Firebase pour synchroniser entre les appareils.',
          confirmLabel: 'Passer en multijoueur',
          confirmClass: 'btn-primary',
          onConfirm: () => {
            localStorage.removeItem('ez_demo');
            const cfg = getFirebaseConfig() || DEFAULT_FIREBASE_CONFIG;
            initFirebase(cfg);
            if (!getFirebaseConfig()) saveFirebaseConfig(cfg);
            navigate('home');
            toast('Mode multijoueur activé ! 🌐', 'success');
          }
        });
      } else {
        showModal({
          title: '🎮 Passer en mode démo',
          text: 'Le mode démo fonctionne sur un seul appareil, sans réseau.',
          confirmLabel: 'Passer en mode démo',
          confirmClass: 'btn-secondary',
          onConfirm: () => {
            localStorage.setItem('ez_demo', '1');
            navigate('home');
            toast('Mode démo activé 🎮', 'info');
          }
        });
      }
    }));

    q('#btn-share-link', el => el.addEventListener('click', () => {
      const link = genMagicLink(App._newPartyCode);
      if (!link) { toast('Configure Firebase d\'abord pour partager un lien', 'error'); return; }
      copyText(link);
      const qrWrap = document.getElementById('qr-wrap');
      if (qrWrap && !qrWrap.querySelector('img')) {
        qrWrap.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&color=fbbf24&bgcolor=080814&data=${encodeURIComponent(link)}" alt="QR Code" loading="lazy" />`;
      }
    }));

    // Existing party cards auto-resume
    qAll('.existing-card', el => el.addEventListener('click', async () => {
      const code = el.dataset.code;
      const known = getKnown();
      const entry = known.find(k => k.code === code);
      if (!entry) return;

      const playerInfo = entry.player || getProfile();
      
      // On s'assure d'être dans le bon mode (Demo vs Firebase)
      const currentIsDemo = isDemo();
      if (entry.isDemo !== undefined && entry.isDemo !== currentIsDemo) {
        localStorage.setItem('ez_demo', entry.isDemo ? '1' : '0');
        if (!entry.isDemo) {
          const cfg = getFirebaseConfig() || DEFAULT_FIREBASE_CONFIG;
          initFirebase(cfg);
        }
      }

      if (playerInfo) {
        // On passe l'ID du joueur pour une reconnaissance parfaite
        handleJoin({
          code: entry.code,
          blaze: playerInfo.blaze,
          role: playerInfo.role,
          playerId: playerInfo.id
        });
      } else {
        App._joinForm = { code: entry.code };
        navigate('join');
        toast('Code pré-rempli. Entre ton blaze !', 'info');
      }
    }));

    // Players panel toggle (update in-place)
    q('#btn-toggle-players', el => el.addEventListener('click', () => {
      App.showPlayerPanel = !App.showPlayerPanel;
      const panel = document.getElementById('players-panel');
      if (panel) panel.classList.toggle('open', App.showPlayerPanel);
      el.innerHTML = `🐻 Équipe ${App.showPlayerPanel ? '▲' : '▼'}`;
    }));

    // Game body events (tabs, carousel, defis, votes, boosters)
    attachGameBodyEvents();
  }

  function attachCarousel(wrap, track, scope) {
    scope = scope || 'storySlide';
    const slides = scope === 'emiliaSlide' ? EMILIA_SLIDES : STORY_SLIDES;
    let sx = 0, sy = 0, dragging = false;
    wrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; dragging = false; }, { passive: true });
    wrap.addEventListener('touchmove',  e => { if (Math.abs(e.touches[0].clientX - sx) > Math.abs(e.touches[0].clientY - sy)) dragging = true; }, { passive: true });
    wrap.addEventListener('touchend',   e => {
      if (!dragging) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) {
        if (dx < 0 && App[scope] < slides.length - 1) App[scope]++;
        else if (dx > 0 && App[scope] > 0) App[scope]--;
      }
      updateCarouselUI(scope);
    }, { passive: true });

    // Desktop mouse drag
    let mDown = false, mx = 0;
    wrap.addEventListener('mousedown', e => { mDown = true; mx = e.clientX; });
    wrap.addEventListener('mousemove', e => { if (mDown) e.preventDefault(); });
    wrap.addEventListener('mouseup',   e => {
      if (!mDown) return; mDown = false;
      const dx = e.clientX - mx;
      if (Math.abs(dx) > 40) {
        if (dx < 0 && App[scope] < slides.length - 1) App[scope]++;
        else if (dx > 0 && App[scope] > 0) App[scope]--;
      }
      updateCarouselUI(scope);
    });
  }

  function updateCarouselUI(scope) {
    scope = scope || 'storySlide';
    const isEmilia = scope === 'emiliaSlide';
    const slides = isEmilia ? EMILIA_SLIDES : STORY_SLIDES;
    const trackId = isEmilia ? 'emilia-carousel-track' : 'carousel-track';
    const paneSel = isEmilia ? '#tab-emilia' : '#tab-histoire';
    const idx = App[scope];

    const track = document.getElementById(trackId);
    if (track) track.style.transform = `translateX(-${idx * 100}%)`;

    const pane = document.querySelector(paneSel);
    if (pane) {
      pane.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
      const hint = pane.querySelector('.swipe-hint');
      if (hint) {
        hint.textContent = idx < slides.length - 1
          ? '← Swipe pour lire la suite →'
          : (isEmilia ? '💛 Fin de la conversation' : '🏆 Fin de l\'histoire');
      }
    }
  }

  /* ── DOM helpers ── */
  function q(sel, fn) { const el = document.querySelector(sel); if (el && fn) fn(el); return el; }
  function qAll(sel, fn) {
    const els = document.querySelectorAll(sel);
    if (fn) els.forEach((el, i) => fn(el, i));
    return els;
  }

  /* ──────────────────────────────────────────────
     ACTION HANDLERS
  ────────────────────────────────────────────── */
  async function handleSaveConfig() {
    const key = (document.getElementById('setup-key')?.value || '').trim();
    const url = (document.getElementById('setup-url')?.value || '').trim();
    if (!key || !url) { toast('Remplis les deux champs', 'error'); return; }
    const cfg = { apiKey: key, databaseURL: url, projectId: url.split('//')[1]?.split('.')[0] || 'ethanzer' };
    const ok = initFirebase(cfg);
    if (ok) { saveFirebaseConfig(cfg); toast('Firebase connecté ! 🚀', 'success'); navigate('home'); }
    else     { toast('Erreur Firebase — vérifie les informations', 'error'); }
  }

  async function handleCreate() {
    const name    = (document.getElementById('f-name')?.value     || '').trim();
    const blaze   = (document.getElementById('f-blaze')?.value    || '').trim();
    const role    =  document.querySelector('input[name="role"]:checked')?.value;
    const days    = parseInt(document.getElementById('f-days')?.value)     || 1;
    const expected= parseInt(document.getElementById('f-expected')?.value) || 2;
    App._createForm = { name, blaze, role, days, expectedPlayers: expected };

    if (!name)  { toast('Donne un nom à la partie', 'error'); return; }
    if (!blaze) { toast('Entre ton blaze', 'error'); return; }
    if (!role)  { toast('Choisis ton rôle', 'error'); return; }

    saveProfile(blaze, role);

    const btn = document.getElementById('btn-create-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Création…'; }

    try {
      if (isDemo()) {
        const id = genId(); const code = genCode(); const pid = genId();
        const player   = { id: pid, blaze, role, joinedAt: Date.now() };
        const chs = {};
        // Si 1 seul joueur attendu, la quête démarre immédiatement
        const startNow = expected === 1;
        DEFAULT_CHALLENGES.forEach((ch, i) => {
          chs[i] = { ...ch, status: i === 0 ? (startNow ? 'active' : 'awaiting') : 'locked', validationPercent: 0, boostersEarned: 0, voteResetCount: 0 };
        });
        const party = {
          id, code, name, days, expectedPlayers: expected,
          currentChallengeIndex: 0,
          status: startNow ? 'active' : 'waiting',
          createdAt: Date.now(),
          players: { [pid]: player }, challenges: chs, votes: {},
        };
        const all = demoParties(); all[id] = party; saveDemoParties(all);
        App.party = party; App.player = player; App.players = { [pid]: player };
        App.challenges = chs; App.votes = {}; App._newPartyCode = code;
        addKnown({ id, code, name }); saveSession();
      } else {
        const { id, code, party } = await fbCreateParty({ name, days, expectedPlayers: expected });
        const { playerId, player } = await fbJoinParty(id, { blaze, role });
        const creatorPlayers = { [playerId]: { id: playerId, blaze, role, joinedAt: Date.now() } };
        const startNow = expected === 1;
        App.party = { ...party, id, status: startNow ? 'active' : 'waiting' };
        App.player = { id: playerId, blaze, role };
        App.players = creatorPlayers;
        App.challenges = {};
        DEFAULT_CHALLENGES.forEach((ch, i) => {
          App.challenges[i] = { ...ch, status: i === 0 ? (startNow ? 'active' : 'awaiting') : 'locked', validationPercent: 0, boostersEarned: 0, voteResetCount: 0 };
        });
        App.votes = {};
        App._newPartyCode = code;
        addKnown({ id, code, name }); saveSession();
      }
      render();
    } catch (e) {
      console.error(e); toast('Erreur lors de la création', 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Créer et rejoindre →'; }
    }
  }

  function enterGame() {
    if (!App.party || !App.player) return;
    if (isDemo()) {
      const all = demoParties();
      const p = all[App.party.id];
      if (p) { App.party = p; App.players = p.players || {}; App.challenges = p.challenges || {}; App.votes = p.votes || {}; migrateChallengesMetadata(); }
    } else {
      fbSubscribe(App.party.id);
    }
    navigate('game');
  }

  async function handleJoin(forceData = null) {
    const code  = (forceData ? forceData.code : (document.getElementById('j-code')?.value  || '')).trim().toUpperCase();
    const blaze = (forceData ? forceData.blaze : (document.getElementById('j-blaze')?.value || '')).trim();
    const role  =  forceData ? forceData.role : document.querySelector('input[name="jrole"]:checked')?.value;
    const fPlayerId = forceData ? forceData.playerId : null;
    
    App._joinForm = { code, blaze, role };

    if (!code)  { toast('Entre le code de la partie', 'error'); return; }
    if (!blaze) { toast('Entre ton blaze', 'error'); return; }
    if (!role)  { toast('Choisis ton rôle', 'error'); return; }

    saveProfile(blaze, role);

    const btn = document.getElementById('btn-join-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Recherche…'; }

    try {
      let partyId, party, pid, player;

      if (isDemo()) {
        const all = demoParties();
        const found = Object.values(all).find(p => p.code === code);
        if (!found) { toast('Code de partie introuvable', 'error'); resetJoinBtn(btn); return; }
        const hasGold = Object.values(found.players || {}).some(p => p.role === 'gold_ourson');
        
        // Recherche prioritaire par ID, puis par blaze/role
        let existingPid = fPlayerId && (found.players || {})[fPlayerId] ? fPlayerId : null;
        if (!existingPid) {
          existingPid = Object.keys(found.players || {}).find(k =>
            found.players[k].blaze.toLowerCase() === blaze.toLowerCase() && found.players[k].role === role
          ) || null;
        }

        if (existingPid) {
          // Joueur déjà membre — reconnexion directe
          pid = existingPid; player = found.players[pid];
        } else {
          // Nouveau joueur — vérifications d'accès
          if (role === 'gold_ourson' && hasGold) {
            App._joinGoldLocked = true; toast('Le rôle Gold Ourson est déjà pris', 'error'); resetJoinBtn(btn); navigate('join'); return;
          }
          const cnt = Object.keys(found.players || {}).length;
          if (cnt >= found.expectedPlayers) { toast('La partie est complète', 'error'); resetJoinBtn(btn); return; }
          pid = genId(); player = { id: pid, blaze, role, joinedAt: Date.now() };
          found.players = found.players || {}; found.players[pid] = player;
        }
        partyId = found.id; party = found;
        demoCheckComplete(partyId);
        const updated = demoParties(); party = updated[partyId];
        all[partyId] = party; saveDemoParties(all);
        App.party = party; App.player = player;
        App.players = party.players || {}; App.challenges = party.challenges || {}; App.votes = party.votes || {};
        migrateChallengesMetadata();
      } else {
        const found = await fbFindByCode(code);
        if (!found) { toast('Code de partie introuvable', 'error'); resetJoinBtn(btn); return; }
        party = found; partyId = found.id;
        const hasGold = Object.values(found.players || {}).some(p => p.role === 'gold_ourson');

        // Recherche prioritaire par ID, puis par blaze/role
        let existingPid = fPlayerId && (found.players || {})[fPlayerId] ? fPlayerId : null;
        if (!existingPid) {
          existingPid = Object.keys(found.players || {}).find(k =>
            found.players[k].blaze.toLowerCase() === blaze.toLowerCase() && found.players[k].role === role
          ) || null;
        }

        if (existingPid) {
          // Joueur déjà membre — reconnexion directe, pas de vérification de places
          pid = existingPid;
          player = found.players[existingPid];
        } else {
          // Nouveau joueur — vérifications d'accès
          if (role === 'gold_ourson' && hasGold) {
            App._joinGoldLocked = true; toast('Le rôle Gold Ourson est déjà pris', 'error'); resetJoinBtn(btn); navigate('join'); return;
          }
          const cnt = Object.keys(found.players || {}).length;
          if (cnt >= found.expectedPlayers) { toast('La partie est complète', 'error'); resetJoinBtn(btn); return; }
          const res = await fbJoinParty(partyId, { blaze, role });
          pid = res.playerId; player = res.player;
        }

        // Build local state
        const updatedPlayers = { ...(found.players || {}), [pid]: player };
        const newCount = Object.keys(updatedPlayers).length;
        const newStatus = (newCount >= found.expectedPlayers && found.status === 'waiting') ? 'active' : found.status;
        App.party = { ...found, id: partyId, status: newStatus };
        App.player = { id: pid, blaze: player.blaze, role: player.role };
        App.players = updatedPlayers;
        App.challenges = { ...(found.challenges || {}) };
        if (newStatus === 'active' && App.challenges[0] && App.challenges[0].status === 'awaiting') {
          App.challenges[0] = { ...App.challenges[0], status: 'active' };
        }
        App.votes = found.votes || {};
        migrateChallengesMetadata();
      }

      addKnown({ id: partyId, code, name: party.name }); saveSession();
      if (!isDemo()) fbSubscribe(partyId);
      navigate('game');
      const rejoined = forceData && forceData.playerId;
      toast(rejoined ? `De retour dans le Game, ${player.blaze} ! ⚔️` : `Bienvenue ${blaze} ! 🐻`, 'success');
    } catch (e) {
      console.error(e); toast('Erreur lors de la connexion', 'error'); resetJoinBtn(btn);
    }
  }

  function resetJoinBtn(btn) { if (btn) { btn.disabled = false; btn.textContent = 'Rejoindre la partie →'; } }

  async function handleVote(vote) {
    const activeCh = Object.values(App.challenges).find(c => c.status === 'active');
    if (!activeCh) return;
    await doVote(vote, activeCh.index);
  }

  async function handleVoteInDetail(vote, idx) {
    await doVote(vote, idx, true /* inDetail */);
  }

  async function doVote(vote, challengeIndex, inDetail = false) {
    if (!App.player || App.player.role === 'gold_ourson') return;
    const existing = getPlayerVote(challengeIndex, App.player.id, App.votes);
    if (existing) { toast('Ton vote est déjà enregistré et figé', 'info'); return; }

    try {
      if (isDemo()) {
        const all = demoParties(); const p = all[App.party.id];
        if (!p.votes) p.votes = {};
        if (!p.votes[challengeIndex]) p.votes[challengeIndex] = {};
        p.votes[challengeIndex][App.player.id] = vote;
        saveDemoParties(all);
        // Sync App state from persisted source
        if (!App.votes) App.votes = {};
        if (!App.votes[challengeIndex]) App.votes[challengeIndex] = {};
        App.votes[challengeIndex][App.player.id] = vote;
      } else {
        await fbSubmitVote(App.party.id, challengeIndex, App.player.id, vote);
      }
      toast(vote === 'validate' ? '✅ Vote enregistré : Valider' : '❌ Vote enregistré : Refuser', 'success');
      // In demo mode, Firebase won't re-render, so refresh manually
      if (isDemo()) {
        const pane = document.getElementById('tab-defi');
        if (!pane) return;
        if (!inDetail) App.defiView = 'list';
        pane.innerHTML = rDefi();
        // Pas de re-attach : la délégation #app prend le relais
      }
    } catch (e) { console.error(e); toast('Erreur lors du vote', 'error'); }
  }

  async function handleSuivant(idx, pct, boosters) {
    try {
      if (isDemo()) {
        const all = demoParties(); const p = all[App.party.id];
        p.challenges[idx].status = 'validated';
        p.challenges[idx].validationPercent = pct;
        p.challenges[idx].boostersEarned = boosters;
        const next = idx + 1;
        if (next < DEFAULT_CHALLENGES.length) {
          p.challenges[next].status = 'active';
          p.currentChallengeIndex = next;
        } else {
          p.status = 'complete';
        }
        saveDemoParties(all);
        App.party = p; App.challenges = p.challenges; App.votes = p.votes || {};
        migrateChallengesMetadata();
        App.defiView = 'list'; App.selectedChallenge = null;
        render();
      } else {
        await fbValidate(App.party.id, idx, pct, boosters);
      }
      const ch = Object.values(App.challenges).find(c => c.index === idx);
      const isAct = ch && (ch.kind || 'defi') === 'activite';
      toast(
        isAct
          ? `🏆 Activité validée ! +${boosters} booster${boosters !== 1 ? 's' : ''} gagnés`
          : `🏆 Défi validé ! +${boosters} booster${boosters !== 1 ? 's' : ''} gagnés`,
        'gold'
      );
    } catch (e) { console.error(e); toast('Erreur', 'error'); }
  }

  async function handleRetry(idx) {
    try {
      if (isDemo()) {
        const all = demoParties(); const p = all[App.party.id];
        if (p.votes && p.votes[idx]) delete p.votes[idx];
        p.challenges[idx].voteResetCount = (p.challenges[idx].voteResetCount || 0) + 1;
        saveDemoParties(all);
        App.party = p; App.challenges = p.challenges; App.votes = p.votes || {};
        migrateChallengesMetadata();
        App.defiView = 'list'; App.selectedChallenge = null;
        render();
      } else {
        await fbRetry(App.party.id, idx);
      }
      toast('🔄 Votes réinitialisés — les Oursons peuvent revoter !', 'info');
    } catch (e) { console.error(e); toast('Erreur', 'error'); }
  }

  async function handleForfeit(idx) {
    try {
      if (isDemo()) {
        const all = demoParties(); const p = all[App.party.id];
        p.challenges[idx].status = 'forfeit';
        p.challenges[idx].boostersEarned = 0;
        const next = idx + 1;
        if (next < DEFAULT_CHALLENGES.length) {
          p.challenges[next].status = 'active';
          p.currentChallengeIndex = next;
        } else {
          p.status = 'complete';
        }
        saveDemoParties(all);
        App.party = p; App.challenges = p.challenges; App.votes = p.votes || {};
        migrateChallengesMetadata();
        App.defiView = 'list'; App.selectedChallenge = null;
        render();
      } else {
        await fbForfeit(App.party.id, idx);
      }
      toast('❌ Défi renoncé — passage au suivant', 'info');
    } catch (e) { console.error(e); toast('Erreur', 'error'); }
  }

  /* ──────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────── */
  async function init() {
    render(); // show loading

    // ── Magic link (lien d'invitation) ──
    // Format: #join=BASE64({"k":"apiKey","d":"databaseURL","c":"CODE"})
    const magicHash = location.hash;
    if (magicHash.startsWith('#join=')) {
      history.replaceState(null, '', location.pathname);
      try {
        const data = JSON.parse(atob(magicHash.slice(6)));
        if (data.k && data.d) {
          const cfg = { apiKey: data.k, databaseURL: data.d, projectId: data.d.split('//')[1]?.split('.')[0] || 'ethanzer' };
          const ok = initFirebase(cfg);
          if (ok) { saveFirebaseConfig(cfg); localStorage.removeItem('ez_demo'); }
        }
        if (data.c) App._joinForm = { code: data.c };
        navigate('join');
        if (data.c) toast(`Code ${data.c} pré-rempli 🎉`, 'success');
        return;
      } catch(e) { console.error('[Magic link]', e); }
    }

    const demo = isDemo();
    const fbCfg = getFirebaseConfig();

    // Try to restore session
    const session = loadSession();

    if (demo) {
      if (session) {
        const all = demoParties();
        const p = all[session.partyId];
        if (p) {
          App.party = p; App.player = session.player;
          App.players = p.players || {}; App.challenges = p.challenges || {}; App.votes = p.votes || {};
          migrateChallengesMetadata();
          if (session.currentTab) App.currentTab = session.currentTab;
          if (session.selectedChallenge !== undefined) App.selectedChallenge = session.selectedChallenge;
          if (session.defiView) App.defiView = session.defiView;
          if (session.selectedBooster !== undefined) App.selectedBooster = session.selectedBooster;
          if (session.boostersView) App.boostersView = session.boostersView;
          navigate('game'); return;
        }
      }
      navigate('home'); return;
    }

    const cfg = fbCfg || DEFAULT_FIREBASE_CONFIG;
    if (!fbCfg) saveFirebaseConfig(cfg);

    const ok = initFirebase(cfg);
    if (!ok) { navigate('setup'); return; }

    if (session) {
      try {
        const snap = await dbRef(`parties/${session.partyId}`).once('value');
        if (snap.exists()) {
          const data = snap.val();
          App.party = { ...data, id: session.partyId }; App.player = session.player;
          App.players = data.players || {}; App.challenges = data.challenges || {}; App.votes = data.votes || {};
          migrateChallengesMetadata();
          if (session.currentTab) App.currentTab = session.currentTab;
          if (session.selectedChallenge !== undefined) App.selectedChallenge = session.selectedChallenge;
          if (session.defiView) App.defiView = session.defiView;
          if (session.selectedBooster !== undefined) App.selectedBooster = session.selectedBooster;
          if (session.boostersView) App.boostersView = session.boostersView;
          fbSubscribe(session.partyId); navigate('game'); return;
        }
      } catch (e) { console.error('[Session restore]', e); clearSession(); }
    }
    navigate('home');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
