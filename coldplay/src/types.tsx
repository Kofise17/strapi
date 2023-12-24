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
    author: Author
}

interface Album {
    title: string,
    releaseYear: string,
    label: Label

}

interface Label {
    name: string,
    albums: Album[]
}