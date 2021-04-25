#docker image prune
#docker container prune
docker login
docker image rm studymama-ui:latest
docker build -t studymama-ui:latest ../studymama-ui/
docker-compose -f docker-compose-ui.yml up --build -d
echo Press enter to continue; read dummy;
