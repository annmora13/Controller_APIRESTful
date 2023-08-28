const { User } = require('../models');

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Correo repetido."
            });
            return;
        }
        next();
    });
};

module.exports = {
    checkDuplicateEmail
};
