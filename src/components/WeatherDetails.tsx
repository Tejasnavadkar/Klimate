import { WeatherData } from "@/api/types"
import { format } from "date-fns"
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface WeatherDetailsProp {

    Data: WeatherData
}


const WeatherDetails = ({ Data }: WeatherDetailsProp) => {

    const { wind, main, sys } = Data

    const FormateTime = (timeStamp: number) => {

        return format(new Date(timeStamp * 1000), " h:mm a")

    }

    console.log('winddeg--', wind.deg)

    const getWindDirection = (deg: any) => {

        // formula to calculate remender : a%b=a−b * floor(a/b)
        //eg. 30 % 360 = 30-360 * floor(30/360) = 30
        // General Rule for a % b When a < b
        // If a (the dividend) is smaller than b (the divisor), the result of a % b is simply a because there’s no full division possible, and the remainder is just the dividend.

        const Direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8 // here we mod to ensure index not cross number 8
        //((deg %= 360) < 0 ? deg + 360 : deg ) this will gaurrenty us that degree will be between 0 to 360 and by dividing it by 45 it gives chunk between 1 - 8 and based on that we get direction index
        return Direction[index]
    }

    // console.log('degree-Angle--',`${getWindDirection(wind.deg)}(${wind.deg}°)`)


    const Details = [
        {
            title: "Sunrise",
            value: FormateTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: FormateTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)}(${wind.deg}°)`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {Details.map((detail)=>{
                        return <div className="border rounded-lg p-4 flex gap-2 items-center">
                            <detail.icon className={`h-5 ${detail.color} `}/>
                            <div>
                                <div className="text-sm leading-tight font-bold ">{detail.title}</div>
                                <div className="text-sm text-muted-foreground leading-tight">{detail.value}</div>
                            </div>
                        </div>
                    })}
                </div>
            </CardContent>
        </Card>

    )
}

export default WeatherDetails