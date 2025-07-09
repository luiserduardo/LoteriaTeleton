import React, { useState, useEffect } from 'react';
import styles from './Loteria.module.css';

const patrocinadores = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752042269/UPPERADE_2025_copy-02_zij9pk.png',
    alt: 'Patrocinador 1',
    bgColor: '#0f194e',
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752042639/Logo_Agrisal_aur14m.png',
    alt: 'Patrocinador 2',
    bgColor: '#FFFFFF',
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752042455/LOGO_PAILL_FULL_COLOR_aaspxq.png',
    alt: 'Patrocinador 3',
    bgColor: '#FFFFFF',
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752042941/patrocinadorTeleton-removebg-preview_kh22fo.png',
    alt: 'Patrocinador 4',
    bgColor: '#FFFFFF',
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752043030/POST_vectorized_lcfxvm.png',
    alt: 'Patrocinador 5',
    bgColor: '#000000',
  },
   {
    id: 6,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752043350/All_American_Travel_FCM_Mesa_de_trabajo_1_ccwjko.png',
    alt: 'Patrocinador 6',
    bgColor: '#e4edff',
  },
    {
    id: 7,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752044688/LOGO_VERDE-removebg-preview_qjrfyh.png',
    alt: 'Patrocinador 7',
    bgColor: '#f9f5ee',
  }
  ,{
    id:8,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752043696/LOGO_VIVA_MAX_CALIDAD_ix1iij.png',
    alt: 'Patrocinador 8',
        bgColor: '#FFFFFF',

  }
  ,{
    id:9,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752044979/CC_logo_blanco_tvkphc.png',
    alt: 'Patrocinador 9',
        bgColor: '#561c84',

  }
   ,{
    id:10,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752045039/One_Page_COBRANDING_Bi_2024path_-_copia_1_-02_dym489.png',
    alt: 'Patrocinador 10',
   bgColor: '#003865',

  }
    ,{
    id:11,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752045237/logo-a-color--2_f5wzgz.png',
    alt: 'Patrocinador 11',
        bgColor: '#fbe2e6',

  }
    ,{
    id:12,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752045331/LogoOrisol_tsgrtd.png',
    alt: 'Patrocinador 12',
        bgColor: '#FFFFFF',

  }
     ,{
    id:13,
    src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752045337/logo_Max_xbxlji.png',
    alt: 'Patrocinador 13',
        bgColor: '#FFFFFF',

  },

  {
    id:14,
    src:'https://res.cloudinary.com/dvsiltcrs/image/upload/v1752045425/LOGOticket_c1yfmj.png',
      alt: 'Patrocinador 14',
        bgColor: '#000000',
  }
];


const Patrocinadores = () => {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % patrocinadores.length);
    }, 10000); // Cambia cada 10 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      className={styles.sliderWrapper}
      style={{
        backgroundColor: patrocinadores[indice].bgColor,
        transition: 'background-color 1s ease',
      }}
    >
      <div
        className={styles.sliderContainer}
        style={{ transform: `translateX(-${indice * 100}%)` }}
      >
        {patrocinadores.map(({ id, src, alt }) => (
          <img key={id} src={src} alt={alt} className={styles.imagenFooter} />
        ))}
      </div>
    </div>
  );
};

export default Patrocinadores;
