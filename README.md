# Addon Beans
##### Front-end (Create using VueJS, Vuetify, Vuex)

### About
A simple Single page application to fill the communication gap between **HR** & **Managers** and help them easily maintain project requirements of new resources or to help managers raising requests of adding new beans to our InfoBeans family.

### Brief

1. Login page (simple form with fields username/password with validation)
2. There will 2 types of Users
   - Manager
   - HR
3. Manager can :
   - Raise requirement
   - View their own requirements.
   - Edit their requirement
   - Delete their requirement
   - Add comments to their requirement
4. HR can
   - View all requirements
   - Change status of any requirement
   - Add comments to any requirement
   - Raise requirement
   - View their own requirements.
   - Edit their requirement
   - Delete their requirement


### Features

##### Login Form

- Email & password field have validations
- Until both fields are not populated with valid inputs the submit button will be disabled.
- User can view or hide their password.
- In case of any error the error message will be above the login form.
- In case of successful login, success message will be shown & user will be automatically redirected to dashboard.
- User can request a new password incase if they forgot their original password.

#####Dashboard
- Summary of requirements to show total count of Total requirements, Open requirements, fulfilled requirements
	- Manager will see total counts of the requirements they generated
	- HR will see total counts of the requirements of all the user.
- Requirements table to show a brief details & important firlds of requirements.
- User can sort table according to serial number, status of requirements, timeline & client.
- User can also filter table data based on clients, managers & can choose to view or hide fulfilled requirements, they can also mix match these options for more relevant data.
	- Filter by manager is only available for HR



##### Requirement
- User can create, update, delete & view their own tickets
	- HR can an view, update & delete  anyone's ticket
- All the form fields have validation rules & the form cannot be submitted untill fields are not properly validated

##### Comments


##### Change Password


##### Skill Sets



##### Clients



# Commands

## Project setup

```
npm install
```

### Run project for development

```
npm run serve
```

### Built project for  production

```
npm run build
```

### Lint project

```
npm run lint
```





### -- End --
