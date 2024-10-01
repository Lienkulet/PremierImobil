import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section>
      <div className="relative z-10">
        <img src="/headerimg2.png" className="hidden md:flex" />
        <div className="absolute top-20 w-full flex items-center justify-center">
          <h1 className="text-white text-center max-w-[700px] text-6xl font-bold ">Găsiți-vă casa <span className="text-mainOrange">visurilor</span>  astăzi !</h1>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-5 items-center justify-center -mt-64">
        <div className="flex flex-col md:flex-row gap-10 z-50">
          <Link href='/proprietati/case'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/caselogo.png' alt="case" width={70} height={70} />
            <h3 className="text-xl text-mainOrange font-light text-center">CASE</h3>
          </Link>
          <Link href='/proprietati/apartamente'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/apartamente.png' alt="case" width={40} height={40} />
            <h3 className="text-xl text-mainOrange font-light text-center">APARTAMENTE</h3>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-10  z-50">
          <Link href='/proprietati/comercial'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/BUSINESS.png' alt="comercial" width={40} height={40} />
            <h3 className="text-xl text-mainOrange font-light text-center">SPAȚII COMERCIALE</h3>
          </Link>
          <Link href='/proprietati/terenuri'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/landloo.png' alt="terenuri" width={40} height={40} />
            <h3 className="text-xl text-mainOrange font-light text-center">TERENURI</h3>
          </Link>
        </div>
      </div>

      <div className="flex md:hidden flex-col gap-0">
        <img src="/mobilehome.png" />
        <div className="bg-mainOrange p-6 -mt-28 flex flex-col gap-4">
          <h2 className="text-matteBlack text-3xl font-medium">Găsiți casa <br />perfectă aici.</h2>
          <p className="text-matteBlack font-light">Găsește-ți cu ușurință locul cu <br />ajutorul nostru.</p>
          <Link href='/contact' className="text-mainOrange font-medium text-center py-4 bg-matteBlack w-full p-2 rounded-xl">
            Contactează-ne
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHero;
