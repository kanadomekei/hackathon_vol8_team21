output "dev_server_public_ip" {
  value = aws_eip.dev_server_eip.public_ip
}

output "prod_server_public_ip" {
  value = aws_eip.prod_server_eip.public_ip
}