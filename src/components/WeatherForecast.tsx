import { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";


interface WeatherForecastProps {
    Data: ForecastData
}

interface DailyForcast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

const WeatherForecast = ({ Data }: WeatherForecastProps) => {
    console.log("forcasteData--", Data)

    const dailyForecast = Data.list.reduce((acc, currentForecast) => {
        const date = format(new Date(currentForecast.dt * 1000), "yyyy-mm-dd")
        console.log('dateeeeeeeeeee------------', date)

        if (!acc[date]) {
            acc[date] = {
                temp_min: currentForecast.main.temp_min,
                temp_max: currentForecast.main.temp_max,
                humidity: currentForecast.main.humidity,
                wind: currentForecast.wind.speed,
                weather: currentForecast.weather[0],
                date: currentForecast.dt,
            }

        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, currentForecast.main.temp_min)
            acc[date].temp_max = Math.max(acc[date].temp_max, currentForecast.main.temp_max)
        }

        return acc

    }, {} as Record<string, DailyForcast>) // initial value empty

    console.log("dailyForecastreduce---", dailyForecast)

    const nextDays = Object.values(dailyForecast).slice(0, 6) // convert obj into array

    console.log("nextDays---", nextDays)

    return (
        <Card>
            <CardHeader>
                <CardTitle>5-days Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    {nextDays.map((day) => {

                        return <div key={day.date} className="border rounded-lg  p-3 grid grid-cols-3 items-center">
                            <div>
                                <p className="font-bold">{format(new Date(day.date * 1000), "EEE,MM,d")}</p>
                                <p className="text-muted-foreground">{day.weather.description}</p>
                            </div>
                            <div className="flex">

                                <span className="flex items-center text-blue-500">
                                    <ArrowDown className="h-4" />
                                    <span>{Math.floor(day.temp_min)}°</span>
                                </span>
                                <span className="flex items-center text-red-500">
                                    <ArrowUp className="h-4" />
                                    <span>{Math.floor(day.temp_max)}°</span>
                                </span>

                            </div>
                            <div className="flex justify-end gap-4">
                                <span className="flex items-center gap-1">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{day.humidity}%</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Wind className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{day.wind}m/s</span>
                                </span>
                            </div>
                        </div>
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherForecast