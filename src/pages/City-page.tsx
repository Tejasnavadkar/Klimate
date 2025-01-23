import CurrentWeather from "@/components/CurrentWeather"
import { FavoriteButton } from "@/components/favoriteButton"
import HourlyTemp from "@/components/houely-temperture"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import WeatherDetails from "@/components/WeatherDetails"
import WeatherForecast from "@/components/WeatherForecast"
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weatherapi"
import { useFavorites } from "@/hooks/useFavorite"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"



const CityPage = () =>{

   const [SearchParams] = useSearchParams()
   const params = useParams()


   const lat = parseFloat(SearchParams.get("lat") || "0")  // if lat not present return 0
   const lon = parseFloat(SearchParams.get("lon") || "0")
   const coords = {lat,lon}
   console.log('coords--',coords)

    const WeatherQuery = useWeatherQuery(coords)
    const ForcasteQuery = useForecastQuery(coords)
    
    console.log('WeatherQuery in CityPage--',WeatherQuery)
    console.log('WeatherQuery in CityPage--',ForcasteQuery)
    console.log("params--",params)

    if(ForcasteQuery.error || WeatherQuery.error){
        return (
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
                <p>failed to fetch weather data. please try again</p>
                
            </AlertDescription>
        </Alert>
        )
    }

    if(!WeatherQuery.data || !ForcasteQuery.data || !params.cityName){
            return(
                <LoadingSkeleton/>
            )
        }

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight ">{params.cityName},{WeatherQuery.data.sys.country}</h2>

            <div>
            <FavoriteButton Data={WeatherQuery.data}/>
            </div>
            
        </div>

        <div className="grid gap-6 ">
            <div className="flex flex-col  gap-2">
             {/* current weather */}
             <CurrentWeather weatherData={WeatherQuery.data} />
             {/* hourly temp takes forcast data */}
              <HourlyTemp forcastData={ForcasteQuery.data} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 items-start">
                 {/* detail  */}
                 <WeatherDetails Data={WeatherQuery.data}/>
                {/* forcaste */}
                <WeatherForecast Data={ForcasteQuery.data}/>
            </div>
        </div>
    </div>       
    )
}

export default CityPage