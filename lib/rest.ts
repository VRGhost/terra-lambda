import core = require('@aws-cdk/core');
import apigateway = require('@aws-cdk/aws-apigateway');

export class MyRestApi extends apigateway.RestApi {

    constructor(scope: core.Construct, id: string, props?: apigateway.RestApiProps) {
        super(scope, id, props);

        this.root.addMethod('ANY');

        const books = this.root.addResource('books');
        books.addMethod('GET');
        books.addMethod('POST');
    }
}