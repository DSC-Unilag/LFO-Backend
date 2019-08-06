export default ({Sequelize, db}) => {
    const Resource = db.define('resource', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: Sequelize.DATEONLY,
        updatedAt: Sequelize.DATEONLY,
    });

    return Resource;
};
