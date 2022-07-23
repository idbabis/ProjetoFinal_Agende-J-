const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },

    nomeCompleto: { type: String, required: true },
    contatoTelefone: { type: Number },
    contatoEmail: { type: String },
    dataNascimento: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipoDeAtendimentoPretendido: { type: String },
    estado: { type: String },
    agenda: [ {type: mongoose.Schema.Types.ObjectId,
      ref: 'agenda'}
  ]

  },
  {
    versionKey: false,
  },

  { timestamps: true }
);

const usuarioCollection = mongoose.model("usuario", usuarioSchema);

module.exports = usuarioCollection;
