import 'source-map-support/register';
//import yargs = require('yargs');

import core = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

import branch = require('git-branch');

import { TheStack } from '../lib/terra-lambda-stack';

class MyApp extends core.App {
    constructor(_: string[]) {
        super();
        const stack = new TheStack(this, 'TerraLambdaStack-' + branch.sync());

        new s3.Bucket(stack, 'force-update-2', {
            removalPolicy: core.RemovalPolicy.DESTROY
        }); // XXX: Amend this bucket's name to force stack update
    }
}

const app = new MyApp(process.argv);
app.synth()
