import dynamic from 'next/dynamic'

import withAuth from '@hooks/withAuth'

const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))
const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div style={{ padding: '24px 12px' }}>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

function generateMonthlyChartData() {
  return [
    '2024-01-31',
    '2024-02-29',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
  }))
}

export default withAuth(AccountPage)
