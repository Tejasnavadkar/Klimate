
// 

// Q-can i create same logic but withaout TanStack Query with just react 
// Key Changes Without TanStack Query
// Replace useQuery and useMutation with:

// useState: To store the search history and locations.
// useEffect: To fetch data or synchronize with localStorage.
// Custom Functions: For adding, updating, and clearing data.
// Use localStorage directly to persist the search history.

// Step-by-Step Implementation
// 1. CitySearch Component
// The CitySearch component will be similar but without TanStack Query.

// Key differences:

// Use fetch or axios to fetch locations.
// Call custom functions to handle the history.
// Here’s the updated component:


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
// import { Button } from "./ui/button";
// import { XCircle } from "lucide-react";

// const CitySearch = () => {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [history, setHistory] = useState(() => {
//     const storedHistory = localStorage.getItem("Search-History");
//     return storedHistory ? JSON.parse(storedHistory) : [];
//   });
//   const navigate = useNavigate();

//   // Fetch location suggestions
//   useEffect(() => {
//     if (query.length < 2) {
//       setLocations([]);
//       return;
//     }
//     setIsLoading(true);
//     fetch(`https://api.weatherapi.com/v1/search.json?key=YOUR_API_KEY&q=${query}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setLocations(data || []);
//         setIsLoading(false);
//       })
//       .catch(() => {
//         setLocations([]);
//         setIsLoading(false);
//       });
//   }, [query]);

//   // Add to history
//   const addToHistory = (city) => {
//     const [lat, lon, name, country] = city.split("|");
//     const newEntry = {
//       id: `${lat}-${lon}-${Date.now()}`,
//       query,
//       lat: parseFloat(lat),
//       lon: parseFloat(lon),
//       name,
//       country,
//       searchedAt: Date.now(),
//     };

//     const filteredHistory = history.filter(
//       (item) => item.lat !== newEntry.lat || item.lon !== newEntry.lon
//     );
//     const updatedHistory = [newEntry, ...filteredHistory].slice(0, 10);

//     setHistory(updatedHistory);
//     localStorage.setItem("Search-History", JSON.stringify(updatedHistory));
//   };

//   // Clear history
//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("Search-History");
//   };

//   const handleSelect = (city) => {
//     addToHistory(city);
//     const [lat, lon, name] = city.split("|");
//     setOpen(false);
//     navigate(`/city/${name}/?lat=${lat}&lon=${lon}`);
//   };

//   return (
//     <>
//       <Button onClick={() => setOpen(true)} variant="outline" className="px-6 relative">
//         Search City...
//       </Button>
//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <CommandInput
//           placeholder="Type a command or search..."
//           value={query}
//           onValueChange={setQuery}
//         />
//         <CommandList>
//           {query.length < 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}
//           {history.length > 0 && (
//             <>
//               <CommandSeparator />
//               <CommandGroup>
//                 <div className="flex justify-between mb-2 items-center">
//                   <p>Recent Searches...</p>
//                   <Button variant="outline" onClick={clearHistory}>
//                     <XCircle className="h-6" />
//                     Clear
//                   </Button>
//                 </div>
//                 {history.map((location) => (
//                   <CommandItem
//                     key={location.id}
//                     value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
//                     onSelect={handleSelect}
//                   >
//                     {`${location.name}, ${location.country}`}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </>
//           )}
//           <CommandSeparator />
//           {locations.length > 0 && (
//             <CommandGroup heading="Suggestions">
//               {locations.map((location) => (
//                 <CommandItem
//                   key={location.lat + location.lon}
//                   value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
//                   onSelect={handleSelect}
//                 >
//                   {`${location.name}, ${location.state || ""}, ${location.country}`}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           )}
//         </CommandList>
//       </CommandDialog>
//     </>
//   );
// };

// export default CitySearch;


// . Key Changes
// Fetching Locations:

// Replaced useQuery with fetch inside useEffect.
// Managing History:

// Replaced useMutation with:
// setHistory for state updates.
// localStorage.setItem for persistence.
// Clearing History:

// Directly updated state and removed the localStorage item.
// Advantages of This Approach
// Simple: No external dependencies.
// Explicit: All data-fetching and state-management logic is visible.
// Challenges Without TanStack Query
// Manual Caching:

// You must handle caching logic (e.g., syncing history between components).
// Code Complexity:

// You write more boilerplate for fetching, state management, and error handling.
// No Automatic Updates:

// React Query automatically keeps data fresh; without it, you need to manually handle re-fetching.
// When to Avoid TanStack Query
// Small projects with simple state management.
// Minimal data-fetching requirements.
// For larger apps with complex state, TanStack Query simplifies things by providing automatic caching, synchronization, and updates.


