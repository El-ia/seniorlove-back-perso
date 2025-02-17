import sanitizeHtml from 'sanitize-html';

// Middleware function to sanitize the request body
export const bodySanitizer = (req, res, next) => {
  // Check if the request body exists
  if (req.body) {
    // Iterate over each key in the request body
    for (let key in req.body) {
      
      // Skip sanitization if the value is an array (sanitalization not necessary here)
      if (Array.isArray(req.body[key])) {
        continue;
      }

      // Sanitize if the value is a string
      // This removes any potentially dangerous HTML tags or attributes
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key]);
      }
    }
  }
  next();
};