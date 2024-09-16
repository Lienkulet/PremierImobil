import Testimonial from "./Testimonial"

const Testimonials = () => {
    return (
        <section className="my-32 hidden md:flex flex-col md:flex-row justify-between">
            <div className="flex flex-col max-w-[300px] w-full">
                <div className="ml-10 max-h-[320px] h-full" >
                    <img src="testimonialcomma.png" />
                </div>
                <div className="mt-28">
                    <h3 className="text-white text-5xl font-bold">Clienți <br /> mulțumiți</h3>
                    <h3 className="text-mainOrange text-5xl font-bold">PremierImobil</h3>
                </div>
            </div>
            <div className="bg-mainOrange w-[800px] h-[800px]  relative rounded-md">
                <div className="flex flex-col md:flex-row gap-3 absolute top-1/3 -left-32">
                    <Testimonial name="Grosu Mihail" location="Ungheni, Moldova" text="Mi-a fost destul de greu să-mi vând casa în oraș, deși eu și familia mea a trebuit să plătim bani imediat pentru a cumpăra o casă în afara orașului. Din fericire, agenții PremierImobil ne-au ajutat să vindem casa ieftin și rapid." />
                    <Testimonial name="Postolachi Amelia" location="Vatra, Chișinău" text="Am crezut că va fi dificil să găsești o casă, dar PremierImobil a făcut-o cu toate capacitățile sale." />
                    <Testimonial name="Condru Mihail" location="Buiucani, Chișinău" text="Chiar dacă sunt băiat, părinții mei sunt îngrijorați că nu voi găsi o locuință decentă când studiez în străinătate. Datorită PremierImobil, părinții mei nu vor mai avea de ce să-și facă griji.." />
                </div>
            </div>
        </section>
    )
}

export default Testimonials