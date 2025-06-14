import { User, Event, Label, Message, Role } from "../models/associations.js";
import { Op } from "sequelize";
import { userUpdateSchema } from "../schema/user.schema.js";
import slugify from 'slugify';

// Function to generate slug

const generateSlug = (name) => {
  return slugify(name, {
    lower: true, // Convert to lowercase
    remove: /[^a-zA-Z0-9 -]/g, // Remove special characters except spaces and hyphens
    strict: true // Remove any remaining special characters
  });

};   

export const userController = {
  // Handle fetching user account details by email
  getAccountDetails: async (req, res) => {
    const userId = req.user.userId; 
    const user = await User.findOne({
      where: { id: userId },
      include: [
        //{ model: Role, as: 'role' },
        //{ model: Message, as: 'sentMessages' },
        //{ model: Message, as: 'receivedMessages' }
        'role', 'sentMessages', 'receivedMessages', 'labels'
      ]
    });

    if (!user) {
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
  },

  // Method to update account details by ID
  updateAccountDetails: async (req, res) => {  

    const userId = req.user.userId; // Retrieve user ID from request body
    const updatedData = req.body;

    // Validate data with Joi
    await userUpdateSchema.validateAsync(updatedData);

    // Generate slug if firstname is being updated
    if (updatedData.firstname) {
      updatedData.slug = generateSlug(updatedData.firstname);
    }

    const user = await User.findOne({
      where: { id: userId },
      include: [
        //{ model: Role, as: 'role' },
        //{ model: Message, as: 'sentMessages' },
        //{ model: Message, as: 'receivedMessages' }
        'role', 'sentMessages', 'receivedMessages', 'labels'
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Update user details
    await user.update(updatedData);

    if (updatedData.labels) {
      await user.setLabels(updatedData.labels);
    }

    // Refetch the updated user with associations
    const updatedUser = await User.findOne({
      where: { id: userId },
      include: [
        //{ model: Role, as: 'role' },
        //{ model: Message, as: 'sentMessages' },
        //{ model: Message, as: 'receivedMessages' }
        'role', 'sentMessages', 'receivedMessages', 'labels'
      ]
    });

    res.status(200).json({ message: 'Les informations de l\'utilisateur ont été mises à jour avec succès', user: updatedUser });
  
  },

  // Method to delete an account by ID
  deleteAccount: async (req, res) => {
    const userId = req.user.userId; // Retrieve user ID from request body
    const user = await User.findOne({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    // Clear authentication token
    res.clearCookie('token', { httpOnly: true});

    // Delete user
    await user.destroy();
  

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  
  },

  // Method to get connected profiles based on user's preferences and city
  connectedProfile: async (req, res) => {
    const userId = req.user.userId;
    
    // Get current user data
    const currentUser = await User.findOne({
      where: { id: userId }
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find matching profiles
    const profiles = await User.findAll({
      where: {
        id: { [Op.ne]: userId }, // Exclude current user
        city: currentUser.city, // Same city matching
        [Op.or]: [
          {
            [Op.and]: [
              { gender: currentUser.gender_match }, // Match user's preferred gender
              { gender_match: currentUser.gender }  // Match profiles seeking user's gender
            ]
          },
        ]
      },
      limit: 6,
      order: [['created_at', 'DESC']], // Most recent first
      attributes: { 
        exclude: ['password', 'email'] // Security: exclude sensitive data
      }
    });

    res.status(200).json(profiles);
  }
};