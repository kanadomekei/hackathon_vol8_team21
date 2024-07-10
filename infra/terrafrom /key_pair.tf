resource "aws_key_pair" "deployer" {
  key_name   = "my_terraform_key"
  public_key = file("~/.ssh/my_terraform_key.pub")
}