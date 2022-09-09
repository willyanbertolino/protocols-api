const mongoose = require('mongoose');

const protocolSchema = new mongoose.Schema(
  {
    requester: {
      type: String,
      required: [true, 'O nome do requisitante é obrigatório.'],
    },
    descrition: {
      type: String,
      required: [true, 'A descrição do protocolo é obrigatória.'],
    },
    email: {
      type: String,
      required: [true, 'O email do requerente é obrigatório'],
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Protocols', protocolSchema);
