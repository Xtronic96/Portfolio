build:
	npm run build

drawart:
	chmod +x art.sh && ./art.sh

format-artifact:
	cd build && npx prettier --write .

build-production:
	make build && make format-artifact && make drawart
