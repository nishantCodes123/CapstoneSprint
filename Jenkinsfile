pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/nishantCodes123/CapstoneSprint.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {

                script {

                    try {
                        bat 'npx playwright test'
                    }
                    catch (Exception e) {
                        echo 'Some tests failed, continuing pipeline...'
                    }

                }
            }
        }
    }

    post {

        always {

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'HTML Report'
            ])

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true
            )
        }
    }
}