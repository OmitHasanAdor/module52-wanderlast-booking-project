import DestinationCard from "@/components/DestinationCard";


const DestinationPage = async () => {
    const res = await fetch("http://localhost:5000/destination");
    const destination = await res.json()
    return (
        <div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 mx-auto max-w-7xl">
                {
                    destination.map(dest=>{
                        return <DestinationCard key={dest._id} dest={dest}></DestinationCard>
                    })
                }
            </div>
        </div>
    );
};

export default DestinationPage;