const notFound = (req, res) => res.status(404).send('Esta rota não existe');

module.exports = notFound;
