const mongoose = require("mongoose");

const lojasSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },

    nameLoja: { type: String, required: true, unique: true },
    CNPJ: { type: Number, required: true, unique: true },
    endereço: { type: String, required: true },
    estado: { type: String, required: true },
    tipoDeAtendimento: { type: String, required: true },
  },

  { timestamps: true }
  
);

const lojasCollection = mongoose.model("lojas", lojasSchema);

module.exports = lojasCollection;
