import { User, Event, Label, Message, Role } from "../models/associations.js";
import { Op } from "sequelize";
import { userUpdateSchema } from "../schema/user.schema.js";


export const userController = {
  // Handle fetching user account details by email
  getAccountDetails: async (req, res) => {
    try {
      const userEmail = req.body.email; // Retrieve user email from request body
      const user = await User.findOne({
        where: { email: userEmail },
        include: [
          { model: Role, as: 'role' },
          { model: Message, as: 'sentMessages' },
          { model: Message, as: 'receivedMessages' }
        ]
      });

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Retrieve past events (only titles)
      const pastEvents = await Event.findAll({
        where: {
          date: { [Op.lt]: new Date() } // Past events. Op.lt: This is an operator from Sequelize which stands for "less than." It is used to filter records where the column value is less than a certain date (used for past events in this case).
        },
        limit: 2,
        order: [['date', 'DESC']],
        include: [
          { model: Label, as: 'label' }
        ],
        attributes: ['id', 'title']
      });

      // Retrieve future event (only title)
      const futureEvent = await Event.findOne({
        where: {
          date: { [Op.gt]: new Date() } // Future event. Op.gt: This operator stands for "greater than." It is used to filter records where the column value is greater than a certain date (used for future events in this case).
        },
        order: [['date', 'ASC']],
        include: [
          { model: Label, as: 'label' }
        ],
        attributes: ['id', 'title']
      });

      user.dataValues.pastEvents = pastEvents;
      user.dataValues.futureEvent = futureEvent;

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Quelque chose s\'est mal passé', error });
    }
  },

  // Method to update account details by email
  updateAccountDetails: async (req, res) => {
    try {
      const userEmail = req.body.email; // Retrieve user email from request body
      if (!userEmail) {
        return res.status(400).json({ message: 'Email est requis' });
      }

      const updatedData = req.body;

      // Validate data with Joi
      await userUpdateSchema.validateAsync(updatedData);

      const user = await User.findOne({
        where: { email: userEmail },
        include: [
          { model: Role, as: 'role' },
          { model: Message, as: 'sentMessages' },
          { model: Message, as: 'receivedMessages' }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Update user details
      await user.update(updatedData);

      // Refetch the updated user with associations
      const updatedUser = await User.findOne({
        where: { email: userEmail },
        include: [
          { model: Role, as: 'role' },
          { model: Message, as: 'sentMessages' },
          { model: Message, as: 'receivedMessages' }
        ]
      });

      res.status(200).json({ message: 'Les informations de l\'utilisateur ont été mises à jour avec succès', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Quelque chose s\'est mal passé', error });
    }
  },

  // Method to delete an account by email
  deleteAccount: async (req, res) => {
    try {
      const userEmail = req.body.email; // Retrieve user email from request body
      const user = await User.findOne({
        where: { email: userEmail }
      });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Delete user
      await user.destroy();

      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Quelque chose s\'est mal passé', error });
    }
  }
};