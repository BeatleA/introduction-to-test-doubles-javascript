const getRandomBubbleTeaType = require('./bubble_tea_roulette_service');

test('should generate random bubble tea', () => {
  // Arrange
  // Stub to calls to Math.random to return 0.2
  jest.spyOn(global.Math, 'random').mockReturnValue(0.2);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe('JASMINEMILKTEA');

  // Restore the default Math.random
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('should generate PEACHICETEA', () => {
  // Arrange
  // Stub to calls to Math.random to return 0.6
  jest.spyOn(global.Math, 'random').mockReturnValue(0.6);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe('PEACHICETEA');

  // Restore the default Math.random
  jest.spyOn(global.Math, 'random').mockRestore();
});
