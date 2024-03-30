'use client'
import FolderComponent from '@/components/folder/component';
import { UserProvider } from '../context/user-context';

export default function LayoutComponent({ children }: { children: React.ReactNode }) {

  return (
    <UserProvider>
      <div className='flex h-full'>
        <FolderComponent />
        <>
          {children}
        </>
      </div>
    </UserProvider>
  )
}
