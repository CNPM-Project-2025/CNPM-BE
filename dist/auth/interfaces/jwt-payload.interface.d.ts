export interface JwtPayload {
    sub: string | number;
    username?: string;
    email?: string;
    roles?: string[];
    iat?: number;
    exp?: number;
}
