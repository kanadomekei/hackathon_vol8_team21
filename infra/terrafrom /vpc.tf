provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_internet_gateway" "main_igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "main_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main_igw.id
  }

  tags = {
    Name = "main-route-table"
  }
}

resource "aws_route_table_association" "subnet1_association" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.main_route_table.id
}

resource "aws_route_table_association" "subnet2_association" {
  subnet_id      = aws_subnet.subnet2.id
  route_table_id = aws_route_table.main_route_table.id
}

resource "aws_eip" "dev_server_eip" {
  instance = aws_instance.dev_server.id
  vpc      = true
}

resource "aws_eip" "prod_server_eip" {
  instance = aws_instance.prod_server.id
  vpc      = true
}

resource "aws_key_pair" "deployer" {
  key_name   = "my_terraform_key"
  public_key = file("~/.ssh/my_terraform_key.pub")
}

resource "aws_subnet" "subnet1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet1"
  }
}

resource "aws_subnet" "subnet2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet2"
  }
}

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

resource "aws_security_group" "web_sg" {
  vpc_id = aws_vpc.main.id
  name   = "web-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-sg"
  }
}

output "dev_server_public_ip" {
  value = aws_eip.dev_server_eip.public_ip
}

output "prod_server_public_ip" {
  value = aws_eip.prod_server_eip.public_ip
}