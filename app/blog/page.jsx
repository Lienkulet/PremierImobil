import BlogCard from '@/components/BlogCard'
import React from 'react'

const Blog = () => {
  return (
<section className="flex flex-col">
      <div className="container">
        <img src="/abouthero.png" alt="" className="w-full md:h-[400px] h-[350px]" />
        <div className='flex flex-wrap items-center gap-6 justify-between bg-lightGrey p-10'>
          <BlogCard img="/abouthero.png" text="5 cele mai confortabile zone pentru spațiu de locuit din Chișinău" />
          <BlogCard img="/abouthero.png" text="5 cele mai confortabile zone pentru spațiu de locuit din Chișinău" />
          <BlogCard img="/abouthero.png" text="5 cele mai confortabile zone pentru spațiu de locuit din Chișinău" />
          <BlogCard img="/abouthero.png" text="5 cele mai confortabile zone pentru spațiu de locuit din Chișinău" />
          <BlogCard img="/abouthero.png" text="5 cele mai confortabile zone pentru spațiu de locuit din Chișinău" />
        </div>
        </div>      
    </section>
  )
}

export default Blog