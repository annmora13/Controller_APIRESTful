const express = require('express');
const app = express();
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const {
    createUser,
    findUserById,
    findAllUsers,
    updateUser,
    deleteUserById
} = require('./app/controllers/user.controller');
const {
    createBootcamp,
    addUserToBootcamp,
    findBootcampById,
    findAllBootcamps,
} = require('./app/controllers/bootcamp.controller');
const PORT = process.env.PORT;

// ------USER------ 
// http://localhost:3000/user/create/Jose%20Alberto
app.get('/user/create/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const usuario = await createUser({ name });
        res.status(StatusCodes.CREATED).json({ 
            message: `usuario ${usuario.name} fue creado con éxito`,
            user: usuario 
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/findById/1
app.get('/user/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const usuario = await findUserById(id);
        if (usuario) {
            res.status(StatusCodes.OK).json({ 
                message: `usuario ${usuario.name} fue encontrado con éxito`,
                user: usuario 
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ 
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user
app.get('/user', async (req, res) => {
    try {
        const usuarios = await findAllUsers();
        res.status(StatusCodes.OK).json({ 
            message: `se encontraron ${usuarios.length} usuarios`,
            users: usuarios 
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/update/id/1/nombre/Pedro%20Picapiedra
app.get('/user/update/id/:id/nombre/:nombre', async (req, res) => {
    const id = Number(req.params.id);
    const name = req.params.nombre;
    try {
        const actualizados = await updateUser({
            id,
            name
        });
        if (actualizados) {
            if (actualizados !== -1) {
                res.status(StatusCodes.CREATED).json({ 
                    message: `usuario id ${id} fue actualizado con éxito`
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ 
                    message: `usuario id ${id} no fue actualizado. No había nada que actualizar.`
                });
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ 
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/delete/id/1
app.get('/user/delete/id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const borrados = await deleteUserById(id);
        if (borrados) {
            res.status(StatusCodes.CREATED).json({ 
                message: `usuario id ${id} fue borrado con éxito`
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ 
                message: `usuario id ${id} no fue encontrado`
            });
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// ------BOOTCAMP------ 
// http://localhost:3000/bootcamp/create/name/Curso%20A
app.get('/bootcamp/create/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const curso = await createBootcamp({ name });
        res.status(StatusCodes.CREATED).json({ 
            message: `curso ${proyecto.name} fue creado con éxito`,
            project: curso 
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/findById/1
app.get('/bootcamp/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const curso = await findBootcampById(id);
        if (curso) {
            res.status(StatusCodes.OK).json({ 
                message: `Curso ${curso.name} fue encontrado con éxito`,
                project: curso 
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ 
                message: `Curso id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp
app.get('/bootcamp', async (req, res) => {
    try {
        const cursos = await findAllBootcamps();
        res.status(StatusCodes.OK).json({ 
            message: `se encontraron ${cursos.length} cursos`,
            projects: cursos 
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/adduser/idBootcamp/1/idUser/1
app.get('/bootcamp/adduser/idBootcamp/:idBootcamp/idUser/:idUser', async (req, res) => {
    const idBootcamp = Number(req.params.idBootcamp);
    const idUser = Number(req.params.idUser); 
    try {
        const curso = await addUserToBootcamp(idBootcamp, idUser);
        res.status(StatusCodes.CREATED).json({ 
            message: `Se agregó usuario id ${idUser} al proyecto id ${idBootcamp}`,
            project: curso
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});


app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));