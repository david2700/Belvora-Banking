import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {
    const categories: CategoryCount[] =  countTransactionCategories(transactions);
  return (
    <aside className='right-sidebar'>
        <section className='flex flex-col pb-8'>
            <div className='profile-banner'/>
            <div className='profile'>
                <div className='profile-img'>
                    <span className='text-5xl font-bold text-blue-500'>{user.firstName[0]}</span>
                </div>
                <div className='profile-details'>
                    <h1 className="profile-name">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className='profile-email'>
                        {user.email}
                    </p>
                </div>
            </div>
        </section>

        <section className='banks'>
            <div className="w-full flex justify-between">
                <h2 className='header-2'>My banks</h2>
                <Link href='/'className='flex gap-2'>
                    <Image 
                        src="/icons/plus.svg"
                        width={20}
                        height={20}
                        alt='add bank'
                    />
                    <h2 className='text-14 font-semibold text-gray-500'>Add bank</h2>
                </Link>
            </div>

            {banks?.length > 0 && (
                <div className='relative flex flex-col flex-1 items-center justify-center gap-4'>
                    <div className="relative z-10">
                        <BankCard 
                            key={banks[0].id}
                            account={banks[0]}
                            userName={`${user.firstName} ${user.lastName}`}
                            showBalance={false}
                        />
                    </div>
                    {banks[1] && (
                        <div className='absolute right-0 top-0 z-0 w-[90%] h-[90%] bg-gray-100 rounded-lg'>
                            <BankCard 
                                key={banks[1].id}
                                account={banks[1]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                    )}
                </div>
            )}

            <div className="mt-10 flex flex-1 flex-col gap-6">
                <h2 className='header-2'>Top Categories</h2>
                <div className='space-y-5'>
                    {categories.map((category) => (
                        <Category key={category.name} category={category}/>
                    ))}
                </div>
            </div>
        </section>
    </aside>
  )
}

export default RightSidebar