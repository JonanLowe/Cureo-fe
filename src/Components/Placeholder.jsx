
export default function Placeholder({text}){
    return(
    <section aria-label="no image available" className = "placeholder-image">
       <img src="/assets/gradient.jpg" alt={text} className="thumbnail"></img>
       <div className="overlay-text">{text}</div>
    </ section>
    )

}