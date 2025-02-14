import { Event } from "../models/associations.js";

export const eventController = {

  async lastEvent(req,res){
    try {
      const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse'];
      const events = await Promise.all(cities.map(async (city) => {
        return await Event.findOne({
          where: { city },
          order: [['created_at', 'DESC']]
        });
      }));

      console.log( "🍪", req.cookies );
    
      // Configure the `token` HTTPOnly cookie
      const options = {
        maxAge: 1000 * 60 * 15, // expire after 15 minutes
        httpOnly: true, // Cookie will not be exposed to client side code
        sameSite: "none", // If client and server origins are different
        secure: true // use with HTTPS only
      };

      const token = "abcd.123456.xyz"; // dummy JWT token
      res.cookie( "token", token, options );
      res.json(events);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Une erreur est survenue lors de la création de l’utilisateur.' });
    }
  }
};