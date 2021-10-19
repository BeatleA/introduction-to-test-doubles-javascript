const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
jest.mock('./bubble_tea_messenger');
jest.mock('./simple_logger');

describe('createOrderRequest', () => {
  // Arrange
  const dummyPaymentDetails = {
    name: 'Some person',
    address: '123 Some Street',
    debitCard: {
      digits: '123456',
    },
  };
  const bubbleTeaRequestMatcha = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.MATCHAMILKTEA,
    },
  };
  const bubbleTeaRequestLychee = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.LYCHEEICETEA,
    },
  };

  test.each([
    [bubbleTeaRequestMatcha, dummyPaymentDetails],
    [bubbleTeaRequestLychee, dummyPaymentDetails],
  ])('test %# successful bubble tea order request',
      (bubbleTeaRequest, dummyPaymentDetails) => {
        // Act
        const orderRequest = createOrderRequest(bubbleTeaRequest);

        // Assert
        expect(orderRequest.name).toBe(dummyPaymentDetails.name);
        expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
        expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)
            .toHaveBeenCalledWith(orderRequest);
        expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)
            .toHaveBeenCalledTimes(1);

        jest.clearAllMocks();
      });
});
