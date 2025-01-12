import { Skeleton } from "./ui/skeleton"


export const LoadingSkeleton = () =>{

    return (
        <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-10">
            <Skeleton className="h-[300px] w-full rounded-lg col-span-4"/>
            <Skeleton className="h-[300px] w-full rounded-lg col-span-6"/>
        </div>
            <div className="grid md:grid-cols-2 gap-6">
               <Skeleton className="h-[300px] w-full rounded-lg"/>
               <Skeleton className="h-[300px] w-full rounded-lg"/>
            </div>
        </div>
    )
}