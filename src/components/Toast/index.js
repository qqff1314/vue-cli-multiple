import Vue from 'vue';
import VueToast from './toast';

let instance;

const defaultOptions = {
  visible: true,
  duration: 3000,
  clear: () => {
    instance.visible = false;
  }
};

const createInstance = () => {
  if (!instance) {
    const ToastConstructor = Vue.extend(VueToast);
    instance = new ToastConstructor({
      el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
  }
};

const Toast = (options = {}) => {
  createInstance();

  options = typeof options === 'object' ? options : { message: options };
  options = { ...defaultOptions, ...options };
  Object.assign(instance, options);

  clearTimeout(instance.timer);

  if (options.duration !== 0) {
    instance.timer = setTimeout(() => {
      instance.clear();
    }, options.duration);
  }

  return instance;
};

Toast.clear = () => {
  instance && instance.clear();
};

Vue.prototype.$toast = Toast;

export default Toast;
