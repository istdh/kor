import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState, useEffect } from 'react'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Notifications />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </MantineProvider>
    </QueryClientProvider>
  )
}
