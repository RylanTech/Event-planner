import { Sequelize } from "sequelize";
import { EventFactory } from "./Events";
import { UserFactory } from "./Users";

const dbName = 'events';
const username = 'root';
const password = '0624';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

EventFactory(sequelize)
UserFactory(sequelize)

export const db = sequelize;