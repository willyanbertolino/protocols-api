const Protocols = require('../models/Protocols');
const CustomError = require('../errors');
const populate = require('../utils/populate');

const createProtocol = async (req, res) => {
  const { requester, description, email } = req.body;

  if (!requester || !description || !email)
    throw new CustomError.BadRequestError('Todos os campos são obrigatórios.');

  const repeatedProtocol = await Protocols.findOne({
    requester,
    description,
    email,
  });

  if (repeatedProtocol) {
    throw new CustomError.BadRequestError(
      'Já existe um protocolo igual a este!'
    );
  }

  const protocol = await Protocols.create({
    requester,
    description,
    email,
  });
  res.status(201).json({ protocol });
};

const getAllProtocols = async (req, res) => {
  let page = Number(req.query.page);
  let max = Number(req.query.max) || 20;
  if (!page || page < 1) {
    page = 1;
  }

  const protocols = await Protocols.find()
    .skip(page * max)
    .limit(max);

  res.status(200).json({ protocols });
};

const getSingleProtocol = async (req, res) => {
  const { id } = req.params;

  const protocol = await Protocols.findOne({ _id: id });
  console.log('protocol:', protocol);

  if (!protocol) {
    throw new CustomError.BadRequestError(
      `Não há nenhum protocolo com este id: ${id}`
    );
  }

  res.status(200).json({ protocol });
};

const updateProtocol = async (req, res) => {
  const { id } = req.params;
  const { requester, description, email } = req.body;

  const protocol = await Protocols.findOneAndUpdate(
    { _id: id },
    { requester, description, email },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!protocol) {
    throw new CustomError.BadRequestError(
      `Não foi possível atualizar o protocolo com id: ${id}`
    );
  }

  res.status(200).json({ protocol });
};

const deleteProtocol = async (req, res) => {
  const { id } = req.params;

  const protocol = await Protocols.findOne({ _id: id });

  if (!protocol) {
    throw new CustomError.BadRequestError(
      `Não foi possível excluir o protocolo com id: ${id}`
    );
  }

  await protocol.remove();
  res.status(200).json({ msg: 'Protocolo excluído com sucesso.' });
};

const resetDB = async (req, res) => {
  await populate();
  res.status(200).json({ msg: 'Banco de dados resetado com sucesso.' });
};

module.exports = {
  createProtocol,
  resetDB,
  getAllProtocols,
  getSingleProtocol,
  updateProtocol,
  deleteProtocol,
};
