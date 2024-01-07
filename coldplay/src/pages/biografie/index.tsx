import { Marked } from "marked";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";

const APIToken = process.env.TOKEN;


interface BandProps{
    band: Band,
    bandMembers: BandMember[]
}

export const getStaticProps : GetStaticProps<BandProps> =async () => {
    //Getting band
    const responseBand = await fetch("http://localhost:1337/api/bands?populate=*", {
        headers: {
            Authorization:`Bearer ${APIToken}`
        }
    });

    const responseBandData = await responseBand.json();
    let bands: Band[] = [];
    //getting bandmembers
    const responseBandMembers = await fetch ("http://localhost:1337/api/band-members", {
        headers: {
            Authorization:`Bearer ${APIToken}`
        }
    });
    const responseBandMembersData = await responseBandMembers.json();
    let bandMembers: BandMember[] = [];

    if (responseBandMembersData && responseBandMembersData.data && responseBandMembersData.data.length > 0) {
        bandMembers = responseBandMembersData.data.map((bandMemberData: any) => {
            const bandMember: BandMember = {
                stageName: bandMemberData.attributes.stageName,
                fullName: bandMemberData.attributes.fullName,
                shortBio: bandMemberData.attributes.shortBio,
                longBio: bandMemberData.attributes.longBio,
                bandMemberImage:bandMemberData.attributes.bandMemberImage
            };
            return bandMember;
        });
    }

    if (responseBandData && responseBandData.data && responseBandData.data.length > 0) {
        bands = responseBandData.data.map((bandData: any)=> {
            const band: Band = {
                name: bandData.attributes.name,
                band_members: bandMembers,
                bandImage:bandData.attributes.bandImage,
                biography: bandData.attributes.biography
            };
            return band;
        })
    }
    //Getting BandMembers of chosen Band
    return{
        props: {
            band: bands[0],
            bandMembers: bands[0].band_members
        }
    }
};

export default function BandPage({band, bandMembers}: {band: Band, bandMembers: BandMember[]}){
    const marked = new Marked();
    return (
        <>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h1>{band.name}</h1>   
                <img src={band.bandImage} alt="" style={{width:"500px"}}/>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(band.biography) }} style={{display:"flex", flexDirection:"column" , alignItems:"center", width:"1200px"}}/>
                <h2>Met de volgende leden</h2>
                <ul style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
                    {bandMembers.map((bandMember, index) =>(
                        <div key={index} style={{display: "flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                            <Link href={`/biografie/${index + 1}`}>
                                <img src={bandMember.bandMemberImage} alt="" style={{height:"200px"}}/>
                            </Link>
                            <div style={{padding: "2px 16px 5px 20px", borderRadius:"5px", }}>
                                <li key={index} style={{listStyleType:"none"}}><Link href={`/biografie/${index}`} style={{ textDecoration:"none", color:"black"}}>{bandMember.stageName}</Link></li>
                                <p style={{width:"300px"}}>{bandMember.shortBio}</p>
                            </div>
                        </div>
                    ))}         
                </ul>
            </div>
        </>
    );
}