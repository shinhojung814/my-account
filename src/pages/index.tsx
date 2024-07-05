import dynamic from 'next/dynamic'

import { BannerSkeleton } from '@components/home/EventBanners'
import Account from '@components/home/Account'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

// const Account = dynamic(() => import('@components/home/Account'))

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
