

import { Event, Label, User } from "../models/associations.js";



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

  async connectedEvent(req,res){

    try {

      const events = await Event.findAll({
        limit: 4,
        order: [['date', 'ASC']],
      });

      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
  }










};