import * as express from "express";
import {
  addProduto,
  deleteProduto,
  getProduto,
  getProdutos,
  updateProduto,
} from "../controllers/produto";

const routerProduto = express.Router();

routerProduto.post("/produtos/registrar", addProduto);
routerProduto.get("/produtos/listar", getProdutos);
routerProduto.put("/produtos/atualizar/:id", updateProduto);
routerProduto.delete("/produtos/remover/:id", deleteProduto);
routerProduto.get("/produtos/buscar/:id", getProduto);

export default routerProduto;
