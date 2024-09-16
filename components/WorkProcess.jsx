
const WorkProcess = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-12 md:my-72">
            <h1 className="text-white font-bold text-5xl">Procesul de lucru</h1>
            <div className="hidden md:flex flex-wrap items-center justify-start md:gap-8 gap-4 gap-y-4">
                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src='cautareicon.svg'
                        alt='cautare'
                        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] "
                    />
                    <h4 className="font-light md:text-xl text-xs text-mainOrange">Căutare</h4>
                </div>
                <img
                    src='lineicon.svg'
                    alt='line'
                    className="md:w-[100px] md:h-[100px] w-[40px] h-[40px] "
                />

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src='vizitaicon.svg'
                        alt='cautare'
                        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] "
                    />
                    <h4 className="font-light md:text-xl text-xs text-mainOrange">Vizită la imobil</h4>
                </div>
                <img
                    src='lineicon.svg'
                    alt='line'
                    className="md:w-[100px] md:h-[100px] w-[40px] h-[40px] "
                />

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src='acordicon.svg'
                        alt='cautare'
                        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] "
                    />
                    <h4 className="font-light md:text-xl text-xs text-mainOrange">Acord Contractual</h4>
                </div>
                <img
                    src='lineicon.svg'
                    alt='line'
                    className="md:w-[100px] md:h-[100px] w-[40px] h-[40px] "
                />

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src='notarizare.svg'
                        alt='cautare'
                        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] "
                    />
                    <h4 className="font-light md:text-xl text-xs text-mainOrange">Notarizarea</h4>
                </div>
                <img
                    src='lineicon.svg'
                    alt='line'
                    className="md:w-[100px] md:h-[100px] w-[40px] h-[40px] "
                />

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src='predareicon.svg'
                        alt='cautare'
                        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] "
                    />
                    <h4 className="font-light md:text-xl text-xs text-mainOrange">Predarea Cheii</h4>
                </div>
            </div>

        </section>
    )
}

export default WorkProcess