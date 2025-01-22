import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage"


interface SearchHistoryItem{
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number; // searching time
}


export const useSearchHistory = () =>{
    // here useLocalStorage returns storedValue and setStoredValue but here we just rename it to History and setHistory
     const [History,setHistory] = useLocalStorage<SearchHistoryItem[]>("Search-History",[])  // here we pass empty initail value
   const queryClient = useQueryClient()
     // now lets define useQuery to manage our search history

    const HistoryQuery = useQuery({ // ye Query History return karega
        queryKey:["Search-History"],
        queryFn:()=>History, // return history after updating/setHistory,
        initialData:History 
     })

     // now after that we craete mutations to addHistory,removeHistory

     const addToHistory = useMutation({
        mutationFn: async (search:Omit<SearchHistoryItem,"id"|"searchedAt">)=>{  // this fn accept searched item here Omit<> meanse ignore id&searchedAt from interface type coz id and searchedAt we create at runtime
            
            const newSearch:SearchHistoryItem = { // create object of searched item
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now()
            }

            // check duplicate history
           const filteredHistory = History.filter((item)=> !(item.lat === search.lat && item.lon === search.lon)) // not get duplicates get so dont set same historry again

           const newHistory = [newSearch,...filteredHistory].slice(0,10) // only get first 10 searches

           setHistory(newHistory) // here we set to localstorage
           return newHistory
        },
        onSuccess:async (newHistory)=>{  // this basicaaly override preveous data so first of all create queryclient
            queryClient.setQueryData(["Search-History"],newHistory) // means Search-History ko overrride karo newHistory se
        }
     })

     const clearHistory = useMutation({
        mutationFn:async ()=>{
            setHistory([])
            return []
        },
        onSuccess:()=>{
            queryClient.setQueryData(["Search-History"],[]) // same just overide with []
        }
     })

     return {
        History:HistoryQuery.data??[], //if HistoryQuery not then pass []
        addToHistory,
        clearHistory
     }
}