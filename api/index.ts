import { readdirSync } from 'fs';

import { Router } from 'express';

const routes = Router();

const PATH_ROUTER = `${__dirname}/routes`;

const cleanFileName = (fileName: string) => {
  const file = `${fileName.split('.')[0]}.${fileName.split('.')[1]}`;
  return file;
};

// eslint-disable-next-line array-callback-return
readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);
  import(`api/routes/${cleanName}`).then((moduleRouter) => {
    routes.use(`/${cleanName.split('.')[0]}`, moduleRouter.router);
  });
});

// eslint-disable-next-line import/prefer-default-export
export { routes };
/* 
A Parti de este cambio Solo habria que crear dentro del directorio "routes"
la ruta con el formato nombre.route.ts, y nombre pasaria a ser el sufijo,
de esta forma estariamos importando de forma dinamica todos las rutas que
aparezcan bajo ese formato debajo del directorio "routes".

 */
