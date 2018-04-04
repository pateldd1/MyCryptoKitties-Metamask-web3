let router = require('express').Router();
const TransactionController = require('../controllers/transactions_controller');

// Investments API
router.route('/createTransaction')
    .post(TransactionController.createTransaction);
    
router.route('/getOutgoingTransactions')
    .get(TransactionController.getOutgoingTransactions);

router.route('/getIncomingTransactions')
    .get(TransactionController.getIncomingTransactions);

module.exports = router;
