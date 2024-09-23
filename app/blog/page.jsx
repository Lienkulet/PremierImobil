import BlogCard from '@/components/BlogCard'
import React from 'react'

const Blog = () => {
  return (
<section className="flex flex-col">
      <div className="container">
        <img src="/abouthero.png" alt="" className="w-full md:h-[400px] h-[350px]" />
        <div className='flex flex-wrap items-center gap-6 justify-between bg-lightGrey p-10'>
          <BlogCard img="/abouthero.png" text="Ce trebuie să știi înainte de a cumpăra sau vinde un teren în Moldova?" id={1} />
          <BlogCard img="/abouthero.png" text="Actele necesare pentru a vinde o proprietate: Ghid complet conform legislației Moldovei" id={2}/>
          <BlogCard img="/abouthero.png" text="Drepturile și obligațiile proprietarilor de locuințe: Ce prevede Codul civil al Republicii Moldova?" id={3}/>
          <BlogCard img="/abouthero.png" text="Drumurile și infrastructura locală: Cum influențează accesibilitatea asupra valorii unei proprietăți?" id={4}/>
          <BlogCard img="/abouthero.png" text="Protecția consumatorilor în tranzacțiile imobiliare: Ce drepturi ai conform Codului protecției consumatorilor?
" id={5}/>
        </div>
        </div>      
    </section>
  )
}

export default Blog