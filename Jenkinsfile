pipeline {
    agent any 
    
    environment {
        EC2_HOST = 'ec2-54-208-57-6.compute-1.amazonaws.com'
        EC2_IP = '54.208.57.6'
        APP_DIR = '/opt/travel-app'
        SSH_TIMEOUT = '10'
        SSH_USER = 'user' // Confirm this matches your WSL username (run: wsl whoami)
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
            steps {  
                dir('backend') {
                    bat "docker build -t hiran86/travel-planning-app-backend:${env.BUILD_NUMBER} ."
                }
            }
        }
        
        stage('Build Frontend Docker Image') {
            steps {  
                dir('frontend') {
                    bat "docker build -t hiran86/travel-planning-app-frontend:${env.BUILD_NUMBER} ."
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
                bat "docker push hiran86/travel-planning-app-backend:${env.BUILD_NUMBER}"
                bat "docker push hiran86/travel-planning-app-frontend:${env.BUILD_NUMBER}"
            }
        }

        stage('Terraform Setup') {
            steps {
                script {
                    def instanceExists = false
                    
                    dir('terraform') {
                        bat 'terraform init'

                        def checkInstance = bat(script: 'terraform state list aws_instance.my_instance', returnStatus: true)

                        if (checkInstance == 0) {
                            echo "Instance already exists. Skipping Terraform apply."
                            instanceExists = true
                        } else {
                            echo "No existing instance found. Proceeding with Terraform apply."
                        }

                        if (!instanceExists) {
                            bat 'terraform apply -auto-approve'
                        }
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    // 1. Prepare WSL environment
                    bat 'wsl -d Ubuntu mkdir -p /home/%SSH_USER%/ansible'
                    
                    // 2. Copy deployment files
                    bat 'wsl -d Ubuntu cp inventory.ini deploy.yml /home/%SSH_USER%/ansible/'
                    bat 'wsl -d Ubuntu cp %WORKSPACE%\\travel-app-key.pem /home/%SSH_USER%/ansible/'
                    bat 'wsl -d Ubuntu chmod 600 /home/%SSH_USER%/ansible/travel-app-key.pem'
                    
                    // 3. Run the playbook with correct syntax
                    bat """
                    wsl -d Ubuntu /usr/bin/ansible-playbook ^
                    -i /home/%SSH_USER%/ansible/inventory.ini ^
                    /home/%SSH_USER%/ansible/deploy.yml ^
                    --private-key /home/%SSH_USER%/ansible/travel-app-key.pem ^
                    --extra-vars "backend_image_tag=${env.BUILD_NUMBER} frontend_image_tag=${env.BUILD_NUMBER}"
                    """
                    
                    // 4. Verify deployment
                    bat 'wsl -d Ubuntu ssh -i /home/%SSH_USER%/ansible/travel-app-key.pem ubuntu@${EC2_HOST} "docker ps"'
                }
            }
        }


    }
    
    post {
        always {
            bat 'docker logout'
            script {
                bat '''
                if exist "%WORKSPACE%\\ansible" rmdir /s /q "%WORKSPACE%\\ansible"
                '''
                bat "wsl rm -f /home/${SSH_USER}/.ssh/travel-app-key.pem"
            }
        }
        failure {
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
            echo "Build ${env.BUILD_NUMBER} failed - ${env.BUILD_URL}"
        }
}
}

