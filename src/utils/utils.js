
export function getAllThumbnails (museumGroup, item, title){
    if (museumGroup === "SMG"){ 
      const images = item.attributes.multimedia
      const imageLocations = []
      images.forEach((image)=>{
        imageLocations.push({
            original: image["@processed"].large.location,
            thumbnail: image["@processed"].large_thumbnail.location,
            originalAlt: title,
            thumbnailAlt: title
            }
          )
      })
    return imageLocations
    }
    if (museumGroup === "europeana"){
      if (item.edmPreview) {
    return item.edmPreview[0]
    }
    else return "no images available"
    }
  }
  
  export function getThumbnail (museumGroup, item){
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
      if (item.europeanaAggregation.edmPreview) {
      return item.europeanaAggregation.edmPreview
      }
    }
    return "no thumbnail"
  } 
    
  export  function getMuseum (museumGroup, item){
    if(museumGroup === "SMG"){
      if(item.attributes.category){
      return item.attributes.category[0].museum}
    }
    if(museumGroup === "europeana"){
      if (item.dataProvider){
        return item.dataProvider[0]
        }
      if (item.organizations){
        return item.organizations[0].prefLabel.en[0]
      }
    }
    return "No museum information"
  }

  export  function getTitle(museumGroup, item){
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
    
  export  function getType(museumGroup, item){
    if (museumGroup === "SMG"){
      if (item.type){return item.type}
    }
      if (museumGroup === "europeana"){
      return "europeana"
    }
    else return "no type information"
  }
      
  export function getId(museumGroup, item){
    if (museumGroup === "SMG"){
      return item.id;
    }
    if (museumGroup === "europeana"){      
      return item.id;
    }
    else return "no id"
  }