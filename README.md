# Addon Beans
##### Front-end (Create using VueJS, Vuetify, Vuex)

### About
A single-page application to fill the communication gap between **HR** & **Managers**. This web app helps the management team easily maintain project requirements of new resources or To help managers raising requests of adding new beans to our InfoBeans family

### Brief

1. Login page (a simple form with fields username/password with validation)
2. There will 2 types of Users
   - Manager
   - HR
3. Manager can :
   - Raise requirement
   - View their requirements.
   - Edit their requirement
   - Delete their requirement
   - Add comments to their requirement
4. HR can
   - View all requirements
   - Change the status of any requirement
   - Add comments to any requirement
   - Raise requirement
   - View their requirements.
   - Edit their requirement
   - Delete their requirement


### Features

##### Login Form

- Email & password field have validations
- Until both fields are not populated with valid input's the submit button will be disabled.
- Users can view or hide their passwords.
- In case of any error, the error message will be above the login form.
- In case of a successful login, a success message will be shown & the user will be automatically redirected to the dashboard.
- Users can request a new password in case if they forgot their original password.


##### Dashboard
- Summary of requirements to show the total count of Total requirements, Open requirements, fulfilled requirements
	- Manager will see the total counts of the requirements they generated
	- HR will see the total counts of the requirements of all the users.
- Requirements table to show brief details & important fields of requirements.
- User can sort the table according to the serial number, status of requirements, timeline & client.
- Users can also filter table data based on clients, managers & can choose to view or hide fulfilled requirements, they can also mix match these options for more relevant data.
	- Filter by the manager is only available for HR


##### Change Password
- Users can change their password after the initial login or whenever they wish to do so.


##### Requirement
- User can create, update, delete & view their tickets
	- HR can view, update & delete  anyone's ticket
- All the form fields have validation rules & the form cannot be submitted until fields are not properly validated


##### Comments
- Users can add comments or updates to their tickets.
	- HR can comment on anyone's ticket.
- Comment field also has validation & cannot be submitted until the comment is valid.


##### Skill Sets
- HR can add, remove or update skill sets to/from the database.
- Validation to prevent duplication entry for skill set is there.


##### Clients
- HR can add, remove or update clients to/from the database.
- Validation to prevent duplication entry for clients is there.


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
