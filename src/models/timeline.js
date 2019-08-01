export default ({Sequelize, db, Ward}) => {
    const Timeline = db.define('timeline', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        wardId: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
        },
        createdAt: Sequelize.DATEONLY,
        updatedAt: Sequelize.DATEONLY,
    });

    Ward.hasMany(Timeline, {constraints: true, onDelete: 'CASCADE'});
    Timeline.belongsTo(Ward, {constraints: true, onDelete: 'CASCADE'});
    return Timeline;
};
