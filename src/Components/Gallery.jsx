import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import '../imageGallery.css'

export default function Gallery(props){
    const {images} = props
    return ( 
         <ImageGallery aria-label="Gallery of images" showPlayButton={false} showFullscreenButton={false} items={images} />
);
} 