resource "aws_iam_policy_attachment" "trip_policy_attachment" {
  name       = "${var.environment}-trip-attachment"
  roles      = ["${aws_iam_role.trip_iam_role.name}"]
  policy_arn = "${aws_iam_policy.trip_policy.arn}"
}
