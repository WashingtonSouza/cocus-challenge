const { jest, expect, beforeEach } = require('@jest/globals')

jest.mock('../lambda-layers/nodejs/dynamoHelper')
jest.mock('../lambda-layers/nodejs/logger')

const tableName = process.env.DYNAMODB_TABLE = 'TABLE_TEST'

const dynamodb = require('../lambda-layers/nodejs/dynamoHelper')
const { handler } = require('../lambdas/trip/createTrip')
const body = {
  "originCity": "Lisbon",
  "destinationCity": "Porto",
  "peopleName": [
    "Isaac",
    "Maria",
    "Juan"
  ],
  "date": "2021-02-12"
}

const params = {
  TableName: tableName,
  Item: {
    ...body,
    id: 'fake-trip-id'
  }
}

describe.only('Create trip', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('Should return 200 when create trip is called with correct db params', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    const prepareDataToSaveSpyOn = await jest.spyOn(dynamodb, 'prepareDataToSave').mockImplementation(() => params)
    const insertItemSpyOn = await jest.spyOn(dynamodb, 'insertItem').mockImplementationOnce(() => { })

    const result = await handler(body)

    expect(prepareDataToSaveSpyOn).toHaveBeenCalled()
    expect(insertItemSpyOn).toHaveBeenCalled()
    expect(result.statusCode).toEqual(200)
  })

  it('Should return 422 when the parameters are invalid', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    const result = await handler({})
    expect(result.statusCode).toEqual(422)
  })
})