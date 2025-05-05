import { useEffect, useState } from "react"
import ItemCard from "./ItemCard.jsx";
import { getSMGroup } from "../api/api.js"
import { fetchEuropeanaGroup } from "../api/api.js";
import MuseumLoadingMessage from "./MuseumLoadingMessage.jsx"

export default function MuseumGroupItems({isLoading, setIsLoading, setLastPage, group, currentPage, itemsPerPage, searchTerm, setAvailableFilters, searchFilters}){
  const [items, setItems] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0)
  const [isError, setIsError] = useState(false);
  const [museumGroup, setMuseumGroup] = useState(group)
  const [theme, setTheme] = useState("")
   
  useEffect(()=>{
    setIsLoading(true);
    if(museumGroup==="SMG"){
      getSMGroup(searchFilters, currentPage, itemsPerPage, searchTerm).then(
        (results) => {
        setIsLoading(false);
        setItems(results.data);
        setNumberOfResults(results.meta.count.type.all)
        setAvailableFilters(results.meta.filters)
        setLastPage(results.meta.total_pages)
        })
        .catch((err) => {
          console.log(err, "the err"), setIsError(true)
        })
      }

    if(museumGroup==="europeana"){
      if(!searchTerm){searchTerm ="*"}
      fetchEuropeanaGroup(searchFilters, currentPage, itemsPerPage, searchTerm, theme).then(
        (results) => {
        setIsLoading(false);
        setItems(results.items);
        setNumberOfResults(results.totalResults)
        setAvailableFilters(results.facets)
        if(results.totalResults >= 1000){setLastPage(1000/itemsPerPage)}
        if(results.totalResults < 1000 ){setLastPage(Math.ceil(results.totalResults/itemsPerPage))}
        })
        .catch((err) => {
          setIsError(true)
        })
      }  
  }, [currentPage, itemsPerPage, searchFilters, searchTerm])

  const itemsList = items.map(item=>
    <li aria-label={getTitle(museumGroup, item)} key={item.id}>
      <ItemCard museumGroup={museumGroup} museum={getMuseum(museumGroup, item)} type={getType(museumGroup, item)} id={getId(museumGroup, item)} description={getTitle(museumGroup, item)} thumbnail={getThumbnail(museumGroup, item)}/>
    </li>
    );

  if (isError) {
    return <>
    <p>Error</p>
    </>
  }
  
  if (isLoading) {
    return <div className="1-searchgrid o-flex-container"><MuseumLoadingMessage/></div>
  }

  return (   
    <div className="1-searchgrid o-flex-container">
      {searchTerm? <>Displaying results for {searchTerm}, found: {numberOfResults}</> :null}
      <ul className = "list-container">
        {itemsList}
      </ul>
    </div>
  )
}

function getThumbnail (museumGroup, item){
  if (museumGroup === "SMG"){
    if (item.attributes.multimedia){
      const imageLocation = item.attributes.multimedia[0]["@processed"].large.location
      return 'https://coimages.sciencemuseumgroup.org.uk/' + imageLocation
    }
  }
  if (museumGroup === "europeana"){
    if (item.edmPreview) {
      return item.edmPreview[0]
    }
  }
  return "no thumbnail"
}


function getMuseum (museumGroup, item){
  if(museumGroup === "SMG"){
    if(item.attributes.category){
    return item.attributes.category[0].museum}
  }
  if(museumGroup === "europeana"){
    if (item.dataProvider){
      return item.dataProvider[0]
    }
  }
  return "No museum information"
}

function getTitle(museumGroup, item){
  if (museumGroup === "europeana"){
    if (item.title) {return item.title[0]}
    }
  if (museumGroup === "SMG"){
    if(item.attributes.summary.title){
      return item.attributes.summary.title
    }
  }
  else return "no title information"
}

function getType(museumGroup, item){
  if (museumGroup === "SMG"){
    if (item.type){return item.type}
  }
    if (museumGroup === "europeana"){
    return "europeana"
  }
  else return "no type information"
}
  
function getId(museumGroup, item){
  if (museumGroup === "SMG" || museumGroup === "europeana"){
    return item.id;
  }
  else return "no id"
}
