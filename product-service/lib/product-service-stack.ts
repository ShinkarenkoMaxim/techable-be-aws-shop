import * as cdk from 'aws-cdk-lib';
import * as apigtw2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sharedLambdaProps: Partial<NodejsFunctionProps> = {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    };

    const getProductsList = new NodejsFunction(this, 'GetProductsListLambda', {
      ...sharedLambdaProps,
      functionName: 'getProductsList',
      entry: 'src/handlers/getProductsList.ts',
    });

    const getProductsById = new NodejsFunction(this, 'GetProductsByIdLambda', {
      ...sharedLambdaProps,
      functionName: 'getProductsById',
      entry: 'src/handlers/getProductsById.ts',
    });

    const api = new apigtw2.HttpApi(this, 'ProductsApi', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [apigtw2.CorsHttpMethod.ANY],
      },
    });

    api.addRoutes({
      path: '/products',
      methods: [apigtw2.HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'GetProductsListIntegration',
        getProductsList
      ),
    });

    api.addRoutes({
      path: '/products/{productId}',
      methods: [apigtw2.HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'GetProductsByIdIntegration',
        getProductsById
      ),
    });
  }
}
