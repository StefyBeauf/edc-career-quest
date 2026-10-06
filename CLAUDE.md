# CLAUDE.md — Instructions du projet EDC Career Quest

<!--
MODE D'EMPLOI
Ce fichier donne à Claude Code le contexte spécifique du projet EDC Career Quest.
Il complète (sans le remplacer) le CLAUDE.md global de Stéphanie.

Mission active : parcours B3 Marketing Digital (5 séances) + Mission 1 « 🎯 Trouver sa signature digitale ».
Référence : fiche mission `fiche-mission-b3-marketing-digital-signature-v2.docx`.

Règles de maintenance de ce fichier :
- N'y ajoutez jamais de mot de passe, clé API, token ni information sensible (voir section 12).
- Gardez-le court : l'historique détaillé va dans la section 16 « Journal ».
- Mettez à jour la section 1 « Tâche en cours » à chaque nouvelle mission.
- CLAUDE.md fait foi pour les règles (IA, persistance, univers, spécialisations, déploiement) ;
  la fiche mission fait foi pour le détail des écrans et des contenus.
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
| 3 — La Mission | B3, **un parcours par spécialisation** | 🎯 mission | Voir le tableau des spécialisations ci-dessous. |

Spécialisations B3 (Univers 3) :

| Spécialisation | Parcours | Statut |
|---|---|---|
| **Négociation** | 6 missions — M1 « Se vendre sans se survendre » | **Déployée en production.** Ne pas modifier. |
| **Marketing Digital** | 5 missions — M1 « Trouver sa signature digitale » | **Déployée le 2026-10-06.** Contenus complétés par Claude Code à relire. |
| **Finance** | À définir | Prévue au **T2**. Hors périmètre, mais l'architecture doit pouvoir l'accueillir sans refonte. |

### ▶ Tâche en cours

**Créer le parcours B3 Marketing Digital à 5 missions et sa Mission 1 « 🎯 Trouver sa signature digitale »**, en différenciant clairement les spécialisations B3.
- **Statut (2026-10-06)** : codée, testée en local et déployée en production. Reste à faire : recharger le crédit du compte Anthropic (le coach IA tourne sur le repli heuristique tant que le solde est à zéro) et relire les contenus « à valider ».
- Spécification complète : section 3.2. Différenciation des spécialisations : section 3.4.
- Fiche mission : `fiche-mission-b3-marketing-digital-signature-v2.docx`.
- **Décisions (2026-10-06)** :
  - B3 Marketing Digital = **5 missions** ; missions 2 à 5 verrouillées « Mission à venir », contenus décidés plus tard.
  - Le parcours **B3 Négociation (en production) n'est pas modifié**.
  - **L'IA est autorisée dans l'Univers 3**, dans le cadre strict de la section 3.5.

## 2. Contexte métier

Pourquoi ce projet existe :
Rendre les ateliers carrière actifs, ludiques et différenciés par niveau et par spécialisation. En B3, les étudiants ont déjà travaillé leur CV.
- **B3 Négociation** : passer de « Je cherche une alternance dans le commerce » à « Je sais expliquer ce que j'apporte et pourquoi mon profil peut intéresser une entreprise ».
- **B3 Marketing Digital** : passer de « Je cherche une alternance en marketing digital » à « Je sais expliquer quel type de profil marketing digital je suis, ce que je peux apporter à une équipe, et sur quoi je veux progresser ».
- **B3 Finance** (T2) : à définir.

Qui utilise le résultat :
- **Étudiants EDC Paris (B1 à B3)**. Ils ne sont pas techniques et accèdent par scan de QR Code, souvent sur mobile. En B3 :
  - Négociation : commerce, négociation, business development ;
  - Marketing Digital : contenu, réseaux sociaux, acquisition, marque, e-commerce, CRM, data marketing, influence, événementiel digital, relation client digitale ;
  - Finance : à définir (T2).
- **Stéphanie, l'intervenante et administratrice**. Elle pilote en direct, sans code.

Ce qui compte le plus :
- **Fiabilité** : l'outil est utilisé en direct devant des groupes. Une panne d'IA ne doit jamais bloquer la séance.
- **Guidage pédagogique** : ne jamais faire le travail à la place de l'étudiant.
- **Design** : immersif et distinct par univers.
- **Confidentialité** : zéro donnée étudiante stockée.
- **Maintenance** : pilotage 100 % via l'admin.

## 3. Périmètre du projet

Ce que la mission active doit faire :
- Mettre en place la **différenciation des spécialisations B3** (section 3.4), extensible à Finance au T2.
- Créer le **parcours B3 Marketing Digital à 5 missions** (section 8).
- Créer la Mission 1 Marketing Digital en **6 étapes**, avec une fiche finale « Mon positionnement marketing digital » (section 3.2).
- Intégrer l'IA comme **coach de positionnement** dans cette mission, avec un repli automatique sur des heuristiques (section 3.5).
- Afficher les missions 2 à 5 Marketing Digital avec leurs intitulés, en cartes verrouillées « Mission à venir » (thème 🎯, non cliquables).
- Si l'admin active une mission verrouillée, l'étudiant voit l'écran d'attente `MissionAVenir` : aucune erreur, aucun ancien contenu.
- Aucune trace d'une 6ᵉ mission dans le parcours Marketing Digital (carte, compteur, barre de progression, route).
- Conserver le thème 🎯 navy/or et les composants de `src/components/univers3/shared/`.

Ce que le projet ne doit pas faire :
- ❌ Reconstruire l'architecture, ou modifier l'Univers 1 et l'Univers 2.
- ❌ Modifier le parcours B3 Négociation **en production** (composants, contenus, routes IA qu'il utilise, comportement).
- ❌ Créer le parcours Finance maintenant : prévoir seulement l'emplacement dans la configuration.
- ❌ Déployer sans accord explicite de Stéphanie (voir la procédure en section 16).
- ❌ Laisser l'IA écrire le pitch, la fiche ou une formulation complète à la place de l'étudiant.
- ❌ Stocker une donnée étudiante côté serveur (Supabase, base, logs, traces d'API).
- ❌ Créer une fonction de partage automatique (LinkedIn, email…).
- ❌ Transformer la séance en atelier CV ou candidature.
- ❌ Utiliser le vocabulaire commercial / négociation / prospection dans le parcours Marketing Digital.
- ❌ Écrire « intervenant » au masculin : toujours « intervenante ».

Version souhaitée : version robuste pour un usage réel en salle, livrée comme amélioration ciblée non régressive.

### 3.1. Rappel — Mission 1 B3 Négociation « 🎯 Se vendre sans se survendre » (en production)

- Parcours B3 Négociation, 6 missions. 5 étapes, 25 à 35 min, ILO C13 + C7.
- Fichiers : `Mission1SeVendre.tsx`, bloc `mission1SeVendre` et `evaluerFormulation` dans `univers3.ts`.
- Fiche : `fiche-mission-b3-m1-se-vendre-v2.docx` + prompt `prompt-mission-b3-m1-se-vendre.md`.
- **Modèle structurel** pour la Mission 1 Marketing Digital (shell, étapes, fiche finale, `sessionStorage`, mode présentation). **Ne pas modifier** : la copier ou s'en inspirer dans de nouveaux fichiers.

### 3.2. Spécification — Mission 1 B3 Marketing Digital « 🎯 Trouver sa signature digitale »

- **Durée** : 3 h en cours, avec des temps animés par l'intervenante entre les étapes (l'application ne minute pas la séance).
- **Format** : diagnostic individuel → coaching IA → échanges entre pairs → pitchs devant l'intervenante.
- **ILO** : C13 en principal, C7 en appui (⚠️ hypothèse reprise de Négociation, à confirmer). Métadonnées dans `univers3.ts`.

**Étapes :**

| # | Écran | Mécanique | IA | Mode |
|---|---|---|---|---|
| 1 | Quel profil digital suis-je ? | Quiz de 12 à 15 questions à 4 réponses (les 10 de la fiche + compléments). Chaque réponse alimente 1 ou 2 profils parmi 6. Le scoring est **calculé côté client** (déterministe). Départage : profil le plus présent dans les 3 dernières réponses, puis tirage `Math.random()`. | Non | Mode 1 |
| 2 | Mon profil digital | Fiche du profil dominant : traduction professionnelle, 3 forces possibles, 1 point de vigilance, 1 phrase « à retravailler », 1 question de réflexion. L'IA personnalise la fiche à partir des réponses ; la **fiche statique** du profil sert de base et de repli. Bouton obligatoire « Je nuance mon profil » → 3 champs libres. | Oui (personnalisation) | Mode 1 |
| 3 | Ce que j'apporte vraiment | 3 manches. Une phrase vague est tirée au hasard, sans doublon, avec 1 re-tirage possible par manche. L'étudiant complète « Cette qualité peut se traduire professionnellement par… ». L'IA renvoie un verdict parmi les 4 et une piste. Exemple masqué par défaut (« Voir un exemple »). | Oui (verdict + piste) | Mode 1 |
| 4 | Mon pitch 45 secondes | 5 champs guidés, assemblés automatiquement. Compteur de mots (cible 90–120) et estimation de durée orale (~130 mots/min), calculés côté client. Chrono optionnel de 45 s. Boutons « Tester mon pitch » · « Rendre mon pitch plus clair » · « Rendre mon pitch plus métier » · « Réduire mon pitch à 45 secondes » : l'IA renvoie un **diagnostic, une question ou une suggestion partielle**, jamais un pitch réécrit. | Oui (coaching) | Mode 1 |
| 5 | Feedback entre pairs | Présentation en binôme ou mini-groupe. Le camarade choisit une carte parmi 6 (Clair · Crédible · Métier · À préciser · Trop vague · Trop long). L'étudiant enregistre au moins 2 cartes reçues, puis choisit celle qu'il retient. | Non | Mode 2 (pairs) |
| 6 | Ma fiche finale | Fiche préremplie avec les seules saisies de l'étudiant, modifiable. Inclut le choix de l'axe de progression (liste de 20 axes) et 3 champs : « Cette année, je veux progresser sur… / Parce que… / Ma première action sera… ». | Non | Mode 2 (intervenante) |

**Fiche finale « Mon positionnement marketing digital » :**
1. Mon profil digital dominant.
2. Mes 3 forces professionnelles.
3. Ce que je peux apporter à une équipe marketing / communication.
4. Mon pitch professionnel en 45 secondes.
5. Mon axe de progression cette année.
6. Le feedback que je retiens.

Actions proposées sur la fiche : Modifier · Copier / Imprimer (côté client uniquement) · Mode présentation (grand format) · Valider ma fiche · Présenter à l'intervenante. L'écran de fin rappelle l'évaluation : 50 % oral / 50 % écrit groupe.

**Verdicts de feedback (communs à l'IA et aux heuristiques de repli) :**

| Verdict | Critère | Message de référence (fiche) |
|---|---|---|
| Trop vague | Pas d'action concrète, de canal, de cible ni d'objectif. | « C'est encore trop général. Ajoute une action concrète, un canal, une cible ou un objectif. » |
| Trop prétentieux | Survente, superlatifs absolus, promesse irréaliste (« toute la communication », « meilleur que »). | « La formulation manque de nuance. Rends-la plus crédible et plus professionnelle. » |
| Trop long | Message dilué (repère : plus de 40 mots pour une formulation, plus de 130 pour le pitch). | « Ton idée est intéressante, mais ton message doit être plus direct. » |
| Clair | Qualité reliée à une contribution professionnelle concrète. | « Bonne formulation : tu relies une qualité à une contribution professionnelle concrète. » |

Règles communes à tous les feedbacks :
- 1 à 2 phrases maximum.
- Pointer ce qui manque, sans jamais proposer de reformulation complète.
- Ne jamais bloquer : l'étudiant peut toujours avancer.
- Toujours afficher le bouton « Améliorer ma formulation ».

**Contenus** (profils, questions du quiz, fiches profils, phrases vagues, exemples, structure du pitch, cartes de feedback, axes de progression, micro-textes, boutons) : reprendre **à l'identique** la fiche mission. Les stocker dans `src/lib/content/univers3.ts`, dans un bloc dédié (ex. `mission1SignatureDigitale`). Les contenus complétés par Claude Code (questions 11 à 15, matrice de scoring, fiches des 4 profils sans exemple, questions de réflexion) sont **signalés « à valider par Stéphanie »** en commentaire et dans le rapport.

**Persistance** : `sessionStorage`, clé `b3-marketing-digital-m1:<slug>`. Reprise à la bonne étape après rechargement.

**Messages clés (micro-textes de transition) :**

| Moment | Message |
|---|---|
| Lancement | « Mission lancée. Ton objectif : clarifier ta signature digitale. » |
| Après l'étape 2 | « Un bon profil marketing digital ne dit pas seulement "j'aime les réseaux sociaux". Il sait expliquer ce qu'il peut apporter. » |
| Après l'étape 3 | « Se positionner, ce n'est pas se survendre. C'est être clair, crédible et concret. » |
| Étape 4 | « Ton pitch doit donner envie d'en savoir plus, pas raconter tout ton parcours. » |
| Rappel transversal | « En marketing digital, une idée doit toujours être reliée à une cible, un canal et un objectif. » |

**Vocabulaire à utiliser** : mission, signature digitale, cible, canal, format, contenu, ligne éditoriale, engagement, audience, KPI, brief, valeur ajoutée, progression. **À proscrire** dans ce parcours (y compris dans les réponses de l'IA) : prospect, closing, objection, vente, argumentaire commercial, négociation. Le ton est dynamique, professionnel et stimulant, jamais infantilisant.

### 3.3. Rappel — Mini quiz B2 M1 (codé, non déployé)

- 20 questions, 4 profils A/B/C/D, scoring client, profil dominant uniquement, aucun stockage.
- Contenus : `src/lib/content/univers2-quiz.ts`. Peut servir de **modèle technique** pour le scoring du quiz Marketing Digital, sans le modifier ni importer de contenus de l'Univers 2.

### 3.4. Différenciation des spécialisations B3

Objectif : un groupe B3 doit toujours ouvrir **le parcours de sa spécialisation**, et rien d'autre.

Règles :
- Une **configuration unique** des spécialisations dans `src/lib/content/univers3.ts` (ex. `B3_SPECIALISATIONS`) : identifiant, libellé, nombre de missions, liste des missions (titre, thématique, composant ou `null` si « Mission à venir »).
  - `negociation` : 6 missions (configuration de production, inchangée).
  - `marketing-digital` : 5 missions.
  - `finance` : entrée prévue mais **inactive** (T2), sans contenu.
- Le routeur (`MissionShell.tsx` ou l'équivalent en production) lit la spécialisation du groupe, puis la configuration correspondante. Aucun `if` dispersé dans les composants.
- Le compteur de missions, la barre de progression, les titres affichés aux étudiants et l'admin s'appuient sur cette configuration (5 pour Marketing Digital, 6 pour Négociation).
- **Repli sûr** : un groupe B3 sans spécialisation reconnue ouvre le parcours **Négociation** (comportement actuel de production), avec un avertissement dans la console de développement. Il n'y a aucune erreur bloquante.

Identifier la spécialisation d'un groupe — **à vérifier avant de coder** :
1. Regarder d'abord si un mécanisme existe déjà (champ du groupe, slug, configuration admin).
2. S'il n'existe pas, deux options :
   - (a) **Convention de slug** (`b3-negociation-…`, `b3-marketing-digital-…`, `b3-finance-…`), sans changement de schéma. Recommandée si les slugs actuels la respectent déjà ;
   - (b) **Champ `specialisation` sur la table des groupes** dans Supabase, sélectionnable dans l'admin. Option plus propre pour Finance au T2, mais elle modifie le schéma de production → **validation obligatoire** de Stéphanie et SQL à faire relire.
3. Présenter le constat et recommander une option dans le plan. **Attendre la validation.**

Table `missions` (Supabase) : si les titres y sont stockés par `universe` + `number`, ils sont communs à toutes les spécialisations. Ne pas écraser les titres Négociation. Les titres Marketing Digital affichés aux étudiants viennent de la configuration `univers3.ts`, sauf décision contraire de Stéphanie.

### 3.5. Usage de l'IA dans l'Univers 3

L'IA est **autorisée** en Univers 3. Dans la Mission 1 Marketing Digital, elle joue le rôle de **coach de positionnement professionnel**, jamais celui de rédacteur.

Ce que l'IA peut faire :
- personnaliser la fiche de profil à partir des réponses au quiz ;
- proposer des forces possibles et des axes de progression ;
- donner un verdict et une piste sur une formulation ;
- repérer les phrases trop vagues ou trop prétentieuses ;
- aider à raccourcir un pitch en pointant ce qui peut sauter ;
- proposer un vocabulaire plus métier ;
- challenger l'étudiant avec une question.

Ce que l'IA ne doit jamais faire :
- écrire le pitch final, la fiche ou une formulation complète ;
- inventer des expériences ;
- exagérer les compétences ;
- produire un discours artificiel ou une réponse non personnalisée ;
- employer le vocabulaire commercial / négociation.

Règles techniques :
- **Réutiliser l'infrastructure IA existante** (route API, fournisseur et clé déjà configurés, déjà utilisés en production pour B3). Ne pas ajouter de fournisseur ni de dépendance. Si aucune route ne convient, créer une route dédiée (ex. `/api/mission/coach`) sur le même modèle, **sans modifier les routes utilisées par Négociation**.
- Appels **uniquement côté serveur**. Clés dans `.env.local` / variables Vercel, jamais côté client.
- **Prompt système** versionné dans le code (fichier dédié, commenté), qui reprend les règles « peut / ne doit jamais » ci-dessus. Il impose une sortie courte et **structurée en JSON** (ex. `{ verdict, message, question? }`), validée côté serveur avant affichage.
- **Aucune conservation** des textes étudiants : pas de log du contenu, pas d'écriture en base. Seul l'état client (`sessionStorage`) garde les saisies.
- **Garde-fous de sortie** : tronquer à 2 phrases ; si la réponse ressemble à un pitch complet (longueur, structure), la rejeter et afficher le repli.
- **Repli obligatoire** : en cas d'erreur, de délai dépassé (repère : 8 s) ou de réponse invalide, afficher le feedback **heuristique côté client** (fonction dédiée, ex. `evaluerFormulationDigital`, listes de mots documentées) ou la fiche statique du profil. La séance ne doit jamais être bloquée.
- **Maîtrise des coûts** : limiter la taille des entrées et des sorties, désactiver les boutons pendant l'appel, prévoir une limite d'appels par étudiant et par étape (repère : 5). Signaler l'estimation du coût par séance dans le rapport.

## 4. Contraintes importantes

Temps : caler les livraisons sur le calendrier EDC (Notion « Cours 2025-2027 »).

Budget : outils gratuits ou peu coûteux déjà en place (Supabase, Vercel, npm qrcode, fournisseur IA déjà configuré). Aucune nouvelle dépendance payante.

Contraintes techniques :
- Stack imposée : Next.js 15 App Router, TypeScript strict, Tailwind, Shadcn UI, Supabase, Vercel.
- **IA en Univers 3** : autorisée, côté serveur, dans le cadre de la section 3.5, avec un repli heuristique systématique.
- **Persistance** : état React + `sessionStorage` uniquement, qui s'efface à la fermeture de l'onglet.
- **Univers isolés** : vocabulaire propre à chaque univers, jamais de mélange (pas d'avion ni d'aventure en U3).
- **Spécialisations isolées** : pas de vocabulaire commercial en Marketing Digital, pas de contenu Marketing Digital en Négociation.

Contraintes de design :
- Thème 🎯 mission : navy / or / noir, premium, minimaliste, dramatique.
- Mobile-first : les étudiants arrivent par scan de QR Code.
- Une consigne, une zone d'action et un bouton principal par écran. Feedback visuel sur 1 à 2 lignes.
- État de chargement clair pendant un appel IA (« Ton coach analyse ta formulation… »).

Contraintes pédagogiques :
- Guider, questionner et challenger, sans jamais répondre à la place de l'étudiant.
- Mode 1 = feedback immédiat (IA ou heuristique) ; Mode 2 = validation par l'intervenante ou par les pairs.
- L'aléatoire (tirages, ordre) évite la mémorisation d'un groupe à l'autre.

Confidentialité / RGPD :
- Aucune collecte de nom, d'email ou de contact.
- Accès par QR Code de groupe uniquement, sans compte.
- Rien n'est conservé entre les sessions, ni côté serveur ni dans les logs d'IA.
- Les textes envoyés à l'IA ne contiennent aucune donnée identifiante (l'interface invite à ne pas citer de noms d'entreprises ou de personnes réelles).

Usage : Stéphanie doit pouvoir activer et verrouiller chaque mission, pour chaque spécialisation, depuis l'admin, sans code.

## 5. Outils, plateformes et technologies

Imposés :
- **Front** : Next.js 15, TypeScript strict, Tailwind, Shadcn UI.
- **Back** : Supabase, routes API Next.js.
- **IA** : fournisseur et clé déjà configurés dans le projet.
- **Déploiement** : Vercel (connexion GitHub).
- **QR** : npm qrcode.

Préférés : composants existants de `src/components/shared/` et `src/components/univers3/shared/`.

À éviter :
- Nouvelle librairie (drag-and-drop, quiz, SDK IA supplémentaire) : utiliser l'API HTML5 native ou l'existant.
- Autre base de données que Supabase.
- Nouveau fournisseur d'IA ou API externe payante supplémentaire.

## 6. Structure du projet

Fichiers importants :
- `src/app/[slug]/page.tsx` : point d'entrée unique. Récupère le groupe par son slug de QR Code, puis dispatche vers `Univers1Page`, `Univers2Page` ou `Univers3Page` selon `group.universe`.
- `src/components/univers1/` : Univers 1, **ne pas modifier**.
- `src/components/univers2/` : Univers 2. Contient `Cours1Boussole.tsx`, `CompassDial.tsx`, `Cours1Quiz.tsx`, `Cours2Linkedin.tsx`, `Cours3RevelateurIdees.tsx`, ainsi que `Cours4-6` (S2 détective) et `shared/`.
- `src/components/univers3/` : Univers 3.
  - **Parcours Négociation (en production)** : `MissionShell.tsx` (routeur), `Mission1SeVendre.tsx`, `Mission2ReunionEfficace.tsx`, `Mission3ImmersionControle.tsx`, `shared/` (dont `MissionAVenir.tsx`). ⚠️ Vérifier l'état réel du dépôt : la liste exacte des fichiers déployés peut différer de ce journal.
  - **À créer** : `Mission1SignatureDigitale.tsx` (nom proposé : suivre la convention existante) + la route ou le module de coaching IA.
  - **À adapter** : le routeur, pour lire la spécialisation (section 3.4).
- `src/lib/content/` : contenus pédagogiques statiques (`univers2*.ts`, `univers3.ts`).
- `src/app/admin/` + `src/app/api/admin/` : pilotage (mission active, verrouillage, planning, groupes, compteur de missions).
- `src/app/api/` : routes API, dont les routes IA existantes.

À ne pas modifier sans validation :
- `src/lib/supabase/`
- Les tables Supabase `missions` et des groupes (gérées directement dans Supabase, sans migration dans le repo).
- Le compteur de missions de l'admin.
- `.env.local` et les variables Vercel.
- `src/components/univers1/`
- Tout ce qu'utilise le parcours **Négociation en production** : `Mission1SeVendre.tsx`, le bloc `mission1SeVendre`, `evaluerFormulation`, les routes IA qu'il appelle.

À ignorer : `node_modules/`, `.git/`, `.vercel/`, `.next/`, `dist/`.

⚠️ **Avant toute modification**, lancez `git status` et `git log -5`, puis vérifiez que la branche locale correspond à la production. Travaillez sur une branche dédiée (ex. `feat/b3-marketing-digital`). En cas d'écart inattendu, arrêtez-vous et prévenez Stéphanie.

## 7. Données, fichiers et contenus

Sources :
- Constantes TypeScript dans `src/lib/content/`.
- Supabase pour les groupes, les missions et le pilotage.
- Fiches mission `.docx` fournies par Stéphanie.

Formats d'entrée (Mission 1 Marketing Digital), à typer dans `univers3.ts` :

| Contenu | Format |
|---|---|
| Spécialisations | `{ id: "negociation" \| "marketing-digital" \| "finance", label, actif: boolean, missions: { numero, titre, thematique, statut: "disponible" \| "a-venir" }[] }[]` |
| Profils | `{ id, nom, traduction }[]` (6) |
| Questions du quiz | `{ id, question, reponses: { texte, profils: ProfilId[] }[] }[]` (12 à 15, 4 réponses chacune) |
| Fiches profils (base + repli) | `{ profilId, traduction, forces: string[3], vigilance, phrase, questionReflexion }[]` (6) |
| Phrases vagues | `{ texte, exemple }[]` (10) |
| Pitch | `{ id, amorce }[]` (5) |
| Cartes feedback pairs | `{ id, label, signification }[]` (6) |
| Axes de progression | `string[]` (20) |
| Réponse IA | `{ verdict: "vague" \| "pretentieux" \| "long" \| "clair", message, question? }` |
| Métadonnées | `{ ilo: ["C13", "C7"], duree: "3h", niveau: "B3", specialisation: "marketing-digital" }` |

Sortie attendue : un composant React par mission et la fiche finale rendue côté client.

Règles de traitement :
- Tous les tirages et ordres aléatoires se font côté client (`Math.random()`).
- Les feedbacks sont courts : 1 phrase, 2 lignes maximum.
- Les contenus viennent de la fiche mission, sans reformulation. Les compléments rédigés par Claude Code sont marqués « à valider ».

Données sensibles : aucune donnée étudiante hors du navigateur, en dehors de l'appel IA éphémère. Les secrets restent dans `.env.local`.

## 8. Application — écrans et UX

**Univers 3 — La Mission (B3), un parcours par spécialisation :**

**Parcours B3 Négociation — 6 missions (en production, inchangé) :**

| # | Mission | Statut |
|---|---|---|
| 1 | 🎯 Se vendre sans se survendre | Déployée. |
| 2 | Conduite de réunion efficace | Selon la production. |
| 3 | 48h pour reprendre le contrôle | Selon la production. |
| 4 à 6 | À définir | Verrouillées « Mission à venir ». |

**Parcours B3 Marketing Digital — 5 missions (mission active) :**

| # | Mission | Thématique | Statut |
|---|---|---|---|
| 1 | 🎯 Trouver sa signature digitale | Positionnement professionnel et culture marketing digital | Déployée le 2026-10-06. |
| 2 | Communication professionnelle | Messages professionnels, relance, clarification, désaccord, feedback | Verrouillée « Mission à venir ». Contenu décidé plus tard. |
| 3 | Organisation et priorisation | Gestion des tâches, priorités, charge de travail, délais | Verrouillée « Mission à venir ». Contenu décidé plus tard. |
| 4 | Animation et efficacité collective | Réunion, collaboration, suivi d'actions, coordination projet | Verrouillée « Mission à venir ». Contenu décidé plus tard. |
| 5 | Mission immersive de synthèse | Mise en situation professionnelle globale | Verrouillée « Mission à venir ». Contenu décidé plus tard. |

**Parcours B3 Finance — T2 :** entrée de configuration inactive. Aucun écran à créer maintenant.

**Admin** :
- Groupes et QR Codes, avec la spécialisation visible pour les groupes B3.
- Mission active et verrouillage, par groupe.
- Vue test « en tant qu'étudiant ».
- Compteur de missions selon la spécialisation : 6 Négociation, **5 Marketing Digital**.

**Contenus clés de la Mission 1 Marketing Digital :**
- Titre : « 🎯 Trouver sa signature digitale ».
- Promesse : « Clarifie ton profil marketing digital et construis un pitch crédible » (⚠️ proposée, à valider).
- CTA : Lancer la mission · Répondre au quiz · Découvrir mon profil · Je nuance mon profil · Transformer ma qualité · Tester ma formulation · Construire mon pitch · Tester mon pitch · Rendre mon pitch plus clair · Rendre mon pitch plus métier · Réduire mon pitch à 45 secondes · Présenter en binôme · Choisir mon axe de progression · Valider ma fiche · Présenter à l'intervenante.

**Règles UX :**
- Un bouton principal par écran.
- Action immédiate, pas de longs paragraphes : l'exemple est dépliable.
- Barre de progression sur les 6 étapes. Une question du quiz par écran, avec un indicateur « question x / n ».
- Lisible sur mobile. Le mode présentation doit être lisible depuis le fond d'une salle.
- Ne jamais préremplir une réponse (seule la fiche finale reprend les saisies de l'étudiant).

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
- Relire les sections 3.2, 3.4, 3.5 et la fiche mission.
- Vérifier l'état du dépôt (`git status`, `git log -5`) et créer une branche dédiée.
- **Identifier** comment la spécialisation d'un groupe est connue, comment le compteur admin et la table `missions` gèrent le nombre de missions, et quelle infrastructure IA existe déjà.
- Présenter un plan de 10 lignes maximum : fichiers touchés, mécanisme de spécialisation recommandé, route IA réutilisée ou créée, impacts sur l'admin et Supabase, risques pour Négociation.
- **Attendre la validation** avant de coder.

Pendant la modification :
- Toucher uniquement ce qu'exige la mission active.
- Réutiliser les composants et le thème U3, ainsi que la structure de `Mission1SeVendre.tsx` (sans la modifier).
- Aucune dépendance ajoutée.
- Code simple, commenté sur les points sensibles : prompt système, garde-fous IA, repli heuristique, scoring du quiz, aléatoire, persistance, routage par spécialisation.

Après la modification :
- Lister les fichiers modifiés.
- Indiquer les hypothèses prises.
- Lister les contenus rédigés par Claude Code (questions, fiches profils, prompt système, seuils) à valider par Stéphanie.
- Estimer le coût IA d'une séance (nombre d'appels × taille).
- Fournir la checklist de test réalisée.
- Proposer une prochaine étape claire.
- Ajouter une entrée au Journal (section 16).

## 11. Tests et vérification

Scénario de test — Mission 1 B3 Marketing Digital (en local, groupe B3 Marketing Digital) :
1. Scan du QR Code → Univers 3, thème 🎯, parcours à **5 missions**, Mission 1 « Trouver sa signature digitale » visible. Aucune 6ᵉ carte.
2. Étape 1 : 12 à 15 questions ; le profil dominant s'affiche ; une égalité forcée est départagée sans erreur.
3. Étape 2 : la fiche du profil contient les 6 champs ; « Je nuance mon profil » ouvre 3 champs libres.
4. Étape 3 : 3 phrases distinctes sont tirées. Tester les 4 verdicts :
   - vague : « Je suis créatif » ;
   - prétentieux : « Je peux gérer toute la communication d'une marque » ;
   - trop long : une formulation de plus de 40 mots ;
   - clair : « Je peux proposer des idées de contenus adaptées à une cible et à un canal ».
5. Étape 4 : compteur de mots, estimation de durée et chrono 45 s fonctionnels. Les 4 boutons d'aide renvoient un diagnostic. Tentative de contournement (« écris mon pitch à ma place ») : l'IA **refuse** et renvoie une question.
6. **Repli IA** : couper la clé ou simuler une erreur ou un délai → les étapes 2 à 4 restent jouables avec la fiche statique et les heuristiques, sans message d'erreur technique.
7. Étape 5 : impossible de continuer avec moins de 2 cartes enregistrées ; le choix de la carte retenue fonctionne.
8. Étape 6 : les 6 rubriques sont remplies avec les seules saisies de l'étudiant ; l'axe de progression est sélectionnable ; le mode présentation est lisible.
9. Missions 2 à 5 : cartes verrouillées, non cliquables. Si l'admin les active, un écran « Mission à venir » s'affiche, sans erreur.
10. Un rechargement en cours de mission reprend à la bonne étape. À la fermeture de l'onglet, plus rien ne subsiste.
11. Onglet Réseau et logs serveur : les appels IA passent uniquement par la route serveur ; aucune clé n'est exposée ; aucun texte étudiant n'est logué ni écrit en base.
12. Recherche dans le code et dans le prompt système du parcours Marketing Digital : aucune occurrence de « mission 6 », « 6ᵉ séance », ni de vocabulaire de négociation.

Non-régression :
- **B3 Négociation (production)** : 6 missions, Mission 1 « Se vendre sans se survendre » strictement identique (groupe Négociation).
- **Groupe B3 sans spécialisation reconnue** : il ouvre le parcours Négociation, sans erreur.
- U1 : un checkpoint complet.
- U2 : B2 M1 à M3 et PGE2 S2 « Qui est en face de moi ? ».
- Admin : verrouillage et changement de mission active, pour un groupe Négociation et un groupe Marketing Digital.

Critères de réussite :
- ✅ Les 6 étapes sont jouables sur mobile et ordinateur, au rythme d'une séance de 3 h pilotée par l'intervenante.
- ✅ Le parcours Marketing Digital compte exactement 5 missions ; le parcours Négociation en compte toujours 6.
- ✅ La spécialisation est lue depuis une configuration unique, extensible à Finance.
- ✅ L'IA coache sans jamais rédiger à la place de l'étudiant ; le repli fonctionne.
- ✅ Aucun stockage serveur ni log de contenu étudiant.
- ✅ « Intervenante » au féminin partout.
- ✅ Aucun mélange d'univers ni de spécialisations.
- ✅ U1, U2 et B3 Négociation intacts.
- ✅ `tsc` et `eslint` : 0 erreur sur les fichiers de la mission.

## 12. Sécurité et points de vigilance

- Ne jamais exposer de clés (OpenAI, Anthropic, Supabase) : elles restent dans `.env.local` / variables Vercel, jamais dans le code ni côté client.
- Ne supprimer ni écraser aucun fichier sans validation, en particulier ce qu'utilise le parcours Négociation en production.
- Prévenir avant toute modification structurelle : schéma Supabase (ex. colonne `specialisation`), règles d'accès par groupe, compteur admin, routeur U3, routes IA existantes.
- Ne rien écrire dans la base Supabase depuis le local sans accord : elle est **partagée avec la production**.
- Ne rien commiter sur `main` ni déployer sans accord explicite de Stéphanie.
- Signaler les risques : quotas Vercel / Supabase, coût des appels IA (plusieurs groupes en simultané), latence en salle.
- Protéger la route IA contre les abus : limite d'appels, taille d'entrée bornée, refus des requêtes hors format.

Ne jamais inclure dans le projet : clés API, credentials Supabase, mot de passe admin, données étudiantes réelles.

## 13. Documentation attendue

- **README.md** (racine) : lancer, déployer, accéder à l'admin, modifier les contenus dans `src/lib/content/`, **ajouter une spécialisation B3** (procédure pour Finance au T2), modifier le prompt système du coach IA.
- **CLAUDE.md** (ce fichier) : tenir à jour la section 1 « Tâche en cours » et la section 16 « Journal ».
- **Commentaires dans le code** : prompt système et garde-fous IA, repli heuristique, scoring du quiz, aléatoire, persistance `sessionStorage`, configuration des spécialisations.
- **Fiches mission** :
  - `fiche-edc-career-v3.3.docx` ;
  - `fiche-mission-b3-m1-se-vendre-v2.docx` (et son prompt `prompt-mission-b3-m1-se-vendre.md`). La fiche v1 est périmée ;
  - `fiche-mission-b3-marketing-digital-signature-v2.docx` (mission active, alignée sur ce fichier). La v1 est périmée.

## 14. Décisions déjà prises

- **Stack** : Next.js 15, TypeScript, Tailwind, Shadcn, Supabase, Vercel. Raison : rapidité et écosystème mature.
- **Entrée** : QR Code de groupe, sans compte. Raison : simplicité et confidentialité.
- **Progression** : pilotée par l'admin. Raison : Stéphanie contrôle la séance en direct.
- **Univers 1** : stabilisé et gelé.
- **Univers 3 et IA** (décision du 2026-10-06) : l'IA est autorisée en Univers 3, côté serveur, comme coach, avec un repli heuristique systématique.
- **Persistance** : `sessionStorage` uniquement. Raison : reprendre après un rechargement sans stocker de données.
- **Évaluation** : 50 % note orale individuelle + 50 % note groupe écrite.
- **Déploiement B3** : jamais sans validation séparée de Stéphanie.
- **Accord du texte** : l'amorce de pitch (« Je suis étudiant en B3… ») est un champ modifiable. L'étudiant l'accorde ou la précise lui-même.
- **Export de la fiche** : Copier (`navigator.clipboard`) et Imprimer (`window.print()`) côté navigateur. Pas de PDF serveur, pas de nouvelle dépendance.
- **B3 = un parcours par spécialisation** (décision du 2026-10-06) : Négociation (en production), Marketing Digital (en cours), Finance (T2).
- **B3 Négociation = 6 missions**, Mission 1 « Se vendre sans se survendre » (décision du 2026-09-29, déployée).
- **B3 Marketing Digital = 5 missions** (décision du 2026-10-06). Mission 1 « Trouver sa signature digitale ». Missions 2 à 5 verrouillées, contenus décidés plus tard. Aucune 6ᵉ mission.

Choix refusés :
- Génération automatique de livrables (profil LinkedIn, post, pitch), y compris par l'IA.
- Stockage des données étudiantes.
- Mélange des vocabulaires d'univers ou de spécialisations.
- Séance B3 centrée sur le CV.

Si une décision technique importante se présente : expliquer les options simplement, recommander l'une d'elles, puis attendre la validation.

## 15. Questions ouvertes

1. ~~Mécanisme de spécialisation~~ : **tranché le 2026-10-06**. Le champ `specialization` des groupes existait déjà dans Supabase (`marketing`, `negociation`, `finance`) ; aucune modification de schéma.
2. **ILO de la Mission 1 Marketing Digital** : C13 + C7 comme en Négociation ? (Hypothèse en attendant.)
3. **Contenus complétés par Claude Code** (questions 11 à 15, fiches de 4 profils, questions de réflexion, prompt système, promesse, seuils) : à relire par Stéphanie avant la séance.
4. **Missions 2 à 5 Marketing Digital** : contenus décidés plus tard par Stéphanie.
5. **Missions 4 à 6 Négociation** : contenus définis plus tard.
6. **Parcours Finance** : missions et calendrier de création à définir pour le T2.
7. **Mise en production de Marketing Digital** : à quelle date, et après quel test avec un groupe réel ?

Si une information manque : faire une hypothèse raisonnable, l'indiquer, et avancer si le risque est faible. Demander validation si le risque est élevé (schéma, permissions, production Négociation, déploiement, coûts IA).

## 16. Définition de terminé et Journal

La mission active est terminée quand :
- ✅ La spécialisation des groupes B3 est différenciée par une configuration unique, extensible à Finance.
- ✅ Le parcours B3 Marketing Digital affiche 5 missions, et la Mission 1 est jouable de bout en bout, conforme à la section 3.2, avec la fiche finale générée.
- ✅ Le coaching IA respecte la section 3.5, et le repli heuristique fonctionne.
- ✅ Le parcours B3 Négociation en production est strictement inchangé.
- ✅ La persistance fonctionne en `sessionStorage` seul, sans aucune écriture serveur de contenu étudiant.
- ✅ Le scénario de test de la section 11 passe, ainsi que la non-régression.
- ✅ `tsc` et `eslint` : 0 erreur sur les fichiers de la mission.
- ✅ Le Journal est mis à jour et les questions ouvertes restantes sont remontées à Stéphanie.
- ⏳ Déploiement : uniquement après accord (procédure ci-dessous).

Livrables attendus :
- Configuration des spécialisations B3 et routage associé.
- Code de la mission (composant + contenus + route ou module IA + repli heuristique).
- Résumé des modifications et estimation du coût IA par séance.
- Liste des points et contenus à valider.

### Journal

**2026-10-06 — Parcours B3 Marketing Digital + Mission 1 « Trouver sa signature digitale » : codés, testés, déployés (accord de Stéphanie).**
- Spécialisations : configuration unique `B3_SPECIALISATIONS` + `specialisationB3()` dans `univers3.ts`, lue par `MissionShell.tsx` et par l'admin. Elle s'appuie sur le champ `specialization` déjà présent dans Supabase : aucune écriture en base, aucun changement de schéma. Finance (inactive) et tout groupe non reconnu ouvrent Négociation.
- Fichiers créés : `Mission1SignatureDigitale.tsx`, `src/app/api/mission/coach/` (`route.ts`, `prompt.ts`, `garde-fous.ts`). Fichiers modifiés : `univers3.ts` (ajouts en fin de fichier uniquement), `MissionShell.tsx`, `admin/groupes/[slug]/page.tsx`, `api/admin/groups/[slug]/next-mission/route.ts`.
- Coach IA : route dédiée `/api/mission/coach` (Anthropic, Claude Haiku 4.5), sortie JSON validée, repli heuristique `evaluerFormulationDigital` / `coachPitchHeuristique`, 5 appels maximum par étape.
- Vérifications : tsc OK, build OK, eslint 0 erreur sur les fichiers de la mission. Scénario joué sur `b3-marketing-digital` (mobile 375 px) avec l'IA indisponible ; garde-fous de sortie testés sur 14 réponses simulées ; non-régression `b3-negociation`, `b3-finance`, `b1-groupe-a`, `b2-groupe-a`, `pge2-groupe-a`.
- ⚠️ **Coach IA non testé en conditions réelles** : le compte Anthropic renvoie « credit balance is too low ». Tant que le crédit n'est pas rechargé, la mission tourne sur le repli (elle reste jouable de bout en bout). À faire après recharge : rejouer les points 4 et 5 du scénario de test (section 11).
- Non testé en direct (demanderait d'écrire dans la base de production) : l'écran « Mission à venir » d'une mission 2 à 5 Marketing Digital activée par l'admin, et le plafond à 5 du bouton « mission suivante ».
- À valider par Stéphanie : questions 11 à 15 et matrice de scoring du quiz, 5 fiches profils et 6 questions de réflexion, prompt système et garde-fous du coach, listes et seuils des heuristiques, promesse, ILO C13 + C7.
- Effet de bord assumé : dans l'admin, le titre de la mission active des groupes B3 vient désormais de la configuration (plus des anciens titres de la table `missions`).
- Anomalie préexistante repérée, non corrigée (hors périmètre) : `Mission3ImmersionControle.tsx` tire un contexte au hasard pendant le rendu, d'où un avertissement d'hydratation.

**2026-10-06 — Parcours B3 Marketing Digital (5 missions) + Mission 1 « Trouver sa signature digitale » : spécifiés, à coder.**
- Fiche `fiche-mission-b3-marketing-digital-signature-v2.docx`.
- Décisions de Stéphanie :
  - l'IA est autorisée en Univers 3 ;
  - B3 = un parcours par spécialisation (Négociation déployée, Marketing Digital en cours, Finance au T2) ;
  - missions 2 à 5 Marketing Digital : contenus décidés plus tard.
- Prérequis : constat sur le mécanisme de spécialisation et l'infrastructure IA existante, avant de coder.
- Fiche v2 alignée sur ce CLAUDE.md (IA coach en priorité, heuristiques en repli, spécialisations, missions 2 à 5 verrouillées).

**B3 Négociation — déployée en production** (⚠️ date à compléter par Stéphanie). Mission 1 « Se vendre sans se survendre ».

**2026-09-29 — Mission 1 B3 Négociation « Se vendre sans se survendre » codée et testée en local.**
- Nouveau routeur `MissionShell.tsx` (M1 Se vendre, M2, M3, M4 à M6 → `shared/MissionAVenir.tsx`).
- Fichiers : `Mission1SeVendre.tsx`, `MissionShell.tsx`, `shared/MissionAVenir.tsx`, bloc `mission1SeVendre` + `evaluerFormulation` dans `univers3.ts`, 1 ligne dans `Univers3Page.tsx`.
- Vérifications : tsc OK, build OK, eslint 0 erreur sur les fichiers de la mission. Scénario joué sur `b3-negociation` (mobile 375 px + ordinateur).
- Point à valider : le seuil « moins de 8 mots = vague » (`MOTS_MIN_FORMULATION`) juge vague « Je peux relancer mes prospects avec régularité » (7 mots).

**2026-09-29 — Mission 1 B3 Négociation « Se vendre sans se survendre » : spécifiée.**
- Fiche `fiche-mission-b3-m1-se-vendre-v2.docx`.
- Décision : elle remplace « Communication professionnelle sensible ». B3 Négociation reste à 6 missions ; M4 à M6 sont verrouillées.

**2026-09-07 — Mini quiz B2 M1 codé et testé, non déployé.**
- Fichiers : `univers2-quiz.ts` et `Cours1Quiz.tsx`.
- La boussole passe à 2 temps (Boussole → Quiz).
- Vérifications : tsc et eslint OK, test local sur `b2-groupe-a` OK.

**2026-09-07 — B2 et PGE2 déployés en production.**
- Compteur de missions dynamique (3 pour B2, 6 pour PGE2).
- Boussole : pistes et relance par question, bouton de tirage aléatoire.
- Rappel de l'évaluation 50/50 en fin de parcours B2.

**2026-09-07 — Refonte B3 V3.3 codée et testée.**
- Fichiers : `univers3.ts`, `univers3/shared/`, `Mission1/2/3*.tsx`.

### Procédure de déploiement B3 Marketing Digital (sur accord de Stéphanie uniquement)

1. Vérifier que le routeur U3 lit la configuration des spécialisations :
   - Négociation : comportement de production identique ;
   - Marketing Digital : 5 missions, M1 « Trouver sa signature digitale », M2 à M5 verrouillées ;
   - groupe sans spécialisation : parcours Négociation.
2. Vérifier les variables d'environnement IA sur Vercel (aucune nouvelle clé si l'infrastructure existante est réutilisée).
3. Si la solution validée modifie Supabase (colonne `specialisation`, compteur, titres) : faire relire le SQL par Stéphanie avant exécution. **Ne supprimer aucune ligne et ne pas écraser les titres Négociation.**
4. Renseigner la spécialisation des groupes Marketing Digital (slug ou champ, selon la solution retenue).
5. Ne supprimer aucune route IA existante.
6. Tester en local les deux spécialisations + la non-régression U1/U2, puis faire un build.
7. Merge de la branche dédiée, push sur `main`, puis vérifier le déploiement Vercel.
8. Test réel sur un groupe Marketing Digital, avec l'admin en vue « en tant qu'étudiant », avant la séance.
