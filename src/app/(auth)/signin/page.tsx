import { type Metadata } from 'next';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Shell } from '@/components/shells/shell';
import { SignInForm } from '@/components/forms/signin-form';
import AnimatedCharacters from '@/components/ui/animated-characters';
import { OAuthSignIn } from '@/components/common/shared/oauth-signin';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default async function SignInPage() {
  return (
    <Shell className='max-w-lg '>
      <Card className=''>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>
            <AnimatedCharacters text='Sign in' />
          </CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
        <OAuthSignIn/>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>
              Don&apos;t have an account?
            </span>
            <Link
              aria-label='Sign up'
              href='/signup'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label='Reset password'
            href='/signin/reset-password'
            className='text-sm text-primary underline-offset-4 transition-colors hover:underline'
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  );
}
