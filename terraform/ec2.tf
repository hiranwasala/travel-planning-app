resource "aws_instance" "web" {
    ami           = "ami-003d3d03cfe1b0468"
    instance_type = "t2.micro"
    key_name      = "travel-app-key"

    security_groups = ["my-jenkins-security-grp"]

    tags = {
        Name = "TravelPlaning"
    }
}
