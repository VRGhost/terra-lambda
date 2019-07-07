import path = require('path');
import core = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

import uploader = require('./upload-to-s3')
import api = require('./rest')

const projectRoot = path.join(__dirname, '..')

export class TheStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const uiBucket = new uploader.UploadBucket(this, 'UserFrontendStore', {
        encryption: s3.BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'error.html',
        versioned: true,
        removalPolicy: core.RemovalPolicy.DESTROY,
        lifecycleRules: [
          {
            enabled: true,
            abortIncompleteMultipartUploadAfter: core.Duration.days(3),
            expiration: core.Duration.days(14)
          }
        ]
    });
    uiBucket.grantPublicAccess('*', 's3:GetObject');
    uiBucket.addDirectory(path.join(projectRoot, 'tmp', 'build', 'ui'), '/');

    const siteApi = new api.MyRestApi(this, 'site-api');

    new core.CfnOutput(this, 'UiRoot', {
      value: uiBucket.bucketWebsiteUrl
    });
    new core.CfnOutput(this, 'ApiUrl', {
      value: siteApi.url
    });
  }

}
