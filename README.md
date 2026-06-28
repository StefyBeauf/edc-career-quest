# EDC Career Quest

Application Next.js 15 pour animer des jeux de rôle pédagogiques en classe RH — avec un espace étudiant et un espace admin.

---

## Prérequis

- Node.js 18 ou supérieur
- Un compte [Supabase](https://supabase.com) (gratuit)
- Un compte [Vercel](https://vercel.com) pour le déploiement (optionnel en local)

---

## Installation locale

```bash
# 1. Cloner le dépôt
git clone <url-du-depot>
cd edc-career-quest

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
cp .env.local.example .env.local

# 4. Remplir les variables dans .env.local (voir section ci-dessous)

# 5. Lancer le serveur de développement
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Configuration des variables d'environnement

Ouvrir `.env.local` et remplir chaque variable :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase (dans Settings > API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique `anon` de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé `service_role` de Supabase (ne jamais exposer côté client) |
| `ANTHROPIC_API_KEY` | Clé API Anthropic (pour la génération IA) |
| `NEXT_PUBLIC_APP_URL` | URL de l'application (`http://localhost:3000` en local, URL Vercel en prod) |
| `ADMIN_SECRET` | Secret utilisé pour signer les sessions admin — changer en production |

---

## Configuration Supabase

### 1. Créer le projet

Sur [app.supabase.com](https://app.supabase.com), créer un nouveau projet.

### 2. Exécuter les migrations

Dans l'éditeur SQL de Supabase (section **SQL Editor**), exécuter les fichiers dans cet ordre :

1. `supabase/migrations/001_groups.sql`
2. `supabase/migrations/002_missions.sql`
3. `supabase/migrations/003_content.sql`
4. `supabase/migrations/004_admin_users.sql`

### 3. Créer le premier compte admin

Dans l'éditeur SQL, exécuter la commande suivante en remplaçant les valeurs :

```sql
INSERT INTO admin_users (email, password_hash, role)
VALUES (
  'votre@email.com',
  encode(sha256('votre-mot-de-passe'::bytea), 'hex'),
  'admin'
);
```

> Le mot de passe est hashé en SHA-256. Ne pas stocker le mot de passe en clair.

---

## Déploiement sur Vercel

1. Connecter le dépôt GitHub à Vercel
2. Dans les paramètres du projet Vercel, ajouter toutes les variables d'environnement (les mêmes que dans `.env.local`, mais avec l'URL Vercel pour `NEXT_PUBLIC_APP_URL`)
3. Déployer

---

## Espace admin

L'espace admin est accessible sur `/admin/login`.

**Fonctionnalités disponibles :**
- Tableau de bord avec les 9 groupes et leur statut
- Navigation entre les missions (suivante / précédente) pour chaque groupe
- Verrouillage / déverrouillage d'un groupe
- Génération et téléchargement du QR Code de chaque groupe

---

## Utilisation en classe — Scanner un QR Code

1. Aller sur `/admin/groupes/[slug]` pour afficher le QR Code du groupe
2. Les étudiants scannent le QR Code avec leur téléphone
3. Ils arrivent directement sur la page de leur groupe
4. L'animateur peut changer de mission depuis l'espace admin en temps réel

---

## Structure des dossiers

```
src/
├── app/
│   ├── admin/              # Espace administrateur (protégé)
│   │   ├── login/          # Page de connexion
│   │   ├── groupes/[slug]/ # Gestion d'un groupe
│   │   └── page.tsx        # Tableau de bord
│   ├── api/admin/          # Routes API admin
│   └── [slug]/             # Vue étudiant (par groupe)
├── components/
│   └── admin/              # Composants admin
├── lib/
│   ├── supabase/           # Clients Supabase
│   └── qrcode.ts           # Génération QR Code
└── types/                  # Types TypeScript
```
