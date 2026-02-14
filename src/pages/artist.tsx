import { useParams } from "react-router-dom";

export default function ArtistPage (){

const {artistId} = useParams();

return (
    <div>{artistId}</div>
)
}