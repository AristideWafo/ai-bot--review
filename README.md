# 🔧 DiffChecker AI

## 🎯 Description du projet

Ce projet a pour objectif de **fournir un assistant automatisé de revue de code** à partir de diffs Git.  
Il analyse les modifications proposées, identifie les bonnes pratiques non respectées, et suggère des améliorations claires et concises, prêtes à être utilisées dans un processus de revue automatisée (CI/CD ou bots GitLab/GitHub).

### Cas d’usage

- Revue automatisée de merge requests
- Intégration dans une pipeline CI
- Aide à la montée en qualité du code dans les équipes
- Suggestions éducatives pour les juniors

---

## ⚙️ Instructions d’installation

### Prérequis

- Node.js ≥ 18.x
- `pnpm` ou `npm` ou `yarn`
- Un compte OpenAI avec une clé API
- Git pour tester les diffs

### Installation

```bash
git clone https://github.com/ton-utilisateur/nom-du-projet.git
cd nom-du-projet
pnpm install # ou npm install ou yarn install
```

### Configuration

Avant de démarrer le projet, crée un fichier `.env` à la racine avec les variables suivantes :

```env
GITLAB_TOKEN=glpat-...
GITLAB_API_BASE_URL=https://gitlab.com/api/v4
NGROK_AUTHTOKEN=2yTX...

PORT=3000
WEBHOOK_PATH=/webhook

OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0
OPENAI_MAX_TOKENS=1000
OPENAI_TOP_P=1.0
```

## 🤝 Guide de contribution

Pour contribuer au projet, consulte le fichier [CONTRIBUTING.md](CONTRIBUTING.md) pour les bonnes pratiques et les étapes à suivre.

## 📜 Licence

Ce projet est sous licence MIT. Consulte le fichier [LICENSE](LICENSE) pour plus de détails.

## 🚀 Démarrage

Pour démarrer le projet, exécute la commande suivante :

```bash
pnpm start # ou npm start ou yarn start
```

## Contact et support

Pour toute question, bug ou suggestion :

💥 Ouvrez une issue sur le repo GitHub

Contact direct : wafoaristide@gmail.com (ou via[LinkedIn](https://linkedin.com/in/aristidewafo) si tu préfères)
