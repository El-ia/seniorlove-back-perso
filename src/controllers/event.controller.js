

import { Event, Label, User } from "../models/associations.js";
import { Op } from 'sequelize';



export const eventController = {

  async lastEvent(req,res){
    try {
      const cities = ['PARIS', 'LYON', 'MARSEILLE', 'TOULOUSE'];
      const events = await Promise.all(cities.map(async (city) => {
        return await Event.findOne({
          where: { city },


          order: [['created_at', 'DESC']],
          include: {model:Label, as:'label'}

        });
      }));
      res.json(events);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erreur lors de la récupération des événements' });
    }
  },

  // async connectedEvent(req, res) {
  //   try {
  //     // Get the 4 upcoming events, sorted by date in ascending order (earliest first)
  //     const events = await Event.findAll({
  //       limit: 4,
  //       order: [['date', 'ASC']],
  //     });

  //     res.status(200).json(events);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error retrieving events' });
  //   }
  // }


  async connectedEvent(req, res) {
    try {
      const userId = req.user.userId;

      // Get user data
      const user = await User.findOne({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find relevant events
      const events = await Event.findAll({
        where: {
          city: user.city, // Events in user's city
          date: {
            [Op.gte]: new Date() // Only future events
          }
        },
        limit: 4,
        order: [['date', 'ASC']], // Soonest events first
        include: [{
          model: Label,
          as: 'label' // Include event category information
        }]
      });

      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving events' });
    }
}
};