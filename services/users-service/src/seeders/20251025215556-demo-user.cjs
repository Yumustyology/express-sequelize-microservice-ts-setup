'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Yusuf Mustahan',
          email: 'yumustyology@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dara Johnson',
          email: 'dara@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cam Farmer',
          email: 'cam@cabana.ai',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Aisha Bello',
          email: 'aisha.bello@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true } 
    );
    
    console.log('✅ Users seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};