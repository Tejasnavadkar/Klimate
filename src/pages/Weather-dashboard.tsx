import { Coordinates } from "@/api/types"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weatherapi"
import { useGeoLocation } from "@/hooks/usegeoLocation"
import { AlertCircle, AlertTriangle, MapPin, RefreshCw } from "lucide-react"



const WeatherDashboard = () => {

    const { coordinates, error: locationError, isLoading: locationLoading, getCoordinates } = useGeoLocation()  // name aliases
    
    const location = useReverseGeocodeQuery(coordinates)
    console.log('coordinates--', coordinates)
    
       
    console.log('location--',location)
    
    const handleRefresh = () => {
        getCoordinates()
        if (coordinates) {
            // refetch wheather
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
                    <Button variant={'outline'} onClick={getCoordinates} className="w-fit" >
                        <MapPin className="h-4 w-4 mr-2" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
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
                // disabled={}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
export default WeatherDashboard