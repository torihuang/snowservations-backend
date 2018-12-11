const isValidUser = function isValidUser(context) {
  if (context.isTokenInvalid) throw new Error('InvalidToken');
  if (!context.user || !context.user._id) throw new Error('InvalidToken');
};

module.exports = {
  isValidUser,
};
