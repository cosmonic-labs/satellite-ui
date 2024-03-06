/** @param plop {import('@turbo/gen').PlopTypes.NodePlopAPI} */
const generator = (plop) => {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('icon', {
    description: 'Adds a new icon component and SVG file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the icon?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/icons/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/_svg/{{kebabCase name}}.svg',
        templateFile: 'templates/icon.hbs',
      },
      {
        type: 'append',
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/g,
        template: '"./{{kebabCase name}}": "./src/{{kebabCase name}}.tsx",',
      },
    ],
  });
};

module.exports = generator;
