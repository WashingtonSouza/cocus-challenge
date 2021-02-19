output "client_id" {
  value = "${aws_cognito_user_pool_client.this.id}"
}

output "client_secret" {
  value = "${aws_cognito_user_pool_client.this.client_secret}"
}

output "cg_url" {
  value = "https://${aws_cognito_user_pool_domain.this.domain}.auth.us-east-1.amazoncognito.com/oauth2/token?grant_type=client_credentials"
}

output "lambda_layer_version" {
  value = "${aws_lambda_layer_version.this.version}"
}

output "api_listTrip_url" {
  value = "GET: ${aws_api_gateway_deployment.listTrip.invoke_url}/listTrip"
}

output "api_createTrip_url" {
  value = "POST: ${aws_api_gateway_deployment.listTrip.invoke_url}/createTrip"
}

output "api_addPeople_url" {
  value = "PUT: ${aws_api_gateway_deployment.listTrip.invoke_url}/addPeople"
}

output "api_removeTrip_url" {
  value = "DELETE: ${aws_api_gateway_deployment.listTrip.invoke_url}/removeTrip"
}

output "account_id" {
  value = "${var.account_id}"
}
