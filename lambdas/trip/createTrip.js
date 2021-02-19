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

const { prepareDataToSave, insertItem } = process.env.DEBUGGER
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
      originCity: Joi.string().min(2).required(),
      destinationCity: Joi.string().min(2).required(),
      peopleName: Joi.array().items(Joi.string()),
      date: Joi.string().min(10).required()
    })
  }

  async main(event) {
    try {
      const { body } = event

      const dbParams = prepareDataToSave(body, this.dynamodbTable)
      await insertItem(dbParams)

      return handlerSuccess(dbParams.Item)
    } catch (error) {
      log.error(`Error on insert data ${error.stack}`)
      return handlerError({ statusCode: 400 }, `Couldn't create item!!!`)
    }
  }
}

const handler = new Handler()
exports.handler = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
)
