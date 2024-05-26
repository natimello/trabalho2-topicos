import axios from "axios";

const baseUrl = "http://localhost:3001/produtos";

class ProdutoService {
  getProdutos() {
    return axios
      .get(`${baseUrl}/listar`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  getProduto(id: any) {
    return axios
      .get(`${baseUrl}/buscar/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  addProduto(data: any) {
    return axios
      .post(`${baseUrl}/registrar`, data)
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  deleteProduto(id: any) {
    return axios
      .delete(`${baseUrl}/remover/${id}`)
      .then((response) => response.status)
      .catch((error) => {
        console.error("Erro ao remover produto", error);
      });
  }

  updateProduto(id: any, data: any) {
    return axios
      .put(`${baseUrl}/atualizar/${id}`, data)
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

export default new ProdutoService();
