import * as z from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email(),
    username: z.string().min(2, "Username must be at least 2 characters"),
    address: z.string().min(2, "Address must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be a 2-letter abbreviation").max(2, "State must be a 2-letter abbreviation"),
    postalCode: z.string().min(5),
    dateOfBirth: z.string().min(10, "Date of birth must be in the format YYYY-MM-DD"),
    ssn: z.string().min(4, "SSN must be at least 4 characters"),
    password: z.string().min(8, "Password must be at least 8 characters").refine(password => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      }, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }),

    // passwordConfirmation: z.string().min(8),
});

export const transferSchema = z.object({
    amount: z.number().positive(),
    account: z.string(),
    recipient: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
    }),
    description: z.string().min(5),
});