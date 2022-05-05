const getDb = require('../services/db');


// // Controller Function to return 201 code
// exports.create = (req, res) => {
//     res.sendStatus(201);
// }

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {
        await db.query(`INSERT INTO Artist (name, genre) VALUES ('${name}', '${genre}')`);
        
        res.sendStatus(201);
    }  catch (err) {
        res.sendStatus(500).json(err);
    }

    db.close();
};



// // Not needed when using exports.create:
// module.exports = artistController;