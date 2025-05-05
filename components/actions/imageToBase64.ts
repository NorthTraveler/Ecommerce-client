export const imageToBase64 = async(image: Blob) =>{
    const reader = new FileReader();
    reader.readAsDataURL(image)
    const data = await new Promise((res,rej) => {
        reader.onload = () => res(reader.result)
        reader.onerror = (error) => rej(error)
    })
    return data
}