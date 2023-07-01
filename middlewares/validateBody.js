const { HttpError } = require('../helpers/HttpError');
const { getContactById } = require('../controllers/contacts');
const { addShema } = require('../shema/shema');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const validateBody = (req, res, next) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.message));
  }
  next();
};

const checkContactExists = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (!contact) {
    // next(HttpError(404, 'Not found'));

    throw new HttpError(404, 'Contact not found');
  }

  next();
};

module.exports = {
  validateBody: ctrlWrapper(validateBody),
  checkContactExists
};

// checkContactExists: ctrlWrapper(checkContactExists)
