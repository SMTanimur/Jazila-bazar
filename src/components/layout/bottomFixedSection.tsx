import React from 'react'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { ThemeSetting } from './ThemeSetting'
import { ChevronDown } from 'lucide-react'

const BottomFixedSection = () => {
  return (
    <div className='fixed bottom-10 right-16 flex gap-4 '>
       <Button className='uppercase rounded-lg' >
        Compare (3)
       </Button>

       <div className=' relative flex-col  '>

       <div className='absolute bottom-14 right-0 lef'>
          <Button>
            djfkd
          </Button>
       </div>

       <Button className=''>
        <ChevronDown className='w-5'/>
       </Button>
       
       </div>
       

    </div>
  )
}

export default BottomFixedSection