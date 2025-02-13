IMC

WARNING: NEVER PUSH FROM THE SERVER

1- Update src/data/conference-data.json 
2- Update /env/.env with DB user & password
3- Create db running /mysql/run_create_db.sh
4- Run python python/fill.py to fill the db with info from src/data/conference-data.json 

For other updates
1- Update ./deploy.sh ( chmod 755 deploy.sh if neeed)
1- Update src/
2- Once pushed on the server, use ./deploy.sh to deploy the files in the proper directories.


