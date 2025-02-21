import { Request, Response } from "express";
import { TOTPResponse } from "../../types/totp.types";
export declare const generator: (secretRecord: any) => {
    token: string;
    validUntil: Date;
    serviceName: string;
};
export declare const generateTOTP: (req: Request, res: Response<TOTPResponse>) => Promise<void>;
//# sourceMappingURL=totpGenerator.d.ts.map