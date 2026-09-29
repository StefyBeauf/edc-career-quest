# CLAUDE.md — Instructions du projet EDC Career Quest

<!--
MODE D'EMPLOI
Ce fichier donne à Claude Code le contexte spécifique du projet EDC Career Quest.
Il complète (sans le remplacer) le CLAUDE.md global de Stéphanie.

Mission active : création de la Mission 1 B3 « 🎯 Se vendre sans se survendre ».
Référence : fiche mission `fiche-mission-b3-m1-se-vendre-v2.docx`.

Règles de maintenance de ce fichier :
- N'y ajoutez jamais de mot de passe, clé API, token ni information sensible (voir section 12).
- Gardez-le court : l'historique détaillé va dans la section 16 « Journal ».
- Mettez à jour la section 1 « Tâche en cours » à chaque nouvelle mission.
-->

## 1. Résumé du projet

Nom du projet : **EDC Career Quest (plateforme EDC Career / Vador OS)**

Type de projet : application web pédagogique (outil interne). Il s'agit d'une amélioration d'un projet existant.

Objectif principal :
Plateforme gamifiée qui anime en direct les ateliers carrière des étudiants EDC Paris (B1 à B3, PGE1-PGE2).
- Les étudiants accèdent aux ateliers par QR Code de groupe.
- L'intervenante pilote la séance depuis l'espace admin.
- L'application guide la réflexion. Elle ne produit jamais le travail à la place de l'étudiant.

Trois univers :

| Univers | Public | Thème | Statut |
|---|---|---|---|
| 1 — Passeport vers le Stage | B1 / PGE1 | ✈️ avion | Stabilisé. **Ne pas modifier.** |
| 2 — Expédition Professionnelle | B2 / PGE2 | 🧭 aventure (S1) · 🕵️ détective (S2) | V3.3 déployée le 2026-09-07. Le mini quiz B2 M1 est codé mais non déployé. |
| 3 — La Mission | B3 | 🎯 mission | Refonte locale non déployée : 6 missions (M1 Se vendre à coder, M2 et M3 statiques, M4 à M6 verrouillées). La production tourne encore sur l'ancien système à 6 missions IA. |

### ▶ Tâche en cours

**Créer la Mission 1 B3 « 🎯 Se vendre sans se survendre »** dans l'Univers 3, sur la base de la refonte V3.3 locale (non déployée).
- **Statut (2026-09-29)** : codée et testée en local, non commitée, non déployée. Reste : validation des textes par Stéphanie, test avec un groupe réel, puis procédure de déploiement (section 16).
- Le routeur local est `MissionShell.tsx` (la réécriture de `HorizonShell.tsx` était introuvable).
- Spécification complète : section 3.1.
- Fiche mission : `fiche-mission-b3-m1-se-vendre-v2.docx`.
- **Décision (2026-09-29)** : elle **remplace** « Communication professionnelle sensible » comme Mission 1.
- B3 reste un parcours à **6 missions** : les missions 4 à 6 seront créées plus tard.

## 2. Contexte métier

Pourquoi ce projet existe :
Rendre les ateliers carrière actifs, ludiques et différenciés par niveau. En B3, les étudiants ont déjà travaillé leur CV. La Mission 1 les fait passer de « Je cherche une alternance dans le commerce » à « Je sais expliquer ce que j'apporte, comment je fonctionne et pourquoi mon profil peut intéresser une entreprise ».

Qui utilise le résultat :
- **Étudiants EDC Paris (B1 à B3)**. Ils ne sont pas techniques et accèdent par scan de QR Code, souvent sur mobile. En B3, les profils sont commerce, négociation et business development, en grand groupe.
- **Stéphanie, l'intervenante et administratrice**. Elle pilote en direct, sans code.

Ce qui compte le plus :
- **Fiabilité** : l'outil est utilisé en direct devant des groupes.
- **Guidage pédagogique** : ne jamais faire le travail à la place de l'étudiant.
- **Design** : immersif et distinct par univers.
- **Confidentialité** : zéro donnée étudiante stockée.
- **Maintenance** : pilotage 100 % via l'admin.

## 3. Périmètre du projet

Ce que la mission active doit faire :
- Créer la Mission 1 B3 en **5 étapes**, avec une fiche finale « Mon positionnement commercial » (voir 3.1).
- La brancher comme **Mission 1** dans le routeur Univers 3 de la refonte V3.3 locale (`HorizonShell.tsx` réécrit), à la place de `Mission1CommunicationSensible.tsx`.
- Conserver le parcours B3 à 6 missions : M1 Se vendre · M2 Réunion efficace · M3 48h · M4 à M6 verrouillées.
- Afficher les missions 4 à 6 comme des cartes verrouillées « Mission à venir » (thème 🎯, non cliquables), sans contenu IA.
- Si l'admin active une mission 4 à 6, l'étudiant voit un écran d'attente « Mission à venir » : aucune erreur, aucun ancien contenu.
- Conserver le thème 🎯 navy/or et les composants de `src/components/univers3/shared/`.

Ce que le projet ne doit pas faire :
- ❌ Reconstruire l'architecture, ou modifier l'Univers 1 et l'Univers 2.
- ❌ Déployer B3 sans accord explicite de Stéphanie (voir la procédure en section 16).
- ❌ Générer ou préremplir un pitch, une formulation ou un livrable à la place de l'étudiant.
- ❌ Utiliser un traitement IA dans l'Univers 3 : les feedbacks passent par des heuristiques côté client.
- ❌ Stocker une donnée étudiante côté serveur (Supabase, API, logs).
- ❌ Créer une fonction de partage automatique (LinkedIn, email…).
- ❌ Transformer la séance en atelier CV ou candidature.
- ❌ Écrire « intervenant » au masculin : toujours « intervenante ».

Version souhaitée : version robuste pour un usage réel en salle, livrée comme amélioration ciblée non régressive.

### 3.1. Spécification — Mission 1 B3 « 🎯 Se vendre sans se survendre »

- **Durée** : 25 à 35 min.
- **Format** : diagnostic individuel → échanges en binôme → pitchs express devant l'intervenante.
- **ILO** : C13 en principal, C7 en appui. À renseigner dans les métadonnées de la mission, dans `univers3.ts`.

**Étapes :**

| # | Écran | Mécanique | Mode |
|---|---|---|---|
| 1 | Quel commercial suis-je ? | 6 cartes profils, sélection de 1 ou 2 maximum (blocage au-delà). Feedback court, puis relance obligatoire : « Quelle situation vécue prouve ce style commercial ? » | Mode 1 |
| 2 | Ce que j'apporte vraiment | 3 manches. Une qualité est tirée au hasard, sans doublon, avec 1 re-tirage possible par manche. L'étudiant complète « Cette qualité peut se traduire professionnellement par… ». L'exemple reste masqué par défaut (bouton « Voir un exemple »). | Mode 1 |
| 3 | Se vendre sans se survendre | 9 phrases dans un ordre aléatoire, à classer en Trop vague / Trop prétentieux / Crédible. Drag-and-drop, avec des boutons de repli sur mobile. Correction, score, puis message de synthèse. | Mode 1 |
| 4 | Mon pitch commercial | 5 champs guidés, assemblés automatiquement. Compteur de mots (cible 90–120). Chrono optionnel de 45 s. Option « Adapter à ma cible » (Recruteur / Manager / Client) : une question d'ajustement s'affiche et l'étudiant retouche lui-même son pitch. | Mode 2 (présentation à l'intervenante) |
| 5 | Mon axe de progression | 1 compétence à choisir, puis 3 champs : « Cette année, je veux progresser sur… / Parce que… / Ma première action sera… » | Mode 1 |

**Fiche finale « Mon positionnement commercial » :**
1. Mon style dominant, avec la situation qui le prouve.
2. Mes 3 forces commerciales (issues de l'étape 2).
3. Ce que je peux apporter.
4. Mon pitch en 45 s.
5. Mon axe de progression.

Actions proposées sur la fiche : Modifier · Copier / Imprimer (côté client uniquement) · Mode présentation (grand format) · Valider ma fiche. L'écran de fin rappelle l'évaluation : 50 % oral / 50 % écrit groupe.

**Feedback (heuristiques client, aucune IA) :**

| Verdict | Règle |
|---|---|
| Vague | Moins de 8 mots, ou absence de verbe d'action commercial (prospecter, relancer, argumenter, suivre, conseiller, négocier…). |
| Prétentieux | Présence de marqueurs de survente (« excellent », « le meilleur », « n'importe quoi », « meilleur que », superlatifs absolus). |
| Crédible | Tous les autres cas. |

Règles communes à tous les feedbacks :
- 1 à 2 phrases maximum.
- Pointer ce qui manque, sans jamais proposer de reformulation complète.
- Ne jamais bloquer : l'étudiant peut toujours avancer.
- Toujours afficher le bouton « Améliorer ma formulation ».
- Documenter les listes de mots en commentaire dans le code.

**Contenus** (profils, qualités, phrases à classer, structure du pitch, compétences, messages de feedback, boutons) : reprendre **à l'identique** la fiche mission. Les stocker dans `src/lib/content/univers3.ts`.

**Détail d'implémentation** : le prompt de la fiche v2 (`prompt-mission-b3-m1-se-vendre.md`) précise :
- les questions d'ajustement par cible ;
- les listes de mots des heuristiques et la fonction `evaluerFormulation` ;
- la clé `sessionStorage` : `b3-m1-se-vendre:<slug>` ;
- le composant `MissionAVenir` ;
- le scénario de test complet.

En cas d'écart, CLAUDE.md fait foi pour les règles et le prompt fait foi pour le détail des écrans.

**Messages clés :**

| Moment | Message |
|---|---|
| Synthèse de l'étape 3 | « Se vendre professionnellement, ce n'est pas se surestimer. C'est être capable d'expliquer ce qu'on apporte avec des mots concrets, crédibles et adaptés. » |
| Après l'étape 1 | « Un profil commercial n'est pas une étiquette. L'objectif est d'identifier ce que tu peux valoriser et ce que tu dois encore développer. » |

**Vocabulaire à utiliser** : mission, cible, pitch, posture, valeur ajoutée, challenge, opportunité, négociation, terrain, action, progression. Le ton est professionnel, énergique et direct, jamais infantilisant.

### 3.2. Rappel — Mini quiz B2 M1 (codé, non déployé)

- 20 questions, 4 profils A/B/C/D, scoring client, profil dominant uniquement, aucun stockage.
- C'est un outil de réflexion, pas un diagnostic.
- Contenus : `src/lib/content/univers2-quiz.ts`.
- Ne pas modifier dans la mission active.

## 4. Contraintes importantes

Temps : caler les livraisons sur le calendrier EDC (Notion « Cours 2025-2027 »).

Budget : outils gratuits ou peu coûteux déjà en place (Supabase, Vercel, npm qrcode). Aucune dépendance payante.

Contraintes techniques :
- Stack imposée : Next.js 15 App Router, TypeScript strict, Tailwind, Shadcn UI, Supabase, Vercel.
- **Univers 3 = zéro IA** : pas d'appel à `/api/horizon/*` ni à une API LLM.
- **Persistance** : état React + `sessionStorage` uniquement, qui s'efface à la fermeture de l'onglet. C'est ce qui permet de survivre à un rechargement de page sans stocker côté serveur.
- **Univers isolés** : vocabulaire propre à chaque univers, jamais de mélange (pas d'avion ni d'aventure en U3).

Contraintes de design :
- Thème 🎯 mission : navy / or / noir, premium, minimaliste, dramatique.
- Mobile-first : les étudiants arrivent par scan de QR Code.
- Une consigne, une zone d'action et un bouton principal par écran. Feedback visuel sur 1 à 2 lignes.

Contraintes pédagogiques :
- Guider, questionner et challenger, sans jamais répondre à la place de l'étudiant.
- Mode 1 = feedback immédiat ; Mode 2 = validation par l'intervenante.
- L'aléatoire (tirages, ordre des phrases) évite la mémorisation d'un groupe à l'autre.

Confidentialité / RGPD :
- Aucune collecte de nom, d'email ou de contact.
- Accès par QR Code de groupe uniquement, sans compte.
- Rien n'est conservé entre les sessions.

Usage : Stéphanie doit pouvoir activer et verrouiller la mission depuis l'admin, sans code.

## 5. Outils, plateformes et technologies

Imposés :
- **Front** : Next.js 15, TypeScript strict, Tailwind, Shadcn UI.
- **Back** : Supabase.
- **Déploiement** : Vercel (connexion GitHub).
- **QR** : npm qrcode.

Préférés : composants existants de `src/components/shared/` et `src/components/univers3/shared/`.

À éviter :
- Nouvelle librairie (y compris de drag-and-drop) : utiliser l'API HTML5 native ou l'existant.
- Autre base de données que Supabase.
- API externe payante.

## 6. Structure du projet

Fichiers importants :
- `src/app/[slug]/page.tsx` : point d'entrée unique. Récupère le groupe par son slug de QR Code, puis dispatche vers `Univers1Page`, `Univers2Page` ou `Univers3Page` selon `group.universe`.
- `src/components/univers1/` : Univers 1, **ne pas modifier**.
- `src/components/univers2/` : Univers 2. Contient `Cours1Boussole.tsx`, `CompassDial.tsx`, `Cours1Quiz.tsx`, `Cours2Linkedin.tsx`, `Cours3RevelateurIdees.tsx`, ainsi que `Cours4-6` (S2 détective) et `shared/`.
- `src/components/univers3/` : Univers 3.
  - **En production** : `HorizonShell.tsx` (6 missions IA), `AlertSession.tsx`, `SimulationRunner.tsx`, etc.
  - **En local, non commité (refonte V3.3)** : `Mission1CommunicationSensible.tsx`, `Mission2ReunionEfficace.tsx`, `Mission3ImmersionControle.tsx`, `shared/`, et une réécriture de `HorizonShell.tsx`.
  - **À créer** : `Mission1SeVendre.tsx`. C'est un nom proposé : suivre la convention existante.
  - **Remplacé** : `Mission1CommunicationSensible.tsx` et ses contenus dans `univers3.ts`. Les retirer du routage, mais **ne pas supprimer** les fichiers sans validation (réutilisation possible plus tard).
- `src/lib/content/` : contenus pédagogiques statiques (`univers2*.ts` déployés, `univers3.ts` local).
- `src/app/admin/` + `src/app/api/admin/` : pilotage (mission active, verrouillage, planning, groupes).

À ne pas modifier sans validation :
- `src/lib/supabase/`
- La table Supabase `missions` (gérée directement dans Supabase, sans migration dans le repo).
- `.env.local`
- `src/components/univers1/`
- Tout fichier de l'Univers 3 **déployé** (`HorizonShell.tsx` en prod, `/api/horizon/*`, `/api/simulation/*`).

À ignorer : `node_modules/`, `.git/`, `.vercel/`, `.next/`, `dist/`.

⚠️ **Avant toute modification**, lancez `git status` pour confirmer que les fichiers locaux B3 non commités sont toujours présents. S'ils manquent, arrêtez-vous et prévenez Stéphanie.

## 7. Données, fichiers et contenus

Sources :
- Constantes TypeScript dans `src/lib/content/`.
- Supabase pour les groupes, les missions et le pilotage.
- Fiches mission `.docx` fournies par Stéphanie.

Formats d'entrée (Mission 1 B3), à typer dans `univers3.ts` :

| Contenu | Format |
|---|---|
| Profils | `{ id, nom, description }[]` (6) |
| Qualités | `{ qualite, exemple }[]` (10) |
| Phrases | `{ texte, categorie: "vague" \| "pretentieux" \| "credible" }[]` (9) |
| Pitch | `{ id, amorce }[]` (5) + `cibles: { id, question }[]` (3) |
| Compétences | `string[]` (14) |
| Feedbacks | `{ type: "success" \| "alert" \| "neutral", message }` |
| Métadonnées | `{ ilo: ["C13", "C7"], duree, niveau: "B3" }` |

Sortie attendue : un composant React par mission et la fiche finale rendue côté client.

Règles de traitement :
- Tous les tirages et ordres aléatoires se font côté client (`Math.random()`).
- Les feedbacks sont courts : 1 phrase, 2 lignes maximum.
- Les contenus viennent de la fiche mission, sans reformulation.

Données sensibles : aucune donnée étudiante hors du navigateur. Les secrets restent dans `.env.local`.

## 8. Application — écrans et UX

**Univers 3 — La Mission (B3), parcours à 6 missions :**

| # | Mission | Statut |
|---|---|---|
| 1 | 🎯 Se vendre sans se survendre | À coder (mission active). Remplace « Communication professionnelle sensible ». |
| 2 | Conduite de réunion efficace | Codée en local, non testée. |
| 3 | 48h pour reprendre le contrôle | Codée et testée en local. |
| 4 à 6 | À définir | **Verrouillées** : carte « Mission à venir », non cliquable, sans aucun contenu IA. Contenus à créer plus tard. |

**Admin** :
- 9 groupes, QR Codes.
- Mission active.
- Verrouillage.
- Vue test « en tant qu'étudiant ».

**Contenus clés de la Mission 1 :**
- Titre : « 🎯 Se vendre sans se survendre ».
- Promesse : « Clarifie ta posture commerciale et construis un pitch crédible ».
- CTA : Lancer la mission · Choisir mon profil · Transformer ma qualité · Classer la phrase · Construire mon pitch · Tester mon pitch · Améliorer ma formulation · Choisir mon axe de progression · Valider ma fiche · Présenter à l'intervenante.

**Règles UX :**
- Un bouton principal par écran.
- Action immédiate, pas de longs paragraphes : l'exemple est dépliable.
- Barre de progression sur les 5 étapes.
- Lisible sur mobile. Le mode présentation doit être lisible depuis le fond d'une salle.
- Ne jamais préremplir une réponse.

## 9. Commandes utiles

```bash
npm install          # installation
npm run dev          # local → http://localhost:3000
npm run test         # tests (ou npm run test:watch)
npx tsc --noEmit     # vérification TypeScript
npx eslint src/      # lint
npm run build        # build de production
vercel deploy        # déploiement (uniquement avec accord de Stéphanie)
```

## 10. Règles de travail pour Claude dans ce projet

Avant de modifier :
- Relire la section 3.1 et la fiche mission.
- Vérifier l'état local B3 (`git status`).
- Présenter un plan de 10 lignes maximum : fichiers touchés, composants réutilisés et créés, emplacement de la mission dans le parcours.
- **Attendre la validation** avant de coder.

Pendant la modification :
- Toucher uniquement ce qu'exige la mission active.
- Réutiliser les composants et le thème U3.
- Aucune dépendance ajoutée.
- Code simple, commenté sur les points sensibles : heuristiques de feedback, aléatoire, persistance.

Après la modification :
- Lister les fichiers modifiés.
- Indiquer les hypothèses prises.
- Fournir la checklist de test réalisée.
- Signaler les points à valider par Stéphanie : textes, limites des heuristiques, éléments « à sourcer ».
- Proposer une prochaine étape claire.
- Ajouter une entrée au Journal (section 16).

## 11. Tests et vérification

Scénario de test — Mission 1 B3 (en local, groupe B3) :
1. Scan du QR Code → Univers 3, thème 🎯, Mission 1 visible.
2. Étape 1 : la sélection d'un 3ᵉ profil est bloquée ; la relance est obligatoire.
3. Étape 2 : 3 qualités distinctes sont tirées. Tester les 3 verdicts :
   - vague : « Je suis motivé » ;
   - prétentieux : « Je suis le meilleur » ;
   - crédible : une phrase avec une action concrète.
4. Étape 3 : les 9 phrases sont dans un ordre différent à chaque rechargement ; le score s'affiche ; le classement fonctionne sur mobile.
5. Étape 4 : le compteur de mots fonctionne, le chrono de 45 s aussi, et la question de l'option cible s'affiche.
6. Étape 5, puis fiche finale : les 5 rubriques sont remplies avec les seules saisies de l'étudiant ; le mode présentation est lisible.
7. Missions 4 à 6 : cartes verrouillées, non cliquables. Si l'admin les active, un écran « Mission à venir » s'affiche, sans erreur.
8. Un rechargement en cours de mission reprend à la bonne étape. À la fermeture de l'onglet, plus rien ne subsiste.
9. Onglet Réseau : **aucune requête** vers une API IA ni aucune écriture de données étudiantes.

Non-régression :
- U1 : un checkpoint complet.
- U2 : B2 M1 à M3 et PGE2 S2 « Qui est en face de moi ? ».
- Admin : verrouillage et changement de mission active.

Critères de réussite :
- ✅ Les 5 étapes sont jouables en 25 à 35 min, sur mobile et ordinateur.
- ✅ Aucun texte n'est rédigé à la place de l'étudiant.
- ✅ Aucune IA et aucun stockage serveur en U3.
- ✅ « Intervenante » au féminin partout.
- ✅ Aucun mélange d'univers.
- ✅ U1 et U2 intacts.
- ✅ `tsc` et `eslint` : 0 erreur.

## 12. Sécurité et points de vigilance

- Ne jamais exposer de clés (OpenAI, Anthropic, Supabase) : elles restent dans `.env.local`, jamais dans le code.
- Ne supprimer ni écraser aucun fichier sans validation, en particulier les fichiers B3 locaux non commités et les contenus de mission existants.
- Prévenir avant toute modification structurelle : schéma Supabase, règles d'accès par groupe, compteur admin, routeur U3.
- Ne rien commiter ni déployer sans accord explicite de Stéphanie.
- Signaler les risques : quotas Vercel / Supabase, et coûts d'API tant que l'ancien B3 IA reste en production.

Ne jamais inclure dans le projet : clés API, credentials Supabase, mot de passe admin, données étudiantes réelles.

## 13. Documentation attendue

- **README.md** (racine) : lancer, déployer, accéder à l'admin, modifier les contenus dans `src/lib/content/`.
- **CLAUDE.md** (ce fichier) : tenir à jour la section 1 « Tâche en cours » et la section 16 « Journal ».
- **Commentaires dans le code** : heuristiques de feedback, aléatoire, persistance `sessionStorage`, règles d'univers.
- **Fiches mission** : `fiche-edc-career-v3.3.docx`, `fiche-mission-b3-m1-se-vendre-v2.docx` (et son prompt `prompt-mission-b3-m1-se-vendre.md`). La fiche v1 est périmée.

## 14. Décisions déjà prises

- **Stack** : Next.js 15, TypeScript, Tailwind, Shadcn, Supabase, Vercel. Raison : rapidité et écosystème mature.
- **Entrée** : QR Code de groupe, sans compte. Raison : simplicité et confidentialité.
- **Progression** : pilotée par l'admin. Raison : Stéphanie contrôle la séance en direct.
- **Univers 1** : stabilisé et gelé.
- **Univers 3** : scénaristique, sans IA embarquée. Les feedbacks de la Mission 1 passent par des heuristiques client.
- **Persistance** : `sessionStorage` uniquement. Raison : reprendre après un rechargement sans stocker de données.
- **Évaluation** : 50 % note orale individuelle + 50 % note groupe écrite.
- **B3** : pas de déploiement sans validation séparée de Stéphanie.
- **Accord du texte** : l'amorce « Je suis étudiant en B3, orienté commerce / négociation. » est un champ modifiable. L'étudiant l'accorde ou la précise lui-même.
- **Export de la fiche** : Copier (`navigator.clipboard`) et Imprimer (`window.print()`) côté navigateur. Pas de PDF serveur, pas de nouvelle dépendance.
- **B3 = 6 missions** (décision du 2026-09-29). « Se vendre sans se survendre » remplace « Communication professionnelle sensible » en Mission 1. Le compteur admin reste à 6. Les missions 4 à 6 sont verrouillées (« Mission à venir ») jusqu'à la création de leurs contenus.

Choix refusés :
- Génération automatique de livrables (profil LinkedIn, post, pitch).
- IA dans l'Univers 3.
- Stockage des données étudiantes.
- Mélange des vocabulaires d'univers.
- Séance B3 centrée sur le CV.

Si une décision technique importante se présente : expliquer les options simplement, recommander l'une d'elles, puis attendre la validation.

## 15. Questions ouvertes

1. **Contenus des missions 4 à 6 de B3.** Ils seront définis par Stéphanie plus tard. En attendant, ces missions sont verrouillées (voir section 14).
2. **Règle « 2 exercices Mode 1 + 1 Mode 2 ».** Hypothèse : elle ne s'applique pas strictement à cette mission de 5 étapes. Les étapes 1, 2, 3 et 5 sont en Mode 1 ; le pitch (étape 4) est en Mode 2.
3. **Mise en production de B3** (refonte V3.3 + Mission 1) : à quelle date, et après quel test avec un groupe réel ?

Si une information manque : faire une hypothèse raisonnable, l'indiquer, et avancer si le risque est faible. Demander validation si le risque est élevé (schéma, permissions, déploiement, coûts).

## 16. Définition de terminé et Journal

La mission active est terminée quand :
- ✅ La Mission 1 B3 est jouable de bout en bout, conforme à la section 3.1, et la fiche finale est générée.
- ✅ Les heuristiques de feedback sont fonctionnelles et documentées, sans aucun appel IA.
- ✅ La persistance fonctionne en `sessionStorage` seul, sans aucune écriture serveur.
- ✅ Le scénario de test de la section 11 passe, ainsi que la non-régression U1 et U2.
- ✅ `tsc` et `eslint` : 0 erreur.
- ✅ Le Journal est mis à jour et les questions ouvertes restantes sont remontées à Stéphanie.
- ⏳ Déploiement : uniquement après accord (procédure ci-dessous).

Livrables attendus :
- Code de la mission (composant + contenus).
- Branchement dans le routeur U3 local.
- Résumé des modifications.
- Liste des points à valider.

### Journal

**2026-09-29 — Mission 1 B3 « Se vendre sans se survendre » codée et testée en local, non déployée.**
- La réécriture locale de `HorizonShell.tsx` était introuvable. Décision de Stéphanie : nouveau routeur `MissionShell.tsx` (M1 Se vendre, M2, M3, M4 à M6 → `shared/MissionAVenir.tsx`). `HorizonShell.tsx` reste intact pour la production.
- Fichiers : `Mission1SeVendre.tsx`, `MissionShell.tsx`, `shared/MissionAVenir.tsx`, bloc `mission1SeVendre` + `evaluerFormulation` dans `univers3.ts`, 1 ligne dans `Univers3Page.tsx` (HorizonShell → MissionShell).
- Vérifications : tsc OK, build OK, eslint 0 erreur sur les fichiers de la mission (8 erreurs préexistantes dans les anciens fichiers IA U3, à supprimer au déploiement). Scénario de test joué en local sur `b3-negociation` (mobile 375 px + ordinateur), aucune requête API.
- Non testé : activation de M4 à M6 via l'admin (écrirait dans la base Supabase partagée avec la production).
- Point à valider : le seuil « moins de 8 mots = vague » (`MOTS_MIN_FORMULATION`) juge vague « Je peux relancer mes prospects avec régularité » (7 mots), contrairement au scénario de la fiche.
- Aucun commit.

**2026-09-29 — Mission 1 B3 « Se vendre sans se survendre » : spécifiée, à coder.**
- Fiche `fiche-mission-b3-m1-se-vendre-v2.docx`.
- Décision : elle remplace « Communication professionnelle sensible ». B3 reste à 6 missions ; M4 à M6 sont verrouillées « Mission à venir » en attendant leurs contenus.

**2026-09-07 — Mini quiz B2 M1 codé et testé, non déployé.**
- Fichiers : `univers2-quiz.ts` et `Cours1Quiz.tsx`.
- La boussole passe à 2 temps (Boussole → Quiz).
- Vérifications : tsc et eslint OK, test local sur `b2-groupe-a` OK.
- Aucun commit.

**2026-09-07 — B2 et PGE2 déployés en production.**
- Compteur de missions dynamique (3 pour B2, 6 pour PGE2).
- Boussole : pistes et relance par question, bouton de tirage aléatoire.
- Rappel de l'évaluation 50/50 en fin de parcours B2.
- PGE2 S1 réutilise les cours corrigés ; PGE2 S2 est conservé.

**2026-09-07 — Refonte B3 V3.3 codée et testée, volontairement non déployée.**
- Fichiers locaux non commités : `univers3.ts`, `univers3/shared/`, `Mission1/2/3*.tsx`, réécriture de `HorizonShell.tsx`.
- Mission 3 testée en local. Missions 1 et 2 non testées.

### Procédure de déploiement B3 (sur accord de Stéphanie uniquement)

1. Vérifier que `Univers3Page.tsx` utilise `MissionShell.tsx` (routeur des missions statiques : Mission 1 = « Se vendre sans se survendre », missions 4 à 6 en « Mission à venir » verrouillées). `HorizonShell.tsx` devient alors orphelin et peut être supprimé avec les fichiers IA.
2. Supprimer les fichiers IA orphelins : `AlertSession.tsx`, `EventFeed.tsx`, `ScenarioDisplay.tsx`, `SimulationRunner.tsx`, `SimulationLauncher.tsx`, `SimulationFeedbackZone.tsx`, `/api/horizon/*`, `/api/simulation/*`.
3. **Ne pas modifier le compteur admin** : il reste plafonné à 6 pour `mission-horizon`.
4. Mettre à jour la table Supabase `missions` : titres des missions 1 à 3 **sans supprimer les lignes 4 à 6**. SQL à faire valider avant exécution :
```sql
UPDATE missions SET title = 'Se vendre sans se survendre' WHERE universe = 'mission-horizon' AND number = 1;
UPDATE missions SET title = 'Conduite de réunion efficace' WHERE universe = 'mission-horizon' AND number = 2;
UPDATE missions SET title = 'Mission immersive — 48h pour reprendre le contrôle' WHERE universe = 'mission-horizon' AND number = 3;
-- Lignes 4 à 6 conservées, titres à mettre à jour quand les missions seront définies.
```
5. Tester toutes les missions B3 en local, puis faire un build.
6. Commit, push sur `main`, puis vérifier le déploiement Vercel.
