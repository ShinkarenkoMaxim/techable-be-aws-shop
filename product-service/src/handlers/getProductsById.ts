import { APIGatewayEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { products } from '../mocks/products.mock';

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const productId = event.pathParameters?.productId;
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: true, message: 'Product not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
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
