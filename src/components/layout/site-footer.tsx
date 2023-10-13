import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { Shell } from '@/components/shells/shell';
import { Icons } from '../ui/icons';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/configs/site';
import GradientLogo from '../common/shared/gradient-logo';

export function SiteFooter() {
  return (
    <footer className='w-full border-t bg-background'>
      <Shell as='div'>
        <section
          id='footer-content'
          aria-labelledby='footer-content-heading'
          className='flex flex-col gap-10 lg:flex-row lg:gap-20'
        >
          <section
            id='footer-branding'
            aria-labelledby='footer-branding-heading'
          >
            <Link
              aria-label='Home'
              href='/'
              className='flex items-center space-x-2'
            >
              <GradientLogo />
            </Link>
          </section>
          <section
            id='footer-links'
            aria-labelledby='footer-links-heading'
            className='xxs:grid-cols-2 grid flex-1 grid-cols-1 gap-10 sm:grid-cols-4'
          >
            {siteConfig.footerNav.map(item => (
              <div key={item.title} className='space-y-3'>
                <h4 className='text-base font-medium'>{item.title}</h4>
                <ul className='space-y-3'>
                  {item.items.map(link => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? '_blank' : undefined}
                        rel={link?.external ? 'noreferrer' : undefined}
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                      >
                        {link.title}
                        <span className='sr-only'>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
            id='newsletter'
            aria-labelledby='newsletter-heading'
            className='space-y-3'
          >
            <h4 className='text-base font-medium'>
              Subscribe to our newsletter
            </h4>
            {/* <SubscribeToNewsletterForm /> */}
          </section>
        </section>
        <section
          id='footer-bottom'
          aria-labelledby='footer-bottom-heading'
          className='flex items-center space-x-4'
        >
          <div className='flex-1 text-left text-sm leading-loose text-muted-foreground'>
            Built by{' '}
            <a
              aria-label='tanimur'
              href='https://github.com/SMTanimur'
              target='_blank'
              rel='noreferrer'
              className='font-semibold transition-colors hover:text-foreground'
            >
              SM Tanimur Rahman
            </a>
            .
          </div>
          <div className='flex items-center space-x-1'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })
              )}
            >
              <Icons.gitHub className='h-4 w-4' aria-hidden='true' />
              <span className='sr-only'>GitHub</span>
            </Link>
            <ThemeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  );
}
