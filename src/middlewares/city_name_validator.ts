import { query, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Validate city parameter in query string.
 * Checks if city... :
 * - is present.
 * - is a string.
 * - contains only letters, spaces, and hyphens.
 * - is properly sanitized against XSS.
 */

// Validation chain for city parameter
export const cityValidationRules: ValidationChain[] = [
    query('city_name')
        .trim()
        .notEmpty()
        .withMessage("The city_name parameter is required.")
        .isString()
        .withMessage("The city_name parameter must be a string.")
        .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
        .withMessage("The city_name parameter contains invalid characters.")
        .escape()
];

// Middleware to handle validation errors
export const validateCity = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array().map((error: any) => ({
                message: error.msg,
                param: error.param,
                value: error.value
            }))
        });
        return;
    };
    next();
}; 