import { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

interface CurrentWeatherProps {
    weatherData: WeatherData,
    locationData?: GeocodingResponse
}

const CurrentWeather = ({ weatherData, locationData }: CurrentWeatherProps) => {

    const {
        weather: [CurrentWeather],
        main: { temp, temp_min, temp_max, humidity, feels_like },
        wind: { speed }
    } = weatherData

    const roundTemp = (temp: number) => {

        return `${Math.round(temp)}°`
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <div className="grid md:grid-cols-2">
                        <div className="flex gap-5">
                            <div>
                                <div className="items-center my-4">
                                    <div className="flex items-center gap-1">
                                        <div className="font-bold text-2xl">{locationData?.name},</div>
                                        <div className="text-muted-foreground text-sm self-end">{locationData?.state}</div>
                                    </div>

                                    <div className="text-muted-foreground text-xs mt-3">{locationData?.country}</div>

                                </div>

                                <div className="flex gap-2">
                                    <div>
                                        <div className="font-bold text-7xl">{roundTemp(temp)}</div>
                                        <div className="flex gap-2 items-center mt-3">
                                            <div> <Droplets className="h-4 w-4 text-blue-500" /></div>
                                            <div>
                                                <div className="font-semibold text-xs">Humidity</div>
                                                <div className="text-muted-foreground text-xs">{humidity}%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-sm " >Feels like {roundTemp(feels_like)}</div>
                                        <div className="flex gap-2">
                                            <span className="text-xs flex items-center text-blue-500 ">
                                                <ArrowDown className="h-3 w-3" />
                                                <span>{roundTemp(temp_min)}</span>
                                            </span>
                                            <span className="text-xs flex items-center text-red-500  ">
                                                <ArrowUp className="h-3 w-3" />
                                                <span>{roundTemp(temp_max)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex h-full items-end">
                                <div className="flex gap-1 items-center">
                                    <div>
                                        <Wind className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-xs">wind speed</div>
                                        <div className="text-muted-foreground text-xs">{speed} m/s</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className=" relative h-full w-full max-w-[200px] ">
                                <img src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                                    alt={CurrentWeather.description}
                                    className="w-full h-full object-contain"
                                />
                                <div className=" absolute bottom-0 text-center w-full ">
                                    <p>
                                        {CurrentWeather.description}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default CurrentWeather