const { jest, expect, beforeEach } = require('@jest/globals')

jest.mock('../lambda-layers/nodejs/dynamoHelper')
jest.mock('../lambda-layers/nodejs/logger')

process.env.DEBUGGER = true
process.env.DYNAMODB_TABLE = 'TABLE_TEST'

const dynamodb = require('../lambda-layers/nodejs/dynamoHelper')
const { handler } = require('../lambdas/trip/removeTrip')
const body = { body: { "id": "delete-id-mock" } }

describe('Remove trip', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('Should return 200 when deletedItem was called with correct parameters', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { "id": "delete-id-mock" }
    })

    const removeItemsSpyOn = jest.spyOn(dynamodb, 'deleteItem')
    const result = await handler(body)

    expect(removeItemsSpyOn).toHaveBeenCalled()
    expect(result.statusCode).toEqual(200)
  })

  it('Should return 400 when the delete Item were rejected', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { "id": "delete-id-mock" }
    })

    jest.spyOn(dynamodb, 'deleteItem').mockRejectedValue({})
    const result = await handler({})

    expect(result.statusCode).toEqual(400)
  })

  it('Should return 422 if the parameter is not valid', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    const result = await handler(body)
    expect(result.statusCode).toEqual(422)
  })
})