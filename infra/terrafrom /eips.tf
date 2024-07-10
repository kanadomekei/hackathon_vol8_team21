resource "aws_eip" "dev_server_eip" {
  instance = aws_instance.dev_server.id
  vpc      = true
}

resource "aws_eip" "prod_server_eip" {
  instance = aws_instance.prod_server.id
  vpc      = true
}
