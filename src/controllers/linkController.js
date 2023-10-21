const pool = require('../database');

const getUsers= (req, res) => {
    res.render('links/add')
};

const addLinks = async (req, res) => {
    console.log(req.body);
    try {
        const { title, url, descripcion } = req.body;
        const newLink = {
            title,
            url,
            descripcion
        };

        // Realiza la inserción en la base de datos
        await pool.query('INSERT INTO links SET ?', [newLink]);

        res.redirect('/api/showlinks');
        console.log("New link added:", newLink);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la inserción
        console.error("Error adding link:", error);
        res.status(500).send("Error adding link to the database");
    }
};

const showLinks = async (req, res) =>{
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links: links});
};


module.exports= {
    getUsers,
    addLinks,
    showLinks
}