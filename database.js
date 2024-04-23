import Sequelize  from "sequelize";
export const sequelize = new Sequelize("ejemplo", "root", "HyakkanoForever2019", {
    host: 'localhost',
    dialect: 'mysql',
});
