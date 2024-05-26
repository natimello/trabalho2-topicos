import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProdutoService from "@/services/produtoService";

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState<any>(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ProdutoService.getProdutos()
      .then((data) => {
        // Atualiza o preço dos produtos para exibir duas casas decimais
        const produtosComPrecoFormatado = data.map((produto: any) => ({
          ...produto,
          preco: parseFloat(produto.preco).toFixed(2),
        }));
        setProdutos(produtosComPrecoFormatado);
      })
      .catch((error) => {
        console.error("Erro ao listar produtos:", error);
        setError(error);
      });
  }, []);

  const handleRemove = async (id: any) => {
    ProdutoService.deleteProduto(id)
      .then(() => {
        setProdutos(
          produtos.filter((produto: { id: any }) => produto.id !== id)
        );
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error);
        setError(error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!produtos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Lista de Produtos</h3>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto: any) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.preco}</td>
              <td>
                <Button onClick={() => navigate(`/atualizar/${produto.id}`)}>
                  <FaEdit />
                </Button>
                <Button onClick={() => handleRemove(produto.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarProdutos;
