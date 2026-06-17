# AMĀNA — Site

Site officiel d'AMĀNA : la vitrine (vision, univers, sélection d'experts, charte éthique, contact) et un système de prise de rendez-vous avec les experts via Google Agenda.

Construit avec Next.js 16 (App Router), Tailwind CSS et Drizzle. Hébergement Vercel + Neon (UE).

## Mettre le site en ligne (5 minutes, sans rien savoir coder)

Le site fonctionne en deux temps. D'abord la **vitrine**, tout de suite, sans aucune configuration. Ensuite les **réservations**, quand tu veux.

### 1. Publier la vitrine

Clique sur le bouton ci-dessous :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nouraminemankouri-gif/amana-site&project-name=amana&repository-name=amana)

1. Connecte-toi à **ton** compte Vercel.
2. Vercel propose de créer une copie du projet sur ton GitHub : accepte.
3. Laisse tous les réglages par défaut et clique **Deploy**. Aucune variable d'environnement n'est nécessaire pour la vitrine.
4. En 1 à 2 minutes, ton site est en ligne sur une adresse `…vercel.app`.

### 2. Brancher le domaine amana.channel

1. Dans ton projet Vercel, va dans **Settings → Domains**.
2. Ajoute `amana.channel` (il est déjà dans ton compte).
3. Vercel le rattache automatiquement. Le site est en ligne sur `https://amana.channel`.

### 3. Activer les réservations (plus tard, quand tu es prête)

Tant que cette étape n'est pas faite, le formulaire de réservation reste visible mais affiche « ouverture imminente ». Pour l'activer, il faut 3 choses, toutes gratuites :

- une base de données **Neon** (Postgres, région Francfort),
- un identifiant **Google OAuth** (pour connecter l'agenda des experts),
- quelques **variables d'environnement** à coller dans Vercel.

Le détail pas à pas est dans [`SETUP-EXTERNES.md`](./SETUP-EXTERNES.md).

| Variable | Quand | Rôle |
|----------|-------|------|
| `NEXTAUTH_SECRET` | phase 2 | Sécurité des sessions |
| `TOKEN_ENC_KEY` | phase 2 | Chiffrement des jetons Google (AES-256-GCM) |
| `AUDIT_HMAC_KEY` | phase 2 | Signature du journal d'audit |
| `NEXTAUTH_URL` | phase 2 | `https://amana.channel` |
| `DATABASE_URL` | phase 2 | Connexion Neon |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | phase 2 | OAuth Google Agenda |
| `RESEND_API_KEY` / `RESEND_TO` | optionnel | Emails de contact |
| `ADMIN_EMAILS` | optionnel | Accès au backoffice (par défaut : `communauteamana@hotmail.com`) |

> Les clés `NEXTAUTH_SECRET`, `TOKEN_ENC_KEY` et `AUDIT_HMAC_KEY` se génèrent en une commande :
> `openssl rand -base64 32`. Ne jamais les publier ni les committer.

## Lancer en local (optionnel, pour développer)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # vérifier que tout compile
```

## Structure

```
app/         pages publiques + espace expert (/compte) + backoffice (/admin) + API
components/  composants (header, footer, réservation, expert)
lib/         config site, base de données, Google, sécurité, données de démo
drizzle/     migrations SQL (à appliquer en phase 2)
```

Le site s'affiche en **mode démo** sans base de données : les fiches experts viennent de `lib/seed-data.ts`. Dès que `DATABASE_URL` et les identifiants Google sont posés, le mode connecté s'active automatiquement.
