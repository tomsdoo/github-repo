docker compose build --no-cache
docker compose up -d
sleep 5
docker compose cp builder:/usr/local/app/docs/typedocs docs/
docker compose down
