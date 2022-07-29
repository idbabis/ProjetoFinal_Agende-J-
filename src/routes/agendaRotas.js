const controller = require("../controller/agendaController");
const express = require("express");
const { auth } = require("../controller/autenticacao");
const router = express.Router();



router.post("/agenda", controller.registerNewAgenda);
router.get("/buscar", controller.allAgendamentos);
router.get("agenda/:id", controller.usuarioAgenda);

module.exports = router;
