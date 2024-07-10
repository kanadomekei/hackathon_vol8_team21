resource "aws_instance" "dev_server" {
  ami                    = "ami-0a0b7b240264a48d7"
  instance_type          = "t2.small"
  subnet_id              = aws_subnet.subnet1.id
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "dev-server"
  }
}

resource "aws_instance" "prod_server" {
  ami                    = "ami-0a0b7b240264a48d7"
  instance_type          = "t2.small"
  subnet_id              = aws_subnet.subnet2.id
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "prod-server"
  }
}