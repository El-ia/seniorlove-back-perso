// cookieMiddleware.js
export function setCookie(req, res, next) {
  const options = {
    maxAge: 1000 * 60 * 15, // expire after 15 minutes
    httpOnly: true, // Cookie will not be exposed to client side code
    sameSite: "none", // If client and server origins are different
    secure: true // use with HTTPS only
  };

  //const token = "abcd.123456.xyz"; // dummy JWT token
  //res.cookie("token", token, options);
  next(); // proceed to the next middleware or final route
}

