# AMĀNA — Setup credentials externes (10 min)

Le code est en train d'être écrit en background. Pour activer le système de réservation Google Calendar, il faut 2 comptes externes (gratuits) à créer. Voici le guide pas-à-pas.

## 1) Compte Neon Postgres (3 min)

Neon est un Postgres serverless hébergé en UE, free tier généreux (0.5 GB, 191 h compute/mois, point-in-time recovery 7 jours).

1. Va sur [neon.tech](https://neon.tech) → **Sign up** → choisis **Continue with GitHub** ou Google avec ton compte ( `reseauxalliancesolutions@gmail.com` ou un compte AMĀNA dédié, à toi de voir).
2. Une fois connecté, clique **Create a project** :
   - **Project name** : `amana-vision`
   - **Postgres version** : 16 (par défaut)
   - **Region** : **Frankfurt (eu-central-1)** (RGPD)
   - **Database name** : `amana`
3. Sur la page de bienvenue, copie la **Connection string** (qui commence par `postgresql://...neon.tech/amana?sslmode=require`).
4. Envoie-moi cette chaîne de connexion. Format attendu :

```
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxxxx.eu-central-1.aws.neon.tech/amana?sslmode=require
```

## 2) Projet Google Cloud + OAuth client (8 min)

1. Va sur [console.cloud.google.com](https://console.cloud.google.com/), connecte-toi avec un compte Google (idéalement un compte dédié AMĀNA, ou ton compte si tu transféreras à Aminah plus tard via "Project Owner").
2. **Crée un nouveau projet** :
   - Clique sur le sélecteur de projet en haut → **New Project**
   - Name : `amana-vision`
   - Laisse l'organisation vide si elle est demandée
   - Crée
3. Dans le menu burger, va dans **APIs & Services → Library**.
   - Recherche **Google Calendar API**
   - Clique → **Enable**
4. Dans le menu, va dans **APIs & Services → OAuth consent screen** :
   - **User type** : **External** (pour pouvoir inviter des comptes Gmail tiers)
   - Continue
   - **App information** :
     - App name : `AMĀNA`
     - User support email : `communauteamana@hotmail.com`
     - App logo : tu peux uploader `~/Desktop/Amana/logo/amana-mark-ivoire.png` (1024×1024)
   - **App domain** :
     - Application home page : `https://amana.channel`
     - Application privacy policy link : `https://amana.channel/politique-de-confidentialite` (à créer plus tard, pour l'instant pointe `/contact`)
     - Application terms of service link : laisse vide ou pointe `/charte-ethique`
   - **Authorized domains** : ajoute `vercel.app` et plus tard le domaine custom (ex: `amana.channel` quand Aminah bascule)
   - **Developer contact info** : ton email
   - Save and Continue
   - **Scopes** : clique **Add or remove scopes**, recherche et coche :
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`
     - `https://www.googleapis.com/auth/calendar.events`
   - Save and Continue
   - **Test users** : ajoute ton email + celui d'Aminah + emails des 2 expertes (Coach Rachida, Dar Balkis) que tu inviteras à tester. Tant que l'app est en "Testing", seuls ces emails peuvent autoriser AMĀNA. Pour passer en "In production", il faudra une verification Google (1 à 6 semaines), à faire plus tard.
   - Save and Continue
5. Dans le menu, va dans **APIs & Services → Credentials** :
   - Clique **Create credentials** → **OAuth client ID**
   - **Application type** : **Web application**
   - Name : `amana-vision-web`
   - **Authorized JavaScript origins** :
     - `https://amana.channel`
   - **Authorized redirect URIs** :
     - `https://amana.channel/api/auth/callback/google`
   - Create
6. Une popup apparaît avec **Client ID** et **Client Secret**.
   - Copie les deux.
   - Tu peux aussi cliquer **Download JSON** pour les sauvegarder.

Envoie-moi :

```
GOOGLE_CLIENT_ID=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Ce que je fais après réception

1. Je pose les 3 variables (`DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) dans Vercel via CLI.
2. Je lance les migrations Drizzle pour créer les tables.
3. Je seed les 2 experts existants (Coach Rachida, Dar Balkis) en DB avec status `draft`.
4. Je redéploie en prod.
5. Je teste le flow OAuth avec ton compte Gmail.
6. Tu peux ensuite envoyer aux 2 expertes un mail d'invitation pour qu'elles complètent leur fiche + connectent leur Google Agenda.

## Sécurité et RGPD

- Les refresh tokens sont chiffrés AES-256-GCM avant stockage en DB. Clé de chiffrement déjà posée dans Vercel (`TOKEN_ENC_KEY`).
- Audit log signé HMAC pour chaque OAuth grant/revoke et chaque booking.
- Page `/compte/donnees` permet à l'expert de révoquer ses tokens et supprimer ses données à tout moment.
- Hébergement Neon : Frankfurt (UE). Vercel : Frankfurt edge.
- DPO suggéré : Aminah L. (à mentionner dans la politique de conf à finaliser).

## En cas de souci

- Si tu bloques sur une étape Google Cloud, fais-moi un screenshot, je te débogue.
- Si tu préfères que je le fasse côté Neon avec ton accès, dis-moi (il faut juste me confirmer que tu as créé le compte, je peux ensuite naviguer si tu me partages l'écran ou via l'API Neon).
- L'OAuth consent en mode "Testing" suffit pour démarrer. La vérification Google complète peut attendre.
