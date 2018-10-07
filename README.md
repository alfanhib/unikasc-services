# unikasc-services

:fire: UNIKAS Challange CRUD API

## Install knex globally
```
npm install -g knex
```

## Install express globally
```
npm install -g express
```

## Install all packages every services
```
install-packages.bat
```

## import postgres database
```
psql -U username unikasc < unikasc.pgsql
```

## Change .env
```
DATABASE_DEVELOPMENT=postgres://your_username:your_password@localhost/unikasc
UNIKASC_RSA_KEY=/path_to_unikasc_key/unikasc.key
```

## Run ./Ngrok for localhost 

### service-user

```
./ngrok http 3000
```

### Service-auth
```
./Ngrok http 3001
```

### Service-contact
```
./Ngrok http 3002
```
