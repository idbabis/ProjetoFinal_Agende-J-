const usuarioModel = require("../model/usuario");
const lojasModel = require("../model/lojas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { auth } = require("./autenticacao");


/// REGISTRO 

const registerNewUsuario = async (req, res) => {
  
    const  { email, password } = req.body
  
    if (!email || !password) {
      return res.status(422).send({
        message: 'Invalid payload',
      });
    }
  
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  
    req.body.password = encryptedPassword;
    const newUsuario = new usuarioModel(req.body);
  
    try {
      await newUsuario.save();
  
      res.status(201).send({
        message: "Usuário cadastrado com sucesso!",
        usuario: newUsuario,
      });
    } catch (err) {
      res.status(424).send({ message: err.message })
    }
  };
  
  
  /// ROTA DE LOGIN
  
  const login = (req, res) => {
      usuarioModel.findOne({ email: req.body.email }, (err, usuario) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      };
      if (!usuario) {
        return res.status(404).send('Não existe usuário cadastrado com esse email');
      };
  
      const password = bcrypt.compareSync(req.body.password, usuario.password);
      if (!password) {
        return res.status(403).send('Acesso negado: senha incorreta');
      };
  
      const token = jwt.sign({ email: usuario.email }, SECRET);
      return res.status(200).send( { token:token, usuario} );
    });
  };

 /// NOVA AGENDA

  const registerNewAgenda = async (req, res) => {
    try {
        const { nomeDaLoja, data, horario, tipoDeAtendimento, HistoricoDeAgendamentos, local } = req.body


        if (!lojasId) {
            return res.status(400).json({ message: ' É obrigatório o id da loja' })

        }

        const findLoja = await LojaModel.findById(lojaId)

        if (!findLoja) {
            return res.status(404).json({ message: ' Loja não foi encontrata' })
        }


        const newAgenda = new AgendaModel({
         nomeDaLoja, data, horario, tipoDeAtendimento, HistoricoDeAgendamentos, local
        })


        const savedAgenda = await newAgenda.save()

        res.status(200).json(savedAgenda)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })

    }
}

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

  const findAllLojas = (req, res) => {
    lojasModel.find((err, lojas) => {
      if (err) {
        return res.status(424).send({ message: err.message });
      }
      res.status(200).send(lojas);
    });
  };


///// USUARIO AGENDA ??????

const usuarioAgenda = async (req, res) => {
    try {
        const findUsuarioAgenda = await usuarioAgendaModel.findById(req.params.id)
        res.status(200).json(findUsuarioAgenda)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
};



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
    registerNewAgenda,
    allAgendamentos,
    findAllLojas,
    usuarioAgenda,
    alterarUsuario,
    deletarUsuario,
    login,

};