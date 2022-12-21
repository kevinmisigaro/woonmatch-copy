import { useEffect, useState } from "react";

export const PhotoGallery = ({ images, className, rightButton }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const displayedImages = images.length > 6 ? images.slice(0, 6) : images;
  const totalImages = images.length;
  const totalDisplayedImages = displayedImages.length;
  const hiddenImages = totalImages - totalDisplayedImages;
  const remainingImagesStartIndex = displayedImages.length;
  return (
    <div>
      <div className={`${className} grid grid-cols-6 gap-2 grid-rows-13`}>
        <GalleryImages
          images={displayedImages}
          onClick={(image: any, index: number) => {
            setImageIndex(index);
            setShowViewer(true);
          }}
        />
        <ImageViewer
          onClose={() => {
            setShowViewer(false);
          }}
          show={showViewer}
          initialIndex={imageIndex}
          images={images}
        />
      </div>
      <div className="flex justify-between text-primary mt-2">
        <div>
          {hiddenImages > 0 && (
            <button
              className="p-2"
              onClick={() => {
                setImageIndex(remainingImagesStartIndex);
                setShowViewer(true);
              }}>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/gallery.svg"
                  className="h-[18px]  xl:h-[28px] 3xl:h-[38px]"
                />
                <div>
                  Zie nog {hiddenImages} afbeelding
                  {hiddenImages > 1 ? "en" : ""}
                </div>
              </div>
            </button>
          )}
        </div>
        <div>{rightButton}</div>
      </div>
    </div>
  );
};

export const ImageViewer = ({
  show = false,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  function prev() {
    if (index != 0) {
      setIndex(index - 1);
    }
  }

  function next() {
    if (index != images.length - 1) {
      setIndex(index + 1);
    }
  }

  function close() {
    onClose();
  }

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      }  top-0 bottom-0 left-0 right-0 z-50 bg-black/95`}>
      <div className="flex relative w-full h-full">
        <div onClick={prev} className="image-viewer-button">
          <img src="/images/caret-right.svg" className="w-6 scale-[-1]" />
        </div>
        <div className="flex flex-1 m-20 xl:m-40 ">
          <div className="grid place-content-center w-full h-full">
            <img src={images[index].url} className="w-full h-full rounded-md" />
          </div>
        </div>
        <div onClick={next} className="image-viewer-button">
          <img src="/images/caret-right.svg" className="w-6" />
        </div>
        <div
          onClick={close}
          className="absolute right-0 top-0 w-20 cursor-pointer rounded-full aspect-square grid place-content-center">
          <img src="/images/close-x.svg" />
        </div>
        <div className="absolute right-0 bottom-0 left-0 h-7 rounded-full  text-center">
          {index + 1} of {images.length}
        </div>
      </div>
    </div>
  );
};

const GalleryImages = ({ images, onClick }) => {
  function getClasses(total: number, index: number) {
    switch (total) {
      case 6:
        return index == 0
          ? "col-span-4 row-start-6 row-span-8"
          : index >= 1 && index <= 3
          ? "col-span-2 row-span-5"
          : "col-span-2 row-span-4";

      case 5:
        return index == 0
          ? "col-span-4 row-start-6 row-span-8"
          : index >= 1 && index <= 2
          ? "col-span-3 row-span-5"
          : "col-span-2 row-span-4";
      case 4:
        return index == 0
          ? "col-span-6 row-start-5 row-span-9"
          : "col-span-2 row-span-4";

      case 3:
        return index == 0
          ? "col-span-6 row-start-6 row-span-8"
          : "col-span-3 row-span-5";

      case 2:
        return index == 0
          ? "col-span-6 row-start-6 row-span-8"
          : "col-span-6 row-span-5";

      case 1:
        return "col-span-6 row-span-13";
    }
  }

  return images.map((image, index: number) => (
    <GalleryImage
      key={index}
      image={image}
      onClick={() => {
        onClick(image, index);
      }}
      className={getClasses(images.length, index)}
    />
  ));
};

const GalleryImage = ({ image, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-300 border-tertiary hover:border-2 ransform-all duration-300 grid place-content-center rounded-md w-full overflow-hidden  ${className} `}>
      <img
        src={image.url}
        alt={image.description}
        className="w-full h-full rounded-md scale-[1.2] hover:scale-[1.3] cursor-pointer transform-all duration-300 ease-in"
      />
    </div>
  );
};
