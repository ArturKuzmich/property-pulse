import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            className="object-cover h-[400px] mx-auto rounded-xl]"
            alt=""
            width={1800}
            height={400}
            src={images[0]}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-end-1"
                  }`}
                >
                  <Image
                    className="object-cover h-[400px] w-full rounded-xl]"
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={img}
                    priority={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
