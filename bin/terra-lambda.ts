#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { TheStack } from '../lib/terra-lambda-stack';

const app = new cdk.App();
new TheStack(app, 'TerraLambdaStack');
app.run();
