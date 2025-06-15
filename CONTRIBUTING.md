# 🤝 Guide de contribution

Merci de votre intérêt pour contribuer à ce projet ! Ce document explique comment participer efficacement.

---

## 📦 Pré-requis

Avant de commencer :

- Node.js ≥ 18
- npm ou pnpm
- Avoir un token GitLab personnel (si besoin)
- Avoir un token OpenAI valide
- Avoir un token ngrok valide

Installez les dépendances :

```bash
npm install
```

## 🧑‍💻 Style de code

- Utiliser TypeScript strict.
- Formatage : Prettier est recommandé (npm run format)
- Convention de nommage : camelCase pour les variables, PascalCase pour les classes/interfaces.

## ✅ Comment proposer une contribution

1. Forkez le dépôt

2. Créez une branche descriptive :

```bash
git checkout -b fix/amelioration-message-log
```

3. Faites vos modifications, avec des commits clairs :

```bash
git commit -m "fix(logger): meilleure gestion des erreurs OpenAI"
```

4. Ouvrez une Pull Request vers main

```bash
Les PRs doivent être testées et ne pas contenir de fichiers .env, node_modules/, ou secrets.
```

## 🧪 Tests

Les tests unitaires seront ajoutés dans une prochaine version.
