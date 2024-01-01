"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const RedisClient = createClient({
//     url: 'redis://redis:6379'
// });
// const port = 4500;
// const app = express();
// app.use(cors())
// const httpServer = createServer(app);
const lodash_1 = require("lodash");
const user_login_tips_1 = __importDefault(require("./src/user_login_timestamps/user_login_tips"));
const user_login_reslovers_1 = require("./src/user_login_timestamps/user_login_reslovers");
const productsTypes_1 = __importDefault(require("./src/GardensGQL/productsTypes"));
const products_resolvers_1 = require("./src/GardensGQL/products.resolvers");
const usersTypes_1 = __importDefault(require("./src/usersGQL/usersTypes"));
const users_reslovers_1 = require("./src/usersGQL/users.reslovers");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
// import mongoose from "mongoose";
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
//כאן נראה איך לייצר שרת שמסוגל לטפל גם בבקשות רגילות
//wensocket - subscriptions וגם בבקשות 
//התהליך הוא מעט מסורבל, זה מה שקיים בדוקומנטציה נכון להיום
//יצירת השרת
const app = (0, express_1.default)();
//http עטיפת השרת בשרת
// websocketכדי שנוכל להעבירו לשרת ה
const httpServer = (0, http_1.createServer)(app);
//websocket יצירת שרת 
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/graphql'
});
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [usersTypes_1.default, productsTypes_1.default, user_login_tips_1.default],
    resolvers: (0, lodash_1.merge)(users_reslovers_1.usersResolvers, products_resolvers_1.productsResolvers, user_login_reslovers_1.Login_TimestampsResolvers),
});
//הפעלת השרת שלנו, הכולל את שני פרוטוקולי התקשורת 
//makeExecutableSchema אותו שרת גם כולל את הסכמה שלנו, לכן יצרנו אתה לפני עם 
const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
(() => __awaiter(void 0, void 0, void 0, function* () {
    //העלאת שרת האפולו שלנו בקוניפורציה 
    //אשר תתאים לשימוש בשרת עם שני הפרוטוקולים שיצרנו קודם לכן
    const apolloServer = new server_1.ApolloServer({ schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ] });
    //הפעלת שרת האפולו
    yield apolloServer.start();
    app.use((0, cors_1.default)());
    //של שרת האקספרס middlware-שילוב שרת אפולו כ 
    app.use("/graphql", (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
    // await connectToDatabase();
    // await client.connect();
}))();
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
