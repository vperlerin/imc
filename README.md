IMC

WARNING: NEVER PUSH FROM THE SERVER

run composer on server 
{
    "require": {
        "phpoffice/phpspreadsheet": "^1.25"
    }
}


1- Update src/data/conference-data.json 
2- Update /env/.env with DB user & password
3- Make sure imc/env/.env is the same than /env/.env
3- Create db running /mysql/run_create_db.sh
4- Run python python/fill_db.py to fill the db with info from src/data/conference-data.json 
5- Update all allowed_origins in php files

For other updates
1- chmod +x deploy.sh if neeed
2- Update src/ (git pull)
3- Once pushed on the server, use ./deploy.sh to deploy the files in the proper directories.

DO NOT FORGET TO CLEAR MEMCACHED ON THE SERVER IF YOU MODIFY THE specific_data

TODO: 
- easy version without workshops
- have "admin_notes" an option of getParticipant (public)