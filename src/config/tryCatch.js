exports.tryCatchAsync = (controller) => async (req, res) => {
    try {
        await controller(req, res);
    } catch (error) {
        res.status(500).send({
            title: 'Error',
            message: 'Ha ocurrido un error inesperado, por favor contacte a su administrador'
        });
    }
}