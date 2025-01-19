
import CurrentWeather from "@/components/CurrentWeather"
import HourlyTemp from "@/components/houely-temperture"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/WeatherDetails"

import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weatherapi"
import { useGeoLocation } from "@/hooks/usegeoLocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"



const WeatherDashboard = () => {

    const { coordinates, error: locationError, isLoading: locationLoading, getCoordinates } = useGeoLocation()  // name aliases
    
    const locationQuery = useReverseGeocodeQuery(coordinates)
    const WeatherQuery = useWeatherQuery(coordinates)
    const ForcasteQuery = useForecastQuery(coordinates)

    // console.log('coordinates--', coordinates)
    // console.log('locationQuery--',locationQuery)
    // console.log('WeatherQuery--',WeatherQuery)
    // console.log('ForcasteQuery--',ForcasteQuery)
    
    const handleRefresh = () => {
        getCoordinates()
        if (coordinates) {
            // refetch wheather
            locationQuery.refetch()
            WeatherQuery.refetch()
            ForcasteQuery.refetch()
        }
    }

    if (locationLoading) {
        return <LoadingSkeleton />
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                    <p>{locationError}</p>
                    <Button variant={'outline'} onClick={getCoordinates} className="w-fit">
                        <MapPin className="h-4 w-4 mr-2" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    const locationData = locationQuery?.data?.[0]
    // console.log('loc--',locationData)
    // console.log('WeatherQuery.error--',WeatherQuery.error)

    if(ForcasteQuery.error || WeatherQuery.error){
        return (
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
                <p>failed to fetch weather data. please try again</p>
                <Button variant={'outline'} onClick={handleRefresh} className="w-fit" >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                </Button>
            </AlertDescription>
        </Alert>
        )
    }

    if(!WeatherQuery.data || !ForcasteQuery.data || !locationQuery.data){
        return(
            <LoadingSkeleton/>
        )
    }


    if (!coordinates) {
        return (
            <Alert variant="destructive">

                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                    <p>Please enable location access to see your local error</p>
                    <Button variant={'outline'} onClick={getCoordinates} className="w-fit" >
                        <MapPin className="h-4 w-4 mr-2" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight ">My Location</h2>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={handleRefresh}
                    disabled={WeatherQuery.isFetching || ForcasteQuery.isFetching}
                >
                    <RefreshCw className={`h-4 w-4 ${WeatherQuery.isFetching || ForcasteQuery.isFetching ? 'animate-spin' : ''} `} />
                </Button>
            </div>

            <div className="grid gap-6 ">
                <div className="flex flex-col md:flex-row gap-2">
                 {/* current weather */}
                 <CurrentWeather weatherData={WeatherQuery.data} locationData={locationData} />
                 {/* hourly temp takes forcast data */}
                  <HourlyTemp forcastData={ForcasteQuery.data} />
                </div>

                <div>
                     {/* detail  */}
                     <WeatherDetails Data={WeatherQuery.data}/>
                    {/* forcaste */}
                </div>
            </div>
        </div>
    )
}
export default WeatherDashboard