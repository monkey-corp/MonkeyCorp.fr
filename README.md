# site MKC

GitHub officiel

## Installation

### PNPM

`npm install -g pnpm`

### Dépendances

`pnpm install`

## Développement

PNPM fonctionne avec des workspaces qui contiennent des packages (dossier dans `packages/` qui contiennent un `package.json`).

Packages actuels :

- api
- site

Pour ajouter des dépendances :

`pnpm -F <package> add <dépendance> [-D pour dev]`

Pour lancer le serveur local :

`pnpm -F <package> start`
