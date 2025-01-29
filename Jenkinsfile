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
                    bat 'docker build -t hiran86/travel-planning-app-backend:%BUILD_NUMBER% -f Dockerfile .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t hiran86/travel-planning-app-frontend:%BUILD_NUMBER% -f Dockerfile .'
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

        stage('Push Backend Image') {
            steps {
                bat 'docker push hiran86/travel-planning-app-backend:%BUILD_NUMBER%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push hiran86/travel-planning-app-frontend:%BUILD_NUMBER%'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
