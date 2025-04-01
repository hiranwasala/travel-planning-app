pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/hiranwasala/travel-planning-app'
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {  
                dir('backend') {
                    bat 'docker build -t hiran86/travel-planning-app-backend:%BUILD_NUMBER% .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {  
                dir('frontend') {
                    bat 'docker build -t hiran86/travel-planning-app-frontend:%BUILD_NUMBER% .'
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-credentials', variable: 'DOCKER_PASSWORD')]) {
                    script {
                        bat "docker login -u hiran86 -p %DOCKER_PASSWORD%"
                    }
                }
            }
        }
        stage('Push Images') {
            steps {
                bat 'docker push hiran86/travel-planning-app-backend:%BUILD_NUMBER%'
                bat 'docker push hiran86/travel-planning-app-frontend:%BUILD_NUMBER%'
            }
        }
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'travel-app-key', keyFileVariable: 'SSH_KEY')]) {
                    script {
                        bat """
                        ansible-playbook -i inventory.ini deploy.yml --extra-vars "backend_image_tag=%BUILD_NUMBER% frontend_image_tag=%BUILD_NUMBER%"
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
