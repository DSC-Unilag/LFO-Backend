export default ({Sequelize, db}) => {
    const Ward = db.define('ward', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        school: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        origin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date_admitted: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        adopted: {
            type: Sequelize.BOOLEAN,
            default: false,
            allowNull: false,
        },
    });

    return Ward;
};
