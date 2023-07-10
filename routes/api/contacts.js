const express = require('express')
const ctrl = require('../../controllers/contacts')

const router = express.Router()
router.get('/', ctrl.getAllContacts);

router.get('/', async (req, res, next) => {
  res.json({ message: 'templat message' })
})

router.post('/', ctrl.addOneContact);

router.delete('/:id', ctrl.deleteContactById);

router.put('/:id', ctrl.updateContactById);
  
module.exports = router
