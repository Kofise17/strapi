import { Marked } from "marked";
import {  GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

const APIToken = process.env.TOKEN
const marked = new Marked();

interface Paths extends ParsedUrlQuery{
    id: string
}

export const getStaticPaths : GetStaticPaths<Paths> = async () => {
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
    
        const paths = responseBandMembersData.data.map((bandMember:any) => ({
            params: {id: bandMember.id.toString()},
        }));
        return {
            paths: paths,
            fallback: false
        }
}


interface BandMemberProps {
    bandMembers: BandMember
}

export const getStaticProps : GetStaticProps<BandMemberProps, Paths> =async (context) => {
    try{
            //Getting band
    const responseBandMembers = await fetch (`http://localhost:1337/api/band-members/${context.params?.id}`, {
        headers: {
            Authorization:`Bearer ${APIToken}`
        }
    });

    const responseBandMemberData = await responseBandMembers.json();
    const bandMember : BandMember = {
        stageName: responseBandMemberData.data.attributes.stageName,
        fullName: responseBandMemberData.data.attributes.fullName,
        shortBio: responseBandMemberData.data.attributes.shortBio,
        longBio: responseBandMemberData.data.attributes.longBio,
        bandMemberImage:responseBandMemberData.data.attributes.bandMemberImage
    };

    //Getting BandMembers of chosen Band
    return{
        props: {
            bandMembers: bandMember
        }
    }
    } catch(error){
        return {
            notFound: true // Return 404 page in case of an error
        };
    }
};



export default function BandMemberBioPage({bandMembers}: BandMemberProps){
    return(
        <>
            <div  style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img src={bandMembers.bandMemberImage} alt={bandMembers.stageName} style={{height:"250px"}}/>
                <h1>{bandMembers.stageName}</h1>
                <p><i>{bandMembers.fullName}</i></p>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(bandMembers.longBio) }} style={{display: "flex", flexDirection:"column", alignItems:"center", padding:"0px 400px 0px 400px"}}/>
            </div>
        </>
    );
}