import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section>
      {/* Desktop Hero Image Section */}
      <div className="relative z-10 hidden md:flex">
        <img src="/herohome.jpeg" className="hidden md:flex w-full" />
        <div className="absolute top-20 w-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-center max-w-[700px] text-6xl font-bold ">
            Găsiți-vă casa <span className="text-mainOrange">visurilor</span> astăzi !
          </h1>
          <p className="text-white text-center text-lg">
            Explorați o gamă largă de proprietăți adaptate stilului dvs. de viață și bugetului dvs.
          </p>
        </div>
      </div>

      {/* Property Categories for Desktop */}
      <div className="hidden md:flex flex-col gap-5 items-center justify-center -mt-64">
        <div className="flex flex-col md:flex-row gap-10 z-50">
          <Link href='/proprietati/case'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/caselogo.png' alt="case" width={70} height={70} />
            <h3 className="text-xl text-mainOrange font-light text-center">CASE</h3>
          </Link>
          <Link href='/proprietati/apartamente'
            className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[200px] w-[200px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
            <Image src='/apartamente.png' alt="apartamente" width={40} height={40} />
            <h3 className="text-xl text-mainOrange font-light text-center">APARTAMENTE</h3>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-10 z-50">
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

      {/* Mobile-Specific Content */}
      <div className="relative md:hidden flex flex-col">
        {/* Image for Mobile */}
        <img src="/mobilehome.png" className="w-full m-0 p-0" />

        {/* Buttons placed over the image with adjusted positioning */}
        <div className="absolute inset-x-0 top-16 flex flex-col justify-center items-center z-10">
          <div className="grid grid-cols-2 gap-5">
            <Link href='/proprietati/case'
              className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[150px] w-[150px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
              <Image src='/caselogo.png' alt="case" width={70} height={70} />
              <h3 className="text-xl text-mainOrange font-light text-center">CASE</h3>
            </Link>
            <Link href='/proprietati/apartamente'
              className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[150px] w-[150px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
              <Image src='/apartamente.png' alt="apartamente" width={40} height={40} />
              <h3 className="text-xl text-mainOrange font-light text-center">APARTAMENTE</h3>
            </Link>
            <Link href='/proprietati/comercial'
              className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[150px] w-[150px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
              <Image src='/BUSINESS.png' alt="comercial" width={40} height={40} />
              <h3 className="text-xl text-mainOrange font-light text-center">SPAȚII COMERCIALE</h3>
            </Link>
            <Link href='/proprietati/terenuri'
              className="bg-matteBlack duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white h-[150px] w-[150px] flex flex-col justify-center items-center gap-4 rounded-xl transition-transform">
              <Image src='/landloo.png' alt="terenuri" width={40} height={40} />
              <h3 className="text-xl text-mainOrange font-light text-center">TERENURI</h3>
            </Link>
          </div>
        </div>

        {/* Call to action below the image */}
        <div className="bg-mainOrange p-6 flex flex-col gap-4 -mt-[6rem]">
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
