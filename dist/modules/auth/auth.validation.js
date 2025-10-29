import messages from "../../helper/constants/messages.js";
// Shared email validator
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === "string" && email.length <= 50 && emailRegex.test(email);
};
// REGISTER VALIDATION
const validateRegister = (data) => {
    const errors = [];
    if (!data.name || typeof data.name !== "string" || data.name.length < 3 || data.name.length > 50) {
        errors.push({ message: messages.VALIDATION.NAME_INVALID });
    }
    if (!data.email || !validateEmail(data.email)) {
        errors.push({ message: messages.VALIDATION.EMAIL_INVALID });
    }
    if (data.contact !== undefined &&
        data.contact !== null &&
        (typeof data.contact !== "string" || data.contact.length < 9 || data.contact.length > 12)) {
        errors.push({ message: messages.VALIDATION.CONTACT_INVALID });
    }
    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
        errors.push({ message: messages.VALIDATION.PASSWORD_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
// LOGIN VALIDATION
const validateLogin = (data) => {
    const errors = [];
    if (!data.email || !validateEmail(data.email)) {
        errors.push({ message: messages.VALIDATION.EMAIL_INVALID });
    }
    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
        errors.push({ message: messages.VALIDATION.PASSWORD_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
// CHANGE PASSWORD VALIDATION
const validateChangePassword = (data) => {
    const errors = [];
    if (!data.email || !validateEmail(data.email)) {
        errors.push({ message: messages.VALIDATION.EMAIL_INVALID });
    }
    if (!data.newPassword || typeof data.newPassword !== "string" || data.newPassword.length < 6) {
        errors.push({ message: messages.VALIDATION.NEWPASSWORD_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
// FIRST CHANGE PASSWORD VALIDATION
const validateFirstChangePassword = (data) => {
    const errors = [];
    if (!data.newPassword || typeof data.newPassword !== "string" || data.newPassword.length < 6) {
        errors.push({ message: messages.VALIDATION.NEWPASSWORD_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
// FORGOT PASSWORD VALIDATION
const validateForgotPassword = (data) => {
    const errors = [];
    if (!data.email || !validateEmail(data.email)) {
        errors.push({ message: messages.VALIDATION.EMAIL_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
// RESET PASSWORD VALIDATION
const validateResetPassword = (data) => {
    const errors = [];
    if (!data.email || !validateEmail(data.email)) {
        errors.push({ message: messages.VALIDATION.EMAIL_INVALID });
    }
    if (!data.newPassword || typeof data.newPassword !== "string" || data.newPassword.length < 6) {
        errors.push({ message: messages.VALIDATION.NEWPASSWORD_INVALID });
    }
    return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};
export { validateRegister, validateLogin, validateChangePassword, validateFirstChangePassword, validateForgotPassword, validateResetPassword, };
