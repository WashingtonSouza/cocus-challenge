const Joi = require('@hapi/joi')

const log = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/logger').logger
  : require('/opt/nodejs/logger').logger

const decoratorValidator = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/decoratorValidator')
  : require('/opt/nodejs/decoratorValidator')

const globalEnum = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/globalEnum')
  : require('/opt/nodejs/globalEnum')

const { updateItem, getItem } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/dynamoHelper')
  : require('/opt/nodejs/dynamoHelper')

const { handlerError, handlerSuccess } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/handlersHelp')
  : require('/opt/nodejs/handlersHelp')

class Handler {
  constructor() {
    this.dynamodbTable = process.env.DYNAMODB_TABLE
  }

  static validator() {
    return Joi.object({
      tripId: Joi.string().min(1).required(),
      peopleName: Joi.array().items(Joi.string())
    })
  }

  async main(event) {
    try {
      const { tripId, peopleName } = event.body

      const item = await getItem(tripId, this.dynamodbTable)
      delete item.id

      item.peopleName.push(...peopleName)
      await updateItem({ id: tripId }, item, this.dynamodbTable)

      return handlerSuccess('People added successfully')
    } catch (error) {
      log.error(`Error on apeople: ${JSON.stringify(error.stack)}`)
      return handlerError({ statusCode: 400 }, `Couldn't add people!!!`)
    }
  }
}

const handler = new Handler()
exports.handler = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
)
