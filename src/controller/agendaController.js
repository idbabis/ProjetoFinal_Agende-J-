const AgendaModel = require("../model/agenda")


/// NOVA AGENDA

const registerNewAgenda = async (req, res) => {
  try {
    const {
      nomeDaLoja,
      data,
      horario,
      tipoDeAtendimento,
      HistoricoDeAgendamentos,
      local,
      user,
    } = req.body;

    

    const newAgenda = new AgendaModel({
      nomeDaLoja,
      data,
      horario,
      tipoDeAtendimento,
      HistoricoDeAgendamentos,
      local,
      user,
    });

    const savedAgenda = await newAgenda.save();

    res.status(200).json(savedAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/// BUSCAR AGENDAMENTOS

const allAgendamentos = (req, res) => {
  agendamentosModel.find((err, agendamentos) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }
    res.status(200).send(agendamentos);
  });
};

/// BUSCAR LOJAS



///// USUARIO AGENDA ??????

const usuarioAgenda = async (req, res) => {
  try {
    const findUsuarioAgenda = await AgendaModel.findById(req.params.id);
    res.status(200).json(findUsuarioAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

///// ALTERAR OU ACRESCENTAR DADOS USUARIO




module.exports = {
  registerNewAgenda,
  allAgendamentos,
  findAllLojas,
  usuarioAgenda,
};
