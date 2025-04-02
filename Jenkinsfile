pipeline {
    agent none // Set to none since we'll define agents per stage
    
    environment {
        EC2_HOST = 'ec2-54-208-57-6.compute-1.amazonaws.com'
        APP_DIR = '/opt/travel-app'
    }
    
    stages {
        stage('SCM Checkout') {
            agent any // Can run on any agent
            steps {
                retry(3) {
                    git branch: 'main', 
                    url: 'https://github.com/hiranwasala/travel-planning-app'
                }
            }
        }
        
        stage('Prepare Ansible Files') {
            agent any // Can run on any agent
            steps {
                writeFile file: 'inventory.ini', text: """
                [web]
                ${EC2_HOST} ansible_user=ubuntu
                
                [web:vars]
                ansible_python_interpreter=/usr/bin/python3
                """
                
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
                
                script {
                    if (!fileExists('docker-compose.yml')) {
                        error("Missing docker-compose.yml in repository!")
                    }
                }
            }
        }
        
        stage('Build Backend Docker Image') {
            agent {
                label 'windows' // Specify your Windows agent label
            }
            steps {  
                dir('backend') {
                    bat 'docker build -t hiran86/travel-planning-app-backend:%BUILD_NUMBER% .'
                }
            }
        }
        
        stage('Build Frontend Docker Image') {
            agent {
                label 'windows' // Specify your Windows agent label
            }
            steps {  
                dir('frontend') {
                    bat 'docker build -t hiran86/travel-planning-app-frontend:%BUILD_NUMBER% .'
                }
            }
        }
        
        stage('Login to Docker Hub') {
            agent {
                label 'windows' // Specify your Windows agent label
            }
            steps {
                withCredentials([string(credentialsId: 'docker-hub-credentials', variable: 'DOCKER_PASSWORD')]) {
                    bat "docker login -u hiran86 -p %DOCKER_PASSWORD%"
                }
            }
        }
        
        stage('Push Images') {
            agent {
                label 'windows' // Specify your Windows agent label
            }
            steps {
                bat 'docker push hiran86/travel-planning-app-backend:%BUILD_NUMBER%'
                bat 'docker push hiran86/travel-planning-app-frontend:%BUILD_NUMBER%'
            }
        }
        
        stage('Deploy to EC2') {
            agent {
                label 'linux' // Specify your Linux agent label
            }
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'travel-app-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh """
                    cp \$SSH_KEY \$WORKSPACE/travel-app-key.pem
                    chmod 600 \$WORKSPACE/travel-app-key.pem
                    ansible-playbook -i inventory.ini deploy.yml \
                    -e "backend_image_tag=${env.BUILD_NUMBER}" \
                    -e "frontend_image_tag=${env.BUILD_NUMBER}"
                    """
                }
            }
        }
    }
    
    post {
        always {
            script {
                if (isUnix()) {
                    sh 'rm -f $WORKSPACE/travel-app-key.pem'
                } else {
                    bat 'docker logout'
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
