// Middleware for error handling
export function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  } else if (err.message === 'Not found') {
    console.log('<< 404 NOT FOUND');
    res.status(404).send('Not found');
  } else {
    console.log('<< 500 INTERNAL SERVER ERROR');
    res.status(500).send('Something went wrong');
  }
}
