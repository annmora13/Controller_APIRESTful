const { 
    Bootcamp,
    User 
} = require('../models');

const createBootcamp = async ({title, cue, description}) => {
    try {
        const curso = await Bootcamp.create({
            title: title,
            cue: cue,
            description: description
        });
        console.log(`Se ha creado el curso ${JSON.stringify(curso, null, 4)}`);
        return curso;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addUserToBootcamp = async (bootcampId, userId) => {
    try {
        const curso = await Project.findByPk(bootcampId);
        if (!curso) {
            console.log(`No se encontró curso con id ${bootcampId}`);
            return null;
        }
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            console.log(`No se encontró usuario con id ${userId}`);
            return null;
        }
        await curso.addUser(usuario);
        console.log(`Agredado el usuario id ${usuario.id} al proyecto con id ${bootcamp.id}`);
        return curso;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findBootcampById = async (id) => {
    try {
        const curso = await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se ha encontrado el curso ${JSON.stringify(curso, null, 4)}`);
        return curso;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllBootcamps = async () => {
    try {
        const cursos = await Bootcamp.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los cursos ${JSON.stringify(bootcamp, null, 4)}`);
        return cursos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// const updateBootcamp = async (bootcamp) => {
//     try {
//         const actualizados = await Bootcamp.update({
//             name: bootcamp.name
//         }, {
//             where: { id: bootcamp.id }
//         });
//         console.log(`actualizados: ${actualizados}`);
//         console.log(`Curso id ${bootcamp.id} fue actualizado con éxito`);
//         return actualizados[0];
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// const deleteBootcampById = async (id) => {
//     try {
//         const borrados = await Bootcamp.destroy({ 
//             where: { id }
//         });
//         console.log(`borrados: ${borrados}`);
//         console.log(`Curso id ${id} fue borrado con éxito`);
//         return borrados;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

module.exports = {
    createBootcamp,
    addUserToBootcamp,
    findBootcampById,
    findAllBootcamps,
    // updateBootcamp,
    // deleteBootcampById
}