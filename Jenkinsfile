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
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t hiran86/travel-planning-app:%BUILD_NUMBER% .'
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
        stage('Push Image') {
            steps {
                bat 'docker push hiran86/travel-planning-app:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
