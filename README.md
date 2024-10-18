# site MKC

GitHub officiel

## Installation

### PNPM

`npm install -g pnpm`

### Dépendances

`pnpm install`

## Base de données

Penser à définir le mot de passe du *root* en créant le fichier `database/root-password.secret` contenant ce dernier. Cf. `database/root-password.secret.example`.

## Développement

### Site et API

PNPM fonctionne avec des workspaces qui contiennent des packages (dossier dans `packages/` qui contiennent un `package.json`).

Packages actuels :

- api
- site

Pour ajouter des dépendances :

`pnpm -F <package> add <dépendance> [-D pour dev]`

Pour lancer le serveur local :

`pnpm -F <package> start`

### BDD

Pour lancer la BDD :

```bash
cd /path/to/repo
docker compose up   #TODO docker compose watch
```

Pour la réinitialiser à son état initial :

```bash
docker compose down -v
docker compose up
```
