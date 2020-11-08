#Partner CRM

**Need:
Angular CLI: 10.0.0+
Node: 12 +
PostgreSQL  13**

QUICK START in local machine
-----------
1) In main folder run command "npm install" , they download concurrently pakage in main folder and run "install script" in two folder ./backend and ./front end. This may take some time - see the console.
2) When all dependencies are installed run "npm run start" in main folder, you run backend server and up Angular app.
3) If nestjs is successfully launched, superadmin is created in the Users table, you can see detailed information about the login and password in the console. *The user is only created when the table is empty.*

*PS: If you get errors when running commands, run the install and run commands manually*

### Package in front(Angular): 
```
    "@angular/animations": "~10.0.0",
    "@angular/cdk": "^10.2.7",
    "@angular/common": "~10.0.0",
    "@angular/compiler": "~10.0.0",
    "@angular/core": "~10.0.0",
    "@angular/forms": "~10.0.0",
    "@angular/material": "^10.2.7",
    "@angular/platform-browser": "~10.0.0",
    "@angular/platform-browser-dynamic": "~10.0.0",
    "@angular/router": "~10.0.0",
    "hammerjs": "^2.0.8",
    "lottie-web": "^5.7.4",
    "ngx-lottie": "^6.4.0",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "uuid": "^8.3.1",
    "zone.js": "~0.10.3"
```

### Package in server(NestJs): 
```
    "@nestjs/common": "^7.0.0",
    "@nestjs/config": "^0.5.0",
    "@nestjs/core": "^7.0.0",
    "@nestjs/jwt": "^7.1.0",
    "@nestjs/passport": "^7.1.0",
    "@nestjs/platform-express": "^7.0.0",
    "@nestjs/typeorm": "^7.1.4",
    "bcrypt": "^5.0.0",
    "passport": "^0.4.1",
    "pg": "^8.4.2",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^6.5.4",
    "typeorm": "^0.2.28"
```
### Postgresql 13 and PgAdmin

[download](https://www.postgresql.org/download/)

[use with nestjs](https://docs.nestjs.com/techniques/database)

**ormconfig.json for postgles connect**

My default confing in (./backend/ormconfig.json)

```
  {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "admin",
        "database": "personal_crm", 
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
    }
```