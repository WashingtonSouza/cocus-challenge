resource "aws_dynamodb_table" "trips" {
  name     = "${var.environment}-trips"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  write_capacity = "${var.write_capacity}"
  read_capacity  = "${var.read_capacity}"
}
