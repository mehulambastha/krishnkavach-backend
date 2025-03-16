#!/bin/sh
set -e  # Exit on error

# Function to check if Postgres is ready
wait_for_postgres() {
    echo "Waiting for PostgreSQL to be ready..."
    while ! nc -z postgres 5432; do
        sleep 1
    done
    echo "PostgreSQL is ready!"
}

# Initialize database
init_database() {
    echo "Running database migrations..."
    npx prisma migrate deploy
    echo "Migrations completed successfully!"
}

# Main entrypoint logic
case "$1" in
    "dev")
        wait_for_postgres
        init_database
        npm run dev
        ;;
    "start")
        wait_for_postgres
        init_database
        node dist/server.js
        ;;
    *)
        exec "$@"
        ;;
esac 