import axios, { AxiosError } from "axios";
import { GITLAB_CONFIG } from "../utils/config";
import { GitLabComment, GitLabCommentInput } from "../models/MergeRequestComment";
import { MergeRequestChangesResponse } from "../models/MergeRequestChangesResponse";
import { logger } from "../utils/logger";

/**
 * Récupère les changements d'une merge request GitLab.
 * Cette fonction utilise l'API GitLab pour obtenir les fichiers modifiés dans une merge request spécifique.
 * Elle prend en paramètre l'identifiant du projet et l'IID de la merge request.
 * Si la requête réussit, elle retourne un objet contenant les changements.
 * Si la requête échoue, elle gère l'erreur et retourne `null`.
 *
 * @param {number | string} projectId - L'identifiant du projet GitLab.
 * @param {number | string} mergeRequestIid - L'IID de la merge request GitLab.
 * @return {Promise<MergeRequestChangesResponse | null>} - Un objet contenant les changements de la merge request ou `null` en cas d'erreur.
 */
export async function fetchMergeRequestChanges(
  projectId: number | string,
  mergeRequestIid: number | string,
): Promise<MergeRequestChangesResponse | null> {
  const url = `${GITLAB_CONFIG.apiBaseUrl}/projects/${encodeURIComponent(
    projectId,
  )}/merge_requests/${mergeRequestIid}/changes`;

  try {
    const response = await axios.get(url, {
      headers: {
        "PRIVATE-TOKEN": GITLAB_CONFIG.token,
      },
    });
    logger.info("Changements de MR récupérés avec succès");

    return response.data || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      logger.error(
        `❌ Échec de la récupération des changements de MR : ${axiosError.message}`,
        {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        },
      );
    } else {
      logger.error(
        "❌ Erreur inconnue lors de la récupération des changements de MR :",
        error,
      );
    }
    return null;
  }
}

/**
 * Envoie un commentaire sur une merge request GitLab.
 * Cette fonction construit le payload du commentaire à partir de l'entrée fournie
 * et envoie une requête POST à l'API GitLab pour créer le commentaire.
 * En cas de succès, elle ne retourne rien. En cas d'erreur, elle gère l'erreur et la relance.
 *
 * @param {GitLabCommentInput} input - Les données nécessaires pour poster le commentaire.
 * @return {Promise<void>} - Une promesse qui se résout lorsque le commentaire est posté avec succès.
 */
export async function postGitLabComment(
  input: GitLabCommentInput,
): Promise<void> {
  const { projectId, mergeRequestIid } = input;
  const url = `${GITLAB_CONFIG.apiBaseUrl}/projects/${encodeURIComponent(
    projectId,
  )}/merge_requests/${mergeRequestIid}/discussions`;
  const payload = buildGitLabCommentPayload(input);

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "PRIVATE-TOKEN": GITLAB_CONFIG.token,
        "Content-Type": "application/json",
      },
    });
    logger.info("Commentaire posté avec succès");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      logger.error(
        `❌ Échec de la publication du commentaire : ${axiosError.message}`,
        {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        },
      );
    } else {
      logger.error(
        "❌ Erreur inconnue lors de la publication du commentaire :",
        error,
      );
    }
    throw error; // Relance l'erreur pour que l'appelant puisse la gérer
  }
}

/**
 * Construit le payload pour un commentaire GitLab à partir des données d'entrée.
 * Cette fonction crée un objet conforme à l'API GitLab pour poster un commentaire
 * sur une merge request, en utilisant les informations fournies dans l'entrée.
 *
 * @param {GitLabCommentInput} input - Les données nécessaires pour construire le payload du commentaire.
 * @return {GitLabComment} - Un objet représentant le commentaire à poster sur GitLab.
 */
function buildGitLabCommentPayload(input: GitLabCommentInput): GitLabComment {
  const { comment, diffRefs, filePath, lineNumber, startLineNumber } = input;

  return {
    body: comment,
    position: {
      position_type: "text",
      base_sha: diffRefs.base_sha,
      start_sha: diffRefs.start_sha,
      head_sha: diffRefs.head_sha,
      old_path: filePath,
      new_path: filePath,
      old_line: null,
      new_line: lineNumber,
      line_range: {
        start: {
          line_code: generateLineCode(filePath, startLineNumber!, lineNumber),
          type: "new",
          old_line: null,
          new_line: startLineNumber!,
        },
        end: {
          line_code: generateLineCode(filePath, lineNumber, lineNumber),
          type: "new",
          old_line: null,
          new_line: lineNumber,
        },
      },
    },
  };
}

//todo to remove
function generateLineCode(
  filePath: string,
  start: number,
  end: number,
): string {
  const hash = Buffer.from(filePath).toString("hex").slice(0, 40);
  return `${hash}_0_${end}`;
}
