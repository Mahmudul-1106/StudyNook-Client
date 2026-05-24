import Banner from "@/components/Banner";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`)
    const featuredRooms = await res.json() 
    console.log(featuredRooms)

  return (
    <div> 
      <Banner></Banner>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {
          featuredRooms.map(room => <RoomCard key={room._id} room={room}/>)
        }
      </div>
      </div>
  );
}
