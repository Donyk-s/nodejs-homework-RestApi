const express = require('express')
const ctrl = require('../../controllers/contacts')
const {isValidId, validateBody, authenticate} = require('../../midlewares')
const {addSchema, updateFavoriteSchema} = require('../../schema/schema')
const ctrl = require('../../controllers/contacts')

const router = express.Router()

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(addSchema), ctrl.addOneContact);
router.post('/', ctrl.addOneContact);

router.delete('/:id', authenticate, isValidId,  ctrl.deleteContactById);
router.delete('/:id', ctrl.deleteContactById);

router.put('/:id', authenticate, isValidId, validateBody(addSchema), ctrl.updateContactById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)
  
router.put('/:id', ctrl.updateContactById);
  
module.exports = router
