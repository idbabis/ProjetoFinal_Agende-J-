const Usuario = require("../src/model/usuario");

describe("Testes do modelo Usuario", () => {
  const usuario = new Usuario({
    id: 2,
    nomeCompleto: "Barbara Goncalves",
    contatoTelefone: 11991225934,
    contatoEmail: "idbabis",
    dataNascimento: 16031986,
    email: "idbabis@yahoo.com.br",
    password: "petzinho",
    tipoDeAtendimentoPretendido: "Banho e tosa",
    estado: "São Paulo",
    agenda: [
      {
        nomeDaLoja: "Babi Pets",
        data: "29/07/2022",
        horario: "15h30",
        tipoDeAtendimento: "Banho",
        local: "Rua Acai,1001",
      },
    ],
  });

it("Deve chamar o schema e retornar um novo usuario", () => {
  expect(usuario.nomeCompleto).toBe("Barbara Goncalves");
});
it("Deve salvar no banco de dados o novo usuario", () => {
  usuario.save().then((dados) => {
    expect(dados.nomeCompleto).toBe("Barbara Goncalves");
  });
})
});
