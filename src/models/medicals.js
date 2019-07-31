export default ({Sequelize, db, Ward}) => {
    const Medical = db.define('medical', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        height: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        blood_group: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        genotype: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        wardId: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
        },
    });

    Medical.belongsTo(Ward, {constraints: true, onDelete: 'CASCADE'});

    return Medical;
};
