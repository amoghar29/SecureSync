import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    userId?: string;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => any;
//# sourceMappingURL=auth.d.ts.map