import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import BalanceBox from '@/components/BalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className="home-content">
         <header className="home-header">
           <HeaderBox 
            type="greeting"
            title="Welcome"
            user ={loggedIn?.name || "Guest"}
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