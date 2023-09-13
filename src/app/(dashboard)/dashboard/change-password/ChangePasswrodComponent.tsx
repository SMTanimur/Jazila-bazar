"use client"
import ChangePasswordForm from '@/components/forms/ChangePasswordForm'
import { useMe } from '@/hooks/api/user/useMe'
import { IUser } from '@/types'
import React from 'react'

 type ChangePasswordComponentProps = {
  user:IUser
 }
const ChangePasswordComponent = ({user}:ChangePasswordComponentProps) => {
 

  
  if(user?.provider !== 'password'){
    return (
      <div className="flex h-[40vh] justify-center items-center">
         <span>No Need change Your Password</span>
      </div>
    )
  }
  return (
    <div className="p-4">
      <ChangePasswordForm/>
    </div>
  )
}

export default ChangePasswordComponent