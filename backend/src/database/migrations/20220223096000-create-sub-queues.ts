import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Subqueues", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      subQueueName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subQueueMsg: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subQueueQueue: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      queueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },

    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("ChatInternal");
  }
};
