pipeline {
    agent any 
    
    environment {
        // Define your EC2 host (or pass as parameter)
        EC2_HOST = 'ec2-54-208-57-6.compute-1.amazonaws.com'
        APP_DIR = '/opt/travel-app'
    }
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', 
                    url: 'https://github.com/hiranwasala/travel-planning-app'
                }
            }
        }
        
        stage('Prepare Ansible Files') {
            steps {
                // Create inventory file
                writeFile file: 'inventory.ini', text: """
                [web]
                ${EC2_HOST} ansible_user=ubuntu
                
                [web:vars]
                ansible_python_interpreter=/usr/bin/python3
                """
                
                // Create minimal deploy.yml if not in repo
                writeFile file: 'deploy.yml', text: """
                ---
                - name: Deploy Travel Planning App
                  hosts: web
                  become: yes
                  vars:
                    app_dir: ${APP_DIR}
                    backend_image: "hiran86/travel-planning-app-backend:{{ backend_image_tag }}"
                    frontend_image: "hiran86/travel-planning-app-frontend:{{ frontend_image_tag }}"
                  
                  tasks:
                    - name: Install Docker
                      apt:
                        name:
                          - docker.io
                          - docker-compose-plugin
                        update_cache: yes
                      
                    - name: Add user to docker group
                      user:
                        name: ubuntu
                        groups: docker
                        append: yes
                      
                    - name: Ensure app directory exists
                      file:
                        path: "{{ app_dir }}"
                        state: directory
                        owner: ubuntu
                        group: ubuntu
                      
                    - name: Deploy docker-compose.yml
                      copy:
                        src: docker-compose.yml
                        dest: "{{ app_dir }}/docker-compose.yml"
                      
                    - name: Start containers
                      command: >
                        docker compose -f {{ app_dir }}/docker-compose.yml up -d
                        --pull always
                """
                
                // Verify files exist
                script {
                    if (!fileExists('docker-compose.yml')) {
                        error("Missing docker-compose.yml in repository!")
                    }
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
                            sh """
                            cp \$SSH_KEY \$WORKSPACE/travel-app-key.pem
                            chmod 600 \$WORKSPACE/travel-app-key.pem
                            ansible-playbook -i inventory.ini deploy.yml \
                              --private-key \$WORKSPACE/travel-app-key.pem \
                              -e "backend_image_tag=${env.BUILD_NUMBER}" \
                              -e "frontend_image_tag=${env.BUILD_NUMBER}"
                            """
                        } else {
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
            // Cross-platform cleanup
            script {
                if (isUnix()) {
                    sh 'rm -f $WORKSPACE/travel-app-key.pem'
                } else {
                    bat 'if exist "%WORKSPACE%\\travel-app-key.pem" del "%WORKSPACE%\\travel-app-key.pem"'
                }
            }
        }
        failure {
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
            slackSend channel: '#deployments',
                     message: "Build ${BUILD_NUMBER} failed - ${BUILD_URL}"
        }
    }
}
