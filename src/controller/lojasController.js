const LojasModel = require("../model/lojas");
const UsuarioModel = require("../model/usuario");
const AgendaModel = require("../model/agenda")

const createLojas = async (req, res) => {
  try {
    const { nameLoja, CNPJ, endereço, estado, tipoDeAtendimento } = req.body;

    const newLoja = new LojasModel({
      nameLoja,
      CNPJ,
      endereço,
      estado,
      tipoDeAtendimento,
    });

    const savedLoja = await newLoja.save();

    res.status(201).json(savedLoja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const findLojasById = async (req, res) => {
  try {
    const findLojas = await LojasModel.findById(req.params.id);
    res.status(200).json(findLojas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateLojas = async (req, res) => {
  try {
    const { nameLoja, CNPJ, endereço, estado, tipoDeAtendimento } = req.body;
    const updatedLojas = await LojasModel.findByIdAndUpdate(req.params.id, {
      nameLoja,
      CNPJ,
      endereço,
      estado,
      tipoDeAtendimento,
    });

    res.status(200).json(updatedLojas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const listarAgenda = async (req, res) => {
  try {
    const findAgenda = await LojasModel.findById(req.params.id);
    res.status(200).json(findAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/* const listarAgenda = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      usuarioId,
      nomeCompleto,
      contatoTelefone,
      contatoEmail,
      dataNascimento,
      email,
      password,
      tipoDeAtendimentoPretendido,
      estado,
      agenda,
    } = req.body;
    const findLojas = await LojasModel.findById(id);

    if (findLojas == null) {
      return res.status(404).json({ message: " Loja não encontrada." });
    }

    if (usuarioId) {
      const findUsuario = await UsuarioModel.findById(usuarioId);

      if (findUsuario == null) {
        return res.status(404).json({ message: "Usuário não foi encontrado" });
      }
    }

    // if (name) findLojas.name = name
    findLojas.nomeCompleto = nomeCompleto || findLojas.nomeCompleto;
    findLojas.contatoTelefone = contatoTelefone || findLojas.contatoTelefone;
    findLojas.contatoEmail = contatoEmail || findLojas.contatoEmail;
    findLojas.dataNascimento = dataNascimento || findLojas.dataNascimento;
    findLojas.email = email || findLojas.email;
    findLojas.password = password || findLojas.password;
    findLojas.tipoDeAtendimentoPretendido =
      tipoDeAtendimentoPretendido || findLojas.tipoDeAtendimentoPretendido;
    findLojas.estado = estado || findLojas.estado;
    findLojas.agenda = agenda || findLojas.agenda;
    findLojas.usuario = usuarioId || findLojas.usuario;

    const savedLojas = await findLojas.save();
    res.status(200).json(savedLojas);
  } catch (error) {}
}; */

const deleteLojas = async (req, res) => {
  try {
    const { id } = req.params;
    const findLojas = await LojasModel.findById(id);

    if (findLojas == null) {
      return res
        .status(404)
        .json({
          message: `A loja com o id# ${req.params.id} não foi encontrada.`,
        });
    }

    await findLojas.remove();

    res
      .status(200)
      .json({
        message: ` A loja ${findLojas.nameLoja} foi deletada com sucesso.`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLojas,
  findLojasById,
  updateLojas,
  listarAgenda,
  deleteLojas,
};
