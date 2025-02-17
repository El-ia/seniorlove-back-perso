import sanitizeHtml from 'sanitize-html';

export function bodySanitizer(req, res, next) {
  // Check if the request body exists
  if (req.body) {
    // Loop through each property in the request body
    for (const key in req.body) {
      // Sanitize the value using the sanitize-html module
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  }
  next();
}