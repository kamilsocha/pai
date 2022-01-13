# SIiM Project

## Development on localhost:3000
npm i  
npm start  

## Run in Docker
**From root folder execute commands**  
docker build -t geotag .  
**Run manually**  
docker run -dp HOST_PORT:80 *e.g. HOST_PORT=80*  
shut down --> docker ps (find id); docker stop {id}; docker rm {id};  
**Use docker compose tool**  
docker-compose up  
shut down --> docker-compose down  

## Run using  ***serve***
npm i -g serve  
npm run build  
serve -s build  

## tools
***components --> material ui***  
***styling --> emotion css/styled***  
***openstreetmap --> leaflet react-leaflet***  
***EXIF --> piexifjs***  
***state management --> Redux, Redux-toolkit, constate***  
