const express = require('express')
const { listContacts, getContactById, addContact } = require('../../models/contacts')
const {HttpError} = require('../../helpers');
const Joi = require("joi")
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Missing required email field',
  }),
  phone: Joi.string().required().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
    'any.required': 'Missing required phone field',
    'string.pattern.base': 'Invalid phone number format. Expected format: (XXX) XXX-XXXX',
  }),
});


const router = express.Router()
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (error) {
   next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await getContactById(contactId);
    // console.log(contact);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404, 'Not found')
    }
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = addSchema.validate({ name, email, phone }, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }

  const newContact = await addContact({ name, email, phone });

  return res.status(201).json({ id: newContact.id, name, email, phone });
});


router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
