PROJECT_ROOT := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

build-cdk-js:
	npm run build

build-ui:
	npm run webpack -- --mode=development --entry "$(PROJECT_ROOT)/ui"

render-templates: build-cdk-js
	node $(PROJECT_ROOT)/bin/terra-lambda.js outputs


build-static-html:
	cp -rf $(PROJECT_ROOT)/ui/*.html $(PROJECT_ROOT)/tmp/build/ui/

build: build-cdk-js build-static-html

deploy: build
	cdk deploy

diff:
	cdk diff

all: deploy