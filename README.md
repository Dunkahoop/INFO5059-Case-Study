# Angular/Jakarta EE Case Study

## To Run

- Run server backend by running java file `CasestudyApplication.java` (in VSCode, right click file and select `Run Java`)
- Run client using command `ng serve`
- To run client for Cypress testing, use the command `ng e2e`

## Install Notes

### Lab 1

- install latest jdk (use [installer](https://www.oracle.com/java/technologies/downloads/?er=221886#jdk22-windows))
(**INPORTANT**: Install [Java 22](https://www.oracle.com/java/technologies/javase/jdk22-archive-downloads.html) or change version in `pom.xml`)
- go to settings, find environment variables settings
- add `JAVA_HOME` to System varibles with directory to jdk (may need to set it to bin folder, but don't use it initially)
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

## Fixes

If you run into an error where the client refuses to run, (Error message: `[vite] Pre-transform error: EBUSY: resource busy or locked, rmdir 'PATH TO PROBLEMATIC FILE DIRECTORY'`), do the following:

**Note**: Works for Windows, not sure about Linux or Mac

- Run Command Prompt as administrator
- Run `rmdir /s "PATH TO PROBLEMATIC FILE DIRECTORY"` and confirm with Y (**IMPORTANT:** Make sure you use double quotations rather than single quotations)

## Useful Links

- [Database UI](http://localhost:8080/h2) (NOTE: you will need to ensure the JDBC URL is `jdbc:h2:mem:casestudy`, the `casestudy` part is the name of the database. You do not need to enter a username or password)
- [App UI](http://localhost:4200)
- [App Database](http://localhost:8080) (NOTE: You will need to add onto the URL to get data, please see database controllers)
- `http://localhost:8080/pdf?id={id}` - id is the ID of the generated order
