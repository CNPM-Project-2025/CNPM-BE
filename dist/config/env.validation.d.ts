import Joi from 'joi';
export declare const envValidationSchema: Joi.ObjectSchema<any>;
declare const _default: (() => {
    nodeEnv: string;
    port: string;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    nodeEnv: string;
    port: string;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
}>;
export default _default;
