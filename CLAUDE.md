# CLAUDE.md — Instructions du projet

<!--
Ce fichier donne à Claude Code le contexte spécifique de ce projet.
Il complète (sans remplacer) le CLAUDE.md global de Stéphanie.
Ne jamais y inclure de mot de passe, clé API, token ou information sensible : voir section 13.
-->

## 1. Résumé du projet

Nom du projet : **EDC Career Quest**

Type de projet :
- [x] Application web
- [ ] Site web
- [ ] Page web / landing page
- [ ] Automatisation Make
- [ ] Automatisation n8n
- [ ] Traitement de fichiers ou de données
- [x] Outil interne (pédagogique)
- [ ] Autre

Objectif principal :
Concevoir et développer une application web pédagogique complète pour animer les cours "Atelier Carrière" auprès des étudiants de l'EDC Paris (B1 à B3). L'application repose sur une entrée par QR Code de groupe, trois univers pédagogiques distincts adaptés au niveau de l'étudiant, et pour le niveau B3 un moteur de simulation IA autonome générant des scénarios professionnels évolutifs avec feedback structuré.

Résultat attendu :
Une application Next.js déployée (Vercel), pilotée intégralement depuis un espace admin, sans compte étudiant ni saisie de données personnelles, couvrant les 9 groupes de l'EDC et les 3 univers pédagogiques (Passeport vers le Stage / Expédition Professionnelle / Mission Horizon).

> **Tâche en cours (mission active) :** révision et enrichissement du seul **Univers 2 — Expédition Professionnelle (B2/PGE2)**, réparti en deux périodes narratives : « 🧭 aventure » (semestre 1, B2 + PGE2) et « 🕵️ détective » (semestre 2, PGE2 uniquement). Voir fiche mission dédiée « EDC Career Quest — B2/PGE2 » (fichier `fiche-mission-edc-career-2eme-annee.docx`), et son prompt source détaillé `prompt_edc_career_2eme_annee.md`. **L'Univers 1 (B1/PGE1) est stabilisé** suite à sa mission de révision précédente et **n'est pas concerné** par la tâche actuelle. **L'Univers 3 (B3) n'est pas concerné** non plus.

## 2. Contexte métier

Pourquoi ce projet existe :
Digitaliser et rendre interactifs les cours "Atelier Carrière" de Stéphanie à l'EDC Paris, en remplaçant un format classique par une expérience gamifiée différenciée selon le niveau académique (B1/PGE1, B2/PGE2, B3) et la spécialisation (Finance / Négociation / Marketing Digital pour les B3).

Qui va utiliser le résultat :
- [ ] Moi uniquement
- [ ] Mon équipe
- [ ] Mes clients
- [x] Des apprenants (étudiants EDC Paris, B1 à B3)
- [x] Moi-même en tant qu'administratrice (pilotage de la session en direct)

Niveau technique des utilisateurs finaux :
- [x] Non technique (étudiants — simple scan de QR Code)
- Administratrice (Stéphanie) : non développeuse, pilotage via interface admin simple

Ce qui compte le plus :
- [x] Design professionnel (immersif, distinct par univers)
- [x] Fiabilité (usage en direct devant un groupe d'étudiants)
- [x] Sécurité / confidentialité (aucune donnée personnelle étudiante)
- [x] Facilité de maintenance (pilotage 100% via l'espace admin, sans intervention technique)

## 3. Périmètre du projet

Ce que le projet doit faire :
- Générer et gérer des QR Codes par groupe (9 groupes : B1-A, B1-B, PGE1-A, B2-A, B2-B, PGE2-A, B3 Marketing, B3 Négociation, B3 Finance), avec décodage automatique à l'entrée étudiant
- Proposer 3 univers pédagogiques distincts selon le niveau :
  - **Univers 1 — Passeport vers le Stage** (B1/PGE1) — *stabilisé, non concerné par la mission active* : 6 checkpoints suivant l'ordre imposé « ✅ Correction de bord × 2 → 🛫 Appel tour de contrôle × 1 » par checkpoint. Détail complet : voir fiche mission « EDC Career Quest — B1/PGE1 ».
  - **Univers 2 — Expédition Professionnelle** (B2/PGE2) — *en cours de révision détaillée (mission active)* : 6 cours répartis en deux périodes narratives.
    - **Semestre 1 — univers 🧭 aventure** (B2 + PGE2) :
      1. Cours 1 — La boussole professionnelle (introspection : identité, compétences, motivations, direction)
      2. Cours 2 — Profil LinkedIn réaliste (construire/améliorer un profil LinkedIn crédible)
      3. Cours 3 — Révélateur d'idées LinkedIn (trouver un angle de post, jamais le rédiger à la place de l'étudiant)
    - **Semestre 2 — univers 🕵️ détective** (PGE2 uniquement) :
      4. Cours 4 — Enquête jobboards (choisir les bons canaux de candidature)
      5. Cours 5 — Pitch professionnel (adapter sa présentation selon l'interlocuteur)
      6. Cours 6 — Stratégie 30 jours (diagnostic, obstacles, plan d'action)
    - Règle d'accès : **B2 → cours 1 à 3 uniquement** ; **PGE2 → cours 1 à 6**.
    - Chaque cours comporte jusqu'à 3 exercices, toujours dans l'ordre : 2 exercices **Mode 1 — Feedback immédiat**, puis 1 exercice **Mode 2 — Validation intervenante** en clôture.
    - Détail complet des exercices, écrans, boutons, tableaux et feedback : voir fiche mission « EDC Career Quest — B2/PGE2 ».
  - **Univers 3 — Mission Horizon** (B3) — *non concerné par la mission active* : moteur de simulation IA (génération de contexte initial, injection automatique d'incidents toutes les 10-15 min, adaptation par spécialité Finance/Négociation/Marketing Digital), feedback IA structuré (1 point fort + 1 axe + 1 question + 1 vigilance, sans donner la réponse), 6 missions par spécialité
- Fournir un espace admin sécurisé : liste des groupes, QR codes, contrôle de la mission active, verrouillage de groupe, vue test étudiant
- Appliquer un design premium et immersif, visuellement distinct par univers (✈️ Univers 1 / 🧭+🕵️ Univers 2 / 🚀 Univers 3), responsive mobile-first

Ce que le projet ne doit pas faire pour l'instant :
- Aucune création de compte étudiant, aucune saisie de données personnelles
- Aucune progression pilotée autrement que via l'espace admin et le QR Code
- Pas de placeholder ni de code non fonctionnel livré
- L'application ne garde rien en mémoire d'une session à l'autre, quel que soit l'univers — mais le **vocabulaire diffère par univers** :
  - Univers 1 : utiliser systématiquement « Production à reporter dans le livrable », jamais « trace enregistrée ».
  - **Univers 2 : ne jamais utiliser** « trace enregistrée », « production à reporter dans le livrable », « élément conservé par l'application » ou « historique sauvegardé » — décrire à la place ce que l'application affiche, ce que l'étudiant/le groupe doit faire, le feedback affiché, le rôle de l'intervenante et la transition vers l'exercice suivant.
- **Univers 2 : ne jamais générer un livrable final à la place de l'étudiant** (ex. Cours 3 : pas de post LinkedIn prêt à publier) : proposer des déclencheurs de réflexion (questions ouvertes) que l'étudiant transforme lui-même en formulation personnelle.
- **Univers 2 : ne jamais enfermer un étudiant dans un profil ou une étiquette définitive** (ex. Cours 1, Exercice 2 — profil aventurier) : toujours présenter le résultat comme une piste de réflexion.
- **Univers 2 : ne jamais utiliser l'univers avion** (décollage, tour de contrôle, embarquement, cabine, passager, équipage) — cet univers est réservé exclusivement à l'Univers 1.
- Ne pas modifier les Univers 1 et 3 dans le cadre de la mission de révision en cours sur l'Univers 2, sauf validation explicite

Version souhaitée :
- [x] Version robuste pour usage réel (utilisation en direct en salle de cours)
- [x] Amélioration d'un projet existant (mission active : Univers 2)

Priorité principale :
Mission active : revoir et enrichir les 6 cours de l'Univers 2 (B2/PGE2) selon la fiche mission dédiée — logique UX en deux temps (Mode 1 Feedback immédiat / Mode 2 Validation intervenante), design system « aventure » (S1) puis « détective » (S2), sans régresser les Univers 1 et 3 déjà en place.
(Phase de fond du projet, pour mémoire : Phase 1 Architecture & Setup → progression séquentielle des univers 1 → 2 → 3 → espace admin → polish design.)

## 4. Contraintes importantes

Contraintes de temps :
Non précisées dans la fiche mission — **hypothèse à valider avec Stéphanie** : à caler sur le calendrier des cours EDC Paris (cf. Notion "Cours 2025-2027").

Contraintes de budget :
Non précisées — **hypothèse raisonnable** : privilégier des outils gratuits/peu coûteux (Supabase, Vercel, npm qrcode) déjà identifiés dans le prompt.

Contraintes techniques :
- Next.js 15, TypeScript strict, Tailwind CSS, Shadcn UI
- Supabase (tables : `groups`, `missions`, `contents`, `simulations`, `simulation_events`, `admin_users`)
- Code 100% fonctionnel, typé strict, sans placeholder
- Mission active (Univers 2) : rester dans l'architecture existante, ne pas casser le routing admin ni les mécanismes déjà en place pour les Univers 1 et 3

Contraintes de design :
Design premium, immersif, distinct par univers (identité visuelle propre à chaque univers thématique), responsive mobile-first.
- Univers 1 : univers « avion / voyage », palette bleu nuit / doré / blanc / gris clair, icônes aéronautiques sobres.
- **Univers 2** :
  - Sous-univers aventure (S1) : boussole, carte, carnet de route, sac d'exploration, camp de base, lanterne, sommet, panneau directionnel. Palette : beige, vert profond, bleu nuit, doré léger, blanc cassé, brun clair. Ambiance chaleureuse mais premium.
  - Sous-univers détective (S2) : loupe, dossier d'enquête, tableau d'indices, fiches suspect, tampon confidentiel, carte des pistes, post-it, fil rouge, rapport d'enquête. Palette : bleu nuit, noir doux, beige, doré, rouge discret, gris fumé. Ambiance stratégie/analyse, jamais enfantine.
  - Une action principale par écran, peu de texte, consignes courtes, micro-interactions, badges de progression, pictogrammes cohérents avec l'univers actif.

Contraintes légales, données ou confidentialité :
Aucune donnée personnelle étudiante collectée ou stockée. Aucun compte étudiant.

Contraintes d'usage :
- Clés API (OpenAI/Anthropic) dans `.env.local` uniquement, jamais en dur dans le code
- Toute la progression pédagogique doit être pilotable par Stéphanie (non développeuse) depuis l'espace admin, sans intervention technique

## 5. Outils, plateformes et technologies

Outils ou plateformes imposés :
- Supabase (base de données, auth admin, stockage) — via Supabase MCP
- OpenAI API ou Anthropic API (génération de scénarios, injection d'incidents, feedback IA — **Univers 3 uniquement**, non requis pour la mission active Univers 2)
- npm package `qrcode` (génération des QR Codes par groupe)
- Vercel (déploiement, gestion des variables d'environnement) — via Vercel CLI

Outils ou plateformes préférés :
- Next.js 15 / TypeScript strict / Tailwind CSS / Shadcn UI

Outils ou plateformes à éviter :
- Non précisé

Si aucune technologie n'est imposée :
Sans objet — stack déjà définie ci-dessus.

## 6. Structure du projet

Dossiers ou fichiers importants :
- À définir dès l'initialisation du projet Next.js (Phase 1)
- Mission active : identifier précisément les composants/routes de l'Univers 2 (B2/PGE2) avant toute modification

Fichiers à ne pas modifier sans me prévenir :
- `.env.local` (clés API — ne jamais exposer ni committer)
- **Composants et routes des Univers 1 (Passeport vers le Stage) et 3 (Mission Horizon)** : non concernés par la mission de révision en cours sur l'Univers 2

Fichiers ou dossiers à ignorer :
- Non précisé

Si Claude ne comprend pas la structure :
Explorer les fichiers principaux, identifier la structure, puis fournir un résumé simple avant toute modification importante.

## 7. Données, fichiers et contenus

Sources utilisées :
- [x] Base de données (Supabase)
- [ ] API externe (OpenAI/Anthropic pour la génération de contenu IA en Univers 3 uniquement)
- [x] Autre : fiche de mission Word (.docx) « EDC Career Quest — B2/PGE2 » + prompt POSER source (`prompt_edc_career_2eme_annee.md`) détaillant les 6 cours, exercices, design system et exclusions de l'Univers 2

Emplacement des données :
Supabase (tables `groups`, `missions`, `contents`, `simulations`, `simulation_events`, `admin_users`).
Fiche mission « EDC Career Quest — B2/PGE2 » (`fiche-mission-edc-career-2eme-annee.docx`) fournie en amont de la session Claude Code (spécification détaillée des 6 cours de l'Univers 2).

Format d'entrée :
- Métadonnées des 9 groupes en JSON (slug, year, universe, track, specialization)
- Contenus pédagogiques structurés par cours et par exercice (questions de la boussole, profils LinkedIn types, déclencheurs de réflexion, jobboards, scènes de pitch, plan d'action 30 jours)
- Brief structuré (rôle, contexte, exigences UX, découpage cours/exercices, tableau de sortie imposé) pour la révision de l'Univers 2

Format de sortie attendu :
Application web fonctionnelle, feedback IA structuré au format : ✅ Point fort / 🔧 Axe d'amélioration / 💭 Question de réflexion / ⚠️ Vigilance professionnelle (Univers 3, hors périmètre actuel).
Pour l'Univers 2 : composants Next.js mis à jour ou créés (écrans, boutons, feedback, badges) pour les 6 cours, conformes au tableau de spécification par exercice de la fiche mission.

Règles de traitement :
- Univers 1 : respecter l'ordre imposé par checkpoint (2 exercices « Correction de bord » puis 1 exercice « Appel tour de contrôle ») ; utiliser systématiquement « Production à reporter dans le livrable », jamais « trace enregistrée »
- **Univers 2** : respecter l'ordre imposé par cours (2 exercices Mode 1 « Feedback immédiat » puis 1 exercice Mode 2 « Validation intervenante ») ; B2 → cours 1-3 uniquement, PGE2 → cours 1-6 ; univers aventure au S1, détective au S2 ; jamais l'univers avion ; bannir les 4 expressions de stockage listées en section 3
- Univers 3 : feedback IA sans jamais donner la réponse directement ; injection automatique d'incidents toutes les 10-15 minutes, adaptés à la spécialité

Données sensibles :
Aucune donnée personnelle étudiante ne doit être collectée, saisie ou stockée.

## 8. Automatisations Make / n8n / Zapier

Sans objet pour ce projet (application web, pas d'automatisation Make/n8n/Zapier).

## 9. Site web, page web ou application

Objectif de l'interface :
Permettre à un groupe d'étudiants de vivre une expérience pédagogique gamifiée en salle de cours (scan QR Code → univers dédié → progression pilotée par l'admin), et à Stéphanie de piloter la séance en direct.

Pages ou écrans nécessaires :
- Écran d'entrée / scan QR Code par groupe
- Univers 1 — Passeport vers le Stage (stabilisé, non concerné par la mission active)
- **Univers 2 — Expédition Professionnelle** (*en cours de révision*) : 6 écrans de cours (boussole interactive, générateur de profil LinkedIn, révélateur d'idées, enquête jobboards, scènes de pitch, plan d'action 30 jours), chacun avec ses 3 exercices et leurs écrans dédiés
- Univers 3 — Mission Horizon (non concerné par la mission active)
- Espace admin (groupes, QR codes, contrôle mission active, verrouillage, vue test étudiant)

Contenus importants :
- Titre principal : EDC Career Quest
- Promesse : une expérience immersive et progressive pour préparer sa vie professionnelle
- CTA principal : scanner le QR Code de son groupe pour démarrer ; pour l'Univers 2, boutons différenciés par mode de jeu (ex. « Valider » / « Tirer une carte » / « Explorer une autre piste » en Mode 1 ; « Appeler le guide » / « Soumettre le dossier » / « Demander l'avis de l'enquêtrice » en Mode 2)
- Sections obligatoires : les 3 univers, l'espace admin
- Éléments de réassurance : aucune donnée personnelle collectée

Style visuel souhaité :
Premium, immersif, dynamique — identité visuelle distincte par univers (✈️ Univers 1 / 🧭🕵️ Univers 2 / 🚀 Univers 3), responsive mobile-first (usage probable sur smartphone étudiant).

Références ou inspirations :
Fiche mission « EDC Career Quest — B2/PGE2 » pour le design system détaillé de l'Univers 2 (boussole, carnet de route, dossier d'enquête, tableau d'indices).

Règles UX :
- Interface claire et immédiate pour un étudiant non technique (aucune friction à l'entrée)
- Actions principales visibles (scan, cours suivant, tirage de question, choix de catégorie)
- Textes simples, orientés bénéfice pour l'étudiant
- Éviter toute complexité inutile côté admin : Stéphanie doit tout piloter seule, sans développeur
- Univers 2 : toujours indiquer à l'étudiant où il en est (B2 ou PGE2, aventure ou détective, quel cours), ce qu'il doit faire, s'il obtient un feedback immédiat ou doit appeler l'intervenante, et quand l'exercice est terminé

## 10. Commandes utiles

À confirmer une fois le projet initialisé (Phase 1 du prompt maître) — inspecter `package.json` et le `README` puis mettre à jour les commandes ci-dessous.

Installation :
```bash
npm install
```

Lancer le projet :
```bash
npm run dev
```

Tester le projet :
```bash
[commande de test — à définir, ex. npm run test]
```

Vérifier la qualité :
```bash
npm run lint
```

Créer une version de production :
```bash
npm run build
```

Si les commandes ne sont pas connues :
Inspecter `package.json`, le `README` et les fichiers de configuration une fois le projet initialisé, puis proposer les commandes pertinentes.

## 11. Règles de travail pour Claude dans ce projet

Avant de modifier :
- Comprendre l'objectif de la tâche et sa phase (Architecture / Univers 1 / Univers 2 / Univers 3 / Admin / Design)
- Identifier les fichiers concernés
- Pour la mission active : vérifier que la modification reste circonscrite à l'Univers 2, sans toucher aux Univers 1/3
- Expliquer brièvement le plan d'action si la modification est importante
- Demander validation avant toute action risquée ou difficile à annuler

Pendant la modification :
- Suivre la séquence de phases définie dans le prompt maître (Phase 1 → 6)
- Ne jamais coder en dur une clé API : toujours `.env.local`
- Ne jamais implémenter de saisie ou stockage de données personnelles étudiantes
- Livrer du code 100% fonctionnel, typé strict, sans placeholder
- Ne pas ajouter de dépendances inutiles ni sur-ingénierer
- Pour l'Univers 2 : respecter l'ordre imposé des exercices (2 Feedback immédiat → 1 Validation intervenante) dans chaque cours ; respecter la règle d'accès B2 (cours 1-3) / PGE2 (cours 1-6)

Après la modification :
- Résumer ce qui a été changé
- Indiquer les fichiers modifiés
- Expliquer comment vérifier que tout fonctionne
- Signaler les limites, risques ou points à améliorer
- Proposer une prochaine étape claire, alignée sur la phase suivante du prompt maître

## 12. Tests et vérification

Méthode de vérification attendue :
Vérifier que chaque univers fonctionne de bout en bout pour un groupe test (scan QR Code → progression → feedback), et que l'espace admin permet de tout piloter sans intervention technique.
Pour la mission active : parcourir un cours de l'Univers 2 de bout en bout comme le ferait un groupe d'étudiants (entrée QR code → exercice 1 et 2 en Mode 1 → exercice 3 en Mode 2 → transition vers le cours suivant).

Données ou scénario de test :
Simuler un groupe B2 (ex. B2-A) parcourant l'Univers 2 en entier — Cours 1 « La boussole professionnelle » (Boussole aléatoire → Carte profil aventurier → Mon cap professionnel) puis vérifier que l'accès s'arrête au Cours 3 ; simuler un groupe PGE2 (ex. PGE2-A) accédant en plus aux Cours 4 à 6 (univers détective) ; simuler un groupe B1 (ex. B1-A) sur l'Univers 1 et un groupe B3 (ex. B3 Finance) sur l'Univers 3, pour confirmer l'absence de régression (hors périmètre de la mission active).

Critères de réussite :
- Le QR Code de chaque groupe redirige vers le bon univers avec les bonnes règles d'accès (ex. B2 vs PGE2 sur l'Univers 2)
- Univers 2 : les exercices de chaque cours s'enchaînent dans le bon ordre (2 Mode 1 puis 1 Mode 2), le design respecte la palette aventure (S1) ou détective (S2) selon le cours, et ne mentionne jamais l'univers avion
- Le moteur de simulation IA (Univers 3) génère un contexte, injecte un incident, et produit un feedback au format défini (non régressé)
- L'espace admin permet de contrôler la mission active et de verrouiller un groupe sans erreur
- Aucune donnée personnelle n'est collectée à aucune étape

## 13. Sécurité et points de vigilance

Claude doit faire attention à :
- Ne jamais exposer de clés API OpenAI/Anthropic ou Supabase
- Ne jamais écrire de secrets dans le code — uniquement dans `.env.local`
- Ne pas supprimer ou écraser de fichiers sans validation
- Vérifier qu'aucune donnée personnelle étudiante n'est collectée ou stockée à aucun moment
- Signaler les risques liés aux coûts d'API (appels IA en Univers 3, potentiellement fréquents en session live) et aux quotas Supabase/Vercel
- Prévenir avant toute modification structurelle importante (schéma Supabase, règles de progression par groupe)
- Prévenir avant toute modification touchant aux Univers 1 ou 3 dans le cadre de la mission de révision de l'Univers 2

Informations sensibles à ne jamais inclure dans le projet :
- Clés API OpenAI / Anthropic
- Credentials Supabase
- Toute donnée personnelle étudiante

## 14. Documentation attendue

Documentation utile :
- Comment lancer le projet en local
- Comment ajouter/modifier un groupe, une mission ou un contenu pédagogique
- Comment fonctionne le moteur de simulation IA (Univers 3)
- Comment utiliser l'espace admin en session live
- Comment fonctionne la distinction Correction de bord / Appel tour de contrôle (Univers 1) et Feedback immédiat / Validation intervenante (Univers 2)
- Emplacement : [ ] README.md — à confirmer avec Stéphanie

## 15. Décisions déjà prises

Décisions importantes :
- Stack : Next.js 15 + TypeScript strict + Tailwind + Shadcn UI + Supabase — pour rapidité de mise en place et écosystème mature
- Pas de compte étudiant, entrée uniquement via QR Code de groupe — pour simplicité d'usage en salle et confidentialité
- Progression pilotée uniquement par l'espace admin — pour permettre à Stéphanie de garder le contrôle pédagogique en direct
- Découpage en 4 sous-agents (Univers 1, Univers 2, Univers 3, Admin/Infra) — pour paralléliser le développement de blocs fonctionnels indépendants
- Univers 1 : chaque checkpoint suit l'ordre « 2 exercices correction immédiate, 1 exercice validation intervenante » — raison : cohérence pédagogique (savoirs simples d'abord, nuance ensuite)
- **Univers 2 : même logique de progression que l'Univers 1** (2 exercices Mode 1, 1 exercice Mode 2 en clôture de chaque cours) — raison : cohérence pédagogique transversale entre univers, malgré des vocabulaires et univers narratifs distincts
- **Univers 2 : vocabulaire de non-mémorisation différent de l'Univers 1** — les expressions « trace enregistrée », « production à reporter dans le livrable », « élément conservé par l'application », « historique sauvegardé » sont toutes bannies (contrairement à l'Univers 1 qui impose « Production à reporter dans le livrable ») — raison : éviter la confusion entre les conventions propres à chaque univers
- Univers 1 : l'application ne conserve aucune donnée ni historique de groupe entre les sessions — raison : confidentialité et simplicité d'usage en présentiel ; **règle identique pour l'Univers 2**

Choix refusés :
- Univers 1 : génération automatique du livrable semestriel de l'étudiant par l'application — raison : l'intervenante doit garder la main sur l'évaluation et la personnalisation du livrable
- **Univers 2 (Cours 3) : génération d'un post LinkedIn prêt à publier par l'application** — raison : l'objectif est de déclencher la réflexion personnelle de l'étudiant, pas de rédiger le contenu à sa place

Si une décision technique importante doit être prise :
Expliquer les options simplement, recommander une option, puis attendre validation si l'impact est important.

## 16. Questions ouvertes

Questions à clarifier :
- Calendrier de livraison souhaité (à caler sur le planning des cours EDC Paris)
- Un projet Supabase et des credentials sont-ils déjà créés ? (hypothèse du prompt maître : oui)
- Le déploiement cible Vercel avec connexion GitHub est-il déjà en place ? (hypothèse du prompt maître : oui)
- Le design system des univers aventure/détective (Univers 2) doit-il porter des éléments de la charte SJ Conseil, ou rester totalement autonome dans ses univers thématiques ?
- Le contenu des exercices de l'Univers 2 (questions de la boussole, profils types, fiches jobboards, scènes de pitch) doit-il être stocké de façon statique dans Supabase (table `contents`), ou existe-t-il un besoin de génération dynamique ? **Hypothèse** : contenu statique, à l'image des choix faits pour l'Univers 1.

Si une information manque :
Faire une hypothèse raisonnable, l'indiquer clairement, puis avancer si le risque est faible. Demander validation si le risque est élevé (ex. schéma de base de données, règles d'accès par groupe).

## 17. Définition de terminé

La tâche ou le projet est considéré comme terminé quand :
- Les 9 groupes sont opérationnels avec QR Code fonctionnel
- Les 3 univers pédagogiques sont développés et testés de bout en bout
- L'espace admin permet un pilotage complet en session live
- Le design premium et immersif est appliqué et responsive mobile-first
- Aucune donnée personnelle étudiante n'est collectée

Livrables attendus (projet global) :
- Application Next.js déployée sur Vercel
- Base Supabase configurée et peuplée (contenus des 3 univers)
- Espace admin fonctionnel
- README de déploiement et d'utilisation

Livrables attendus (mission active — Univers 2) :
- Composants Next.js des 6 cours B2/PGE2 conformes à la fiche mission (tableau d'exercices, écrans, boutons, feedback)
- Design system Univers 2 appliqué de façon cohérente (univers aventure au S1, détective au S2, palettes et pictogrammes dédiés)
- Règle d'accès B2 (cours 1-3) / PGE2 (cours 1-6) opérationnelle
- Univers 1 et 3 non régressés

Dernière vérification :
Vérifier que le résultat correspond à l'objectif initial (animation des cours Atelier Carrière EDC Paris), puis fournir un résumé final avec les prochaines étapes recommandées (ex. génération des contenus manquants pour les cours 4-6, session pilote avec un groupe test B2 et PGE2).
