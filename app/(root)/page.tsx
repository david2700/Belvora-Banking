import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import BalanceBox from '@/components/BalanceBox'

const Home = () => {
  const loggedIn = { firstName: "David" }

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
      </div>
    </section>
  )
}

export default Home