import Logger from 'loaders/logger';
import Skill from 'models/skill.model';

const skills = [
  'html',
  'css',
  'javascript',
  'python',
  'java',
  'nodejs',
  'C#',
  'C',
  'C++',
  'reactjs',
  'react native',
  'flutter',
  'dart',
  'seo',
  'mysql',
  'wordpress',
  'php',
  'unity',
  'kotlin',
  'swift',
  'objective c',
  'django',
  'ruby',
  'rust',
  'mongodb',
  'asp.net',
  'expressjs',
  'angular',
  'vue',
  'photoshop',
  'blender',
  'adobe xd',
  'figma',
  'ilustrator',
  'nextjs',
  'unreal engine',
  'azure',
  'cisco',
  'odoo',
  'web3',
  'blockchain',
  'aws cloud',
  'ia',
  'big data',
  'ui/ux',
  'google analytics',
  'firebase',
  'ionic',
];

async function skillSeeds() {
  await Skill.deleteMany({});
  for (let i = 0; i < skills.length; i++) {
    const skillToInsert = { name: skills[i] };
    await new Skill(skillToInsert).save();
  }
  Logger.debug('Skill seeds terminado.');
}

export default skillSeeds;
