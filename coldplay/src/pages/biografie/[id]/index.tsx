import { Marked } from "marked";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673"
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
    console.log(`Band ${band[0].bandImage}`)
    console.log(`Bandmembers data ${bandMembersData[0].fullName}`)
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
    console.log(currentBandMember.longBio)
    return(
        <>
            <div  style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <h1>{currentBandMember.stageName}</h1>
                <p><i>{currentBandMember.fullName}</i></p>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(currentBandMember.longBio) }} style={{display: "flex", flexDirection:"column", alignItems:"center", padding:"0px 400px 0px 400px"}}/>
            </div>
        </>
    );
}