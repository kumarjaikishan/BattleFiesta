const useImageUpload = () => {
    const handleImage = async (width, imageFile) => {
        try {
            let newImageFile = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    const image = new Image();

                    image.onload = () => {
                        const canvas = document.createElement("canvas");
                        const ratio = width / image.width;
                        canvas.width = width;
                        canvas.height = image.height * ratio;
                        const context = canvas.getContext("2d");
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        
                        canvas.toBlob((blob) => {
                            const file = new File([blob], imageFile.name, { type: imageFile.type });
                            resolve(file);
                        }, imageFile.type);
                    };

                    image.src = imageUrl;
                };

                reader.onerror = (error) => {
                    reject(error);
                };
            });

            return newImageFile;
        } catch (error) {
            console.error('Error handling image:', error);
            throw error;
        }
    };

    return { handleImage };
};

export default useImageUpload;
