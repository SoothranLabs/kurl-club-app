import { isValidPhoneNumber } from 'react-phone-number-input';
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

// Onboarding Form Schema
// Phone Verify Schema
export const PhoneVerifySchema = z.object({
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message:
      'Invalid phone number. Please provide a valid number with country code.',
  }),
});

// OTP Schema
export const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers')
    .refine((val) => val !== '', {
      message: 'OTP cannot be empty',
    }),
});

// GYM Details Schema
export const GymDetailsSchema = z.object({
  gymName: z
    .string()
    .min(1, 'Gym name is required')
    .max(100, 'Gym name should not exceed 100 characters')
    .trim(),

  addressLine1: z
    .string()
    .min(1, 'Address Line 1 is required')
    .max(200, 'Address Line 1 should not exceed 200 characters')
    .trim(),

  // Address Line 2 is optional, apply max before optional
  addressLine2: z
    .string()
    .max(200, 'Address Line 2 should not exceed 200 characters')
    .optional(),

  primaryPhone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Enter a valid primary phone number with country code'
    )
    .min(1, 'Primary phone number is required'),

  // Secondary Phone is optional, apply max before optional
  secondaryPhone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Enter a valid secondary phone number with country code'
    )
    .max(15, 'Phone number cannot exceed 15 digits') // max before optional
    .optional(),

  email: z
    .string()
    .email('Enter a valid email address')
    .min(1, 'Email address is required')
    .max(150, 'Email address should not exceed 150 characters'),

  websiteLink: z
    .string()
    .url('Enter a valid website URL')
    .max(255, 'Website URL cannot exceed 255 characters')
    .optional(),

  facebookPageLink: z
    .string()
    .url('Enter a valid Facebook page URL')
    .max(255, 'Facebook page URL cannot exceed 255 characters')
    .optional(),

  instagramLink: z
    .string()
    .url('Enter a valid Instagram URL')
    .max(255, 'Instagram URL cannot exceed 255 characters')
    .optional(),
});

// Trainer Form Schema
export const TrainerFormSchema = z.object({
  trainers: z
    .array(
      z.object({
        email: z.string().email('Enter a valid email'),
      })
    )
    .optional(),
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
