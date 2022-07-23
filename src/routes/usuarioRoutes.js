const controller = require('../controller/usuarioController')
const express = require('express')
const router = express.Router()

 
router.post("/", controller.registerNewUsuario)
router.post("/agenda", controller.registerNewAgenda)
router.get("/buscar", controller.allAgendamentos)
router.get("/lojas", controller.findAllLojas)
router.get("usuario/agenda/:id", controller.usuarioAgenda)
router.patch("/alterar/:id", controller.alterarUsuario)
router.delete ("/deletar/:id", controller.deletarUsuario)

module.exports = router

