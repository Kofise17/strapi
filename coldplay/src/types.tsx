interface Author {
    firstname: string,
    lastname: string,
    email: string,
    shortBio: string,
    posts: Post[]
}

interface Post {
    title: string,
    content: string,
    author: Author,
    previewText: string
}

interface Album {
    title: string,
    releaseYear: string,
    label: Label

}

interface Label {
    name: string,
    albums: Album[],
    singles: Single[],
    videos: Video[]
}

interface Single {
    title: string,
    label: Label,
    releaseYear: string
}

interface Video {
    title: string,
    label: Label,
    url: string,
    releaseYear: string
}

interface Band {
    name: string,
    band_members: BandMember[]
    bandImage:string,
    biography: string
}
interface BandMember{
    stageName: string,
    fullName: string,
    shortBio: string,
    longBio: string,
    bandMemberImage:string
}