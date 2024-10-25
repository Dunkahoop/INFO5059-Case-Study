# Angular/Jakarta EE/Spring Boot Case Study

## To Run

- Run server backend by running java file `CasestudyApplication.java` (in VSCode, right click file and select `Run Java`)
- Run client using command `ng serve`
- To run client for Cypress testing, use the command `ng e2e`

## To Build

- in the client, run `ng build`
- move the contents of `dist\casestudy\browser` to `casestudy\src\main\resources\static`
- in the command pallete (in VS Code, `View`->`Command Pallete...`), run `Maven: Execute Commands...`->`package`
- Open the Command Prompt as Administrator
- `cd` to the project's `casestudy\src\main\target` folder
- run the .jar file there. Example command: `java -jar casestudy-0.0.1-SNAPSHOT.jar`
- open [http://localhost:8080](http://localhost:8080). You will se that is now shows the UI rather than the database

## Install Notes

### Lab 1

- install latest jdk (use [installer](https://www.oracle.com/java/technologies/downloads/?er=221886#jdk22-windows))
(**INPORTANT**: Install [Java 22](https://www.oracle.com/java/technologies/javase/jdk22-archive-downloads.html) or change version in `pom.xml`)
- go to settings, find environment variables settings
- add `JAVA_HOME` to System varibles with directory to jdk `C:\Program Files\Java\jdk-22` (may need to set it to bin folder, but don't use it initially)
- edit path variable, add path to bin folder in jdk
- access localhost:8080/(whatever name you gave it, idrk I'm just learning this)
- Run by running java file `CasestudyApplication.java` (in VSCode, right click file and select `Run Java`)

### Lab 2

- [install node](https://nodejs.org/en/download/package-manager/current) (if not already installed)
- install angular (run command prompt as admin, command: `npm install -g @angular/cli`)
- install extension Angular Language Service if using vscode (extension ID: Angular.ng-template)
- You may need to run the following commands if running ng in terminal does not work (run in this order)
  - `https:/go.microsoft.com/fwlink/?LinkID=135170`
  - `Get-ExecutionPolicy`
  - `Get-ExecutionPolicy -list` (may not need to do this)
**WARNING!** Disabling protections for running scripts is dangerous. for more info like how to reinstate protections, go [here](https:/go.microsoft.com/fwlink/?LinkID=135170)
  - I recommend running this command in Powershell to set Execution policy to RemoteSigned `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
  See [here](https://lazyadmin.nl/powershell/running-scripts-is-disabled-on-this-system/) for more info
- You may also need to run `npm install` (run it if in doubt hehe)
- Run client using command `ng serve`
- To run client for Cypress testing, use the command `ng e2e`

### Case Study (Deployment)

- Firstly, ensure that the app works locally
- run `ng build` on the client

## Fixes

If you run into an error where the client refuses to run, (Error message: `[vite] Pre-transform error: EBUSY: resource busy or locked, rmdir 'PATH TO PROBLEMATIC FILE DIRECTORY'`), do the following:

**Note**: Works for Windows, not sure about Linux or Mac

- Run Command Prompt as administrator
- Run `rmdir /s "PATH TO PROBLEMATIC FILE DIRECTORY"` and confirm with Y (**IMPORTANT:** Make sure you use double quotations rather than single quotations)

**Another Note**: Budget limits for `ng build`

- navigate to `client/angular.json`
- under `configurations/production/budgets`, adjust the `type: initial` budget's `maximumWarning` and `maximumError` values
- Recommend a max warning of `2MB` and a max error of `5MB` (Max error must be higher than max warning)

## Useful Links

- [Database UI](http://localhost:8080/h2) (NOTE: you will need to ensure the JDBC URL is `jdbc:h2:mem:casestudy`, the `casestudy` part is the name of the database. You do not need to enter a username or password)
- [App UI](http://localhost:4200)
- [App Database](http://localhost:8080) (NOTE: You will need to add onto the URL to get data, please see database controllers)
- `http://localhost:8080/pdf?id={id}` - id is the ID of the generated order
