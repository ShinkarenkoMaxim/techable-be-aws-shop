import { APIGatewayEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { products } from '../mocks/products.mock';

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: true,
        message: 'Internal server error',
      }),
    };
  }
};
