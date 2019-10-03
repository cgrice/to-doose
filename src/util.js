const isFacebookApp = () => {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}
  
const getImage = (file) => {
    return new Promise(
        (resolve) => {
            const reader = new FileReader()

            reader.onloadend = () => {
                const image = new Image();
                image.src = reader.result;
                image.onload = function() {
                    const w = image.width >= 700 ? 700 : image.width
                    const h = (w / image.width) * image.height
                    resolve({
                        data: reader.result,
                        width: w,
                        height: h,
                    })
                }
            }

            reader.readAsDataURL(file)
        }
    )
}

export {
    isFacebookApp,
    getImage,
}