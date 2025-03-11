import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import BalanceBox from '@/components/BalanceBox'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
  const loggedIn = { firstName: "David", lastName: "Gustav" , email: "davidgustav@gmail.com"}

  return (
    <section className='home'>
      <div className="home-content">
         <header className="home-header">
           <HeaderBox 
            type="greeting"
            title="Welcome"
            user ={loggedIn?.firstName || "Guest"}
            subtext="Check your balance and manage your finances efficiently."
           />
           <BalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
           />
         </header>


         RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 1278.35}, {currentBalance: 1278.35}]}
      />
    </section>
  )
}

export default Home