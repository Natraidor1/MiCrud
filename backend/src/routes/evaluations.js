import express, { Router } from "express";

import evaluationsController from "../controllers/evaluationsController.js";

const router = express.Router();

router
.route("/")
.get(evaluationsController.getEvaluations)
.post(evaluationsController.insertEvaluations)

router
.route("/:id")
.put(evaluationsController.updateEvaluation)
.delete(evaluationsController.deleteEvaluations)

export default router;