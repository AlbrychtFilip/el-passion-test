export const tripRepositoryMock = jest.fn().mockImplementation(() => {
  return {
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    find: jest.fn(entity => entity)
  }
});