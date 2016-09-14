@ECHO OFF

SET TestFolder="%WORKSPACE%\NAP.OWP.Websites\app"

cd %TestFolder%

cd
call npm -v
call node -v

echo "npm install --no-optional"
call cmd /c "npm install --no-optional"

echo "node scripts/test.cjs --env=jsdom --ci -u --coverage --coverageReporters=lcov --coverageDirectory=""%WORKSPACE%\js-lcov"" --testResultsProcessor=jest-sonar-reporter"
call cmd /c "node scripts/test.cjs --env=jsdom --ci -u --coverage --coverageReporters=lcov --coverageDirectory=""%WORKSPACE%\js-lcov"" --testResultsProcessor=jest-sonar-reporter"

call cmd /c "copy /y test-report.xml ""%WORKSPACE%\js-test-report.xml"""

exit 0