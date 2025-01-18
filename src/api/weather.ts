import { API_CONFIG } from "./config"
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types"


class WeatherAPI{     // to create private functions 

    private createUrl(endpoint:string,params:Record<string,string | number>){  // this function will create url

        const searchParams = new URLSearchParams({  // this is class that used to handle query params (&,&) like this appid=my-api-key&lat=18.512&lon=73.8359&units=metric
            appid:API_CONFIG.API_KEY,
            ...params
        })

        return `${endpoint}?${searchParams.toString()}`

    }

    private async fetchData<T>(url:string):Promise<T>{
        
        const response = await fetch(url)

        if(!response.ok){
            throw Error(`weather api error: ${response.statusText}`)
        }

        return response.json()

    }

   async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{

    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
        lat:lat.toString(),
        lon:lon.toString(),
        units:API_CONFIG.DEFAULT_PARAMS.units,  // With units=metric: Temperatures are returned in Celsius. otherwise return in kelvin
    })
     return this.fetchData<WeatherData>(url)
    }

  
    async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{

        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        })
         return this.fetchData<ForecastData>(url)
        }


        async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{

            const url = this.createUrl(`${API_CONFIG.GEO}/reverse`,{
                lat:lat.toString(),
                lon:lon.toString(),
                limit:1
            })
             return this.fetchData<GeocodingResponse[]>(url)
            }

}

export const weatherAPI = new WeatherAPI()  // create instanse to access the methods all over code