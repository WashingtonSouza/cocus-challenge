const { jest, expect, beforeEach } = require('@jest/globals')
jest.mock('../lambda-layers/nodejs/dynamoHelper')
jest.mock('../lambda-layers/nodejs/logger')

process.env.DEBUGGER = true
process.env.DYNAMODB_TABLE = 'TABLE_TEST'

const dynamodb = require('../lambda-layers/nodejs/dynamoHelper')
const { handler } = require('../lambdas/trip/listTrip')

describe('List people', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('Should return 200 when the list is called', async () => {
    const listItemsSpyOn = jest.spyOn(dynamodb, 'listItems')
    const result = await handler({})

    expect(listItemsSpyOn).toHaveBeenCalled()
    expect(result.statusCode).toEqual(200)
  })

  it('Should return 400 when the request throws error', async () => {
    jest.spyOn(dynamodb, 'listItems').mockRejectedValue({})

    const result = await handler({})
    expect(result.statusCode).toEqual(400)
  })
})