import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connect } from "@ngrok/ngrok";
import { handleGitlabWebhook } from "./webhook.controller";
import { NGROK_AUTHTOKEN, PORT, WEBHOOK_PATH } from "./utils/config";
import { logger } from "./utils/logger";

const app = express();

app.use(bodyParser.json());

/**
 * Route pour recevoir les webhooks GitLab.
 * Cette route est appelée par GitLab lorsqu'un événement de merge request se produit.
 * Elle traite le webhook en appelant la fonction `handleGitlabWebhook`.
 * @param req Requête HTTP contenant le webhook GitLab
 * @param res Réponse HTTP à retourner à GitLab
 * @returns Une réponse HTTP 200 si le webhook a été traité avec succès, ou 500 en cas d'erreur.
 * Cette route est configurée pour recevoir des requêtes POST sur le chemin `/webhook`.
 */
app.post(WEBHOOK_PATH, (req: Request, res: Response) => {
  logger.info("Webhook reçu :", req.body);
  try {
    handleGitlabWebhook(req, res);
    res.status(200).send("Webhook reçu");
    logger.info("Webhook traité avec succès");
  } catch (error) {
    res.status(500).send("Erreur lors du traitement du webhook");
    logger.error("Erreur lors du traitement du webhook :", error);
    return;
  }
});

app.listen(PORT, async () => {
  logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
  //   await connectToNgrok();
});

async function connectToNgrok() {
  try {
    const listener = await connect({
      addr: PORT,
      authtoken: NGROK_AUTHTOKEN.token,
    });
    logger.info(`🌐 Tunnel Ngrok établi à : ${listener.url()}`);
  } catch (error) {
    logger.error("❌ Erreur lors de la connexion à Ngrok :", error);
  }
}
