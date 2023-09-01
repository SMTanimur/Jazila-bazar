import * as z from 'zod';
const userSchema = z.object({
  firstName: z

    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a valid string',
    })
    .trim()
    .min(2, { message: 'First name is must be 2 or more characters long' }),

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

    .number({
      invalid_type_error: 'Contact  must be a valid number',
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
  title: z

    .string({
      required_error: 'Title name is required',
      invalid_type_error: 'Title name must be a valid string',
    })
    .trim()
    .min(2, { message: 'Title name is must be 2 or more characters long' }),

  default: z.boolean({
    invalid_type_error: 'Default must be a valid boolean',
  }),

  type: z.string({
    required_error: 'Type is Required',
    invalid_type_error: 'Type must be a valid String',
  }),

  address: z.object({
    street_address: z
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
  }),
});



export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

const UserAddressSchema = z.object({
  street_address: z
    .string({
      required_error: 'Street Address is required',
      invalid_type_error: 'Street Address must be a valid string',
    })
    .min(2, { message: 'Street Address is must be 2 or more characters long' }),

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


