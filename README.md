# Site MKC

GitHub officiel

## Installation

### PNPM

```
npm install -g pnpm
```

### Dépendances

```
pnpm install
```

## Base de données

Penser à définir l'environnement :

- Le mot de passe du *root* en créant le fichier `database/root-password.secret` contenant ce dernier. 
- Le *host* en créant le fichier `database/root-host.secret` contenant ce dernier.

> Cf. les fichiers `.example` dans `database/`

## Développement

### Site et API

PNPM fonctionne avec des workspaces qui contiennent des packages (dossier dans `packages/` qui contiennent un `package.json`).

Packages actuels :

- `api`
- `site`

Pour ajouter des dépendances :

```
pnpm -F <package> add <dépendance> [-D pour dev]
```

Pour lancer le serveur local :

```
pnpm -F <package> start
```

### BDD

Profils:
- `prod` : Base vide et persistante
- `dev` : Base avec jeu de test, **est supprimée avant chaque test d'intégration**

Pour lancer la BDD :

```
./compose.sh <profil> up|down [<service>] [...]
```

Pour la réinitialiser à son état initial :

```
./compose.sh <profil> down -v
```

> La commande `./compose.sh <profil>` prend n'importe quel argument de la commande `docker compose`

## Tests

### Unitaires

```
pnpm -F <service> unit
```

### Intégration

```
./compose.sh test
```
> Réinitialise le service `db-dev`
