import AgentCard from "@/components/AgentCard"
import AgentSlider from "@/components/AgentSlider"
import Numbers from "@/components/Numbers"
import Questions from "@/components/Questions"
import Testimonial from "@/components/Testimonial"
import Testimonials from "@/components/Testimonials"

const About = () => {
  return (
    <section className="flex flex-col">
      <div className="container">
        <img src="/abouthero.png" alt="" className="w-full md:h-[400px] h-[350px]" />
        {/* MiSIUNEA NOASTRA  */}
        <div className="mt-28 flex flex-col">
          <header className="flex flex-col w-full justify-center items-center mb-6 md:mb-0">
            <h1 className="text-mainOrange text-3xl md:text-5xl font-bold">Misiunea Noastră</h1>
            <span className="text-textGrey">Descoperiți selecția noastră de proprietăți exclusive alese cu atenție.</span>
          </header>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <img src="/bunvenitimgs.png" alt="" className="w-[800px] h-[700px]" />
            <div className="md:mt-32 mt-6">
              <h3 className="text-xl text-mainOrange font-medium mb-10">Misiunea noastră este să oferim o casă de vis cu cele mai bune facilități posibile.</h3>
              <p className="text-base text-white mb-4">Bun venit la PremierImobil, unde visele tale imobiliare devin realitate. Cu o pasiune
                adânc înrădăcinată pentru proprietate și un angajament față de excelență, PremierImobil
                s-a impus ca un nume de încredere pe piața imobiliară. Misiunea noastră este să vă ghidăm
                prin una dintre cele mai importante decizii ale vieții - găsirea casei perfecte sau a
                investiției imobiliare. Credem că imobiliare înseamnă mai mult decât cumpărarea sau
                vânzarea de case; este vorba despre crearea de spații în care se fac amintiri, se
                construiesc viitorul și comunitățile prosperă.
              </p>
              <p className="text-base text-white">
                PremierImobil a fost întemeiat pe principiile integrității, transparenței și a unei abordări centrate pe client. De-a lungul anilor, ne-am transformat într-o agenție imobiliară cu servicii complete, oferind o gamă cuprinzătoare de servicii pentru a răspunde nevoilor diverse ale clienților noștri. Indiferent dacă sunteți un cumpărător de locuințe pentru prima dată, un investitor experimentat sau doriți să vă vindeți proprietatea, echipa noastră de profesioniști cu experiență este aici pentru a vă ajuta la fiecare pas.
              </p>
            </div>
          </div>
        </div>
        {/* Numbers  */}
        <Numbers />
        {/* VIZIUNEA NOASTRA  */}
        <div className="flex flex-col md:mt-0 mt-10">
          <header className="flex flex-col w-full justify-center items-center">
            <h1 className="text-mainOrange text-3xl md:text-5xl font-bold">Viziunea Noastră</h1>
            <span className="text-textGrey">Inspirând viitorul imobiliar</span>
          </header>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="md:mt-32 mt-6">
              <h3 className="text-xl text-white font-medium mb-10">
                Viziunea noastră este să devenim un furnizor de locuințe standardizate și proprietăți cu
                cele mai bune facilități.
              </h3>
              <p className="text-base text-white mb-4">
                La PremierImobil, viziunea noastră este simplă, dar puternică: să redefinim experiența imobiliară prin crearea unei călătorii perfecte și personalizate pentru fiecare client. Credem că imobiliare nu este doar despre proprietăți; este vorba de oameni. Scopul nostru este de a împuternici indivizii, familiile și întreprinderile să își atingă visele imobiliare, oferindu-le instrumentele, cunoștințele și sprijinul de care au nevoie pentru a lua decizii informate.
              </p>
              <p className="text-base text-white">
                Ne imaginăm un viitor în care fiecare tranzacție imobiliară contribuie la creșterea și dezvoltarea comunităților înfloritoare. PremierImobil se angajează să mai mult decât să faciliteze tranzacțiile; ne vedem ca niște constructori de comunități. Accentul nostru este să îi ajutăm pe clienți să găsească nu doar o casă, ci și o casă – un loc în care să se poată dezvolta, să se conecteze și să prospere. Credem că potrivirea persoanelor potrivite cu proprietățile potrivite, putem contribui la crearea unor comunități vibrante, durabile și incluzive.              </p>
            </div>
            <img src="/viziune.png" alt="" className="w-[600px] h-[700px]" />
          </div>
        </div>
        {/* AGENTI  */}
        <div>
          <AgentSlider />
        </div>
        {/* Va vom ajuta  */}
        <div className="flex flex-col my-32">
          <header className="flex flex-col w-full items-center justify-center ">
            <h1 className="text-mainOrange text-3xl md:text-5xl font-bold">Vă vom ajuta în</h1>
          </header>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between mt-6 md:mt-32">
            <div className="max-h-[600px] h-full w-full max-w-[300px]">
              <img src="/administrare.png" alt="" />
            </div>
            <div className="max-h-[470px] h-full w-full max-w-[300px]">
              <img src="/serviceclienti.png" alt="" className="md:h-[450px] md:width-[350px]" />
            </div>
            <div className="max-h-[700px] h-full w-full max-w-[300px]">
              <img src="/ipotecare.png" alt="" className="md:h-[500px] md:width-[300px]" />
            </div>
            <div className="max-h-[470px] h-full w-full max-w-[300px]">
              <img src="/recuperarevaloare.png" alt="" />
            </div>
          </div>
        </div>
        {/* Testimonial  */}
        <Testimonials />
        {/* Intrebari */}
       <Questions />
      </div>
    </section >
  )
}

export default About