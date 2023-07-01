const express = require('express')
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts')
const {HttpError} = require('../../helpers/HttpError');
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


router.delete('/:id', async (req, res, next) => {
    try {
      const {id } = req.params;
  
      // Видалення контакту
      const removedContact = await removeContact(id);
      if (!removedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      return res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      next(error);
    }
  });
  

router.put('/:id', async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const { id } = req.params;
  
      const { error } = addSchema.validate({ name, email, phone }, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: errorMessage });
      }

      const updatedContact = await updateContact(id, { name, email, phone });
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      return res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  });
  
  
module.exports = router
// {
//   "id": "bd05c6a6-94fc-4bf7-a3d0-3ba8c71141f5",
//   "name": "Jasson Statham",
//   "email": "Jasson.ut@dictum.co.ukr",
//   "phone": "(823) 896-9999"
// }