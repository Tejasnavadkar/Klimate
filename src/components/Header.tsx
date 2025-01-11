import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"



export const Header = () =>{

  const {theme,setTheme} = useTheme()

  const isDark = theme === 'dark'

    return (
        <header className="sticky top-0 z-50 backdrop-blur border-b bg-background/95 py-2 px-4 supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center justify-between  mx-auto h-16 px-4">
                <Link to={'/'} >
                  <img className="h-14" src={isDark ? "/logo.png" : '/logo2.png'} alt="" />
                </Link>

                <div>
                    {/* search */}
                    {/* theamToggle */}

                    <div onClick={()=>setTheme(isDark ? 'light' : 'dark')} className={`flex cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0' } `} >
                        {isDark ? <Sun className="h-6 w-6 text-yellow-300 rotate-0"/> : <Moon className="h-6 w-6 text-blue-500 rotate-0 " />}                       
                    </div>

                </div>
            </div>
        </header>
    )
}