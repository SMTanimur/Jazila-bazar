import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
     <Button
      size={'lg'}
      color='primary'
      content='বাংলা'
      lang='bn'
      className='rounded-full'
     
     >
     Hello
     </Button>
    </main>
  )
}
