export const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
  });
  next();
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
