import {FILL_IN, INVALID_EMAIL_INPUT, MIN_1_DIGIT, MIN_6_LENGTH} from "./strings.ts";
import {MIN_1_DIGIT_REGEX, EMAIL} from "./regExps.ts";

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

    static lengthValidation = (minLength: number, errorMessage: string) => ({
        min: minLength,
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
    ],

    emailValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.emailStringValidation(EMAIL, INVALID_EMAIL_INPUT)
    ],

    passwordValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.inputValidation(MIN_1_DIGIT_REGEX, MIN_1_DIGIT),
        Validation.lengthValidation(6, MIN_6_LENGTH)
        //todo: add validation rules

    ],
}