@Library("JenkinsPipelineLibrary") _

pipeline {
  agent {
    label "slave108"
  }

  options{
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '5'))    
    disableConcurrentBuilds()
  }

  triggers{
    pollSCM("H/15 * * * *")
  } 

  stages {
    stage('Build') {
      steps {        
        script{
          pipelineLib.beginSonarQubeForMsBuild("Nap-OWP", "Olympus / Nap OWP", "/d:sonar.cs.opencover.reportsPaths=%WORKSPACE%\\coverage.xml /d:sonar.cs.xunit.reportsPaths=%WORKSPACE%\\UnitTest.xml /d:sonar.sources=NAP.OWP.Websites/app/src /d:sonar.javascript.lcov.reportPaths=%WORKSPACE%\\js-lcov\\lcov.info /d:sonar.testExecutionReportPaths=%WORKSPACE%\\js-test-report.xml /d:sonar.tests=NAP.OWP.Websites/app/src /d:sonar.test.inclusions=**\\*.spec.jsx,**\\*.spec.tsx,**\\*.spec.ts")

          pipelineLib.restoreNuget()

          pipelineLib.msBuild("NAP.OWP.Websites.sln")
        }
      }
    }
   
     stage("Test"){
      parallel{
        stage("C# Unit Test"){
          steps{
            script{
              pipelineLib.xUnitForNetFramework()
            }
          }
        }

        stage("ReactJS Unit Test"){
          steps{
            script{
              bat label: 'Install npm package and run js unit test', script: """%WORKSPACE%\\js-jest-coverage.cmd"""
			  bat label: 'Replace lcov relative path', script: 'node "%WORKSPACE%\\NAP.OWP.Websites\\app\\scripts\\replace-lcov.cjs" "%WORKSPACE%"'
            }
          }
        }
		
      }      
    }    

    stage("SonarQube Analysis"){
      steps{       
        script{
          pipelineLib.endSonarQubeForMsBuild()
        }
      }
      
      post{
        always{
          script{
            if(manager.logContains(".*Quality gate status.*")){              
              pipelineLib.generateSonarQubeReport("Nap-OWP")
            }
          }
        }
      }
    }
  }

  post{
    always{
      archiveArtifacts "*.xml,*.email"
      step([$class: 'ACIPluginPublisher', name: '*.xml', shownOnProjectPage: false])
      cobertura coberturaReportFile: "cobertura.xml", onlyStable: false
      xunit thresholds: [failed(failureNewThreshold: '1', failureThreshold: '1')], tools: [xUnitDotNet(deleteOutputFiles: true, failIfNotNew: true, pattern: 'UnitTest.xml', skipNoTestFiles: false, stopProcessingIfError: true)]
    }
    unsuccessful{
      emailext body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT', to: ''
    }
  }
}