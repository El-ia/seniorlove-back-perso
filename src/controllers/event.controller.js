import { Event, Label } from "../models/associations.js";

export const eventController = {

  async lastEvent(req,res){
    try {
      const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse'];
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
      return res.status(500).json({ err: 'Une erreur est survenue lors de la création de l’utilisateur.' });
    }
  }
};