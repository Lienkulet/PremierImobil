import Image from "next/image"
import Link from "next/link"

const Prefooter = () => {
  return (
    <section className="hidden md:flex items-center justify-center relative mt-20 mb-48">
        <img src="/prefooterimg.png" className="w-full h-[400px]" />
        <div className="absolute -bottom-2/3 py-20">
            <div className="relative bg-mainOrange rounded-2xl w-[1000px] h-[300px] flex flex-col items-center justify-center">
                <h2 className="text-2xl md:text-5xl text-matteBlack font-bold text-center">Să găsim casa de vis cu</h2>
                <h2 className="text-2xl md:text-5xl text-matteBlack font-bold text-center">PremierImobil!</h2>
                <Link href='/proprietati/apartamente' className="bg-matteBlack text-mainOrange font-medium text-lg px-6 py-2 rounded-lg mt-14">Mai Multe</Link>
                <div className="absolute bottom-14 left-10">
                    <img src='/dotsblack.svg' className="w-24 h-20" />
                </div>
                <div className="absolute -top-10 right-10">
                    <img src='/dotstverticalblack.svg' className="w-24 h-20" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Prefooter