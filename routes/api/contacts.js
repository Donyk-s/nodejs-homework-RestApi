const express = require('express')
const ctrl = require('../../controllers/contacts')
const {isValidId, validateBody, authenticate} = require('../../midlewares')
const {addSchema, updateFavoriteSchema} = require('../../schema/schema')
const router = express.Router()

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(addSchema), ctrl.addOneContact);

router.delete('/:id', authenticate, isValidId,  ctrl.deleteContactById);

router.put('/:id', authenticate, isValidId, validateBody(addSchema), ctrl.updateContactById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)
  
module.exports = router
