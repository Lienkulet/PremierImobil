import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section>
      <img src="/homehero.png" className="hidden md:flex" />

      <div className="hidden md:flex flex-col gap-10 items-center justify-center -mt-20">
        <div className="flex flex-col md:flex-row gap-10">
          <Link href='/proprietati/case' className="bg-matteBlack h-[300px] w-[300px] flex flex-col justify-center items-center gap-4">
            <Image src='/caselogo.png' alt="case" width={100} height={100} />
            <h3 className="text-2xl text-mainOrange font-light text-center">CASE</h3>
          </Link>
          <Link href='/proprietati/apartamente' className="bg-matteBlack h-[300px] w-[300px] flex flex-col justify-center items-center gap-4">
            <Image src='/apartamente.png' alt="case" width={80} height={80} />
            <h3 className="text-2xl text-mainOrange font-light text-center">APARTAMENTE</h3>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <Link href='/proprietati/comercial' className="bg-matteBlack h-[300px] w-[300px] flex flex-col justify-center items-center gap-4">
            <Image src='/BUSINESS.png' alt="case" width={100} height={100} />
            <h3 className="text-2xl text-mainOrange font-light text-center">SPAȚII COMERCIALE</h3>
          </Link>
          <Link href='/proprietati/terenuri' className="bg-matteBlack h-[300px] w-[300px] flex flex-col justify-center items-center gap-4">
            <Image src='/landloo.png' alt="case" width={100} height={100} />
            <h3 className="text-2xl text-mainOrange font-light text-center">TERENURI</h3>
          </Link>
        </div>
      </div>

      <div className="flex md:hidden flex-col gap-0">
        <img src="/mobilehome.png" />
        <div className="bg-mainOrange p-6 -mt-28 flex flex-col gap-4">
          <h2 className="text-matteBlack text-3xl font-medium">Găsiți casa <br />perfectă aici.</h2>
          <p className="text-matteBlack font-light">Găsește-ți cu ușurință locul cu <br />ajutorul nostru.</p>
          <Link href='/contact' className="text-mainOrange font-medium text-center py-4 bg-matteBlack w-full p-2">
            Contactează-ne
          </Link>
        </div>

      </div>
    </section>
  )
}

export default HomeHero