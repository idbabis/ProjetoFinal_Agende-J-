const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },

    nomeDaLoja: { type: String, required: true },
    data: { type: Number, required: true },
    horario: { type: Number, required: true },
    tipoDeAtendimento: { type: String, required: true },
    HistoricoDeAgendamentos: { type: String, required: true },
    local: { type: Number, required: true },
  },
  {
    versionKey: false,
  },

  { timestamps: true }
);

const agendaCollection = mongoose.model("agenda", agendaSchema);

module.exports = agendaCollection;
