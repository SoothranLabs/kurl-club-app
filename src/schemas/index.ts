import * as z from 'zod';

// Register Schema
export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password must not exceed 15 characters' })
      .superRefine((value, ctx) => {
        if (!/[A-Z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one uppercase letter',
          });
        }
        if (!/[a-z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one lowercase letter',
          });
        }
        if (!/[0-9]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one numeric digit',
          });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one special character',
          });
        }
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
    privacyConsent: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms & conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Login Schema
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Reset Schema
export const ResetSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

// New Password Schema
export const UpdatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must not exceed 20 characters' })
      .superRefine((value, ctx) => {
        if (!/[A-Z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one uppercase letter',
          });
        }
        if (!/[a-z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one lowercase letter',
          });
        }
        if (!/[0-9]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one numeric digit',
          });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password should have at least one special character',
          });
        }
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SamplePageSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm password is required' }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  websiteUrl: z.string().min(1, { message: 'Enter a valid Url' }),
  familyHistory: z.string().optional(),
  phoneNumber: z.string().min(10, { message: 'Phone number is invalid' }),
  identificationType: z
    .string()
    .min(1, { message: 'Please select an ID type' }),
  dateOfBirth: z.date({ invalid_type_error: 'Invalid date format' }),
  identificationDocument: z.string().optional(),
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});
