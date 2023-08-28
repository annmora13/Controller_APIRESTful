const { User, 
    Bootcamp } = require('../models');

const createUser = async ({ firstName, lastName, email, password }) => {
    try {
        const usuario = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        console.log(`Se ha creado el usuario ${JSON.stringify(usuario, null, 4)}`);
        return usuario;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateUser = async (user) => {
    try {
        const usuario = await User.findByPk(user.id);
        let actualizados = [];
        if (usuario) {
            if ((usuario.firstName !== user.firstName) || 
            (usuario.lastName !== user.lastName) || 
            (usuario.email !== user.email)) {
                actualizados = await User.update({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }, {
                    where: { id: user.id }
                });
                console.log(`actualizados: ${actualizados}`);
                console.log(`Se ha actualizado el usuario con id ${user.id}`);
            } else {
                actualizados[0] = -1;
            }
        } else {
            actualizados[0] = 0;
        }
        return actualizados[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findUserById = async (userId) => {
    try {
        const usuario = await User.findByPk(userId, {
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title', 'cue', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se ha encontrado el usuario ${JSON.stringify(usuario, null, 4)}`);
        return usuario;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllUsers = async () => {
    try {
        const usuarios = await User.findAll({
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title', 'cue', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los usuarios ${JSON.stringify(usuarios, null, 4)}`);
        return usuarios;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteUserById = async (id) => {
    try {
        const borrados = await User.destroy({ 
            where: { id }
        });
        console.log(`borrados: ${borrados}`);
        console.log(`Usuario id ${id} fue borrado con éxito`);
        return borrados;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createUser,
    findUserById,
    findAllUsers,
    updateUser,
    deleteUserById
}