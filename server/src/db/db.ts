import { Sequelize } from "sequelize";

export default new Sequelize(
    'd6uopm4uptlgtq',
    'hbhszybauqzfuu',
    '6b51b58faf115dccbfe1130ea0c7f954b9a082f0fb82ea80cd622b96de383a2c',
    {
        dialect: 'postgres',
        host: 'ec2-3-224-184-9.compute-1.amazonaws.com',
        port: 5432,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)