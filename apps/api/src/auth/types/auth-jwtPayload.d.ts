export type AuthJwtPayload = {
    sub: string; // User ID (changed from number to string)
    //email: string; // User email
    //iat?: number; // Issued at (optional)
    //exp?: number; // Expiration time (optional)
};