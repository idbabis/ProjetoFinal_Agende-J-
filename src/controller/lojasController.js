const lojasModel = require("../model/lojas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { auth } = require("./autenticacao");


const createLojas = async (req, res) => {
    try {
        const { nameLoja, CNPJ, endereço, estado,  tipoDeAtendimento } = req.body

        const newLoja = new LojaModel({
            nameLoja, CNPJ, endereço, estado,  tipoDeAtendimento
        })

        const savedLoja = await newLoja.save()

        res.status(201).json(savedLoja)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }

};









module.exports = {
    createLojas,
    
};