import React from 'react';
import styles from './Loteria.module.css';


const patrocinadores = [
  { id: 1, src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239161/logoTeleton_emx96j.png', alt: 'Patrocinador 1' },
  { id: 2, src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239161/logoTeleton_emx96j.png', alt: 'Patrocinador 2' },
  { id: 3, src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239161/logoTeleton_emx96j.png', alt: 'Patrocinador 3' },
  { id: 4, src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239161/logoTeleton_emx96j.png', alt: 'Patrocinador 4' },
  { id: 5, src: 'https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239161/logoTeleton_emx96j.png', alt: 'Patrocinador 5' },
];

const Patrocinadores = () => {

  return (
    <div className={styles.containerFooter} >
      {patrocinadores.map(({ id, src, alt }) => (
        <img key={id} src={src} alt={alt} className={styles.imagenFooter} />
      ))}
    </div>
  );
};

export default Patrocinadores;
