resource "aws_instance" "dev_server" {
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.subnet1.id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "dev-server"
  }
}

resource "aws_instance" "prod_server" {
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.subnet2.id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "prod-server"
  }
}