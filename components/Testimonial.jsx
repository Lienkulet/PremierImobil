import Image from "next/image"

const Testimonial = ({ name, location, text }) => {
    return (
        <div className="flex flex-col items-start justify-between px-7 py-10 bg-matteBlack md:h-[400px] md:w-[320px] rounded-xl">
            <div>
                <h3 className="text-mainOrange text-lg">{name}</h3>
                <h3 className="text-white text-sm">{location}</h3>
                <p className="text-white text-base my-5">{text}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Image src='/star.svg' alt="star" width={16} height={16} />
                <Image src='/star.svg' alt="star" width={16} height={16} />
                <Image src='/star.svg' alt="star" width={16} height={16} />
                <Image src='/star.svg' alt="star" width={16} height={16} />
                <Image src='/star.svg' alt="star" width={16} height={16} />
            </div>
        </div>
    )
}

export default Testimonial