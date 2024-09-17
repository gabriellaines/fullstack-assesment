SERVER_DIR=./server

# Client commands
client-install:
	npm --prefix client install

client-build:
	npm --prefix client run build

client-run-dev:
	nohup npm --prefix client start > client/client.log 2>&1 &
	echo $$! > client/client.pid

# Server commands
server-run-dev:
	nohup npm --prefix server run start:dev > server/server.log 2>&1 &
	echo $$! > server/server.pid

server-install:
	npm --prefix server install

server-build:
	npm --prefix server run build

# Docker commands
docker-up:
	docker-compose -f $(SERVER_DIR)/docker-compose.yml up -d

docker-down:
	docker-compose -f $(SERVER_DIR)/docker-compose.yml down

# Setup environment
setup-env:
	echo "DATABASE_HOST=localhost" > server/.env
	echo "DATABASE_PORT=5432" >> server/.env
	echo "POSTGRES_USER=user" >> server/.env
	echo "POSTGRES_PASSWORD=password" >> server/.env
	echo "POSTGRES_DB=employee_db" >> server/.env

# Stop processes
stop-client:
	kill `cat client/client.pid` || echo "Client is not running."

stop-server:
	kill `cat server/server.pid` || echo "Server is not running."

stop-all: stop-client stop-server docker-down
	@echo "All processes stopped."

# Install, build, and start
install: client-install server-install
	@echo "Dependencies installed."

build: client-build server-build
	@echo "Build complete."

setup: setup-env install
	@echo "Environment file created."

start: setup docker-up client-run-dev server-run-dev
	@echo "Applications started."

dev: docker-up client-run-dev server-run-dev
	@echo "Development environment started."

.PHONY: install build start stop-all setup dev