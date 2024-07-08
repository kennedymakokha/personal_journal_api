"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const journalRoutes_1 = __importDefault(require("./routes/journalRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// import {options} from './index.js'
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Journal',
            version: '1.0.0',
            description: 'Personal Journal covered Create, Read, Update, and Delete operations using a Node.js API',
        },
        servers: [
            { url: 'http://localhost:5000/api' }, //you can change you server url
        ],
    },
    apis: ['./routes/*.ts'], //you can change you swagger path
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use('/api', journalRoutes_1.default);
app.use('/api', categoriesRoutes_1.default);
app.use('/api', usersRoutes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
