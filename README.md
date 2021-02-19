# cocus-challenge
Personal travels manager

The goal of this challenger is to create a microservice and terraform pipeline to manager personal travels.

### Used technologies ###
* NodeJS - version 12/ Javascript ECMA6
* Terraform - version 0.11
* AWS as a service provider
* Jest for tests
* Git

### Dependence packages ###
* Hapi/joi
* Babel
* Eslint
* Jest
* UUID
* AWS-SDK
* Winston

### How to run the project ###
** Run the commands to run the project**
* npm i in the project root and in the lambda-layers/nodejs
* In the root project run: terraform init and then terraform apply -auto-approve
* Type the aws account ID
* To run the tests - npm test

### Terraform troubleshooting states ###
* If you run terraform apply -auto-approve and are facing any erros, just wait for some seconds and re-run the command again.