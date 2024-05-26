import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import ProdutoService from "@/services/produtoService";

const Registrar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Verifica se os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.descricao || !formData.preco) {
      console.log("Por favor, preencha todos os campos");
      return;
    }

    // Verifica se o campo preço é um número válido
    if (isNaN(parseFloat(formData.preco))) {
      console.log("O preço deve ser um número válido");
      return;
    }

    // Se todos os campos estiverem preenchidos e o preço for válido, adiciona o produto
    ProdutoService.addProduto(formData)
      .then((response) => {
        console.log("Produto adicionado:");
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
        });
      })
      .catch((error) => {
        console.log("Erro ao adicionar o produto:", error);
      });
  };

  return (
    <div className="formulario">
      <h2>Adicionar Produto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            placeholder="R$"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col className="buttons">
            <Button type="submit">Registrar</Button>
            <Button onClick={() => navigate("/")}>Voltar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Registrar;
