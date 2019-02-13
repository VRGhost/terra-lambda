#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { TmpStack } from '../lib/_tmp-stack';

const app = new cdk.App();
new TmpStack(app, 'TmpStack');
app.run();
