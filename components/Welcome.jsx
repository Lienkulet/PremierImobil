import Link from "next/link"

const Welcome = () => {
    return (
        <div className="flex flex-col md:flex-row gap-20 items-center">
            <img src="/bunvenitimgs.png" alt="" className="w-[800px] h-[700px]" />
            <div className="md:mt-32 mt-6 flex flex-col text-center md:text-start justify-center md:items-start items-center  gap-12">
                <div className="flex flex-row items-center gap-2">
                    <h3 className="md:text-5xl text-2xl text-white font-bold">Bun venit la </h3>
                    <h3 className="text-mainOrange text-2xl md:text-5xl font-bold">PremierImobil</h3>
                </div>

                <p className="text-base text-white mb-4 max-w-[653px]">Suntem o companie imobiliară care oferă confortul de a căuta proprietăți în diferite regiuni și țări. Împreună cu agenți profesioniști, nu există un imobil pe care să nu îl poți obține.
                </p>
             <Link href='/about' className='bg-mainOrange text-matteBlack rounded-xl p-5 w-fit'>
                Mai Multe
             </Link>
            </div>
        </div>
    )
}

export default Welcome