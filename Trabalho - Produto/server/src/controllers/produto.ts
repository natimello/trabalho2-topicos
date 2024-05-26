import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Produto } from "../models/produto";

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const produtos: Produto[] = await AppDataSource.getRepository(
      Produto
    ).find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

export const getProduto = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    const produto = await AppDataSource.getRepository(Produto).findOneBy({
      id: id,
    });
    if (produto == null) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};

export const addProduto = async (req: Request, res: Response) => {
  try {
    const produto = AppDataSource.getRepository(Produto).create(req.body);
    const results = await AppDataSource.getRepository(Produto).save(produto);
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar produto" });
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    const produto = await AppDataSource.getRepository(Produto).findOneBy({
      id: id,
    });
    if (produto == null) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    AppDataSource.getRepository(Produto).merge(produto, req.body);
    const results = await AppDataSource.getRepository(Produto).save(produto);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    const results = await AppDataSource.getRepository(Produto).delete(id);
    if (results.affected === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar produto" });
  }
};
