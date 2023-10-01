import { useEffect, useRef } from "react"

export default function UploadWidget() {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect (() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:"healthtech", //nuestra nube
            uploadPreset: "otiod5ve", //preselector de subidas (incluye info de como se sube todo)
            folder: 'healthtech/products', //folder products
            multiple: false, //permite solo subir un archivo
            maxImageFileSize: 2000000, //peso maximo: 2 megas,
            maxImageWidth: 2000, //reescala la imagen a 2000px , si es muy grande
            cropping: true //le permite recortar la imagen de ser necesario
        },function(err,res){         
        if (!err && res && res.event === "success") {
          console.log("Done! Here is the image info: ", res.info.url)
        } ;
    })
    },[])
    return (
            /* Denme estilos, soy un monstruo :(  */
            <button onClick={()=> widgetRef.current.open() }>
            </button>
            )
};