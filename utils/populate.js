const Protocols = require('../models/Protocols');
const mockData = require('./mock');

const populateDB = async () => {
  try {
    // reset database
    await Protocols.deleteMany();

    // Insert data
    await Protocols.insertMany(mockData);
    console.log('Concluido.');
  } catch (error) {
    console.log(error);
  }
};

module.exports = populateDB;
