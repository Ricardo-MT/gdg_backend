/* eslint-disable max-len */
import mongoose from 'mongoose';

import Logger from 'loaders/logger';
import Edition from 'models/edition.model';

const editions = [
  {
    organizer: 'GDG Algeciras',
    date: 1645725600000,
    location:
      'Centro Documental "Jose Luis Cano", frente a la Residencia Militar, junto a la Fundación Campus Tecnológico',
    title: 'GDG Algeciras Febrero 2022',
    description:
      'Volvemos a la carga con un nuevo evento, con dos ponencias muy representativas de sus respectivos sectores en el campo de la tecnología: desarrollo de aplicaciones y seguridad de redes. En esta ocasión vamos a aprovechar el abundante talento estudiantil de nuestra zona, ya que los ponentes serán alumnos de los institutos IES Saladillo y IFP Puenteuropa, ambos de Algeciras; es la primera vez que los institutos de la zona comparten evento, y seguro que no va a ser la última. En la primera charla, los estudiantes del IES Saladillo nos harán una introducción a Flutter, el framework de Google para desarrollo de aplicaciones multiplataforma. En la segunda charla, los estudiantes del IFP Puenteuropa nos demostrarán los riesgos de seguridad de las redes Wifi. El evento tendrá lugar en Algeciras, en el Centro Documental "Jose Luis Cano", frente a la Residencia Militar, junto a la Fundación Campus Tecnológico.',
    talks: [
      {
        createdBy: mongoose.Types.ObjectId('63ce555a7a977b2a18d33451'),
        speakersIds: [
          mongoose.Types.ObjectId('63ce555a7a977b2a18d33451'),
          mongoose.Types.ObjectId('63ce555a7a977b2a18d33455'),
        ],
        title: 'Descubriendo Flutter',
        description:
          'Flutter es un framework multiplataforma de Google que permite desarrollar aplicaciones para Android, IOS y web, que cada vez cuenta con más adeptos debido a su potencia, versatilidad y rendimiento. En esta ponencia, de caracter introductorio, los alumnos del IES Saladillo Rubén Canas, Fran Fernández, Óscar Pörtner y Ricardo Mejías nos mostrarán las principales características de esta tecnología.',
        skills: ['flutter'],
      },
      {
        createdBy: mongoose.Types.ObjectId('63ce555a7a977b2a18d33451'),
        speakersIds: [
          mongoose.Types.ObjectId('63ce555a7a977b2a18d33451'),
          mongoose.Types.ObjectId('63ce555a7a977b2a18d33459'),
        ],
        title: '¿Un infiltrado en mi casa?',
        description:
          'Las redes Wifi son usadas a diario por millones de personas, permitiendo disponer de conectividad en nuestros dispositivos de forma cómoda y sencilla. Pero también plantean algunos riesgos en cuanto a la seguridad de nuestra información. En esta ponencia, de marcado carácter práctico, los alumnos del IFP Puenteuropa Juan Holgado y Javier Mestanza nos enseñarán algunos de esos riesgos.',
        skills: ['cybersecurity'],
      },
    ],
  },
];

async function editionSeeds() {
  await Edition.deleteMany({});
  for (let i = 0; i < editions.length; i++) {
    const editionToInsert = editions[i];
    await new Edition(editionToInsert).save();
  }
  Logger.debug('Edition seeds terminado.');
}

export default editionSeeds;
