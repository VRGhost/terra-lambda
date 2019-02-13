#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import branch = require('git-branch');

import { TheStack } from '../lib/terra-lambda-stack';

const app = new cdk.App();
new TheStack(app, 'TerraLambdaStack-' + branch.sync());
app.run();
