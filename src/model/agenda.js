const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },

    nomeDaLoja: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    tipoDeAtendimento: { type: String, required: true },
    local: { type: String, required: true },
    user: {type: String, required: true},
  },
  {
    versionKey: false,
  },

  { timestamps: true }
);

const agendaCollection = mongoose.model("agenda", agendaSchema);

module.exports = agendaCollection;
