const controller = require('../controller/lojasController')
const express = require('express')
const router = express.Router()

router.post("/lojas", controller.createLojas)
/*router.get("/lojas/:id", controller.findLojasById)
router.patch("/lojas/:id", controller.updateLojas)
router.delete("/lojas/:id", controller.deleteLojas)
router.get("lojas/agenda/:id", controller.listarAgenda)*/

module.exports = router
