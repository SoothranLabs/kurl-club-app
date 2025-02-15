import * as z from 'zod';

const isPhoneNumberValid = (phone: string): boolean => {
  // Example validation logic using regex:
  // This regex checks for a valid international phone number format with country code
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phone);
};

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
  phone: z.string().refine((val) => isPhoneNumberValid(val), {
    message:
      'Invalid phone number. Please provide a valid number with the country code.',
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

  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .optional(),

  buildingName: z
    .string()
    .min(1, 'Address Line 1 is required')
    .max(200, 'Address Line 1 should not exceed 200 characters')
    .trim(),

  // Address Line 2 is optional, apply max before optional
  city: z
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

// Create GYM Schema
export const CreateGymSchema = z.object({
  GymName: z
    .string()
    .min(1, 'Gym name is required.')
    .max(100, 'Gym name must not exceed 100 characters.'),
  Location: z
    .string()
    .min(1, 'Address is required.')
    .max(250, 'Address must not exceed 250 characters.'),
  ContactNumber1: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Gym phone number must be a valid phone number.'
    ),
  Email: z.string().email('Gym email must be a valid email address.'),
  ProfilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .refine((file) => file === null || file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .optional(),
  SocialLink1: z.string().optional(),
  SocialLink2: z.string().optional(),
  SocialLink3: z.string().optional(),
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
  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .optional(),
});

export const AddForm = z.object({
  memberName: z
    .string()
    .min(1, 'Member name is required')
    .max(100, 'Member name should not exceed 50 characters')
    .trim(),
  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .optional(),
  email: z
    .string()
    .email('Enter a valid email address')
    .min(1, 'Email address is required')
    .max(150, 'Email address should not exceed 150 characters'),
  primaryPhone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Enter a valid primary phone number with country code'
    )
    .min(1, 'Primary phone number is required'),
  dob: z.string().min(1, 'DOB is required'),
  gender: z.string().min(1, 'Gender is required'),
  package: z.string().min(1, 'Package is required'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  feeStatus: z.string().min(1, 'FeeStatus is required'),
  amountPaid: z.string().min(1, 'AmountPaid is required'),
  doj: z.string().min(1, 'DOJ is required'),
  workoutPlan: z.string().min(1, 'WorkoutPlan is required'),
  personalTrainer: z.string().min(1, 'peronalTrainer is required'),
  bloodgroup: z.string().min(1, 'BloodGroup is required'),
  addressLine1: z
    .string()
    .min(1, 'Address Line 1 is required')
    .max(200, 'Address Line 1 should not exceed 200 characters')
    .trim(),
  addressLine2: z
    .string()
    .max(200, 'Address Line 2 should not exceed 200 characters')
    .optional(),
});

export const AddUserForm = z.object({
  memberName: z
    .string()
    .min(1, 'Member name is required')
    .max(100, 'Member name should not exceed 50 characters')
    .trim(),
  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .optional(),
  email: z
    .string()
    .email('Enter a valid email address')
    .min(1, 'Email address is required')
    .max(150, 'Email address should not exceed 150 characters'),
  primaryPhone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Enter a valid primary phone number with country code'
    )
    .min(1, 'Primary phone number is required'),
  designation: z.string().min(1, 'Designation is required'),
  dob: z.string().min(1, 'DOB is required'),
  gender: z.string().min(1, 'Gender is required'),
  doj: z.string().min(1, 'DOJ is required'),
  feeStatus: z.string().min(1, 'FeeStatus is required'),
  amountPaid: z.string().min(1, 'AmountPaid is required'),
  addressLine1: z
    .string()
    .min(1, 'Address Line 1 is required')
    .max(200, 'Address Line 1 should not exceed 200 characters')
    .trim(),
  addressLine2: z
    .string()
    .max(200, 'Address Line 2 should not exceed 200 characters')
    .optional(),
});

export const EditDetailsForm = z.object({
  packageType: z.string().min(1, 'PackageType is required'),
  paidAmount: z.string().min(1, 'AmountPaid is required'),
});

export const createMemberSchema = z.object({
  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      message: 'Profile picture must be a file.',
    })
    .refine((file) => file === null || file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .optional(),
  name: z.string().min(1, 'Member name is required'),
  dob: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().min(1, 'Date of birth is required')
  ),
  bloodGroup: z.string().min(1, 'Blood group selection is required'),
  gender: z.string().min(1, 'Gender selection is required'),
  package: z.string().min(1, 'Package selection is required'),
  feeStatus: z.string().min(1, 'Fee status is required'),
  doj: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().min(1, 'Date of joining is required')
  ),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email format'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  personalTrainer: z.string().min(1, 'Personal trainer selection is required'),
  address: z
    .string()
    .min(1, 'Address is required.')
    .max(250, 'Address must not exceed 250 characters.'),
  amountPaid: z.string().min(0, 'Amount paid must be a positive number'),
  workoutPlanId: z.string().min(1, 'Workout plan selection is required'),
});

export const workoutPlanSchema = z.object({
  planName: z.string().min(1, 'Plan name is required'),
  description: z.string().min(1, 'Description is required'),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  durationInDays: z.number().min(1, 'Duration must be at least 1 day'),
  isDefault: z.boolean(),
});
