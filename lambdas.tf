data "archive_file" "createTrip" {
  type        = "zip"
  source_file = "${path.module}/lambdas/trip/createTrip.js"
  output_path = "${path.module}/lambdas/trip/createTrip.js.zip"
}

data "archive_file" "addPeople" {
  type        = "zip"
  source_file = "${path.module}/lambdas/trip/addPeople.js"
  output_path = "${path.module}/lambdas/trip/addPeople.js.zip"
}

data "archive_file" "listTrip" {
  type        = "zip"
  source_file = "${path.module}/lambdas/trip/listTrip.js"
  output_path = "${path.module}/lambdas/trip/listTrip.js.zip"
}

data "archive_file" "removeTrip" {
  type        = "zip"
  source_file = "${path.module}/lambdas/trip/removeTrip.js"
  output_path = "${path.module}/lambdas/trip/removeTrip.js.zip"
}

#================================== LAMBDA FUNCTIONS =======================================#

resource "aws_lambda_function" "createTrip" {
  function_name = "createTrip"
  handler       = "createTrip.handler"
  role          = "${aws_iam_role.trip_iam_role.arn}"
  runtime       = "nodejs12.x"
  layers        = ["${aws_lambda_layer_version.this.arn}"]

  filename = "${data.archive_file.createTrip.output_path}"

  source_code_hash = "${data.archive_file.createTrip.output_base64sha256}"

  timeout     = 30
  memory_size = 128

  environment {
    variables {
      DYNAMODB_TABLE = "${aws_dynamodb_table.trips.name}"
    }
  }
}

resource "aws_lambda_function" "addPeople" {
  function_name = "addPeople"
  handler       = "addPeople.handler"
  role          = "${aws_iam_role.trip_iam_role.arn}"
  runtime       = "nodejs12.x"
  layers        = ["${aws_lambda_layer_version.this.arn}"]

  filename = "${data.archive_file.addPeople.output_path}"

  source_code_hash = "${data.archive_file.addPeople.output_base64sha256}"

  timeout     = 30
  memory_size = 128

  environment {
    variables {
      DYNAMODB_TABLE = "${aws_dynamodb_table.trips.name}"
    }
  }
}

resource "aws_lambda_function" "listTrip" {
  function_name = "listTrip"
  handler       = "listTrip.handler"
  role          = "${aws_iam_role.trip_iam_role.arn}"
  runtime       = "nodejs12.x"
  layers        = ["${aws_lambda_layer_version.this.arn}"]

  filename = "${data.archive_file.listTrip.output_path}"

  source_code_hash = "${data.archive_file.listTrip.output_base64sha256}"

  timeout     = 30
  memory_size = 128

  environment {
    variables {
      DYNAMODB_TABLE = "${aws_dynamodb_table.trips.name}"
    }
  }
}

resource "aws_lambda_function" "removeTrip" {
  function_name = "removeTrip"
  handler       = "removeTrip.handler"
  role          = "${aws_iam_role.trip_iam_role.arn}"
  runtime       = "nodejs12.x"
  layers        = ["${aws_lambda_layer_version.this.arn}"]

  filename = "${data.archive_file.removeTrip.output_path}"

  source_code_hash = "${data.archive_file.removeTrip.output_base64sha256}"

  timeout     = 30
  memory_size = 128

  environment {
    variables {
      DYNAMODB_TABLE = "${aws_dynamodb_table.trips.name}"
    }
  }
}

#================================== LAMBDA PERMISSION =======================================#

resource "aws_lambda_permission" "createTrip" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.createTrip.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:*/*"
}

resource "aws_lambda_permission" "addPeople" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.addPeople.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:*/*"
}

resource "aws_lambda_permission" "listTrip" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.listTrip.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:*/*"
}

resource "aws_lambda_permission" "removeTrip" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.removeTrip.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:*/*"
}
