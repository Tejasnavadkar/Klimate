import { Coordinates } from "@/api/types"
import { weatherAPI } from "@/api/weather"
import { useQuery } from "@tanstack/react-query"


export const WEATHER_KEY = {
    weather:(coords:Coordinates)=> ["weather",coords] as const,
    forcaste:(coords:Coordinates)=> ["forcaste",coords] as const,
    location:(coords:Coordinates) => ["location",coords] as const,
} as const  // so not changed further

export const useWeatherQuery = (Coordinates:Coordinates) =>{

  return useQuery({
        queryKey:WEATHER_KEY.weather(Coordinates ?? {lat:0,lon:0}),
        queryFn:()=> Coordinates ? weatherAPI.getCurrentWeather(Coordinates) : null,
        enabled:!!Coordinates // if coordinates absent then set default false
    })

}

export const useForecastQuery = (Coordinates:Coordinates) =>{

  return useQuery({
        queryKey:WEATHER_KEY.forcaste(Coordinates ?? {lat:0,lon:0}),
        queryFn:()=> Coordinates ? weatherAPI.getForecast(Coordinates) : null,
        enabled:!!Coordinates
    })
}

export const useReverseGeocodeQuery = (Coordinates:Coordinates) =>{

    if (Coordinates?.lat === 0 || Coordinates?.lon === 0) {
        console.log('Invalid coordinates:', Coordinates);
    } else {
        console.log('Valid coordinates:', Coordinates);
    }

   return useQuery({
        queryKey:WEATHER_KEY.location(Coordinates ?? {lat:0,lon:0}),
        // queryFn:()=> Coordinates ? weatherAPI.reverseGeocode(Coordinates) : null,
        queryFn: async () => {
            console.log('hii')
            if (Coordinates) {
                console.log('hii22')
                try {
                    console.log('hii3333333')
                    const result = await weatherAPI.reverseGeocode(Coordinates);
                    console.log('hii44444444444') // controll not reach here
                    console.log('Reverse geocode result:', result); // Check the actual result here
                    return result; // Ensure it is returned correctly
                } catch (error) {
                    console.error('Error in reverseGeocode:', error);
                    return null; // Return null or an empty object if there was an error
                }
            }
            
            return null;
        },
        enabled:!!Coordinates
    })
}



// export const useWeatherQuery = (coordinates:Coordinates) =>{
//     useQuery({
//         queryKey:WEATHER_KEY.weather(coordinates ?? {lat:0,lan:0}),
//         queryFn:()=> coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
//         enabled: !!coordinates, // if coordinates absent then set default false
//     })
// }