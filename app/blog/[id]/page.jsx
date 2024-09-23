'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BlogPage = ({ params }) => {
    const { id } = params;
    const [content, setContent] = useState('');

    useEffect(() => {
        switch (id) {
            case '1':
                setContent(
                    <>
                        <h1 className="text-3xl font-bold text-mainOrange">Ce trebuie să știi înainte de a cumpăra sau vinde un teren în Moldova?</h1>
                        <p className="mt-4 text-lg text-gray-300">Cumpărarea sau vânzarea unui teren în Republica Moldova implică respectarea mai multor aspecte legale prevăzute în Codul funciar. Înainte de a intra într-o astfel de tranzacție, este important să cunoști detalii esențiale despre tipurile de proprietate și procedurile necesare.</p>
                        <p className="mt-4 text-lg text-gray-300">În primul rând, terenurile pot fi de două tipuri: terenuri proprietate publică (ale statului sau unităților administrativ-teritoriale) și terenuri proprietate privată. În cazul terenurilor publice, vânzarea este posibilă doar în anumite condiții stricte, iar concesionarea poate fi o alternativă frecvent utilizată. Proprietățile private, pe de altă parte, sunt supuse tranzacțiilor mai simple, dar și acestea trebuie să respecte rigorile Codului funciar.</p>
                        <p className="mt-4 text-lg text-gray-300">Un aspect crucial este stabilirea clară a proprietarului. Trebuie verificat la Cadastru dacă vânzătorul este titularul de drept al terenului și dacă există eventuale sarcini legale asupra proprietății, cum ar fi ipoteci sau litigii. În absența acestor verificări, cumpărătorul poate avea surprize neplăcute ulterior.</p>
                        <p className="mt-4 text-lg text-gray-300">Un alt punct esențial este destinația terenului. Există reglementări stricte cu privire la utilizarea terenurilor agricole, forestiere sau urbane. Schimbarea destinației unui teren (de exemplu, din agricol în teren pentru construcții) este un proces birocratic ce necesită avize de la autorități.</p>
                        <h3 className="mt-6 text-xl font-medium text-mainOrange">Concluzie</h3>
                        <p className="mt-2 text-lg text-gray-300">În concluzie, orice tranzacție cu terenuri în Moldova trebuie realizată cu documentație clară și bine pregătită. Apelează întotdeauna la un notar și verifică legalitatea actelor pentru a evita complicațiile viitoare.</p>
                    </>
                );
                break;
            case '2':
                setContent(
                    <>
                        <h1 className="text-3xl font-bold text-mainOrange">Actele necesare pentru a vinde o proprietate: Ghid complet conform legislației Moldovei</h1>
                        <p className="mt-4 text-lg text-gray-300">Vânzarea unei proprietăți în Republica Moldova necesită o serie de documente legale esențiale, conform legislației în vigoare. Fără aceste acte, tranzacția nu poate fi încheiată în mod legal, iar riscul de a întâmpina probleme este mare.</p>
                        <p className="mt-4 text-lg text-gray-300">Primul document pe care trebuie să-l dețină vânzătorul este actul de proprietate asupra imobilului. Acesta poate fi un certificat de moștenire, un act de cumpărare sau un alt document legal care atestă că proprietarul este înregistrat în cartea funciară.</p>
                        <p className="mt-4 text-lg text-gray-300">Un alt document important este extrasul de la Cadastru, care conține informații despre imobil și eventualele sarcini legale (ipoteci, sechestru). Extrasul cadastral este esențial pentru a demonstra că proprietatea nu este sub incidența vreunei restricții legale.</p>
                        <h3 className="mt-6 text-xl font-medium text-mainOrange">Concluzie</h3>
                        <p className="mt-2 text-lg text-gray-300">Asigură-te că ai toate aceste documente pregătite pentru o vânzare fără probleme. Colaborează cu un notar pentru a te asigura că totul este legal și bine organizat.</p>
                    </>
                );
                break;
            case '3':
                setContent(
                    <>
                        <h1 className="text-3xl font-bold text-mainOrange">Drepturile și obligațiile proprietarilor de locuințe: Ce prevede Codul civil al Republicii Moldova?</h1>
                        <p className="mt-4 text-lg text-gray-300">În Republica Moldova, Codul civil definește clar drepturile și obligațiile fiecărui proprietar de locuințe, având ca scop protejarea atât a acestora, cât și a comunității. Fiecare proprietar de imobil trebuie să înțeleagă aceste reguli pentru a evita posibilele conflicte legale.</p>
                        <p className="mt-4 text-lg text-gray-300">Unul dintre drepturile fundamentale ale unui proprietar este dreptul de a dispune de proprietatea sa. Aceasta include dreptul de a o vinde, închiria sau transmite prin moștenire.</p>
                        <h3 className="mt-6 text-xl font-medium text-mainOrange">Concluzie</h3>
                        <p className="mt-2 text-lg text-gray-300">Proprietarii de locuințe din Republica Moldova trebuie să fie conștienți de atât de drepturile lor, cât și de obligațiile pe care le au. Nerespectarea acestor obligații poate atrage sancțiuni sau litigii.</p>
                    </>
                );
                break;
            case '4':
                setContent(
                    <>
                        <h1 className="text-3xl font-bold text-mainOrange">Drumurile și infrastructura locală: Cum influențează accesibilitatea asupra valorii unei proprietăți?</h1>
                        <p className="mt-4 text-lg text-gray-300">Accesibilitatea rutieră și infrastructura joacă un rol crucial în determinarea valorii unei proprietăți imobiliare. Conform Codului drumurilor din Republica Moldova, o bună conectivitate la drumuri publice poate crește substanțial prețul unei locuințe sau al unui teren.</p>
                        <p className="mt-4 text-lg text-gray-300">Drumurile publice sunt clasificate în drumuri naționale, republicane, regionale și locale. Cele naționale și republicane sunt de importanță majoră, asigurând legătura între principalele orașe și capitalele de raion.</p>
                        <h3 className="mt-6 text-xl font-medium text-mainOrange">Concluzie</h3>
                        <p className="mt-2 text-lg text-gray-300">Dezvoltarea infrastructurii locale este esențială pentru creșterea atractivității imobilelor în acea regiune.</p>
                    </>
                );
                break;
            case '5':
                setContent(
                    <>
                        <h1 className="text-3xl font-bold text-mainOrange">Protecția consumatorilor în tranzacțiile imobiliare: Ce drepturi ai conform Codului protecției consumatorilor?</h1>
                        <p className="mt-4 text-lg text-gray-300">În Republica Moldova, protecția consumatorilor în tranzacțiile imobiliare este reglementată de Codul protecției consumatorilor, care stabilește drepturile cumpărătorilor și obligațiile agenților economici.</p>
                        <p className="mt-4 text-lg text-gray-300">Unul dintre cele mai importante drepturi ale consumatorilor este dreptul la informație corectă și completă.</p>
                        <h3 className="mt-6 text-xl font-medium text-mainOrange">Concluzie</h3>
                        <p className="mt-2 text-lg text-gray-300">Este esențial ca atât cumpărătorii, cât și vânzătorii să fie conștienți de drepturile lor și să colaboreze cu agenții imobiliari de încredere.</p>
                    </>
                );
                break;
            default:
                setContent(<p className="text-xl text-red-500">ID invalid or missing.</p>);
        }
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            {content}
        </div>
    );
};

export default BlogPage;
