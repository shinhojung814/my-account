import dynamic from 'next/dynamic'

import withAuth from '@hooks/withAuth'
import Spacing from '@shared/Spacing'

const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))
const CategoryChart = dynamic(() => import('@components/account/CategoryChart'))
const PiggyBank = dynamic(() => import('@components/account/PiggyBank'))
const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  console.log('generateCategoryChartData', generateCategoryChartData())

  return (
    <div style={{ padding: '24px 12px' }}>
      <PiggyBank />
      <Spacing
        direction="vertical"
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Spacing
        direction="vertical"
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <CategoryChart chartData={generateCategoryChartData()} />
      <Spacing
        direction="vertical"
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
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
    balance: Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000,
  }))
}

function generateCategoryChartData() {
  return ['음식', '쇼핑', '여행', '여가', '기타'].map((label) => ({
    label,
    amount: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
  }))
}

export default withAuth(AccountPage)
