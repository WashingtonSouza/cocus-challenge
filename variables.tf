variable "region" {
  default = "us-east-1"
}

variable "account_id" {}

variable "env" {
  default = "dev"
}

variable "cg_pool" {
  default = "Trip"
}

variable "cg_client" {
  default = "challenge-trip"
}

variable "cg_domain" {
  default = "trips-api"
}

variable "environment" {
  default = "dev"
}

variable "write_capacity" {
  default = 1
}

variable "read_capacity" {
  default = 1
}

variable "api_name" {
  default = "trips"
}

variable "api_description" {
  default = "API built with Trips"
}
