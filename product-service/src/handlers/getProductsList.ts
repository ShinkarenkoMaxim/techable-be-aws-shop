import { APIGatewayEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { products } from '../mocks/products.mock';

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
