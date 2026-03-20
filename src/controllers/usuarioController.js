import * as usuarioModel from "../models/usuarioModel.js";
import crypto from "crypto";

const gerarHashSenha = (senha) => {
    return crypto.createHash("sha256").update(senha).digest("hex");
};

export const listar = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar usuários." });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.buscarUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não localizado." });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Erro na busca por ID." });
    }
};

export const criar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
        }

        const senha_hash = gerarHashSenha(senha);
        const novoId = await usuarioModel.criarUsuario({ nome, email, senha_hash });

        return res.status(201).json({ 
            message: "Conta criada com sucesso!", 
            id: novoId 
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao processar o cadastro." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Preencha email e senha." });
        }

        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
        
        const senha_hash = gerarHashSenha(senha);
        if (!usuario || senha_hash !== usuario.senha_hash) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = crypto.randomBytes(24).toString("hex");

        return res.status(200).json({
            message: "Acesso autorizado",
            token,
            user: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no processo de login." });
    }
};

export const atualizarusuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const usuarioExistente = await usuarioModel.buscarUsuarioPorId(id);
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuário não encontrado para atualização." });
        }

        const dadosParaAtualizar = {
            nome: nome || usuarioExistente.nome,
            email: email || usuarioExistente.email,
            senha_hash: senha ? gerarHashSenha(senha) : usuarioExistente.senha_hash
        };

        await usuarioModel.atualizarusuarios(id, dadosParaAtualizar);
        return res.status(200).json({ message: "Cadastro atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar dados." });
    }
};

export const deletarusuarios = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioModel.buscarUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await usuarioModel.deletarusuarios(id);
        return res.status(200).json({ message: "Usuário removido do sistema." });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir conta." });
    }
};