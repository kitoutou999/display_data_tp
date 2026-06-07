# display_data_tp

Academic project — a full-stack data visualization app using Docker, GraphQL, and MongoDB.

## Stack

- **MongoDB** — stores sales data (`sales.bson`)
- **GraphQL API** — Node.js server with resolvers and schema
- **Web frontend** — accessible at `http://127.0.0.1`
- **Docker Compose** — orchestrates the whole stack

## Run

```bash
# Start all services
sudo -g docker docker compose -f stack.yml up

# Import data into MongoDB
sudo -g docker docker exec -i mongo-dev sh -c \
  'mongoimport -d bda -c sales --authenticationDatabase admin -u root -p example' < sales.bson
```

Then open [http://127.0.0.1](http://127.0.0.1).

## Authors

Tom David, Titouan Pasquier
