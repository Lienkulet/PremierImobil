import Question from "./Question"

const Questions = () => {
  return (
    <section className="mb-10">
    <div className="md:my-32 my-10 flex flex-col items-center">
      <h3 className="text-white text-3xl md:text-5xl font-bold">Întrebări frecvente</h3>
    </div>
    <div className="flex flex-wrap gap-4 justify-center items-start w-full">
      <Question
        header="Ce acte sunt necesare pentru vânzarea apartamentului?"
        text="Vânzătorul imobilului trebuie să posede 
      următoarele acte:
      1) Extrasul și evaluarea din Registrul bunurilor imobile
       eliberat de Agenția Servicii Publice;
      2) Certificat de căsătorie / divorț;
      3) Act de proprietate asupra imobilului (contract de donație,
       de moștenire, de privatizare sau de vânzare-cumpărare, 
      hotărârea judecătorească etc.);
      4) Actul de identitate."
      />

      <Question
        header="Ce taxe sunt la cumpărarea apartamentului?"
        text="Cumpărătorul este responsabil pentru achitarea taxei de stat aferente transferului dreptului de proprietate într-o tranzacție imobiliară. De asemenea, trebuie să plătească onorariile notariale, care pot varia în funcție de valoarea proprietății și de modalitatea de plată (numerar sau credit ipotecar).

      În plus, cumpărătorul trebuie să achite taxa pentru înregistrarea imobilului la Cadastru (ASP) pentru a finaliza transferul legal al proprietății în numele său.
      
      Este esențial ca cumpărătorul să fie conștient de toate costurile implicate în tranzacția imobiliară și să se asigure că dispune de fondurile necesare pentru a acoperi aceste taxe și onorarii. Solicitarea sfatului unui specialist imobiliar este recomandată pentru a înțelege pe deplin toate aspectele financiare ale tranzacției."
      />

      <Question
        header="În cât timp se vinde imobilul"
        text="Vânzarea unui imobil durează, în medie, 32 de zile, influențată de mai mulți factori:
      Prețul: Stabilirea unui preț corect este esențială. Un preț prea mare poate descuraja cumpărătorii, iar unul prea mic poate duce la pierderi financiare. Consultați un expert pentru evaluarea corectă a imobilului.
      Locația: Proprietățile din zone căutate, cu infrastructură dezvoltată și acces la facilități, se vând mai rapid și la prețuri mai bune.
      Starea imobilului: Proprietățile bine întreținute sau recent renovate au șanse mai mari de vânzare rapidă la un preț avantajos. Investițiile în mici îmbunătățiri pot face imobilul mai atractiv.
      Sezonul: Perioadele de iarnă, cum ar fi noiembrie-februarie, pot fi mai lente pe piața imobiliară din cauza condițiilor meteorologice și a sărbătorilor, dar există și cumpărători activi în aceste perioade." 
    />

      <Question
        header="Pregătirea imobilului pentru vânzare!"
        text="În pregătirea imobilului pentru vânzare, este esențial să atrageți potențialii cumpărători și să evidențiați avantajele locuinței. Iată câteva sfaturi suplimentare:
        Curățenie și organizare: Asigurați-vă că apartamentul este curat și bine organizat. Eliminați obiectele personale și dezordinea pentru a oferi cumpărătorilor o imagine clară a spațiului și a-i ajuta să își imagineze cum ar putea să îl personalizeze.
        Reparații și întreținere: Remediați defecțiunile minore, cum ar fi becurile arse, robinetele care picură sau ușile care scârțâie. De asemenea, rezolvați problemele mai mari, cum ar fi reparațiile la termopane sau instalațiile sanitare.
        Aspect plăcut: Faceți apartamentul să arate cât mai bine. Pictați pereții în culori neutre și luminoase, curățați ferestrele și asigurați-vă că mobilierul și decorul sunt aranjate într-un mod atractiv.
        Aceste ajustări simple pot face o diferență semnificativă în atragerea cumpărătorilor și în accelerarea procesului de vânzare a apartamentului. Succes!" 
      />

      <Question
        header="Ce taxe trebuie plătite,atunci când vând imobilul?"
        text="Vânzătorul are responsabilitatea de a plăti impozitul pe veniturile obținute din tranzacția imobiliară. Acesta poate fi fie impozit pe veniturile din transferul dreptului de proprietate, fie impozit pe câștigul de capital din vânzarea unui bun imobil.
        De asemenea, vânzătorul este responsabil pentru achitarea costurilor legate de extrasul și evaluarea din Registrul bunurilor imobile, eliberat de Agenția Servicii Publice, necesar pentru confirmarea datelor legate de proprietate.
        Este important ca vânzătorul să fie conștient de aceste responsabilități financiare și să se asigure că toate taxele și costurile asociate tranzacției sunt acoperite conform legii. Consultarea unui specialist în domeniul imobiliar este recomandată pentru a asigura respectarea tuturor obligațiilor legale și fiscale în procesul de vânzare a unei proprietăți."
      />

      <Question
        header="Puteti procura apartament în rate dacă lucrați peste hotare!"
        text="Creditul imobiliar este disponibil și pentru persoanele care lucrează oficial în străinătate. Documentele necesare includ:
        Contract de muncă oficial peste hotare;
        Foi salariale pentru cel puțin 6 luni;
        Extras bancar sau alte documente care confirmă proveniența banilor;
        Prima rată de minimum 20% din prețul total al apartamentului.
        Este esențial ca contractele de muncă să fie în limba română, rusă sau engleză pentru a fi acceptate. Dacă contractul este redactat într-o altă limbă, acesta trebuie tradus în una dintre limbile acceptate și apostilat pentru a fi valid.
        Respectarea acestei cerințe este crucială pentru a evita probleme sau întârzieri în procesul de obținere a creditului." 
      />
    </div>
  </section>
  )
}

export default Questions