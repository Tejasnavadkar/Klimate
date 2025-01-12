import { Coordinates } from "@/api/types"
import { useEffect, useState } from "react"

interface GeoLocationState {
    isLoading: boolean,
    error: string | null,
    coordinates: Coordinates | null
}

export const useGeoLocation = () => {
    const [locationData, setLocationData] = useState<GeoLocationState>({
        isLoading: false,
        error: null,
        coordinates: null
    })


    const getCoordinates = () => {
        setLocationData((prev) => {  // is this right
            return {
                ...prev,
                isLoading: true,
            }
        })

        if (!navigator.geolocation) {
            setLocationData({  //or this is right
                isLoading: false,
                error: "Your browser does not support geolocation.",
                coordinates: null
            })
            return
        }


        navigator.geolocation.getCurrentPosition((position) => {
                setLocationData({
                    isLoading:false,
                    error:null,
                    coordinates:{
                        lat:position.coords.latitude,
                        lon:position.coords.longitude
                    }
                })
        },(error)=>{
            let errorMsg:string

            switch(error.code) {

                case error.PERMISSION_DENIED:
                    errorMsg ='Location permission is denied. please enable location access.'
                    break;

                case error.POSITION_UNAVAILABLE:
                    errorMsg ='Location information is unavailable.'
                    break;

                case error.TIMEOUT:
                    errorMsg ='Location request timed out.'
                    break;

                default:
                    errorMsg ='An unknown error occured.'
            }

            setLocationData({
                coordinates:null,
                error:errorMsg,
                isLoading:false
            })
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        })

    }

    useEffect(() => {
        getCoordinates()
    }, [])

    return {
        ...locationData,
        getCoordinates,
        

    }
}