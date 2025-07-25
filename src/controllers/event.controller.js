

import { Event, Label, User } from "../models/associations.js";
import { Op } from 'sequelize';

export const eventController = {
  async getAllEvents(req,res){
    try {
      // Fetch all events including associated labels and users
      const events = await Event.findAll({
        include: [
          'label','users' ],
      });
  
      // Return the fetched events as a JSON response
      res.json(events);
    } catch (error) {
      // Handle any errors that occur during the fetch
      res.status(500).json({ message: 'Quelque chose s\'est mal passé', error });
    }
  },

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

  async connectedEvent(req, res) {
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
  }
};