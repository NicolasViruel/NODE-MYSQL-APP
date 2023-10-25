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
        req.flash('success' , 'Link saved successfully');

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

const deleteLinks = async (req, res) =>{
    const {id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?' , [id]);
    req.flash('success', 'Links Removed successfully')
    res.redirect('/api/showlinks')
};


const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
        console.log(links[0]);
        // Verificar si se encontró un enlace con el ID dado
        if (links.length === 0) {
            return res.status(404).send('Link not found');
        }

        // Renderizar la vista de edición con los datos del enlace encontrado
        res.render('links/edit', { link: links[0] });

    } catch (error) {
        console.error('Error fetching link:', error);
        res.status(500).send('Internal Server Error');
    }
};

const newLink = async (req, res) =>{
    const {id} = req.params;
    const {title, url, descripcion} = req.body;
    const newLink = {
        title,
        descripcion,
        url,
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success' , 'Link Updated Successfully');
    res.redirect('/api/showlinks')
};


module.exports= {
    getUsers,
    addLinks,
    showLinks,
    deleteLinks,
    updateLink,
    newLink
}