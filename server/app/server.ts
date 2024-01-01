
import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();
import { createClient  } from 'redis';


// const RedisClient = createClient({
//     url: 'redis://redis:6379'
// });

// const port = 4500;

// const app = express();

// app.use(cors())

// const httpServer = createServer(app);





import { merge } from 'lodash';


import { connectToDatabase } from './utils/connections.db';
import Login_TimestampTypes from "./src/user_login_timestamps/user_login_tips";
import { Login_TimestampsResolvers } from './src/user_login_timestamps/user_login_reslovers';

import productsTypes from "./src/GardensGQL/productsTypes";
import { productsResolvers } from './src/GardensGQL/products.resolvers';

import usersTypes from './src/usersGQL/usersTypes';
import { usersResolvers } from './src/usersGQL/users.reslovers';
import { client } from './utils/connectionRedis';



import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import mongoose from "mongoose";
import BodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
//כאן נראה איך לייצר שרת שמסוגל לטפל גם בבקשות רגילות
//wensocket - subscriptions וגם בבקשות 
//התהליך הוא מעט מסורבל, זה מה שקיים בדוקומנטציה נכון להיום
//יצירת השרת
const app = express();
//http עטיפת השרת בשרת
// websocketכדי שנוכל להעבירו לשרת ה
const httpServer = createServer(app);
//websocket יצירת שרת 
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
});

const schema = makeExecutableSchema({
    typeDefs: [usersTypes, productsTypes, Login_TimestampTypes],
    resolvers: merge(usersResolvers, productsResolvers, Login_TimestampsResolvers),
    });
//הפעלת השרת שלנו, הכולל את שני פרוטוקולי התקשורת 
//makeExecutableSchema אותו שרת גם כולל את הסכמה שלנו, לכן יצרנו אתה לפני עם 
const serverCleanup = useServer({ schema }, wsServer);


(async () => {

//העלאת שרת האפולו שלנו בקוניפורציה 
//אשר תתאים לשימוש בשרת עם שני הפרוטוקולים שיצרנו קודם לכן
const apolloServer = new ApolloServer({ schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ] });
//הפעלת שרת האפולו
await apolloServer.start();

app.use(cors());
//של שרת האקספרס middlware-שילוב שרת אפולו כ 
app.use("/graphql", cors(), BodyParser.json(), expressMiddleware(apolloServer));



// await connectToDatabase();
// await client.connect();

})();

httpServer.listen(4500, () => {
    console.log(`server is listening on port 4000`);
});

// const dbConnect = async () => {
//     const pool = new Pool();
//     const res = await pool.connect();
//     res.release();
//     console.log(`\n\nDatabase connection test completed successfully!`);
//   };

// dbConnect()
// .then(() =>  console.log( "connect successfully to PG !!!" ))
// .catch((error) => { console.log('error in pg',error) });
