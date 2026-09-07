# CLAUDE.md — Instructions du projet EDC Career Quest

<!--
MODE D'EMPLOI
Ce fichier donne à Claude Code le contexte spécifique du projet EDC Career Quest.
Il complète (sans remplacer) le CLAUDE.md global de Stéphanie.

Mise à jour V3.3 : révision ciblée des parcours B2, PGE2 et création du parcours B3.

À faire :
- Ne jamais ajouter de mot de passe, clé API, token ou information sensible (voir section 13)
- Conserver la structure pédagogique existante (univers, checkpoints, progression)
- Appliquer uniquement les modifications ciblées listées dans la fiche mission V3.3
- Tester chaque parcours indépendamment avant déploiement
-->

## 1. Résumé du projet

Nom du projet : **EDC Career Quest — Version 3.3**

Type de projet :
- [x] Application web
- [x] Outil interne (pédagogique)
- [x] Amélioration d'un projet existant

Objectif principal :
Mettre à jour la plateforme pédagogique EDC Career (Vador OS) selon les spécifications V3.3 en appliquant des modifications ciblées sur les parcours B2, PGE2 et B3. L'objectif est d'améliorer la qualité pédagogique sans reconstruire l'architecture existante : correction du nombre de missions B2, boussole aléatoire, transformation des générations automatiques en ateliers guidés, création de trois missions B3 immersives, et intégration des modalités d'évaluation (50% note orale + 50% note groupe écrite).

Résultat attendu :
Application Next.js déployée (Vercel) avec trois univers pédagogiques fonctionnels et testés :
- **Univers 1 — Passeport vers le Stage** (B1/PGE1) : stabilisé, non modifié par V3.3
- **Univers 2 — Expédition Professionnelle** (B2/PGE2) : révision ciblée (3 missions B2, mission 1 avec boussole aléatoire + mini quiz de personnalité, atelier guidé, révélateur d'idées, même corrections appliquées à PGE2 S1, conservation de PGE2 S2)
- **Univers 3 — La Mission** (B3) : création de 3 missions immersives dans l'univers existant (communication professionnelle, conduite de réunion, synthèse 48h)

**Tâche en cours (mission active) :** Mise à jour V3.3 selon fiche mission "EDC Career Quest — V3.3" (`fiche-edc-career-v3.3.docx`). **B2 et PGE2 déployés en production le 2026-09-07.** B3 codé et testé mais **volontairement non déployé** (à la demande de Stéphanie, le temps de valider séparément) — la production tourne encore sur l'ancien système B3 à 6 missions IA. Voir section 17 "Journal V3.3" pour le détail.

## 2. Contexte métier

Pourquoi ce projet existe :
Améliorer la qualité pédagogique de la plateforme EDC Career en corrigeant les parcours B2, en enrichissant les ateliers guidés (boussole aléatoire, non-génération de livrables), et en créant des missions B3 immersives et de synthèse. La mise à jour répond à des remontées d'usage et aux évolutions pédagogiques souhaitées par Stéphanie.

Qui va utiliser le résultat :
- [x] Des apprenants (étudiants EDC Paris, B1 à B3)
- [x] Moi-même (Stéphanie) en tant qu'administratrice et intervenante (pilotage en direct, animation des ateliers)

Niveau technique des utilisateurs finaux :
- [x] Non technique (étudiants — simple scan de QR Code)
- Intervenante (Stéphanie) : interface admin intuitive, pilotage sans code

Ce qui compte le plus :
- [x] Design professionnel (immersif, distinct par univers, impact pédagogique)
- [x] Fiabilité (usage en direct en salle de cours devant des groupes)
- [x] Sécurité / confidentialité (aucune donnée personnelle étudiante collectée ou stockée)
- [x] Facilité de maintenance (pilotage 100% via interface admin, pas d'intervention technique requise)
- [x] Guidage pédagogique (ne pas faire le travail à la place des étudiants, favori réflexion personnelle)

## 3. Périmètre du projet

Ce que le projet doit faire :
- **Correction B2** : afficher 3 missions au lieu de 6 (Profil professionnel, Image professionnelle, Communication professionnelle)
- **Boussole professionnelle aléatoire (B2 Mission 1, Temps 1)** : fonctionnement aléatoire, quatre directions (Nord/Est/Sud/Ouest), pistes spécifiques par question, aide courte à la réflexion, relance personnalisée, message obligatoire "Ces pistes sont là pour t'aider à réfléchir. Choisis, adapte ou reformule avec tes propres mots."
- **Mini quiz de personnalité professionnelle (B2 Mission 1, Temps 2)** : 20 questions, 4 réponses par question, quatre profils ludiques et professionnels (A = Le moteur de l'expédition, B = Le gardien de la carte, C = L'éclaireur d'idées, D = Le créateur de liens), scoring automatique, affichage résultat personnalisé avec traduction professionnelle, apports en groupe, points à valoriser, vigilance et phrase à compléter
- **Atelier guidé image professionnelle (B2 Mission 2)** : aucune génération automatique de profil LinkedIn complet, critères de qualité, exemples partiels, feedbacks courts
- **Révélateur d'idées (B2 Mission 3)** : aider l'étudiant à identifier une idée de prise de parole (pas générer un post LinkedIn prêt à publier)
- **Application PGE2 S1** : réutiliser les composants B2 corrigés (boussole, atelier, révélateur) pour les 3 premières séances PGE2
- **Préservation PGE2 S2** : conserver l'univers détective et la fonctionnalité "Qui est en face de moi ?"
- **Création B3** : trois missions dans l'univers existant "🎯 La mission"
  - Séance 1 : Communication professionnelle sensible (relance, retard, erreur, désaccord, feedback, etc.)
  - Séance 2 : Conduite de réunion efficace (objectif, ordre du jour, participants, suivi, synthèse)
  - Séance 3 : Mission immersive "48h pour reprendre le contrôle" (contexte, alertes aléatoires, décisions, note de synthèse)
- **Évaluation intégrée** : 50% note orale individuelle + 50% note groupe écrite pour chaque niveau
- **Alignement rédactionnel** : utiliser systématiquement le féminin "intervenante"

### 3.1. Spécification détaillée — Mini Quiz de Personnalité Professionnelle (B2 M1, Temps 2)

Le mini quiz est un outil de réflexion ludique destiné à aider l'étudiant à identifier son profil professionnel dominant et ses points d'appui.

**Principes fondamentaux :**
- Pas un test psychométrique scientifique — présenter comme outil de réflexion personnel
- Aucun stockage de réponses ou résultats
- 20 questions fixes, 4 réponses par question (A/B/C/D)
- Scoring client uniquement (Math.random(), pas d'API)
- Affichage du profil dominant à la fin

**Quatre profils ludiques et traductions professionnelles :**

| Lettre | Profil ludique | Traduction professionnelle |
|--------|----------------|--------------------------|
| A | Le moteur de l'expédition | Orienté action, initiative et résultat |
| B | Le gardien de la carte | Organisé, fiable et structurant |
| C | L'éclaireur d'idées | Créatif, curieux et adaptable |
| D | Le créateur de liens | Relationnel, coopératif et communicant |

**Affichage du résultat (complet pour chaque profil) :**
1. Nom ludique + traduction professionnelle
2. Ce que tu apportes dans un groupe (4 bullets)
3. À valoriser professionnellement (5 skills)
4. Point de vigilance (1 phrase)
5. Phrase à compléter (ex. "Dans un contexte professionnel, mon énergie peut m'aider à…")

**Messages obligatoires :**
- **Avant le quiz :** "Répondez spontanément aux 20 questions. Il n'y a pas de bonne ou de mauvaise réponse. Ce quiz vous aide à identifier votre profil professionnel dominant et vos points d'appui pour progresser."
- **Après le résultat :** "Ce résultat n'est pas une étiquette définitive. Il sert à t'aider à mieux comprendre tes points d'appui et à préparer ta présentation orale."

**Fin de mission :**
Afficher : "Préparez une présentation courte de votre boussole et de votre profil de personnalité professionnelle. Présentez-la à votre intervenante pour votre notation."

Ce que le projet ne doit pas faire pour l'instant :
- ❌ Reconstruire toute l'architecture ou l'infrastructure existante
- ❌ Modifier les parcours B1 ou tout élément hors périmètre V3.3
- ❌ Supprimer ou dégrader les fonctionnalités existantes non listées
- ❌ Générer automatiquement des profils LinkedIn, posts, messages ou documents professionnels complets
- ❌ Utiliser le traitement IA (NLP, génération lourde) dans la mission B3 immersive
- ❌ Utiliser le masculin pour "intervenant" — toujours "intervenante"
- ❌ Afficher des pistes génériques identiques pour toutes les questions (ex. boussole)
- ❌ Stocker les données étudiantes dans la plateforme
- ❌ Créer de fonction de partage automatique (LinkedIn, email, etc.)
- ❌ Présenter le quiz comme un outil de diagnostic ou de classification définitive

Version souhaitée :
- [x] Version robuste pour usage réel (utilisation en direct en salle de cours)
- [x] Amélioration ciblée d'un projet existant (mise à jour V3.3)

Priorité principale :
Appliquer les modifications V3.3 de manière complète, testable et non régressive. L'ordre de traitement suggéré : B2 (3 missions + boussole aléatoire) → PGE2 S1 (mêmes corrections) → PGE2 S2 (conservation) → B3 (création des 3 missions).

## 4. Contraintes importantes

Contraintes de temps :
À caler sur le calendrier des cours EDC Paris 2025-2027. Voir Notion "Cours 2025-2027" pour les dates de session.

Contraintes de budget :
Privilégier les outils gratuits/peu coûteux déjà identifiés : Supabase, Vercel, npm qrcode. Pas d'ajout de dépendances externes coûteuses.

Contraintes techniques :
- **Stack imposé** : Next.js 15 App Router, TypeScript strict, Tailwind CSS, Shadcn UI, Supabase backend, Vercel deployment
- **Pas de traitement IA dans B3 immersive** : la mission doit rester purement scénaristique, sans NLP ou génération de contenu par l'application
- **Univers isolés** : vocabulaire différent par univers, jamais de mélange (ex. pas de métaphore avion dans Univers 2 ou 3)
- **Aucune donnée étudiante stockée** : l'application oublie tout après chaque session (univers avec vocabulaire spécifique au lieu de traçabilité)

Contraintes de design :
- Immersif et distinct par univers (🧭 aventure S1 + 🕵️ détective S2 pour Univers 2 ; 🎯 mission pour Univers 3)
- Responsive mobile-first (QR Code scan → usage sur téléphone ou tablette)
- Design premium, cohérent avec la charte SJ Conseil (couleurs, typographie, minimalisme dramatique)
- Peu de texte, beaucoup d'action, feedback court et visuel

Contraintes de pédagogie :
- Ne jamais faire le travail à la place de l'étudiant (ex. pas de LinkedIn généré, pas de post LinkedIn complet)
- Toujours guider vers la réflexion personnelle, pas vers une réponse unique
- Boussole aléatoire pour éviter la mémorisation inter-groupes
- Deux modes de feedback : Mode 1 (feedback immédiat) et Mode 2 (validation par l'intervenante)
- Chaque cours = 2 exercices Mode 1 + 1 exercice Mode 2

Contraintes de confidentialité / RGPD :
- Aucune collecte de données personnelles (nom, email, données de contact)
- Aucun stockage de données entre les sessions
- Entrée uniquement via QR Code de groupe (pas de création de compte)
- Respect de la vie privée des étudiants

## 5. Outils, plateformes et technologies

Outils ou plateformes imposés :
- **Frontend** : Next.js 15 App Router, TypeScript strict, Tailwind CSS, Shadcn UI
- **Backend** : Supabase (PostgreSQL)
- **Déploiement** : Vercel
- **QR Code** : npm qrcode
- **API** : OpenAI/Anthropic (uniquement pour Univers 1 et 3, pas pour B3 en V3.3)

Outils ou plateformes à éviter :
- Pas de nouvelle dépendance lourde (ex. pas de framework CSS supplémentaire)
- Pas d'API externe coûteuse ou non justifiée
- Pas de base de données alternative (Supabase est imposé)

## 6. Structure du projet

Dossiers ou fichiers importants (structure réelle — un seul routing dynamique `[slug]`, pas de dossiers séparés par niveau) :
- `src/app/[slug]/page.tsx` : point d'entrée unique. Récupère le groupe (Supabase `groups`) par son slug de QR Code, puis dispatch vers `Univers1Page` / `Univers2Page` / `Univers3Page` selon `group.universe`
- `src/components/univers1/` : parcours Univers 1 "Passeport vers le Stage" (B1/PGE1) — stabilisé, ne pas modifier
- `src/components/univers2/` : parcours Univers 2 "Expédition Professionnelle" (B2/PGE2)
  - `Cours1Boussole.tsx` + `CompassDial.tsx` : boussole professionnelle aléatoire B2 M1 Temps 1 (aléatoire, pistes spécifiques par question)
  - `Cours1Quiz.tsx` : **NOUVEAU** — mini quiz de personnalité professionnelle B2 M1 Temps 2 (20 questions, 4 profils, scoring client)
  - `Cours2Linkedin.tsx` : atelier guidé image professionnelle (B2 M2, pas de génération de profil)
  - `Cours3RevelateurIdees.tsx` : révélateur d'idées LinkedIn (B2 M3, pas de génération de post)
  - `Cours4EnqueteJobboards.tsx` / `Cours5PitchProfessionnel.tsx` / `Cours6Strategie30Jours.tsx` : séances PGE2 S2 (univers détective, conservées)
  - `shared/` (thème aventure) et `shared/*Detective*` (thème S2) : header/badge/stepper d'exercice
- `src/components/univers3/` : parcours Univers 3 "La Mission" (B3) — **en production : encore l'ancien système à 6 missions pilotées par IA** (`HorizonShell.tsx` + `/api/horizon/generate`). La refonte V3.3 (3 missions statiques sans IA : `Mission1CommunicationSensible.tsx`, `Mission2ReunionEfficace.tsx`, `Mission3ImmersionControle.tsx`, `shared/`, `src/lib/content/univers3.ts`) est **codée et testée mais volontairement non déployée** — voir section 17
- `src/lib/content/` : contenu pédagogique statique en TypeScript (questions, pistes, feedbacks, scénarios) — `univers2*.ts` (déployé) et `univers3.ts` (en attente, voir section 17)
- `src/app/admin/` + `src/app/api/admin/` : interface d'administration (pilotage de mission active, verrouillage, planning, gestion des groupes)
- `src/components/` : composants réutilisables (mission card, feedback, boutons partagés en `src/components/shared/`)
- `src/lib/` : utilitaires (Supabase, QR Code, constantes, contenu)
- `public/` : assets (logos univers, icônes, images)
- `CLAUDE.md` : ce fichier (contexte du projet pour Claude Code)

Fichiers à ne pas modifier sans validation :
- `src/lib/supabase/` : clients et logique d'accès Supabase (auth admin, requêtes groupes)
- Schéma/contenu de la table Supabase `missions` : gérée directement dans Supabase (pas de fichier de migration dans ce repo)
- `.env.local` : secrets (clés API, credentials Supabase)
- `src/components/univers1/` : Univers 1 (en dehors du périmètre V3.3)

Fichiers ou dossiers à ignorer :
- `/node_modules/`
- `.git/`
- `.vercel/`
- `/dist/` ou `/.next/`

## 7. Données, fichiers et contenus

Sources utilisées :
- [x] Supabase (tables de contenus pédagogiques : questions boussole, critères, scenarios)
- [x] Configuration statique (constantes TypeScript pour univers, couleurs, textes)
- Document de spécifications V3.3 (pour tous les contenus manquants)

Emplacement des données :
- Contenus pédagogiques : tables Supabase (`questions`, `pistes`, `feedback`, `scenarios`, etc.)
- Configuration statique : fichiers TypeScript dans `/lib/constants/`
- Assets : `/public/univers/`

Format d'entrée :
- Questions de la boussole : tableau JSON `{ direction: string, questions: [{ question, aide, pistes[], relance }] }`
- Questions du quiz : tableau JSON `{ id, texte, reponses: [{ lettre, texte }] }`
- Résultats quiz : objet JSON `{ A: { nom, traduction, apports[], valorisation[], vigilance, phrase }, B: {...}, C: {...}, D: {...} }`
- Pistes boussole : tableau spécifiques, jamais génériques
- Feedback : objet JSON `{ type: "success" | "alert" | "neutral", message: string }`

Format de sortie attendu :
- Composants React pour chaque mission
- Pages Next.js pour chaque univers/niveau
- Interface admin pour Stéphanie (pilotage en direct)

Règles de traitement :
- Les questions de la boussole (B2 M1 Temps 1) doivent être **aléatoires** (Math.random())
- Les pistes affichées doivent être **spécifiques à la question**, jamais génériques
- Le mini quiz (B2 M1 Temps 2) doit être présenté comme **outil de réflexion ludique**, jamais comme test diagnostique ou classification définitive
- Le scoring du quiz doit rester **côté client** (aucun stockage, aucun envoi serveur)
- Les résultats du quiz doivent afficher **le profil dominant uniquement** (pas de profils secondaires ou scores)
- Les feedbacks doivent être **courts** (une phrase, max 2 lignes)
- L'application doit **ne jamais générer de livrable complet** (LinkedIn, post, document)
- L'univers avion (Univers 1) ne doit **jamais** apparaître dans Univers 2 ou 3

Données sensibles :
- Aucune donnée personnelle étudiante ne doit être collectée, affichée ou stockée
- Les clés API OpenAI/Anthropic doivent rester dans `.env.local`, jamais dans le code source
- Les credentials Supabase (clé secrète, URL) doivent rester confidentiels

## 8. Site web, page web ou application

Objectif de l'interface :
Créer une expérience pédagogique gamifiée immersive qui guide les étudiants à travers des ateliers carrière différenciés par niveau, sans stocker leurs données personnelles, pilotée en direct par l'intervenante.

Pages ou écrans nécessaires :

### Univers 1 — Passeport vers le Stage (B1/PGE1) — *Stabilisé*
- Écran d'accueil (scan QR Code → détection groupe B1)
- 6 checkpoints (progression séquentielle)
- Chaque checkpoint : 2 exercices Mode 1 (feedback immédiat) + 1 exercice Mode 2 (validation intervenante)

### Univers 2 — Expédition Professionnelle (B2/PGE2) — *En révision V3.3*
- **Semestre 1 — Univers 🧭 aventure** (B2 + PGE2)
  - **Mission 1 — Profil professionnel** (2 temps) :
    - Temps 1 : Boussole professionnelle aléatoire (4 directions, pistes spécifiques, feedback immédiat)
    - Temps 2 : Mini quiz de personnalité professionnelle (20 questions, 4 profils, résultat personnalisé)
  - **Mission 2 — Image professionnelle** (atelier guidé LinkedIn, pas de génération)
  - **Mission 3 — Communication professionnelle** (révélateur d'idées, pas de génération de post)
  - 3 séances PGE2 S1 (mêmes que B2)
  - Chaque mission (sauf M1 qui a 2 temps) : 2 exercices Mode 1 + 1 exercice Mode 2
- **Semestre 2 — Univers 🕵️ détective** (PGE2 uniquement)
  - 3 séances PGE2 S2 (Exploration opportunités, Relations professionnelles, Concrétisation projet)
  - Avec fonctionnalité "Qui est en face de moi ?" conservée

### Univers 3 — La Mission (B3) — *Création V3.3*
- **Séance 1** : Communication professionnelle sensible
- **Séance 2** : Conduite de réunion efficace
- **Séance 3** : Mission immersive "48h pour reprendre le contrôle" (alertes aléatoires, note de synthèse finale)

### Espace Admin (Stéphanie)
- Liste des 9 groupes (QR Codes associés)
- Contrôle de la mission active (univers, niveau, cours en cours)
- Verrouillage/déverrouillage de groupes
- Vue test pour prévisualiser en tant qu'étudiant

Contenus importants :
- **Titre principal** : "EDC Career Quest" ou titre univers selon la page
- **Promesse** : Clarifier le but pédagogique de chaque exercice (ex. "Découvre ton profil professionnel")
- **CTA principal** : Boutons clairs ("Lancer la mission", "Voir des pistes", "Remettre la synthèse", etc.)
- **Sections obligatoires** : Texte initial (contexte), exercice/question, feedback, transition vers exercice suivant
- **Éléments de réassurance** : "Ces pistes t'aident à réfléchir, pas à la place de toi" ; "Présente-la à ton intervenante pour notation"

Style visuel souhaité :
- **Univers 1** : Univers avion (décollage, tour de contrôle, embarquement, équipage) — palette bleu ciel/or
- **Univers 2 S1** : Univers aventure (boussole, routes, expédition) — palette verte/bronze
- **Univers 2 S2** : Univers détective (enquête, indices, piste) — palette grise/noir/bronze
- **Univers 3** : Univers mission (stratégie, décision, timeline) — palette bleu marine/or/noir
- Style général : **premium, minimaliste, dramatique** (fort contraste, peu de texte, beaucoup d'impact visuel)

Références ou inspirations :
- Charte SJ Conseil : couleurs (ivoire, or/bronze, noir, navy), typographie (Bebas Neue display, Gill Sans body), minimal high-contrast
- TEDx : slides d'impact, peu de texte, questions puissantes
- Gamification : progression visible, feedback rapide, petit défi par étape

Règles UX :
- L'interface doit être claire pour un étudiant non technique (scan QR → action immédiate)
- Les actions principales doivent être visibles et un seul bouton principal par écran
- Les textes doivent être simples, orientés vers l'action, pas vers l'information
- Responsive mobile-first (QR scan = accès mobile)
- Pas de formulaires longs, pas d'écrans chargés
- Feedback court et visuel (couleur, icône, message sur 1-2 lignes)
- Ne jamais préemplir ou générer une réponse à la place de l'étudiant

## 9. Commandes utiles

Installation :
```bash
npm install
```

Lancer le projet en local :
```bash
npm run dev
# À l'adresse http://localhost:3000
```

Tester le projet :
```bash
npm run test
# ou
npm run test:watch
```

Vérifier la qualité :
```bash
npm run lint
npm run format
```

Créer une version de production :
```bash
npm run build
```

Déployer sur Vercel :
```bash
vercel deploy
# ou connexion GitHub automatique via Vercel Dashboard
```

## 10. Règles de travail pour Claude dans ce projet

Avant de modifier :
- Comprendre précisément ce qui doit changer (relire la fiche mission V3.3)
- Identifier les fichiers concernés (ne modifier que ce qui est listé)
- Expliquer brièvement le plan d'action
- Demander validation avant toute modification risquée (schéma base de données, règles d'accès par groupe)

Pendant la modification :
- Appliquer uniquement les modifications V3.3 listées, ne rien de plus
- Conserver les fonctionnalités existantes non concernées
- Éviter la sur-ingénierie
- Ne pas ajouter de dépendances inutiles
- Garder le code compréhensible et maintenable
- Vérifier que le vocabulaire/univers est cohérent (pas de mélange d'univers dans un écran)

Après la modification :
- Résumer ce qui a été changé (fichiers touchés)
- Indiquer comment vérifier que tout fonctionne (test scenario pour chaque niveau)
- Signaler les limites, risques ou points à améliorer
- Proposer une étape suivante claire (ex. créer les questions manquantes pour la boussole, tester B2 M1 avec un groupe simulation, etc.)

## 11. Tests et vérification

Méthode de vérification attendue :
Parcourir chaque univers/niveau de bout en bout comme le ferait un groupe d'étudiants :
1. Scan QR Code → identification du groupe et univers correct
2. Navigation mission → exercices s'enchaînent dans le bon ordre
3. Feedback affichage → messages clairs et cohérents avec le mode (immédiat ou validation)
4. Design → palette et univers narratif cohérents, responsive mobile
5. Admin → Stéphanie peut verrouiller un groupe, changer de mission active
6. Aucune donnée sensible exposée

Données ou scénario de test :

**Univers 1 — B1** (validation de non-régression) :
- QR Code groupe B1-A → accès Univers 1 "Passeport vers le Stage"
- Parcourir un checkpoint complet (2 exercices Mode 1 + 1 Mode 2)
- Vérifier que le vocabulaire "Production à reporter dans le livrable" est utilisé

**Univers 2 — B2** (cible de la mise à jour) :
- QR Code groupe B2-A → accès Univers 2 "Expédition Professionnelle"
- Mission 1 (Boussole) : tirer une question au hasard × 3 fois, vérifier que chaque question a des pistes spécifiques, message final "Présentez-la à votre intervenante"
- Mission 2 (Image professionnelle) : parcourir l'atelier guidé, vérifier qu'aucun profil LinkedIn n'est généré, affichage de critères/feedback
- Mission 3 (Communication) : parcourir le révélateur d'idées, vérifier qu'aucun post LinkedIn n'est généré, guidance vers réflexion personnelle
- Vérifier accès arrêté après Mission 3 (pas accès Missions 4-6)

**Univers 2 — PGE2 S1** (même test que B2 pour les 3 premières séances)

**Univers 2 — PGE2 S2** (validation de conservation) :
- QR Code groupe PGE2-A → accès Univers 2 "Dossier Alternance & Stage"
- Parcourir fonctionnalité "Qui est en face de moi ?" (scène visuelle, identification interlocuteur)
- Vérifier que design détective (🕵️) est appliqué

**Univers 3 — B3** (création V3.3) :
- QR Code groupe B3 Finance → accès Univers 3 "La Mission"
- Séance 1 : Message professionnel sensible
- Séance 2 : Ordre du jour + plan de réunion
- Séance 3 : Mission immersive, tirer une alerte au hasard × 3 fois, remplir note de synthèse
- Vérifier que design mission (🎯) est appliqué, pas d'IA embarquée

**Admin** :
- Se connecter à l'espace admin avec credentials
- Lister les 9 groupes, scanner un QR Code
- Verrouiller un groupe, déverrouiller
- Changer la mission active (ex. passer de B2 M1 à B2 M2)
- Prévisualiser en tant qu'étudiant (voir l'app du point de vue B2-A)

Critères de réussite :
- ✅ Chaque QR Code redirige vers le bon univers/niveau
- ✅ Les règles d'accès B2 (3 missions) et PGE2 (6 séances) sont opérationnelles
- ✅ Boussole B2 M1 fonctionne en aléatoire avec pistes spécifiques
- ✅ Pas de génération automatique de livrable (LinkedIn, post, etc.)
- ✅ Design cohérent par univers et par semestre (aventure vs détective pour Univers 2)
- ✅ Tous les textes finaux demandent "l'intervenante" (féminin)
- ✅ Pas de mélange d'univers narratifs (avion jamais dans U2 ou U3)
- ✅ Univers 1 et 3 non régressés
- ✅ Aucune donnée personnelle stockée
- ✅ Admin fonctionne : verrouillage, changement de mission active

## 12. Sécurité et points de vigilance

Claude doit faire attention à :
- **Ne jamais exposer** de clés API OpenAI / Anthropic / Supabase dans le code source
- **Écrire les secrets uniquement** dans `.env.local` (jamais dans le repo public)
- **Ne pas supprimer ou écraser** de fichiers sans validation (ex. contenu d'une mission existante)
- **Vérifier qu'aucune donnée personnelle** n'est collectée, affichée, ou stockée à aucun moment (RGPD)
- **Signaler les risques** : coûts d'API (appels IA pour U3 si implémentés), quotas Supabase/Vercel, limites de déploiement
- **Prévenir avant modification structurelle** : changement de schéma Supabase, règles d'accès par groupe, modification des Univers 1 ou 3
- **Tester la non-régression** : Univers 1 et 3 doivent rester opérationnels sans dégradation

Informations sensibles à ne jamais inclure dans le projet :
- Clés API OpenAI / Anthropic
- Credentials Supabase (clé secrète, URL de connexion, token)
- Mots de passe admin (credentials Stéphanie)
- Toute donnée personnelle étudiante réelle (noms, emails, données de contact)

## 13. Documentation attendue

Documentation utile à maintenir/créer :
- **README.md** : comment lancer le projet en local, déployer, accéder à l'admin
- **CLAUDE.md** (ce fichier) : contexte du projet pour Claude Code
- **Architecture.md** (optionnel) : structure des univers, logique de progression, regles d'accès par groupe
- Commentaires en code : sections sensibles (aléatoire dans boussole, validation par intervenante, règles d'univers)
- **Fiche mission V3.3** : spécifications détaillées (disponible dans `fiche-edc-career-v3.3.docx`)

Emplacement souhaité :
- README.md : racine du projet
- CLAUDE.md : racine du projet (ce fichier)
- Commentaires en code : `/app/`, `/lib/`, `/components/`

## 14. Décisions déjà prises

Décisions importantes :
- **Stack** : Next.js 15 + TypeScript strict + Tailwind + Shadcn UI + Supabase — pour rapidité, écosystème mature, productivité
- **Entrée** : QR Code de groupe uniquement (pas de compte étudiant) — pour simplicité d'usage et confidentialité
- **Progression** : pilotée par l'espace admin (Stéphanie contrôle en direct) — pour agentivité pédagogique
- **Univers 1** : stabilisé, ne pas modifier dans V3.3
- **Univers 2** : logique 2 Mode 1 + 1 Mode 2 par cours (cohérence pédagogique)
- **Univers 2** : vocabulaire de non-mémorisation différent de U1 (pas "trace enregistrée" ni "production à reporter")
- **Univers 2** : aucun univers avion (réservé à U1) — utiliser avion/détective
- **Univers 2** : pas de génération automatique de profil LinkedIn, post, ou livrable
- **Univers 3** : purement scénaristique (pas d'IA embarquée pour V3.3)
- **Évaluation** : 50% note orale individuelle + 50% note groupe écrite

Choix refusés :
- Génération automatique de livrable final par l'application (ex. profil LinkedIn complet)
- Utilisation de traitement IA lourd dans B3 (rester scénaristique)
- Stockage de données étudiantes entre les sessions
- Mélange de vocabulaires d'univers (avion uniquement en U1)

Si une décision technique importante doit être prise :
Expliquer les options simplement, recommander une option, puis attendre validation de Stéphanie si l'impact est élevé (ex. schéma base de données, nouvelles permissions, coûts API).

## 15. Questions ouvertes

Questions à clarifier avec Stéphanie :
- Calendrier de livraison de V3.3 (à caler sur planning des cours EDC)
- Credentials Supabase déjà créés et fonctionnels ? (hypothèse : oui)
- Déploiement Vercel avec connexion GitHub déjà en place ? (hypothèse : oui)
- Le contenu des exercices V3.3 (questions boussole, pistes, scenarios B3) doit-il être généré ou importé ? (hypothèse : générer selon spécifications)
- Sessions de test avec groupes réels avant déploiement ? (recommandé avant usage en cours)

Si une information manque :
Faire une hypothèse raisonnable, l'indiquer clairement, puis avancer si le risque est faible. Demander validation de Stéphanie si le risque est élevé (ex. schéma base de données, nouvelles permissions, coûts imprévus).

## 16. Définition de terminé

La mise à jour V3.3 est considérée terminée quand :
- ✅ B2 affiche 3 missions (pas 6)
- ✅ Boussole B2 M1 (Temps 1) fonctionne en aléatoire avec pistes spécifiques
- ✅ Mini quiz de personnalité B2 M1 (Temps 2) complètement implémenté :
  - 20 questions, 4 profils A/B/C/D
  - Scoring automatique côté client
  - Affichage résultat avec tous les éléments (nom + traduction + apports + valorisation + vigilance + phrase)
  - Messages obligatoires présents (intro + message de précaution)
  - Aucun stockage de réponses
- ✅ B2 M2 et M3 fonctionnent en ateliers guidés (pas de génération de livrable)
- ✅ Mêmes corrections appliquées aux 3 premières séances PGE2 S1
- ✅ PGE2 S2 conservé et opérationnel
- ⏳ B3 crée 3 missions (communication, réunion, synthèse 48h) — codé et testé localement, **non déployé** (voir section 17)
- ⏳ Mission B3 immersive sans traitement IA — idem, en attente de déploiement
- ✅ Tous les textes finaux demandent "l'intervenante" (féminin)
- ✅ Formulaires d'évaluation intégrés (note orale + note groupe) — pour B2/PGE2 ; pour B3, prêt mais non déployé
- ✅ Univers 1 et 3 non régressés (Univers 3 tourne encore sur l'ancien système en production)
- ✅ Design cohérent par univers (aventure S1, détective S2, mission B3)
- ✅ Aucune donnée étudiante collectée ou stockée

Livrables attendus :
- Codebase Next.js mise à jour et déployable sur Vercel
- Composants React pour chaque parcours corrigé / créé
- CLAUDE.md actualisé (ce fichier)
- Documentation des modifications (changelog ou résumé)
- Base Supabase avec contenus V3.3 (questions, pistes, scenarios)
- Tests de non-régression (U1 et U3 opérationnels)

Dernière vérification :
Vérifier que le résultat correspond à l'objectif V3.3 (corrections ciblées, pas de régression), puis fournir un résumé final avec :
- Fichiers modifiés
- Étapes de déploiement (build → Vercel)
- Prochaines étapes recommandées (test avec groupes réels, ajustements pédagogiques, étapes futures)

## 17. Journal V3.3

### 2026-09-07 (suite) — Mini quiz de personnalité professionnelle B2 M1 codé et testé, non déployé

Implémentation du **mini quiz de personnalité professionnelle** (Temps 2 de B2 M1, Séance 1) à partir de la fiche mission `Fiche_Mission_B2_Seance1_BoussoleQuiz.docx` :
- `src/lib/content/univers2-quiz.ts` : 20 questions fixes, 4 profils A/B/C/D (Le moteur de l'expédition, Le gardien de la carte, L'éclaireur d'idées, Le créateur de liens) avec traduction professionnelle, apports, valorisation, vigilance et phrase à compléter — messages d'intro et de précaution obligatoires inclus
- `src/components/univers2/Cours1Quiz.tsx` : composant du quiz (intro → 20 questions → résultat), scoring 100% côté client (comptage par lettre), aucun stockage
- `src/components/univers2/Cours1Boussole.tsx` : remplacement des anciennes étapes 2 (« Carte profil aventurier ») et 3 (« Mon cap professionnel ») par le nouveau Temps 2 (quiz, mode validation intervenante) — le cours passe de 3 étapes à 2 temps (Boussole puis Quiz), conforme à la section 3.1
- Suppression de `profilsAventuriers` et `CAP_CHAMPS` dans `univers2-cours1.ts` (devenus obsolètes, plus aucune référence ailleurs)

Vérifications effectuées : `npx tsc --noEmit` (0 erreur), `npx eslint` sur les fichiers modifiés (0 erreur), test navigateur complet en local sur `b2-groupe-a` (boussole 4 directions → quiz 20 questions → résultat profil affiché en entier → écran de présentation à l'intervenante), aucune erreur console.

**Statut** : codé et testé localement, **non déployé** (aucun commit) — à la demande implicite de prudence sur cette classe de changement (remplacement d'un flow déjà en production). Décision de déploiement à valider avec Stéphanie.

### 2026-09-07 — B2 et PGE2 déployés en production

Fichiers modifiés et déployés (push sur `main`) :
- `src/components/univers2/Univers2Page.tsx` : le compteur "Mission X / 6" codé en dur est devenu dynamique (`X / 3` pour B2, `X / 6` pour PGE2)
- `src/lib/content/univers2-cours1.ts` + `src/components/univers2/Cours1Boussole.tsx` : la boussole B2 M1 affiche désormais une aide à la réflexion, des pistes spécifiques et une relance **par question tirée** (au lieu de pistes partagées par direction) ; ajout d'un bouton "Tirer une direction au hasard" et du message de rappel obligatoire
- `src/components/univers2/Cours3RevelateurIdees.tsx` : ajout du rappel des modalités d'évaluation (50% oral / 50% écrit) à l'écran de fin de parcours B2

Non modifié — déjà conforme à la V3.3 :
- `Cours2Linkedin.tsx` (atelier guidé, pas de génération de profil) et `Cours3RevelateurIdees.tsx` (révélateur d'idées, pas de génération de post)
- PGE2 S1 (réutilise automatiquement les Cours 1-3 corrigés via `availableFor` dans `univers2.ts`) et PGE2 S2 (détective, "Qui est en face de moi ?" dans `Cours5PitchProfessionnel.tsx`)
- Vocabulaire féminin "intervenante" déjà systématique

Vérifications effectuées : `npx tsc --noEmit` (0 erreur), `npx eslint src/` (0 erreur, 4 avertissements pré-existants hors périmètre), test navigateur en local sur B2 Groupe A (boussole aléatoire OK).

### B3 — codé et testé, volontairement NON déployé (à la demande de Stéphanie, 2026-09-07)

La refonte de l'Univers 3 existe en fichiers locaux non commités dans le répertoire de travail, prête à être déployée plus tard :
- `src/lib/content/univers3.ts` : contenu statique et scénaristique des 3 missions B3 — aucun appel IA
- `src/components/univers3/shared/` : `ExerciseHeader`, `ModeBadge`, `ExerciseStepper`, `MissionHeader` — thème navy/or propre à l'Univers 3
- `src/components/univers3/Mission1CommunicationSensible.tsx`, `Mission2ReunionEfficace.tsx`, `Mission3ImmersionControle.tsx` : les 3 missions B3 destinées à remplacer les 6 missions pilotées par IA
- Une version réécrite de `src/components/univers3/HorizonShell.tsx` (routeur 3 missions statiques) existe aussi en local mais n'a **pas** été appliquée — le fichier déployé est toujours l'original à 6 missions IA

**En production actuellement (non touché)** : `HorizonShell.tsx` (6 missions), `/api/horizon/generate` (appel Anthropic), `/api/simulation/*`, `AlertSession.tsx`, `EventFeed.tsx`, `ScenarioDisplay.tsx`, `SimulationRunner.tsx`, `SimulationLauncher.tsx`, `SimulationFeedbackZone.tsx`, et le compteur admin (`src/app/admin/groupes/[slug]/page.tsx` + `next-mission/route.ts`) toujours plafonné à 6 pour `mission-horizon`.

Vérifications effectuées sur le code B3 en local (non déployé) : `npx tsc --noEmit` (0 erreur), `npx eslint src/` (0 erreur), test navigateur local sur B3 Marketing Digital Mission 3 "48h" (fonctionnel, aucune requête réseau vers une API IA). Non testé : Missions 1 et 2 (même structure de composant que la Mission 3 déjà validée).

**Pour déployer B3 plus tard**, il faudra :
1. Ré-appliquer la réécriture de `HorizonShell.tsx` (router vers `Mission1/2/3` au lieu de M1-M6 avec IA)
2. Supprimer les fichiers IA orphelins listés ci-dessus (`AlertSession.tsx`, `/api/horizon/*`, `/api/simulation/*`, etc.)
3. Replafonner le compteur admin à 3 pour `universe === 'mission-horizon'` dans les 2 fichiers admin listés ci-dessus
4. Mettre à jour la table Supabase `missions` (titres + suppression des lignes 4-6) :
```sql
UPDATE missions SET title = 'Communication professionnelle sensible' WHERE universe = 'mission-horizon' AND number = 1;
UPDATE missions SET title = 'Conduite de réunion efficace' WHERE universe = 'mission-horizon' AND number = 2;
UPDATE missions SET title = 'Mission immersive — 48h pour reprendre le contrôle' WHERE universe = 'mission-horizon' AND number = 3;
DELETE FROM missions WHERE universe = 'mission-horizon' AND number > 3;
```
5. Retester B3 Missions 1 et 2 avant mise en ligne
