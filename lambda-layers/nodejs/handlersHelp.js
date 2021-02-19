const handlerSuccess = (data) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(data)
  }

  return response
}

const handlerError = (data, message) => {
  const result = {
    statusCode: data.statusCode || 400,
    headers: { 'Content-Type': 'text/plain' },
    body: message
  }
  return result
}

module.exports = { handlerSuccess, handlerError }
