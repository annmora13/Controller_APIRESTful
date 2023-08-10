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
// http://localhost:3000/user/create/firstName/Jesus/lastName/Ajencio/email/poroto@gmail.com
app.get('/user/create/firstName/:firstName/lastName/:lastName/email/:email', async (req, res) => {
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const email = req.params.email;
    try {
        const usuario = await createUser({ firstName, lastName, email });
        res.status(StatusCodes.CREATED).json({ 
            message: `El alumno ${usuario.firstName} ${usuario.lastName} fue creado con éxito
            se enviará la información al correo ${usuario.email}`,
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

// http://localhost:3000/user/update/id/1/firstName/Alejandro/lastName/Rodriguez/email/poroto@gmail.com
app.get('/user/update/id/:id/firstName/:firstName/lastName/:lastName/email/:email', async (req, res) => {
    const id = Number(req.params.id);
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const email = req.params.email;
    try {
        const actualizados = await updateUser({
            id,
            firstName,
            lastName,
            email
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
// http://localhost:3000/bootcamp/create/title/Danza/cue/Baile%20I/description/Requiere%20flats
app.get('/bootcamp/create/title/:title/cue/:cue/description/:description', async (req, res) => {
    const title = req.params.title;
    const cue = req.params.cue;
    const description = req.params.description;
    try {
        const curso = await createBootcamp({ title, cue, description });
        res.status(StatusCodes.CREATED).json({ 
            message: `El curso ${curso.title} fue creado con éxito,
            La ${curso.cue}, ${curso.description}`,
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