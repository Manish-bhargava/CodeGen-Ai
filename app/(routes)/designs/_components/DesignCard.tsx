import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Constants from '@/data/Constants'
function DesignCard({item}:any) {
    const modelObj=item &&Constants.AiModelList.find((x=>x.name==item?.model))
  return (
    <div className='p-5 rounded-lg'>
        <Image src={item?.imageUrl} alt="io" width={300} height={200} className='w-full h-[200px] object-cover bg-white rounded-lg'></Image>
         <div className='mt-2 '>
            <h2 className='line-clamp-3 text-gray-500 text-sm my-2'>{item?.description}</h2>
            <div className='flex mb-2 items-center justify-between gap-2 p-2 bg-gray-50 rounded-full mt-2'>
                <div className='flex gap-2'>
              {modelObj&&<Image src={modelObj.icon} alt="ds" height={30} width={30}></Image>} 
              <div>{modelObj?.name}</div>
              </div> 
              <Link href={'/view-code/'+item?.uid}>
            <Button>view Code</Button>
              
              </Link>
              
            </div>
         </div>
    </div>
  )
}

export default DesignCard;