declare const _default: (() => {
    app: {
        port: number;
        env: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    app: {
        port: number;
        env: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}>;
export default _default;
