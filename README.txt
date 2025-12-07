#DAVID Tom
#PASQUIER Titouan

Pour executer le programme il faut suivre c'est etapes :

1) sudo -g docker docker compose -f stack.yml up

2) sudo -g docker docker exec -i mongo-dev sh -c 'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < sales.bson

3) aller sur l'url http://127.0.0.1/


