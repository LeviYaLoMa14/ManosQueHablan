// Página de bienvenida: src/pages/HomePage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// === Datos constantes (mismos que en tu HTML) ===
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "LL",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "RR",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const customImages = {
  A: "https://www.dropbox.com/scl/fi/zlsy75281fsg2or37d7km/A.png?rlkey=4qv6blurp5vc33n6qb83lrx5l&st=4i88z7fq&raw=1",
  B: "https://www.dropbox.com/scl/fi/78lkz9gh21cnmpwyoe87m/B.png?rlkey=q3ecrt6qrjukxdtamcxb0hw8c&st=pgk76yyl&raw=1",
  C: "https://www.dropbox.com/scl/fi/v3jsncl8jtmsvn6bvrhu2/C.png?rlkey=6benj6je1mcluk0jhi9rsvv5o&st=tz3anaj2&raw=1",
  D: "https://www.dropbox.com/scl/fi/nxrz6q7m9doyw89lbteyb/D.png?rlkey=q8kva3ngfdg9hm2wso0n5ee8k&st=ud4etb90&raw=1",
  E: "https://www.dropbox.com/scl/fi/r1xs4swgnw5okgidgpb4y/E.png?rlkey=v552eavtlpdrfrhncc75e0kbc&st=5dlpj2s2&raw=1",
  F: "https://www.dropbox.com/scl/fi/7u0zkzaapxsq8lwdepqoq/F.png?rlkey=8zxdush61r4htsg38hl24egdu&st=lbphp35i&raw=1",
  G: "https://www.dropbox.com/scl/fi/0cg41gohs013ud2j9pi20/G.png?rlkey=xtnw4u7fe4u7ftqv8gzj0itbx&st=5z88e59t&raw=1",
  H: "https://www.dropbox.com/scl/fi/0c0a3uuti6sqt5msvz113/H.png?rlkey=iwcbu41ia9gl7tep280xmxz8l&st=8r4rli9p&raw=1",
  I: "https://www.dropbox.com/scl/fi/xtx6uzv62c2x4r29o67mn/I.png?rlkey=zissyqy0d1gcbpgc0in75up33&st=52cstf9g&raw=1",
  J: "https://www.dropbox.com/scl/fi/gugb4pjp4yk8ljsk29m46/J.png?rlkey=q4eudqn7lsxc873jnnntgcitr&st=snezm111&raw=1",
  K: "https://www.dropbox.com/scl/fi/jhhrc6fbid455pwkdeuzs/K.png?rlkey=r42cybn27x3izrphjo6dhfs2c&st=0lnjub2f&raw=1",
  L: "https://www.dropbox.com/scl/fi/ae27lcnoskxkclsriw6uq/L.png?rlkey=v27o99fmyufj9s1aj9qi6xkk4&st=xig7vt1m&raw=1",
  LL: "https://www.dropbox.com/scl/fi/5oq6hrfghk2szk8kk8361/LLRR.jpg?rlkey=mi87xe3hkong0hgfjqlhioefx&st=eiht81y0&raw=1",
  M: "https://www.dropbox.com/scl/fi/cxh2k24bs5l883zltu28b/M.png?rlkey=ow60tn1w9y9bq9lm2lt00axff&st=02h1s0lt&raw=1",
  N: "https://www.dropbox.com/scl/fi/z9thcvn7cx1142slpkoep/N.png?rlkey=o7a8icw2z51ydxke1d5b5jxt2&st=vbbow6hh&raw=1",
  Ñ: "https://www.dropbox.com/scl/fi/au7fd5p97gkiq1z5wqye5/.png?rlkey=w6xyn5fagna34eagve9dczuqr&st=z097gfa0&raw=1",
  O: "https://www.dropbox.com/scl/fi/l45yudd10i5brz8n4iljo/O.png?rlkey=jh6odnc9aia0jr7ff9nlxoaij&st=ewtfwt1c&raw=1",
  P: "https://www.dropbox.com/scl/fi/9o68kzzbnk9hv6nyj54l3/P.png?rlkey=t1bwfvnfp96qirqaub3224j85&st=fdttg81j&raw=1",
  Q: "https://www.dropbox.com/scl/fi/6wtal3vtfi7nxis5nu1dw/Q.png?rlkey=3fjvwi1u5bjyrnr2y8pkwul24&st=m024678c&raw=1",
  R: "https://www.dropbox.com/scl/fi/jy4ytxeseeprf1m04iav3/R.png?rlkey=ebd9q2847btup3tnpdm4nfzxv&st=s1rhzs4x&raw=1",
  RR: "https://www.dropbox.com/scl/fi/5oq6hrfghk2szk8kk8361/LLRR.jpg?rlkey=mi87xe3hkong0hgfjqlhioefx&st=eiht81y0&raw=1",
  S: "https://www.dropbox.com/scl/fi/cdohlb86abbbe0vol11co/S.png?rlkey=vcet66hstr76ri428mw5n8auy&st=m77h4od0&raw=1",
  T: "https://www.dropbox.com/scl/fi/j546qbjzjvmnewo3j4h19/T.png?rlkey=dd0nzyw9ri57ezkpq5n99orjv&st=ww1farr6&raw=1",
  U: "https://www.dropbox.com/scl/fi/47u51zzwb80bb56jecc6y/U.png?rlkey=lqbrvquz0xa4ksbuhwvnaaq64&st=8wykxenr&raw=1",
  V: "https://www.dropbox.com/scl/fi/ynj5wjeyw92qimv2hoeuz/V.png?rlkey=c3gbvddin8fu3w4bqjdpuy7xs&st=u272p76k&raw=1",
  W: "https://www.dropbox.com/scl/fi/t2mixxdz4wht4ak84mj7y/W.png?rlkey=rh7l53dggi18aiy80lh2vuyk7&st=eactsdui&raw=1",
  X: "https://www.dropbox.com/scl/fi/2z788hndam4qfyykpj1ij/X.png?rlkey=rfceqbyqyt3dej7t4k7iayci7&st=udgormcl&raw=1",
  Y: "https://www.dropbox.com/scl/fi/acnydehmvz0ek1b1l7ojw/Y.png?rlkey=cm87axiku33u9lsucxdscun8z&st=jd9gv07j&raw=1",
  Z: "https://www.dropbox.com/scl/fi/208cfjhkbdhl7h4epsatp/Z.png?rlkey=j5rddmt9fdhggfw5stgmcmg70&st=dlscirqa&raw=1",
};

const alphabetDescriptions = {
  A: "A: Con la mano cerrada, se muestran las uñas y se estira el dedo pulgar hacia un lado. La palma mira al frente.",
  B: "B: Los dedos índice, medio, anular y meñique se estiran bien unidos y el pulgar se dobla hacia la palma, la cual mira al frente.",
  C: "C: Los dedos índice, medio, anular y meñique se mantienen bien unidos y en posición cóncava; el pulgar también se pone en esa posición. La palma mira a un lado.",
  D: "D: Los dedos medio, anular, meñique y pulgar se unen por las puntas y el dedo índice se estira. La palma mira al frente.",
  E: "E: Se doblan los dedos completamente, y se muestran las uñas. La palma mira al frente.",
  F: "F: Con la mano abierta y los dedos bien unidos, se dobla el índice hasta que su parte lateral toque la yema del pulgar. La palma mira a un lado.",
  G: "G: Se cierra la mano y los dedos índice y pulgar se estiran. La palma mira hacia usted.",
  H: "H: Con la mano cerrada y los dedos índice y medio bien estirados y unidos, se extiende el dedo pulgar señalando hacia arriba. La palma mira hacia usted.",
  I: "I: Con la mano cerrada, el dedo meñique se estira señalando hacia arriba. La palma se pone de lado.",
  J: "J: Con la mano cerrada, el dedo meñique bien estirado señalando hacia arriba y la palma a un lado dibuja una j en el aire.",
  K: "K: Se cierra la mano con los dedos índice, medio y pulgar estirados. La yema del pulgar se pone entre el índice y el medio. Se mueve la muñeca hacia arriba.",
  L: "L: Con la mano cerrada y los dedos índice y pulgar estirados, se forma una l. La palma mira al frente.",
  LL: "Doble L (ll): se representa con un movimiento sutil de la mano, similar a la seña de la letra L, pero con un ligero movimiento hacia afuera.",
  M: "M: Con la mano cerrada, se ponen los dedos índice, medio y anular sobre el pulgar.",
  N: "N: Con la mano cerrada, se ponen los dedos índice y medio sobre el pulgar.",
  Ñ: "Ñ: Con la mano cerrada, se ponen los dedos índice y medio sobre el pulgar. Se mueve la muñeca a los lados.",
  O: "O: Con la mano se forma una letra o. Todos los dedos se tocan por las puntas.",
  P: "P: Con la mano cerrada y los dedos índice, medio y pulgar estirados, se pone la yema del pulgar entre el índice y el medio.",
  Q: "Q: Con la mano cerrada, se ponen los dedos índice y pulgar en posición de garra. La palma mira hacia abajo, y se mueve la muñeca hacia los lados.",
  R: "R: Con la mano cerrada, se estiran y entrelazan los dedos índice y medio. La palma mira al frente.",
  RR: "Doble R o RR: Se realiza un movimiento rápido de la mano de esta posición, simulando el sonido vibrante de la rr.",
  S: "S: Con la mano cerrada, se pone el pulgar sobre los otros dedos. La palma mira al frente.",
  T: "T: Con la mano cerrada, el pulgar se pone entre el índice y el medio. La palma mira al frente.",
  U: "U: Con la mano cerrada, se estiran los dedos índice y medio unidos. La palma mira al frente.",
  V: "V: Con la mano cerrada, se estiran los dedos índice y medio separados. La palma mira al frente.",
  W: "W: Con la mano cerrada, se estiran los dedos índice, medio y anular separados. La palma mira al frente.",
  X: "X: Con la mano cerrada, el índice y el pulgar en posición de garra y la palma dirigida a un lado, se realiza un movimiento al frente y de regreso.",
  Y: "Y: Con la mano cerrada, se estira el meñique y el pulgar. La palma mira hacia usted.",
  Z: "Z: Con la mano cerrada, el dedo índice estirado y la palma al frente, se dibuja una letra z en el aire.",
};

const dictionaryItems = [
  {
    term: "Hola",
    category: "saludos",
    video: "https://www.youtube.com/shorts/JPJ5oHsExdc?feature=share",
  },
  {
    term: "Adiós",
    category: "saludos",
    video: "https://www.youtube.com/shorts/jQ2L0K0FoGY",
  },
  {
    term: "Buenos días",
    category: "saludos",
    video: "https://www.youtube.com/shorts/UClL8_YjsKU?feature=share",
  },
  {
    term: "Gracias",
    category: "saludos",
    video: "https://www.youtube.com/shorts/HAOZCVi96Z0?feature=share",
  },
  {
    term: "¿Cómo estás?",
    category: "preguntas",
    video: "https://youtu.be/x7zFMacTe04",
  },
  {
    term: "¿Cómo te llamas?",
    category: "preguntas",
    video: "https://youtu.be/lVeQV6cgUE8",
  },
  {
    term: "¿Dónde?",
    category: "preguntas",
    video: "https://www.youtube.com/shorts/Nd4T9V0ijXM?feature=share",
  },
  {
    term: "¿Por qué?",
    category: "preguntas",
    video: "https://www.youtube.com/shorts/WRMbNuwlSCE?feature=share",
  },
  {
    term: "Mamá",
    category: "familia",
    video: "https://www.youtube.com/shorts/BEeZVMqdcaQ?feature=share",
  },
  {
    term: "Papá",
    category: "familia",
    video: "https://www.youtube.com/shorts/Zav7eyTr6po?feature=share",
  },
  {
    term: "Hermano",
    category: "familia",
    video: "https://www.youtube.com/shorts/v3s3bsZQVOs?feature=share",
  },
  {
    term: "Mejor amigo",
    category: "familia",
    video: "https://www.youtube.com/shorts/CNN07NRZjhw?feature=share",
  },
];

const resources = [
  {
    title: "Talleres y Cursos",
    content: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <a
            href="https://pilares.cdmx.gob.mx/curso/3/lengua-de-senas-mexicana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            Taller PILARES CDMX: Lengua de Señas Mexicana
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Diccionarios y Material Didáctico",
    content: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <a
            href="https://educacionespecial.sep.gob.mx/storage/recursos/2023/05/xzrfl019nV-4Diccionario_lengua_%20Senas.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            Diccionario de Lengua de Señas Mexicana (SEP)
          </a>
        </li>
        <li>
          <a
            href="https://dgb.sep.gob.mx/storage/recursos/2023/09/VoNwytznBQ-Infografia_LenguaDeSen%C3%9Eas%2020092023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            Infografía – Día Internacional de las Lenguas de Señas
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Organizaciones para Apoyar o Solicitar Apoyo",
    content: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <a
            href="https://movimientodeaccionsocial.org.mx/organizaciones-mas/asociacion-mexicana-para-el-diagnostico-y-tratamiento-de-la-sordera-ac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            Asociación Mexicana para el Diagnóstico y Tratamiento de la
            Sordera, A.C.
          </a>
        </li>
        <li>
          <a
            href="https://movimientodeaccionsocial.org.mx/organizaciones-mas/asociacion-mexicana-para-la-audicion-ayudanos-a-oir-ac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            Ayúdanos a Oír, A.C.
          </a>
        </li>
        <li>
          <a
            href="https://copesor.sordosmexico.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C07B4F] hover:underline"
          >
            CoPeSor – Coalición de Personas Sordas
          </a>
        </li>
      </ul>
    ),
  },
];

// Helper para YouTube
const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = "";

  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("shorts/")[1].split("?")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

function HomePage() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dictionaryFilter, setDictionaryFilter] = useState("all");
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // Cerrar modal con ESC
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setSelectedLetter(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const filteredDictionary = useMemo(() => {
    if (dictionaryFilter === "all") return dictionaryItems;
    return dictionaryItems.filter((i) => i.category === dictionaryFilter);
  }, [dictionaryFilter]);

  // Datos de las gráficas
  const popData = {
    labels: ["Discapacidad auditiva", "Habla LSM"],
    datasets: [
      {
        label: "% de la población mexicana",
        data: [1.74, 0.076],
        backgroundColor: ["rgba(192,123,79,0.6)", "rgba(75,66,59,0.6)"],
        borderColor: ["rgba(192,123,79,1)", "rgba(75,66,59,1)"],
        borderWidth: 1,
      },
    ],
  };

  const popOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 2,
        ticks: {
          callback: (v) => v + "%",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ctx.parsed.y.toFixed(3) + " %",
        },
      },
    },
  };

  const popCompareData = {
    labels: ["Discapacidad auditiva", "Habla LSM"],
    datasets: [
      {
        label: "% del total de la población mexicana",
        data: [1.74, 0.076],
        backgroundColor: ["rgba(192,123,79,0.6)", "rgba(75,66,59,0.6)"],
        borderColor: ["rgba(192,123,79,1)", "rgba(75,66,59,1)"],
        borderWidth: 1,
      },
    ],
  };

  const popCompareOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (v) => v + "%",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ctx.parsed.y.toFixed(3) + " %",
        },
      },
    },
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero-bg" id="hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Un Mundo de Comunicación en tus Manos
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-balance text-stone-600">
              Descubre la Lengua de Señas Mexicana (LSM), una lengua nacional
              vibrante y un puente fundamental hacia una sociedad más inclusiva.
            </p>
            <a
              className="mt-8 inline-block bg-[#C07B4F] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#a96b42] transition-colors"
              href="#porque"
            >
              Empezar el viaje
            </a>
          </div>
        </section>

        {/* Section 1: Por Qué Importa */}
        <section className="py-20 md:py-28 bg-white" id="porque">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                ¿Qué es la LSM?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 text-balance">
                La Lengua de Señas Mexicana (LSM) es reconocida oficialmente
                como una lengua nacional y forma parte del patrimonio
                lingüístico con que cuenta la nación mexicana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <div className="bg-stone-50 p-6 rounded-lg shadow-sm">
                <h3
                  className="font-bold text-xl mb-2 text-[#C07B4F]"
                  id="dia-nacional"
                >
                  Día Nacional
                </h3>
                <p className="text-stone-600">
                  Cada año desde el 10 de junio de 2005, celebramos en México
                  el Día Nacional de la Lengua de Señas Mexicana.
                </p>
              </div>
              <div className="bg-stone-50 p-6 rounded-lg shadow-sm">
                <h3
                  className="font-bold text-xl mb-2 text-[#C07B4F]"
                  id="lengua-o-lenguaje"
                >
                  ¿Lengua o Lenguaje?
                </h3>
                <p className="text-stone-600">
                  El término correcto es "Lengua de Señas", ya que se trata de
                  una lengua con su propia gramática, historia y estructura. Es
                  el idioma natural de la comunidad sorda en México.
                </p>
              </div>
              <div className="bg-stone-50 p-6 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
                <h3
                  className="font-bold text-xl mb-2 text-[#C07B4F]"
                  id="caracteristicas"
                >
                  Características
                </h3>
                <p className="text-stone-600">
                  La LSM se compone de signos gestuales articulados con las
                  manos, expresiones faciales, mirada y movimiento corporal.
                  Presenta variaciones regionales y difiere del español en
                  sintaxis y uso de verbos.
                </p>
              </div>
            </div>

            <div className="mb-16 max-w-4xl mx-auto text-stone-700">
              <h3
                className="text-2xl font-bold mb-4 text-[#C07B4F]"
                id="importancia"
              >
                Importancia
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso a la educación:</strong> Mejora la comprensión
                  en el entorno escolar.
                </li>
                <li>
                  <strong>Inclusión laboral:</strong> Elimina barreras
                  comunicativas en el trabajo.
                </li>
                <li>
                  <strong>Participación ciudadana:</strong> Garantiza equidad en
                  el acceso a información pública.
                </li>
              </ul>
            </div>

            <div className="mb-16 max-w-4xl mx-auto text-stone-700">
              <h3
                className="text-2xl font-bold mb-4 text-[#C07B4F]"
                id="historia"
              >
                Historia
              </h3>
              <div className="relative mt-12">
                <div className="absolute w-1 bg-stone-200 h-full left-1/2 -translate-x-1/2 hidden md:block" />
                <div className="space-y-12 md:space-y-0">
                  {/* 1861 */}
                  <div className="md:flex md:items-center md:space-x-8">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          1861
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Ley de Instrucción Pública
                        </h4>
                        <p className="mt-2 text-stone-600">
                          Benito Juárez decreta la creación de una escuela de
                          sordomudos en la Ley de Instrucción Pública.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                  {/* 1869 */}
                  <div className="md:flex md:items-center md:flex-row-reverse md:space-x-8 md:space-x-reverse">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          1869
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Escuela Nacional de Sordomudos
                        </h4>
                        <p className="mt-2 text-stone-600">
                          Se funda la Escuela Nacional de Sordomudos, iniciando
                          la educación formal para personas sordas en México.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                  {/* 1980s */}
                  <div className="md:flex md:items-center md:space-x-8">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          Década de 1980
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Comunicación Total
                        </h4>
                        <p className="mt-2 text-stone-600">
                          Se impulsa la filosofía de comunicación total: señas,
                          símbolos, escritura, mímica y lectura labial.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                  {/* 2003 */}
                  <div className="md:flex md:items-center md:flex-row-reverse md:space-x-8 md:space-x-reverse">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          2003
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Lengua Nacional
                        </h4>
                        <p className="mt-2 text-stone-600">
                          La LSM se declara lengua nacional junto con el español
                          y las lenguas indígenas.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                  {/* 2018 */}
                  <div className="md:flex md:items-center md:space-x-8">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          2018
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Televisión Accesible
                        </h4>
                        <p className="mt-2 text-stone-600">
                          Los canales de TV con cobertura nacional deben
                          incluir LSM o subtitulaje oculto.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                  {/* 10 de junio */}
                  <div className="md:flex md:items-center md:flex-row-reverse md:space-x-8 md:space-x-reverse">
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                        <p className="text-sm text-[#C07B4F] font-semibold">
                          10 de junio
                        </p>
                        <h4 className="font-bold text-lg mt-1">
                          Día Nacional de la LSM
                        </h4>
                        <p className="mt-2 text-stone-600">
                          Cada año se celebra y visibiliza la importancia de la
                          Lengua de Señas Mexicana.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 max-w-4xl mx-auto text-stone-700">
              <h3
                className="text-2xl font-bold mb-4 text-[#C07B4F]"
                id="legislacion"
              >
                Reconocimiento y Legislación
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>2005:</strong> Reconocimiento oficial en la Ley
                  General para la Inclusión de las Personas con Discapacidad.
                </li>
                <li>
                  <strong>2011:</strong> La Constitución Mexicana garantiza el
                  derecho a la educación inclusiva en LSM.
                </li>
                <li>
                  <strong>2017:</strong> Reconocimiento de la LSM como parte del
                  patrimonio cultural lingüístico por el Instituto Nacional de
                  Lenguas Indígenas.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Personas que Inspiran */}
        <section className="py-20 md:py-28 bg-white" id="personas-cambio">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Personas que Inspiran Al Cambio
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 text-balance">
                Detrás del crecimiento de la Lengua de Señas Mexicana hay
                personas que, con pasión y creatividad, enseñan y acercan la LSM
                a nuevas generaciones. Te recomendamos el canal de una creadora
                que ha marcado la diferencia:
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <img
                  src="https://www.dropbox.com/scl/fi/xqlxv3r8d1720v9fg9twn/sollara.jpeg?rlkey=tg1wizpxlc3lko9i1iz2u8nop&st=7akphnty&raw=1"
                  alt="Sol Lara"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-[#C07B4F]">
                  Sol Lara - Videos de Lengua de señas mexicana (LSM)
                </h3>
                <p className="mb-4 text-stone-700">
                  <span className="font-semibold">Sol</span>, conocida como{" "}
                  <span className="font-semibold">Sol Lara</span> en YouTube,
                  crea videos prácticos, creativos y llenos de energía para
                  enseñar LSM a personas de todas las edades. Sus tutoriales,
                  shorts y retos han motivado a miles de personas a acercarse a
                  la comunidad sorda y aprender a comunicarse de manera
                  inclusiva.
                </p>
                <a
                  href="https://www.youtube.com/@sollara7744"
                  target="_blank"
                  rel="noopener"
                  className="inline-block bg-[#C07B4F] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#a96b42] transition-colors"
                >
                  Visitar canal en YouTube
                </a>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <iframe
                width="350"
                height="197"
                src="https://www.youtube.com/embed/aAPWHh90rk4"
                title="Ciclo del agua en LSM (LENGUA DE SEÑAS MEXICANA) 💨⛅⛈🌊"
                frameBorder="0"
                className="rounded-lg shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Section 2: Explora la Lengua */}
        <section className="py-20 md:py-28" id="explora">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Explora la Lengua
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 text-balance">
                Sumérgete en los fundamentos de la LSM. Aprender sus elementos
                básicos, como el alfabeto y vocabulario esencial, abre la puerta
                a una comunicación más rica y significativa.
              </p>
            </div>

            {/* Alfabeto */}
            <h3 className="text-2xl font-bold text-center mb-8">
              Alfabeto Dactilológico
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-4 max-w-4xl mx-auto">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className="bg-stone-100 rounded-lg p-2 flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-[#F0E6DA] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => {
                    setSelectedLetter(letter);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={
                      customImages[letter] ||
                      `https://placehold.co/100x100/C07B4F/FFFFFF?text=${letter}&font=inter`
                    }
                    alt={`Letra ${letter} en LSM`}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <p className="mt-2 font-bold text-lg text-stone-700">
                    {letter}
                  </p>
                </button>
              ))}
            </div>

            {/* Diccionario Básico */}
            <h3 className="text-2xl font-bold text-center mt-20 mb-8">
              Diccionario Básico
            </h3>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              {["all", "saludos", "preguntas", "familia"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setDictionaryFilter(filter)}
                  className={`filter-btn py-2 px-4 rounded-full ${
                    dictionaryFilter === filter
                      ? "bg-[#C07B4F] text-white"
                      : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {filter === "all"
                    ? "Todo"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {filteredDictionary.map((item) => {
                const embedUrl = getYoutubeEmbedUrl(item.video);
                return (
                  <div
                    key={item.term}
                    className="dictionary-item bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="bg-stone-200 aspect-video flex items-center justify-center">
                      {embedUrl ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={embedUrl}
                          title={`Video ${item.term}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="rounded-md"
                        />
                      ) : item.video ? (
                        <video
                          src={item.video}
                          controls
                          className="w-full h-full object-cover rounded-md"
                          preload="metadata"
                        />
                      ) : (
                        <svg
                          className="w-12 h-12 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="p-4 font-semibold text-center text-stone-700">
                      <a
                        href={item.video || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C07B4F] hover:underline"
                      >
                        {item.term}
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: La Brecha Educativa */}
        <section className="py-20 md:py-28 bg-white" id="brecha">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Brechas Críticas
              </h2>
              <p className="mt-4 text-lg text-stone-600 text-balance">
                La Lengua de Señas Mexicana (LSM) es utilizada principalmente
                por personas sordas en México, tanto aquellas que nacieron
                sordas como aquellas que adquirieron la condición en algún
                momento de sus vidas. Además, la LSM también es utilizada por
                personas oyentes que tienen contacto con la comunidad sorda,
                como familiares, amigos, o profesionales que trabajan con
                personas sordas.
              </p>
            </div>
            <p className="text-center mb-6 text-lg text-stone-600 max-w-3xl mx-auto">
              De acuerdo con el INEGI se estima que en México hay alrededor de
              100 000 personas que son capaces de comunicarse en Lengua de
              Señas Mexicana y aproximadamente 2.3 millones de personas que
              padecen discapacidad auditiva.
            </p>

            <div className="bg-stone-50 p-4 sm:p-8 mt-12 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">
                Porcentaje dentro de la población mexicana
              </h3>
              <div
                className="chart-container"
                id="chart-pop-wrapper"
                style={{ maxWidth: "500px" }}
              >
                <Bar data={popData} options={popOptions} />
              </div>
              <p className="text-center mt-2 text-sm text-stone-500">
                Fuente: INEGI (Encuesta Nacional de la Dinámica Demográfica
                2023).
              </p>
            </div>

            <div className="bg-stone-50 p-4 sm:p-8 mt-12 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">
                Comparativo sobre el total de la población mexicana (100 %)
              </h3>
              <div
                className="chart-container"
                id="chart-comparison-wrapper"
                style={{ maxWidth: "500px" }}
              >
                <Bar data={popCompareData} options={popCompareOptions} />
              </div>
              <p className="text-center mt-2 text-sm text-stone-500">
                Fuente: INEGI (Proyecciones de población 2025 · ENADID 2023).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Comunidad */}
        <section className="py-20 md:py-28" id="comunidad">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Únete a la Comunidad
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 text-balance">
                Aprender LSM es un acto de empatía y construcción comunitaria.
                Aquí encontrarás recursos para continuar tu aprendizaje y
                conectar con organizaciones que promueven la inclusión.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {resources.map((item, index) => {
                const open = openAccordionIndex === index;
                return (
                  <div
                    key={item.title}
                    className="border border-stone-200 rounded-lg overflow-hidden"
                  >
                    <h2>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium text-left text-stone-700 bg-stone-50 hover:bg-stone-100"
                        onClick={() =>
                          setOpenAccordionIndex(open ? null : index)
                        }
                      >
                        <span>{item.title}</span>
                        <svg
                          className={`w-6 h-6 shrink-0 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </h2>
                    {open && (
                      <div className="p-5 border-t border-stone-200 bg-white text-stone-600">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Modal Alfabeto */}
      {isModalOpen && selectedLetter && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
              setSelectedLetter(null);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm relative transform scale-100 transition-transform duration-300">
            <button
              className="absolute -top-3 -right-3 bg-[#C07B4F] text-white rounded-full h-8 w-8 flex items-center justify-center shadow-lg"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedLetter(null);
              }}
            >
              ×
            </button>
            <div className="p-6 text-center">
              <img
                src={
                  customImages[selectedLetter] ||
                  `https://placehold.co/300x300/C07B4F/FFFFFF?text=${selectedLetter}&font=inter`
                }
                alt={`Letra ${selectedLetter} en LSM`}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <p className="text-lg text-stone-700 mt-2">
                {alphabetDescriptions[selectedLetter] ||
                  `Letra ${selectedLetter} en LSM.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
