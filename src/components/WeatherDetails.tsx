import { WeatherData } from "@/api/types"
import { format } from "date-fns"
import { Sunrise, Sunset } from "lucide-react"

interface WeatherDetailsProp{

    Data:WeatherData
}


const WeatherDetails = ({Data}:WeatherDetailsProp) =>{

    const {wind,main,sys} = Data 
    
    const FormateTime = (timeStamp:number) =>{

        return format(new Date(timeStamp * 1000) ," h:mm a")

    }

    console.log('winddeg--',wind.deg)
    const getWindDirection = (deg:any) =>{

        const Direction = ["N","NE","E","SE","S","SW","W","NW"]

        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg )/45) % 8 

        return Direction[index]
    }

    // console.log('degree-Angle--',`${getWindDirection(wind.deg)}(${wind.deg}°)`)
    
    
    const Details = [
        {
            title:"Sunrise",
            value:FormateTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title:"Sunset",
            value:FormateTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title:"Wind Direction",
            value:`${getWindDirection(wind.deg)}(${wind.deg}°)`,
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title:"Pressure",
            value:FormateTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        }
    ]

    return (
        <div>
          WeatherDetails
        </div>
    )
}

export default WeatherDetails