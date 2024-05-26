import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoService from "@/services/produtoService";

const Registrar = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {
    if (itemId) {
      ProdutoService.getProduto(itemId)
        .then((data) => {
          setItemData(data);
          setFormData({
            nome: data.nome,
            descricao: data.descricao,
            preco: !isNaN(data.preco) ? String(data.preco) : "",
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar produto:", error);
        });
    }
  }, [itemId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevenir o envio do formulário padrão

    if (!formData.nome || !formData.descricao || !formData.preco) {
      console.log("Por favor, preencha todos os campos");
      return;
    }

    // Verifica se o campo preço é um número válido
    if (isNaN(parseFloat(formData.preco))) {
      console.log("O preço deve ser um número válido");
      return;
    }

    ProdutoService.updateProduto(itemId, formData)
      .then((data) => {
        console.log("Produto atualizado:", data);
        if (data === 204) {
          navigate("/listar");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o produto:", error);
      });
  };

  if (!itemData) {
    return <h4>Carregando...</h4>;
  }

  return (
    <div className="formulario">
      <h2>Atualizar Produto</h2>
      <Form onSubmit={handleSubmit} className="formulario">
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
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Preço"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="buttons">
            <Button type="submit">Atualizar</Button>
            <Button onClick={() => navigate("/")}>Voltar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Registrar;
