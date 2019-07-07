import s3deploy = require('@aws-cdk/aws-s3-deployment');
import s3 = require('@aws-cdk/aws-s3');

export class UploadBucket extends s3.Bucket {

    addDirectory(localDir: string, prefix: string){
        new s3deploy.BucketDeployment(this, `UploadBucket-add-${localDir}-${this.node.id}`, {
          source: s3deploy.Source.asset(localDir),
          destinationBucket: this,
          destinationKeyPrefix: prefix
        });
    }
}