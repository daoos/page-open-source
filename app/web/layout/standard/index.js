import MainLayout from './main';
const content = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

export default {
  name: 'Layout',
  components: {
    MainLayout
  },
  template: content
};
