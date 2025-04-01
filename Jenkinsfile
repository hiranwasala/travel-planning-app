pipeline {
    agent any 
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', 
                    url: 'https://github.com/hiranwasala/travel-planning-app'
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
                    bat "docker login -u hiran86 -p %DOCKER_PASSWORD%"
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
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'travel-app-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    script {
                        if (isUnix()) {
                            // Linux agent handling
                            sh """
                            cp \$SSH_KEY \$WORKSPACE/travel-app-key.pem
                            chmod 600 \$WORKSPACE/travel-app-key.pem
                            ansible-playbook -i inventory.ini deploy.yml \
                              --private-key \$WORKSPACE/travel-app-key.pem \
                              -e "backend_image_tag=${env.BUILD_NUMBER}" \
                              -e "frontend_image_tag=${env.BUILD_NUMBER}"
                            """
                        } else {
                            // Windows agent handling
                            bat """
                            copy "%SSH_KEY%" "%WORKSPACE%\\travel-app-key.pem"
                            icacls "%WORKSPACE%\\travel-app-key.pem" /reset
                            icacls "%WORKSPACE%\\travel-app-key.pem" /grant:r "%USERNAME%":(R)
                            icacls "%WORKSPACE%\\travel-app-key.pem" /inheritance:r
                            
                            ansible-playbook -i inventory.ini deploy.yml ^
                              --private-key "%WORKSPACE%\\travel-app-key.pem" ^
                              -e "backend_image_tag=%BUILD_NUMBER%" ^
                              -e "frontend_image_tag=%BUILD_NUMBER%"
                            """
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            bat 'docker logout'
            // Clean up the key file (Windows only)
            bat 'if exist "%WORKSPACE%\\travel-app-key.pem" del "%WORKSPACE%\\travel-app-key.pem"'
            // Clean up for Linux (if agent is Linux)
            sh 'rm -f $WORKSPACE/travel-app-key.pem'
        }
    }
}
