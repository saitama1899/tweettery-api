
const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'ID used is malformed' }),

  ValidationError: (res, error) =>
    res.status(409).send({ error: error.message }),

  DefaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.DefaultError
  handler(res, error)
}