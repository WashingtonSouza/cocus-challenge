const { listItems } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/dynamoHelper')
  : require('/opt/nodejs/dynamoHelper')

const { handlerError, handlerSuccess } = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/handlersHelp')
  : require('/opt/nodejs/handlersHelp')

const log = process.env.DEBUGGER
  ? require('../../lambda-layers/nodejs/logger').logger
  : require('/opt/nodejs/logger').logger

class Handler {
  constructor() {
    this.dynamodbTable = process.env.DYNAMODB_TABLE
  }

  async main(event) {
    try {
      const parameters = event.queryStringParameters
      const data = await listItems(parameters, this.dynamodbTable)

      return handlerSuccess(data)
    } catch (error) {
      log.error(`Error on insert data ${error.stack}`)
      return handlerError({ statusCode: 400 }, `Couldn't list item!!!`)
    }
  }
}

const handler = new Handler()
exports.handler = handler.main.bind(handler)
