docs:
	./openapi-generator-cli.jar generate -i api.yaml -g dynamic-html -o out/docs
	(cd out/docs && yarn install && echo http://localhost:8002 && nodejs main.js)

openapi-generator-cli.jar: 
	wget -c https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/5.0.0/openapi-generator-cli-5.0.0.jar -O openapi-generator-cli.jar
	chmod +x openapi-generator-cli.jar
	touch openapi-generator-cli.jar