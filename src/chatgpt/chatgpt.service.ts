import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import {
  OPENAI_API_KEY,
  OPENAI_MAX_TOKENS,
  OPENAI_MODEL,
  OPENAI_TEMPERATURE,
  OPENAI_TOP_P,
  REVIEW_PROMPT,
} from "../utils/config";
import { logger } from "../utils/logger";


const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const Review = z.object({
  reviews: z.array(
    z.object({
      start_line: z.number(),
      end_line: z.number(),
      suggestion: z.string(),
    }),
  ),
});

const reviewPrompt = REVIEW_PROMPT;

/**
 * Analyse une diff Git et génère des suggestions de revue de code.
 * Cette fonction utilise l'API OpenAI pour extraire des recommandations
 * d'amélioration basées sur les bonnes pratiques de développement.
 *
 * @param diff La diff Git à analyser, sous forme de chaîne de caractères.
 * @return Un tableau d'objets contenant les suggestions de revue de code,
 *         ou null si aucune suggestion n'a été générée.
 */
export async function generateCodeReviewFromDiff(
  diff: string,
): Promise<
  { start_line: number; end_line: number; suggestion: string }[] | null
> {
  try {
    logger.info("Génération de la revue de code en cours...");
    const response = await openai.responses.parse({
      model: OPENAI_MODEL,
      temperature: OPENAI_TEMPERATURE,
      max_output_tokens: OPENAI_MAX_TOKENS,
      top_p: OPENAI_TOP_P,
      input: [
        { role: "system", content: reviewPrompt },
        { role: "user", content: diff },
      ],
      text: {
        format: zodTextFormat(Review, "review"),
      },
    });
    logger.info("Revue de code générée avec succès");
    return response.output_parsed?.reviews ?? null;
  } catch (error) {
    logger.error("Erreur lors de la génération de la revue de code :", error);
    return null;
  }
}
