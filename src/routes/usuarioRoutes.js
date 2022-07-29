const controller = require("../controller/usuarioController");
const express = require("express");
const { auth } = require("../controller/autenticacao");
const router = express.Router();

router.post("/usuario/", controller.registerNewUsuario);
router.post("/login", controller.login)
router.get("/usuarios",auth, controller.todosUsuarios)
router.get("/lojas",auth, controller.findAllLojas);
router.patch("/usuario/:id",auth, controller.alterarUsuario);
router.delete("/usuario/:id", controller.deletarUsuario);

module.exports = router;
