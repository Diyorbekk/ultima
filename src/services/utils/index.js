import camelCase from 'lodash/camelCase';

const importAll = (files, str='') => {
  return files
    .keys()
    .reduce((acc,file) => ({
      ...acc, 
      [camelCase(file.replace(str, ''))]: files(file).default
    }), {});
};

const getRoleText = role => {
  switch(role){
    case '1':
      return 'users.person-1';
    case '2':
      return 'users.person-2';
    case '3':
      return 'users.person-3';
    case '4':
      return 'users.person-4';
    case '5':
      return 'users.person-5';
    case '6':
      return 'users.person-6';
    case '7':
      return 'users.person-7';
    default:
      return 'users.out';
  }
};

export {
  importAll,
  getRoleText,
}