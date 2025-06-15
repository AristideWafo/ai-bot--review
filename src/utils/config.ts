import 'dotenv/config';
export const GITLAB_CONFIG = {
  token: process.env.GITLAB_TOKEN,
  apiBaseUrl: process.env.GITLAB_API_BASE_URL || "https://gitlab.com/api/v4",
};
export const NGROK_AUTHTOKEN = {
  token: process.env.NGROK_AUTHTOKEN,
};
export const PORT = process.env.PORT || 3000;

export const WEBHOOK_PATH = process.env.WEBHOOK_PATH || "/webhook";

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.0-mini";
export const OPENAI_TEMPERATURE = process.env.OPENAI_TEMPERATURE
  ? parseFloat(process.env.OPENAI_TEMPERATURE)
  : 0;
export const OPENAI_MAX_TOKENS = 1000; // Limite de tokens pour la réponse
export const OPENAI_TOP_P = process.env.OPENAI_TOP_P
  ? parseFloat(process.env.OPENAI_TOP_P)
  : 1;
// process.env.OPENAI_MAX_TOKENS ||
export const REVIEW_PROMPT = `Tu es un expert en revue de code spécialisé dans les bonnes pratiques de développement. Voici une diff Git d’un fichier modifié. Analyse-la attentivement et identifie les **améliorations concrètes** à proposer, selon les critères ci-dessous :

- Nommage explicite et cohérent
- Fonctions courtes à responsabilité unique
- Suppression de code mort
- Commentaires utiles (expliquer le "pourquoi", pas le "quoi")
- Organisation logique du code
- Séparation claire des responsabilités
- Validation des entrées et sorties
- Gestion propre des erreurs
- Pas de duplication de logique
- Complexité réduite
- Optimisation des performances
- Sécurité des données (XSS, injection, etc.)
- Présence ou absence de tests pertinents
- Résilience face aux cas limites
- Respect des standards (lint, doc, SOLID, CI/CD…)

### Ta mission :
Réponds uniquement sous **forme d’un tableau JSON** contenant des suggestions **claires, concises et ciblées** :

{
  "reviews": [
    {
      "start_line": number,
      "end_line": number,
      "suggestion": "Suggestion précise d'amélioration"
    }
  ]
}`;
