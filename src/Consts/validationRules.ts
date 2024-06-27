import {FILL_IN, INVALID_EMAIL_INPUT, MAX_30_LENGTH, MIN_6_LENGTH} from "./strings.ts";
import { EMAIL} from "./regExps.ts";

class Validation {
    static requireRule = (errorMessage: string) => ({
        required: true,
        message: errorMessage
    });

    static inputValidation = (regex: RegExp, errorMessage: string) => ({
        pattern: regex,
        message: errorMessage
    });

    static typeValidation = (type: string, errorMessage: string) => ({
        type: type,
        message: errorMessage
    });

    static minLengthValidation = (minLength: number, errorMessage: string) => ({
        min: minLength,
        message: errorMessage
    });

    static maxLengthValidation = (maxLength: number, errorMessage: string) => ({
        max: maxLength,
        message: errorMessage
    });

    static emailStringValidation = (regex: RegExp, errorMessage: string) => ({
        pattern: regex,
        message: errorMessage
    })
}

export const validationRules = {

    emailOrUsernameValidation: () => [
        Validation.requireRule(FILL_IN),
    ],

    usernameValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.minLengthValidation(6, MIN_6_LENGTH),
    ],

    emailValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.emailStringValidation(EMAIL, INVALID_EMAIL_INPUT)
    ],

    passwordValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.minLengthValidation(6, MIN_6_LENGTH),
        Validation.maxLengthValidation(30, MAX_30_LENGTH),

    ],

    roadmapNameValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.minLengthValidation(6, MIN_6_LENGTH),
        Validation.maxLengthValidation(30, MAX_30_LENGTH),
    ]
}