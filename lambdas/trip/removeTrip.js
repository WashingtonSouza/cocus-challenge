const Joi = require('@hapi/joi')

const { deleteItem } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/dynamoHelper')
  : require('/opt/nodejs/dynamoHelper')

const { handlerError, handlerSuccess } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/handlersHelp')
  : require('/opt/nodejs/handlersHelp')

const log = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/logger').logger
  : require('/opt/nodejs/logger').logger

const decoratorValidator = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/decoratorValidator')
  : require('/opt/nodejs/decoratorValidator')

const globalEnum = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/globalEnum')
  : require('/opt/nodejs/globalEnum')

class Handler {
  constructor() {
    this.dynamodbTable = process.env.DYNAMODB_TABLE
  }

  static validator() {
    return Joi.object({
      id: Joi.string().required()
    })
  }

  async main(event) {
    try {
      const id = event.body
      await deleteItem(id, this.dynamodbTable)

      return handlerSuccess('Item deleted sucessfully')
    } catch (error) {
      log.error(`Error on insert data ${error.stack}`)
      return handlerError({ statusCode: 400 }, `Couldn't delete item!!!`)
    }
  }
}

const handler = new Handler()
exports.handler = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
)