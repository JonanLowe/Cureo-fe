import { useEffect, useState, useContext } from "react"
import { getSingleItemSM, getSingleItemEU } from "../api/api.js"
import Gallery from "./Gallery.jsx";
import UserContext from "../contexts/userContext.js"
import CollectionsList from "./CollectionsList.jsx";
import {getThumbnail, getAllThumbnails, getMuseum, getTitle, getType, getId} from "../utils/utils.js"

import {useParams} from 'react-router-dom';

export default function SingleItem(){
  const {user, loggedIn} = useContext(UserContext);
  const {museumGroup, type, id} = useParams();     
  const [item, setItem] = useState({});
  const [showCollections, setShowCollections] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(()=>{
    setIsLoading(true);
    if(museumGroup==="SMG"){
      getSingleItemSM(type, id)
        .then((item) => {
          setIsLoading(false);
          setItem(item);
        })
        .catch((err)=>{
          setIsError(true)
          setErrorMsg(`Item not found`)
        })
      }
      if(museumGroup==="europeana"){
        getSingleItemEU(type, id).then((item) => {
          setIsLoading(false);
          setItem(item.object);
        })
        .catch((err)=>{
          setIsError(true)
          setErrorMsg(`Item not found`)
        })
      }  
    }, [])

  function handleShowCollections() {
    setShowCollections(!showCollections)        
  }

  if (isError) {
    return <>
      <p>{errorMsg}</p>
    </>
  }

  if (isLoading) {
    return <>
      <p>loading...</p>
    </>
  }
    
  let title = ""
  let description = ""
    
  if (museumGroup === "europeana") {
    if (item.title) {title = item.title}
    else if (item.proxies[1]) {
      const keys = Object.keys(item.proxies[1].dcTitle)
        if (item.proxies[1].dcTitle.en) {title=item.proxies[1].dcTitle.en[0]
        }
        else {title= item.proxies[1].dcTitle[keys][0]}
      }
      else title = "no title available"

    if (item.proxies[1]) {
      if (item.proxies[1].dcDescription){const keys = Object.keys(item.proxies[1].dcDescription);
        if (item.proxies[1].dcDescription.en) {description=item.proxies[1].dcDescription.en[0]}
       
        else {description= item.proxies[1].dcDescription[keys[0]][0]}
      }
    }       
  }
    
  if (museumGroup === "SMG"){
    item.attributes.title? title = item.attributes.title[0].value : title = "no title information";
    item.attributes.description ? description = item.attributes.description[0].value : description = "no description available";
  }

  const processedItem = {
    museumGroup: museumGroup,
    museum:getMuseum(museumGroup, item),
    type:getType(museumGroup, item),
    itemId:getId(museumGroup, item),
    description: title,
    thumbnail:getThumbnail(museumGroup, item)
    }

  return(   
    <>
      <div className="single-item">
        <h3>{title}</h3>
        {displayGallery(museumGroup, item, title)}
        <div className = "item-properties">
          <p>{description}</p>
        </div>
        {loggedIn? <>
          {"Add to collection " }
          <button className="add-to-collection-button" onClick={()=>{handleShowCollections()}}>+</button>
          {showCollections? <CollectionsList setShowCollections={setShowCollections} item={processedItem}/>:null}
          </>:null
        }
      </div>
    </> 
  )
}

function displayGallery(museumGroup, item, title){
  if (museumGroup==="SMG") {
    return (
      <>
        {item.attributes.multimedia ?
          <>
          {getAllThumbnails(museumGroup, item, title).length > 1? <Gallery images={getAllThumbnails(museumGroup, item, title)}/> : null}
          {getAllThumbnails(museumGroup, item, title).length === 1? <img src={getAllThumbnails(museumGroup, item, title)[0].thumbnail}/> : null }
          </>:<>no images available</>
        }
      </>
    )
  }
  if (museumGroup==="europeana") {
    return (
      <>
        { item.europeanaAggregation.edmPreview ? <img src={item.europeanaAggregation.edmPreview} alt={title}/>:<>no images available</>} 
      </>
    )
  }
}


// function getThumbnails (museumGroup, item, title){
//   if (museumGroup === "SMG"){ 
//     const images = item.attributes.multimedia
//     const imageLocations = []
//     images.forEach((image)=>{
//       imageLocations.push({
//           original: image["@processed"].large.location,
//           thumbnail: image["@processed"].large_thumbnail.location,
//           originalAlt: title,
//           thumbnailAlt: title
//           }
//         )
//     })
//   return imageLocations
//   }
//   if (museumGroup === "europeana"){
//     if (item.edmPreview) {
//   return item.edmPreview[0]
//   }
//   else return "no images available"
//   }
// }

// function getThumbnail (museumGroup, item){
//   if (museumGroup === "SMG"){
//     if (item.attributes.multimedia){
//       const imageLocation = item.attributes.multimedia[0]["@processed"].large.location
//       return imageLocation
//     }
//   }
//   if (museumGroup === "europeana"){
//     if (item.europeanaAggregation.edmPreview) {
//     return item.europeanaAggregation.edmPreview
//     }
//   }
//   return "no thumbnail"
// } 
  
// function getMuseum (museumGroup, item){
//   if(museumGroup === "SMG"){
//     if(item.attributes.category){
//     return item.attributes.category[0].museum}
//   }
//   if(museumGroup === "europeana"){
//     if (item.organizations){
//       return item.organizations[0].prefLabel.en[0]
//     }
//   }
//   return "No museum information"
// }
  
// function getType(museumGroup, item){
//   if (museumGroup === "SMG"){
//     if (item.type){return item.type}
//   }
//     if (museumGroup === "europeana"){
//     return "europeana"
//   }
//   else return "no type information"
// }
    
// function getId(museumGroup, item){
//   if (museumGroup === "SMG"){
//     return item.id;
//   }
//   if (museumGroup === "europeana"){      
//     return item.about;
//   }
//   else return "no id"
// }
  