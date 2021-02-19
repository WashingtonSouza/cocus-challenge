resource "aws_api_gateway_rest_api" "this" {
  name        = "${var.api_name}"
  description = "${var.api_description}"
}

resource "aws_api_gateway_authorizer" "this" {
  name          = "CognitoUserPoolAuthorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = "${aws_api_gateway_rest_api.this.id}"
  provider_arns = ["${aws_cognito_user_pool.this.arn}"]
}

#================================== API GATEWAY RESOURCE =====================================#

resource "aws_api_gateway_resource" "createTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  parent_id   = "${aws_api_gateway_rest_api.this.root_resource_id}"
  path_part   = "createTrip"
}

resource "aws_api_gateway_resource" "addPeople" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  parent_id   = "${aws_api_gateway_rest_api.this.root_resource_id}"
  path_part   = "addPeople"
}

resource "aws_api_gateway_resource" "listTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  parent_id   = "${aws_api_gateway_rest_api.this.root_resource_id}"
  path_part   = "listTrip"
}

resource "aws_api_gateway_resource" "removeTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  parent_id   = "${aws_api_gateway_rest_api.this.root_resource_id}"
  path_part   = "removeTrip"
}

#================================== API GATEWAY METHOD =======================================#
# authorization = "NONE" # If would not use the cognito, just change the authorization to this single line 

resource "aws_api_gateway_method" "createTrip" {
  rest_api_id          = "${aws_api_gateway_rest_api.this.id}"
  resource_id          = "${aws_api_gateway_resource.createTrip.id}"
  http_method          = "POST"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = "${aws_api_gateway_authorizer.this.id}"
  authorization_scopes = ["${local.rs_scopes}"]
}

resource "aws_api_gateway_method" "addPeople" {
  rest_api_id          = "${aws_api_gateway_rest_api.this.id}"
  resource_id          = "${aws_api_gateway_resource.addPeople.id}"
  http_method          = "PUT"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = "${aws_api_gateway_authorizer.this.id}"
  authorization_scopes = ["${local.rs_scopes}"]
}

resource "aws_api_gateway_method" "listTrip" {
  rest_api_id          = "${aws_api_gateway_rest_api.this.id}"
  resource_id          = "${aws_api_gateway_resource.listTrip.id}"
  http_method          = "GET"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = "${aws_api_gateway_authorizer.this.id}"
  authorization_scopes = ["${local.rs_scopes}"]
}

resource "aws_api_gateway_method" "removeTrip" {
  rest_api_id          = "${aws_api_gateway_rest_api.this.id}"
  resource_id          = "${aws_api_gateway_resource.removeTrip.id}"
  http_method          = "DELETE"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = "${aws_api_gateway_authorizer.this.id}"
  authorization_scopes = ["${local.rs_scopes}"]
}

#================================== API GATEWAY INTEGRATION =======================================#

resource "aws_api_gateway_integration" "createTrip" {
  rest_api_id             = "${aws_api_gateway_rest_api.this.id}"
  resource_id             = "${aws_api_gateway_resource.createTrip.id}"
  http_method             = "${aws_api_gateway_method.createTrip.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.createTrip.invoke_arn}"
}

resource "aws_api_gateway_integration" "addPeople" {
  rest_api_id             = "${aws_api_gateway_rest_api.this.id}"
  resource_id             = "${aws_api_gateway_resource.addPeople.id}"
  http_method             = "${aws_api_gateway_method.addPeople.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.addPeople.invoke_arn}"
}

resource "aws_api_gateway_integration" "listTrip" {
  rest_api_id             = "${aws_api_gateway_rest_api.this.id}"
  resource_id             = "${aws_api_gateway_resource.listTrip.id}"
  http_method             = "${aws_api_gateway_method.listTrip.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.listTrip.invoke_arn}"
}

resource "aws_api_gateway_integration" "removeTrip" {
  rest_api_id             = "${aws_api_gateway_rest_api.this.id}"
  resource_id             = "${aws_api_gateway_resource.removeTrip.id}"
  http_method             = "${aws_api_gateway_method.removeTrip.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.removeTrip.invoke_arn}"
}

#================================== API GATEWAY DEPLOYMENT =======================================#

resource "aws_api_gateway_deployment" "createTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  stage_name  = "${var.env}"

  depends_on = [
    "aws_api_gateway_method.createTrip",
    "aws_api_gateway_integration.createTrip",
  ]
}

resource "aws_api_gateway_deployment" "addPeople" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  stage_name  = "${var.env}"

  depends_on = [
    "aws_api_gateway_method.addPeople",
    "aws_api_gateway_integration.addPeople",
  ]
}

resource "aws_api_gateway_deployment" "listTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  stage_name  = "${var.env}"

  depends_on = [
    "aws_api_gateway_method.listTrip",
    "aws_api_gateway_integration.listTrip",
  ]
}

resource "aws_api_gateway_deployment" "removeTrip" {
  rest_api_id = "${aws_api_gateway_rest_api.this.id}"
  stage_name  = "${var.env}"

  depends_on = [
    "aws_api_gateway_method.removeTrip",
    "aws_api_gateway_integration.removeTrip",
  ]
}
