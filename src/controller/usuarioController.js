const usuarioModel = require("../model/usuario");
const LojasModel = require("../model/lojas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { auth } = require("./autenticacao");



const todosUsuarios = async (req, res) => {
  try {
    res.status(200).send(await usuarioModel.find())
    
  } catch (error) {
    
  }
}

/// REGISTRO

const registerNewUsuario = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      message: "Invalid payload",
    });
  }

  const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

  req.body.password = encryptedPassword;
  const newUsuario = new usuarioModel(req.body);

  try {
    await newUsuario.save();

    res.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      usuario: newUsuario,
    });
  } catch (err) {
    res.status(424).send({ message: err.message });
  }
};

/// ROTA DE LOGIN

const login = (req, res) => {
  usuarioModel.findOne({ email: req.body.email }, (err, usuario) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!usuario) {
      return res
        .status(404)
        .send("Não existe usuário cadastrado com esse email");
    }

    const password = bcrypt.compareSync(req.body.password, usuario.password);
    if (!password) {
      return res.status(403).send("Acesso negado: senha incorreta");
    }

    const token = jwt.sign({ email: usuario.email }, SECRET);
    return res.status(200).send({ token: token, usuario });
  });
};

/// NOVA AGENDA


/// BUSCAR AGENDAMENTOS


/// BUSCAR LOJAS

const findAllLojas = (req, res) => {
  LojasModel.find((err, lojas) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }
    res.status(200).send(lojas);
  });
};

///// USUARIO AGENDA ??????

///// ALTERAR OU ACRESCENTAR DADOS USUARIO

const alterarUsuario = (req, res) => {
  const token = auth(req, res);
  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(403).send("Token inválido!");
    }
    const id = req.params.id;
    const updateUsuario = req.body;
    usuarioModel.findByIdAndUpdate(id, updateUsuario, (err, usuario) => {
      if (err) {
        return res.status(424).send({ message: err.message });
      } else if (usuario) {
        return res.status(200).send("Atualizado com sucesso!");
      }
      res.status(404).send("Registro não encontrado");
    });
  });
};

//// DELETAR USUARIO OU CONTA
const deletarUsuario = (req, res) => {
  const token = auth(req, res);
  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(403).send("Token inválido!");
    }
    const params = req.query;
    usuarioModel.deleteMany(params, (err, usuario) => {
      if (err) {
        return res.status(424).send({ message: err.message });
      } else if (usuario) {
        return res.status(200).send("Removido com sucesso!");
      }
      res.status(404).send("Registro não encontrado!");
    });
  });
};

module.exports = {
  registerNewUsuario,
  findAllLojas,
  alterarUsuario,
  deletarUsuario,
  login,
  todosUsuarios,
};
