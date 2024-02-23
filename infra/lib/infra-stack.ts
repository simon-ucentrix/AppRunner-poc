import apprunner = require("@aws-cdk/aws-apprunner-alpha"); // Allows working with App Runner resources
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets"; // Allows building the docker image and uploading to ECR
import * as path from "path"; // Helper for working with file paths

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // The code that defines your stack goes here

    //If you are running on a Mac using the new M1 chip, please change `../SampleApp` to `../../SampleApp`.
    const imageAsset = new DockerImageAsset(this, "ImageAssets", {
      directory: path.join(__dirname, "../"),
    });

    const service = new apprunner.Service(this, "Service", {
      source: apprunner.Source.fromAsset({
        imageConfiguration: { port: 80 },
        asset: imageAsset,
      }),
    });

    new cdk.CfnOutput(this, "apprunner-url", {
      exportName: "apprunner-url",
      value: service.serviceUrl,
      description: "URL to access service",
    });
  }
}
