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

  const protocolsLimit = await Protocols.count();
  const limit = 200;

  if (protocolsLimit >= limit) {
    throw new CustomError.BadRequestError(
      `Numero máximo de protocolos atingido - (${limit})`
    );
  }

  await Protocols.create({
    requester,
    description,
    email,
  });
  res.status(201).json({ success: true });
};

const getAllProtocols = async (req, res) => {
  const page = Number(req.query.page);
  const max = 5;
  if (!page || page < 1) {
    page = 1;
  }

  const protrocolsNum = await Protocols.find({
    requester: { $regex: req.query.search, $options: 'ix' },
  }).count();

  const protocols = await Protocols.find({
    requester: { $regex: req.query.search, $options: 'ix' },
  })
    .sort({ _id: -1 })
    .skip((page - 1) * max)
    .limit(max);

  const maxPage = Math.ceil(protrocolsNum / max);

  res.status(200).json({ protocols, maxPage });
};

const getSingleProtocol = async (req, res) => {
  const { id } = req.params;

  const protocol = await Protocols.findOne({ _id: id });

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
  res.status(200).json({ success: true });
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
