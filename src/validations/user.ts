import * as z from 'zod';
const userSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a valid string',
    })
    .trim()
    .min(2, { message: 'First name is must be 2 or more characters long' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email({ message: 'Invalid email address' }),

  lastName: z

    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a valid string',
    })
    .trim()
    .min(2, { message: 'Last name is must be 2 or more characters long' }),
  avatar: z

    .string({
      required_error: 'Avatar  is required',
      invalid_type_error: 'Avatar  must be a valid string',
    })
    .trim()
    .min(2, { message: 'Avatar  is must be 2 or more characters long' }),
  contact: z

    .string({
      invalid_type_error: 'Contact  must be a valid string',
    })
    .min(11, { message: 'Contact  is must be 2 or more characters long' }),
  password: z

    .string({
      required_error: 'Password  is required',
      invalid_type_error: 'Password  must be a valid string',
    })
    .trim()
    .min(8, { message: 'Password  is must be 2 or more characters long' }),
});

const AddressSchema = z.object({
  default: z.boolean({
    invalid_type_error: 'Default must be a valid boolean',
  }),

  street: z
    .string({
      required_error: 'Street Address is required',
      invalid_type_error: 'Street Address must be a valid string',
    })
    .min(2, {
      message: 'Street Address is must be 2 or more characters long',
    }),

  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a valid string',
    })
    .min(2, { message: 'Country is must be 2 or more characters long' }),

  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a valid string',
    })
    .min(2, { message: 'City is must be 2 or more characters long' }),

  state: z
    .string({
      required_error: 'State is required',
      invalid_type_error: 'State must be a valid string',
    })
    .min(2, { message: 'State is must be 2 or more characters long' }),

  zip: z
    .string({
      required_error: 'Zip is required',
      invalid_type_error: 'Zip must be a valid string',
    })
    .min(2, { message: 'Zip is must be 2 or more characters long' }),
});

export const UserAddressSchema = z.object({
  street: z
    .string({
      required_error: 'Street Address is required',
      invalid_type_error: 'Street Address must be a valid string',
    })
    .min(2, { message: 'Street Address is must be 2 or more characters long' }),
  default: z.boolean(),
  name: z
    .string({
      required_error: 'Name Address is required',
      invalid_type_error: 'Name Address must be a valid string',
    })
    .min(2, { message: 'Name Address is must be 2 or more characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email({ message: 'Invalid email address' }),
  phone: z
    .string({
      invalid_type_error: 'Contact  must be a valid string',
    })
    .min(8, { message: 'Contact  is must be 2 or more characters long' }),

  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a valid string',
    })
    .min(2, { message: 'Country is must be 2 or more characters long' }),

  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a valid string',
    })
    .min(2, { message: 'City is must be 2 or more characters long' }),

  state: z
    .string({
      required_error: 'State is required',
      invalid_type_error: 'State must be a valid string',
    })
    .min(2, { message: 'State is must be 2 or more characters long' }),

  postcode: z
    .string({
      required_error: 'Postcode is required',
      invalid_type_error: 'Postcode must be a valid string',
    })
    .min(2, { message: 'Postcode is must be 2 or more characters long' }),
});

export type TUserAddress = z.infer<typeof UserAddressSchema>;
