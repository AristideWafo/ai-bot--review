import { Request, Response } from "express";
import { fetchMergeRequestChanges, postGitLabComment } from "./gitlab/gitlab.service";
import { FileDiff } from "./models/FileDiff";
import { MergeRequestWebhookEvent } from "./models/MergeRequestWebhookEvent";
import { MergeRequestChangesResponse } from "./models/MergeRequestChangesResponse";
import { GitLabCommentInput } from "./models/MergeRequestComment";
import { generateCodeReviewFromDiff } from "./chatgpt/chatgpt.service";
import { logger } from "./utils/logger";

/**
 * Gère les événements webhook GitLab liés aux merge requests.
 *
 * Cette méthode est déclenchée automatiquement lorsqu’un webhook de type `merge_request`
 * est reçu depuis GitLab. Elle extrait l’identifiant du projet (`projectId`) et l’IID
 * de la merge request (`mergeRequestIid`) à partir du corps de la requête, puis appelle
 * l’API GitLab pour récupérer les fichiers modifiés dans cette MR.
 *
 * Si des fichiers modifiés sont détectés, leur chemin est affiché dans les logs.
 * En cas de données manquantes ou d’erreur lors de l’appel API, un message d’erreur
 * est retourné.
 *
 * @param req Requête HTTP contenant le webhook GitLab (objet `MergeRequestWebhookEvent`)
 * @param res Réponse HTTP à retourner à GitLab
 * @returns Une réponse HTTP 200 si tout s’est bien passé, 400 si des données sont manquantes, ou 500 en cas d’erreur serveur.
 */
export async function handleGitlabWebhook(
  req: Request,
  res: Response,
): Promise<void> {
  const payload = req.body as MergeRequestWebhookEvent;
  const projectId = payload?.project?.id;
  const mergeRequestIid = payload?.object_attributes?.iid;

  if (!projectId || !mergeRequestIid) {
    res.status(400).send("Projet ou MR ID manquant");
    return;
  }

  try {
    const mergeRequestChanges: MergeRequestChangesResponse | null =
      await fetchMergeRequestChanges(projectId, mergeRequestIid);

      // Collecte des promesses de revue + commentaires
      const reviewTasks = mergeRequestChanges?.changes.map(async change => {
          const reviews = await generateCodeReviewFromDiff(change.diff);
          if (reviews) {
              return Promise.all(
                  reviews.map(review =>
                      postGitLabComment(
                          new GitLabCommentInput({
                              projectId,
                              mergeRequestIid,
                              filePath: change.new_path,
                              startLineNumber: review.start_line,
                              lineNumber: review.end_line,
                              comment: review.suggestion,
                              diffRefs: mergeRequestChanges?.diff_refs,
                          }),
                      ).catch(error => {
                          logger.error('❌ Erreur lors de l’envoi du commentaire :', error);
                      }),
                  ),
              );
          }
      });

      await Promise.all(reviewTasks ?? []); // On attend que tout soit terminé

    // logMergeRequestChanges(changes);

    res.status(200).send("Webhook traité");
    logger.info(
      `Webhook traité pour le projet ${projectId} et la MR ${mergeRequestIid}`,
    );
  } catch (error: any) {
    res.status(500).send("Erreur serveur");
    logger.error(`Erreur lors du traitement du webhook : ${error.message}`, {
      error,
      projectId,
      mergeRequestIid,
    });
  }
}

/**
 * Enregistre les changements détectés dans une merge request (MR).
 * Cette fonction parcourt les fichiers modifiés dans la MR
 * et enregistre les informations pertinentes dans les logs.
 * Elle est utile pour le suivi des modifications
 * et le débogage.
 * @param changes Liste des fichiers modifiés dans la MR, sous forme de tableau d'objets `FileDiff`.
 * Si `null` ou vide, un message indiquant qu'aucun changement n'a été détecté est enregistré.
 */
function logMergeRequestChanges(changes: FileDiff[] | null) {
  if (changes && changes.length > 0) {
    logger.info(
      `Changements détectés dans la MR : ${changes.length} fichiers modifiés`,
    );
    changes.forEach((change) => {
      logger.debug(`Fichier modifié : ${change.new_path}`);
      logger.debug(`Diff : ${change.diff}`);
    });
  } else {
    logger.info(
      "Aucun changement détecté dans la MR ou pas de fichiers modifiés.",
    );
  }
}
