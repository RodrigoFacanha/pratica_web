const Post = require('../models/postModel');


const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;


    if (!title || !content || !author) {
      return res.status(400).json({ message: 'title, content e author são obrigatórios.' });
    }

    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o post.' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os posts.' });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    res.status(500).json({ message: 'Erro ao buscar o post.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, author } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido.' });
    }
    res.status(500).json({ message: 'Erro ao atualizar o post.' });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido.' });
    }
    res.status(500).json({ message: 'Erro ao deletar o post.' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
