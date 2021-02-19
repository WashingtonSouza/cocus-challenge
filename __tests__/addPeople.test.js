const { jest, expect, beforeEach } = require('@jest/globals')

jest.mock('../lambda-layers/nodejs/dynamoHelper')
jest.mock('../lambda-layers/nodejs/logger')

process.env.DEBUGGER = true
process.env.DYNAMODB_TABLE = 'TABLE_TEST'

const dynamodb = require('../lambda-layers/nodejs/dynamoHelper')
const { handler } = require('../lambdas/trip/addPeople')
const body = {
  "tripId": "fake-trip-id",
  "peopleName": [
    "Paul",
    "Jamal"
  ]
}

const getMock = {
  "date": "2021-02-12",
  "peopleName": [
    "Isaac",
    "Jhon",
    "Peter"
  ],
  "destinationCity": "Porto",
  "id": "fake-trip-id",
  "originCity": "Lisbon"
}

describe('Add people', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('Should return 200 when add people is called', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    const getItemsSpyOn = jest.spyOn(dynamodb, 'getItem').mockImplementation(() => getMock)
    const updateItemSpyOn = jest.spyOn(dynamodb, 'updateItem')
    const result = await handler(body)

    expect(getItemsSpyOn).toHaveBeenCalled()
    expect(updateItemSpyOn).toHaveBeenCalled()
    expect(result.statusCode).toEqual(200)
  })

  it('Should return throw when getItem throws error', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    const getItemsSpyOn = jest.spyOn(dynamodb, 'getItem').
      mockImplementation(() => { throw new Error({ StatusCode: 400, message: 'Item not found' }) })

    const result = await handler(body)

    expect(getItemsSpyOn).toThrowError()
    expect(result.statusCode).not.toEqual(200)
  })

  it('Should return throw when updateItem throws', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return body
    })

    jest.spyOn(dynamodb, 'getItem').mockImplementation(() => getMock)
    const updateItemSpyOn = jest.spyOn(dynamodb, 'updateItem').
      mockImplementation(() => { throw new Error({ StatusCode: 500, message: 'Unexpected Error' }) })

    const result = await handler(body)

    expect(updateItemSpyOn).toThrowError()
    expect(result.statusCode).not.toEqual(200)
  })

  it('Should return 422 if the parameter is not valid', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { body }
    })

    const result = await handler({ body })
    expect(result.statusCode).toEqual(422)
    expect(result.body).toEqual("\"tripId\" is required")
  })
})