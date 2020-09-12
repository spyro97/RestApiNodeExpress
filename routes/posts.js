const express = require('express');

// Para mostrarlo en otro lugar, es un sistema de rounting basicamente
const router = express.Router();
const Post = require('../models/Post');

// Obtiene todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Crea un post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savePost = await post.save();
        res.status(200).json(savePost);
    } catch(err) {
        res.status(404).json({ message: err });
    }
});

// Busca un post en especifico
router.get('/:postID', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.postID);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Borrar un post
router.delete('/:postID', async(req, res) =>{
    try {
        const removedPost = await Post.remove({ _id: req.params.postID });
        res.status(200).json(removedPost);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Modifcar un post
router.put('/:postID', async(req, res) =>{
    try {
        const editedPost = await Post.updateOne(
            { _id: req.params.postID }, 
            { $set:{ title: req.body.title, description: req.body.description } }
        );
        res.status(200).json(editedPost);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


module.exports = router;