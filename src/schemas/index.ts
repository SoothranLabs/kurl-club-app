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

//Phone-Verify-Schema
export const phoneVerify = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
});

//OTP Schema
export const OTPSchema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .regex(/^\d{6}$/, { message: 'OTP must be a 6-digits' }),
});

//GYM Details Schema
export const GymDetailsSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name cannot be empty' }),

  address: z
    .string({ required_error: 'Address is required' })
    .min(1, { message: 'Address cannot be empty' }),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number ' }),

  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

// Trainer Form Schema
export const TrainerFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});
