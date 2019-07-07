PROJECT_ROOT := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

clean:
	rm -rf ./tmp/*
	rm -rf ./cdk.out
	find "$(PROJECT_ROOT)" \
		-not \( -path "$(PROJECT_ROOT)node_modules" -prune \) -a \
		-not \( -path "$(PROJECT_ROOT).git" -prune \) \
		-type f | xargs -I'XX' -- find XX \( -iname '*.d.ts' -o -iname '*.js' \) \
					-a -not -iname 'webpack.config.js' -delete

build-cdk-js:
	npm run build

output-fs:
	mkdir -p "$(PROJECT_ROOT)tmp/build/ui"

build-ui: output-fs
	npm run webpack -- --config "$(PROJECT_ROOT)webpack.config.js" --mode development

render-templates: build-cdk-js
	node $(PROJECT_ROOT)/bin/terra-lambda.js outputs


build-static-html: output-fs
	cp -rf "$(PROJECT_ROOT)ui/"*.html "$(PROJECT_ROOT)tmp/build/ui/"

build: build-cdk-js build-ui build-static-html

deploy: build
	cdk deploy

diff:
	cdk diff

all: deploy