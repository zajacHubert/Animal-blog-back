export interface Post {
    id: string;
    title: string;
    desc: string;
    img: string;
    date: Date;
    cat: string | null;
    uid: string;
}