export interface AddSecretRequest {
    userId: number;
    secretKey: number;
    serviceName: string;
}
export interface TOTPResponse {
    success: boolean;
    data: {
        code?: string;
        validUntil?: Date;
    } | null;
    error?: string;
}
//# sourceMappingURL=totp.types.d.ts.map