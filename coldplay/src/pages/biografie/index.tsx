import { GetServerSideProps } from "next";
import Link from "next/link";

const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673";


interface BandProps{
    band: Band,
    bandMembers: BandMember[]
}

export const getServerSideProps : GetServerSideProps<BandProps> =async () => {
    //Getting band
    const responseBand = await fetch("http://localhost:1337/api/bands?populate=*", {
        headers: {
            Authorization:`Bearer ${APIToken}`
        }
    });

    const responseBandData = await responseBand.json();
    const band: Band = responseBandData.data.map((band: any) => band.attributes);
    //Getting BandMembers of chosen Band
    const bandMembersData: BandMember[] = band[0].band_members.data.map((bandMember: any) => bandMember.attributes);
    console.log(`Band ${band[0].name}`)
    console.log(`Bandmembers data ${bandMembersData[0].fullName}`)
    return{
        props: {
            band: band[0],
            bandMembers: bandMembersData
        }
    }
};

export default function BandPage({band, bandMembers}: {band: Band, bandMembers: BandMember[]}){
    console.log(band.band_members.data[0].attributes.stageName)
    console.log(bandMembers)
    console.log(band.bandImage)
    return (
        <>
            <h1>Hier komt alle info over de band</h1>
            <h2>{band.name}</h2>   
            <img src={band.bandImage} alt="" style={{height:"500px"}}/>
            <p>Met de volgende leden</p>
            <ul>
                {bandMembers.map((bandMember, index) =>(
                    <li key={index}><Link href={`/biografie/${index}`}>{bandMember.stageName}</Link></li>
                ))}         
            </ul>
        </>
    );
}