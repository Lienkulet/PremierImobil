import Link from "next/link"

const BlogCard = ({ img, text }) => {
    return (
        <Link href='/' className="max-w-[600px] w-full h-[450px] rounded-xl bg-matteBlack ">
            <img src={img} alt="" className="rounded-bl-none rounded-br-none h-[300px]" />
            <h3 className="text-mainOrange text-3xl text-start font-bold p-4">{text}</h3>
        </Link>
    )
}

export default BlogCard