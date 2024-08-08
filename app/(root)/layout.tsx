
import MobileNavbar from '@/components/shared/MobileNavbar'
import Sidebar from '@/components/shared/sidebar/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative bg-background-light dark:bg-background-dark'>
        <MobileNavbar />
        <div className='flex'>
            <Sidebar />
            <section className='min-h-screen flex-1 flex-col overflow-y-auto p-6 lg:px-14'>
                <div className='mx-auto w-full overflow-y-auto'>
                    {children}
                </div>
            </section>
        </div>
        <Toaster />
    </main>
  )
}

export default RootLayout