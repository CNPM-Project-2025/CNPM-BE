"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const config_1 = require("@nestjs/config");
const joi_1 = require("joi");
exports.envValidationSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string().valid('development', 'production', 'test').required(),
    PORT: joi_1.default.number().default(3000),
    DATABASE_URL: joi_1.default.string().uri().required(),
    JWT_SECRET: joi_1.default.string().required(),
    JWT_EXPIRATION: joi_1.default.string().default('1h'),
});
exports.default = (0, config_1.registerAs)('env', () => ({
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
}));
//# sourceMappingURL=env.validation.js.map