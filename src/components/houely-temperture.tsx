import { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'



interface HourlyTempProps {
    forcastData: ForecastData
}



const HourlyTemp = ({ forcastData }: HourlyTempProps) => {

    // console.log('forcastData--',forcastData.list)
    const chartData = forcastData.list.slice(0, 9).map((item) => {  // 24hr chart 8 slots of 3hr
        return {
            time: format(new Date(item.dt * 1000), "ha"),  // ha means h=hour and a=am/pm
            temp: Math.round(item.main.temp),
            feels_like: Math.round(item.main.feels_like),
        }
    })
    // console.log('chartData--',chartData)

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Today's Temprature.</CardTitle>

            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    {/* ResponsiveContainer make responsive  */}
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <LineChart width={400} height={400} data={chartData}>
                            <XAxis
                                dataKey={'time'}
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false} //remove line
                            />

                            <YAxis

                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false} //remove line
                                tickFormatter={(value) => `${value}°`}
                            />

                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        // console.log('payload--',payload)
                                        return (
                                            <div className="bg-background p-2 border rounded-lg flex gap-2">

                                                <div className="flex gap-1 flex-col">
                                                    <span className="text-[0.70rem] text-muted-foreground">Temprature</span>
                                                    <span>{payload[0].value}°</span>
                                                </div>

                                                <div className="flex gap-1 flex-col">
                                                    <span className="text-[0.70rem] text-muted-foreground" >Feels Like</span>
                                                    <span>{payload[1].value}°</span>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return null
                                    }
                                }}
                            />

                            <Line
                                type={'monotone'}
                                dataKey={'temp'}
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                type={'monotone'}
                                dataKey={'feels_like'}
                                stroke="#64748b"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray={'5 5'}
                            />
                        </LineChart>
                    </ResponsiveContainer>


                </div>
            </CardContent>

        </Card>

    )
}

export default HourlyTemp