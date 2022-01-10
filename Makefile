build:
	npm run build

format-artifact:
	cd build && npx prettier --write .

build-production:
	make build && make format-artifact
