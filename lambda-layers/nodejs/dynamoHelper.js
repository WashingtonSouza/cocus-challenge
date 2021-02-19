const AWS = require('aws-sdk')
const uuid = require('uuid')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

const prepareDataToSave = (data, tableName) => {
  const params = {
    TableName: tableName,
    Item: {
      ...data,
      id: uuid.v1()
    }
  }

  return params
}

const insertItem = async (params) => {
  return dynamoDB.put(params).promise()
}

const updateItem = async (id, item, tableName) => {
  const params = {
    TableName: tableName,
    Key: id,
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {}
  }

  const expression = []
  Object.keys(item).forEach((itemKey) => {
    const value = item[itemKey]
    expression.push(`#${itemKey} = :${itemKey}`)
    params.ExpressionAttributeNames[`#${itemKey}`] = itemKey
    params.ExpressionAttributeValues[`:${itemKey}`] = value
  })


  params.UpdateExpression = `set ${expression.join(', ')}`
  return dynamoDB.update(params).promise()
}

const getItem = async (id, tableName) => {
  const params = {
    TableName: tableName,
    Key: { id }
  }

  const result = await dynamoDB.get(params).promise()

  if (!result || !result.Item) {
    throw new Error({ StatusCode: 400, message: 'Item not found' })
  }

  return result.Item
}

const deleteItem = async (id, tableName) => {
  const params = {
    TableName: tableName,
    Key: id
  }

  await dynamoDB.delete(params).promise()
}

const listItems = async (stringOfParams, tableName) => {
  const params = {
    TableName: tableName
  }

  if (stringOfParams) {
    params.FilterExpression = {}
    params.ExpressionAttributeNames = {}
    params.ExpressionAttributeValues = {}
    const filter = []

    Object.keys(stringOfParams).forEach((itemKey) => {
      const value = stringOfParams[itemKey]
      filter.push(`#${itemKey} = :${itemKey}`)

      params.ExpressionAttributeNames[`#${itemKey}`] = itemKey
      params.ExpressionAttributeValues[`:${itemKey}`] = value
    })

    params.FilterExpression = `${filter.join(' AND ')}`
  }

  const results = await dynamoDB.scan(params).promise()
  return results && results.Items || {}
}

module.exports = {
  prepareDataToSave, insertItem, updateItem, getItem, deleteItem, listItems
}