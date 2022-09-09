const express = require('express');
const router = express.Router();

const {
  createProtocol,
  getAllProtocols,
  getSingleProtocol,
  updateProtocol,
  deleteProtocol,
} = require('../controllers/protocols');

router.route('/').post(createProtocol).get(getAllProtocols);

router
  .route('/:id')
  .get(getSingleProtocol)
  .patch(updateProtocol)
  .delete(deleteProtocol);

module.exports = router;
