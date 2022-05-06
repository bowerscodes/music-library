const getDb = require('../services/db');


// // Controller Function to return 201 code
// exports.create = (req, res) => {
//     res.sendStatus(201);
// }

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {
        await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            name,
            genre,
        ]);
        
        res.sendStatus(201);
    }  catch (err) {
        res.sendStatus(500).json(err);
    }

    db.close();
};

exports.read = async (_, res) => {
    const db = await getDb();

    try {
        const [artists] = await db.query('SELECT * FROM Artist');

        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json(err);
    }
    db.close();
};

exports.readById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        artistId,
    ]);

    if (!artist) {
        res.sendStatus(404);
    } else {
        res.status(200).json(artist);
    }

    db.close();
};

exports.update = async (req, res) => {
    const db = await getDb();
    const data = req.body;
    const { artistId } = req.params;

    try {
        const [
            { affectedRows },
        ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

        if(!affectedRows) {
            res.sendStatus(404);
        } else {
            res.status(200).send();
        }
    } catch (err) {
        res.sendStatus(500);
    }

    db.close();
};

// // Not needed when using exports.create:
// module.exports = artistController;