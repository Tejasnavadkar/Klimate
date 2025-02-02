
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/Weather-dashboard'
import CityPage from './pages/City-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

function App() {

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000, // 5 min  // if visit page and then go to another page and again you came back to the same page under 5min data not refetch it cached it but if you come after 5min it refetch then 
        gcTime: 10 * 60 * 1000,  // 10 min // here after 10 min delete cached data
        retry:false, // if you set true then if query fail then automaticaly retry
        refetchOnWindowFocus:false  // if true on different window size refetch
      }

    }
  })


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme={'dark'}>
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherDashboard />} />
              <Route path='/city/:cityName' element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors /> {/*now we can use toster with dynamic colors*/}
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
