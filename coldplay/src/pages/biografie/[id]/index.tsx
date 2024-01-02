import { Marked } from "marked";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const APIToken = process.env.TOKEN
const marked = new Marked();

interface BandMemberProps {
    bandMembers: BandMember[]
}

export const getServerSideProps : GetServerSideProps<BandMemberProps> =async () => {
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
    return{
        props: {
            bandMembers: bandMembersData
        }
    }
};



export default function BandMemberBioPage({bandMembers}: {bandMembers: BandMember[]}){
    const router = useRouter();
    const currentId = parseInt(router.query.id as string);
    let currentBandMember : BandMember = bandMembers[currentId]; 
    return(
        <>
            <div  style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img src={currentBandMember.bandMemberImage} alt={currentBandMember.stageName} style={{height:"250px"}}/>
                <h1>{currentBandMember.stageName}</h1>
                <p><i>{currentBandMember.fullName}</i></p>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(currentBandMember.longBio) }} style={{display: "flex", flexDirection:"column", alignItems:"center", padding:"0px 400px 0px 400px"}}/>
            </div>
        </>
    );
}