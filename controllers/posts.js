const fs = require('fs');
const path = require('path');
const posts = require("../db/db.js");


//FUNZIONE VISUALIZZAZIONE POST COMPLETI DI DETTAGLI
function index(req, res) {
    res.format({
        html: () => {
            const html = [`<h3> I miei Post </h3>`];
            html.push("<ul>")
            for (const post of posts) {
                html.push(`<li>
                <h3>${post.title}</h3>
                <img src="${post.image}" alt="${post.title}" style="width: 250px">
                <p>${post.content}</p>
                <p>Tags: ${post.tags}</p>
                </li>`)
            }
            html.push("</ul>");
            res.send(html.join(""));
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    })
}
//funzione per create 
function create(req, res) {
    res.format({
        html: () => {
            html = "<h1>Creazione nuovo post</h1>"
            res.send(html);
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }

    })
}
//funzione per download 
function downloadImage(req, res) {
    const postSlug = req.params.slug;

    const post = posts.find((post) => post.slug == postSlug);


    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }


    const imagePath = path.resolve(__dirname, '..', 'public', post.image);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Immagine non trovata');
            return;
        }
    })

    res.download(imagePath);


}


module.exports = {
    index,
    create,
    downloadImage
}