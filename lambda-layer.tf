locals {
  layer_name  = "trip_layer.zip"
  layers_path = "${path.module}/lambda-layers/nodejs"
}

resource "null_resource" "build_lambda_layers" {
  triggers {
    layer_build = "${md5(file("${local.layers_path}/package.json"))}"
  }

  provisioner "local-exec" {
    working_dir = "${local.layers_path}"
    command     = "npm install --production && cd ../ && zip -9 -r --quiet ${local.layer_name} *"
  }
}

resource "aws_lambda_layer_version" "this" {
  filename    = "${local.layers_path}/../${local.layer_name}"
  layer_name  = "trip-layer"
  description = "joi: ^14.3.1"

  compatible_runtimes = ["nodejs12.x"]
  depends_on          = ["null_resource.build_lambda_layers"]
}
