# cocus-challenge
Personal travels manager

The goal of this challenger is to create a microservice and terraform pipeline to manager personal travels.

## Used technologies and required version ###
* NodeJS - version 12 / Javascript ECMA6
* Terraform - version v0.11.14
* AWS as a service provider
* Jest for tests
* Git

## Dependence packages ###
* Hapi/joi
* Babel
* Eslint
* Jest
* UUID
* AWS-SDK
* Winston

## How to run the project ###
** Run the commands to run the project**
* npm i in the project root and in the lambda-layers/nodejs
* In the root project run: terraform init and then terraform apply -auto-approve
* Type the aws account ID
* To run the tests - npm test

## Postman request ###
#### - Every value that you need will appear on terminal
#### - First of all you should to get the token to peform in the endpoints.
* Endpoint: Get the cg_url value
* In the Authorization tab choose the type: Basic Auth and filled the fields "username and Password" with the client_id and client_secret
* Send the request and get the access_token

#### - To peform the endpoints
* Paste the endpoint url showned in the terminal with the respective method and parameters
* CreateTrip: {
  *  "originCity": "any_origin_city",
  * "destinationCity": "any_city",
  *  "peopleName": [ "list of names" ],
  *  "date": "YYYY-MM-DD" }
* List trip:
  * Accepted parameters: originCity, date, estinationCity
* Add People: {
  * "tripId": "any_trip_id",
  * "peopleName": [ "people name"] }
* Remove trip: { "id": "any_trip_id" }

### Terraform troubleshooting states ###
* If you run "terraform apply -auto-approve" and are facing erros, just wait for a few seconds and re-run the command again. This occurs when there is a bottleneck in the API gateway creation"