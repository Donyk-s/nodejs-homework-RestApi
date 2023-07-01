const express = require('express')
const ctrl = require('../../controllers/contacts')

const router = express.Router()
router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.addOneContact);

router.delete('/:id', ctrl.deleteContactById);

router.put('/:id', ctrl.updateContactById);
  
module.exports = router
// {
//   "id": "bd05c6a6-94fc-4bf7-a3d0-3ba8c71141f5",
//   "name": "Jasson Statham",
//   "email": "Jasson.ut@dictum.co.ukr",
//   "phone": "(823) 896-9999"
// }