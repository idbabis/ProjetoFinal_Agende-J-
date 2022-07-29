const Lojas = require("../src/model/lojas");


describe("Testes do modelo Lojas", () => {
  const lojas = new Lojas({
    id: 1,
    nameLoja: "Pet Friendly",
    CNPJ: 01001011000101,
    endereço: "Rua Arara 001",
    estado: "São Paulo",
    tipoDeAtendimento: "Consulta Veterinaria",
  });
  it("Deve chamar o schema e retornar um nova Loja", () => {
    expect(lojas.nomeLoja).toBe("Pet Friendly");
  });
  it("Deve salvar no banco de dados a nova Loja", () => {
    lojas.save().then((dados) => {
      expect(dados.nomeLoja).toBe("Pet Friendly");
    });
  });
});

