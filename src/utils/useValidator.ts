import { ref, Ref, reactive } from 'vue';
import { redirectToHome } from 'utils/useRouterJump';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  AdministratorInfo,
  LoginInfo,
  RegisterInfo,
} from '@/types/domain/user';
import { user } from 'api/user';

interface Validator {
  result: boolean;
  message: string;
  type: 'error' | 'warning' | 'success';
}

// login
export const getLoginContext = () => {
  const formData = reactive<LoginInfo>({
    account: '',
    password: '',
  });

  const rules = {
    account: [{ required: true, message: '请输入邮箱' }],
    password: [{ required: true, message: '请输入密码' }],
  };

  const isSubmitBtnDisabled: Ref<boolean> = ref(false);

  const onSubmit = ({ validateResult, firstError, e }: any) => {
    e.preventDefault();
    MessagePlugin.closeAll();
    if (validateResult === true) {
      isSubmitBtnDisabled.value = !isSubmitBtnDisabled.value;
      MessagePlugin.loading('登录中');

      user
        .login(formData.account, formData.password)
        .then((res: any) => {
          MessagePlugin.closeAll();
          if (res.code !== 1) {
            MessagePlugin.error(`${res.msg}`);
            isSubmitBtnDisabled.value = !isSubmitBtnDisabled.value;
          } else {
            user.getUserInfo().then((res: any) => {
              const data = res.data;
              localStorage.setItem('canteenId', data.canteenId);
            });
            localStorage.setItem('token', res.data);
            MessagePlugin.success('登陆成功，即将跳转至首页');
          }
          const timer = setTimeout(() => {
            redirectToHome();
            clearTimeout(timer);
          }, 500);
        })
        .catch((err: any) => {
          MessagePlugin.closeAll();
          MessagePlugin.error('登陆失败，请稍后重试');
          isSubmitBtnDisabled.value = !isSubmitBtnDisabled.value;
        });
    } else {
      MessagePlugin.error(firstError);
    }
  };

  return {
    formData,
    rules,
    isSubmitBtnDisabled,
    onSubmit,
  };
};

// register
export const getRegisterContext = () => {
  const formData = reactive<RegisterInfo>({
    avatar: '',
    name: '',
    account: '',
    password: '',
    passwordAgain: '',
  });

  const emailValidator = (val: string): Validator => {
    const successRes: Validator = {
      result: true,
      message: '',
      type: 'success',
    };
    const errorRes: Validator = {
      result: false,
      message: '邮箱格式有问题！！',
      type: 'error',
    };
    const res = val.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
    return res ? successRes : errorRes;
  };

  const passwordValidator = (val: string): Validator => {
    const successRes: Validator = {
      result: true,
      message: '好密码！！',
      type: 'success',
    };
    const errorToEasyRes: Validator = {
      result: false,
      message: '密码太简单了！！',
      type: 'error',
    };
    return val.length > 0 && val.length < 3 ? errorToEasyRes : successRes;
  };

  const passwordAgainValidator = (val: string): Validator => {
    const successRes: Validator = {
      result: true,
      message: '验证成功！',
      type: 'success',
    };
    const errorRes: Validator = {
      result: false,
      message: '两次密码不一致',
      type: 'error',
    };
    return val === formData.password ? successRes : errorRes;
  };

  const rules = {
    account: [
      { required: true, message: '请输入名字' },
      { min: 2, message: '长度至少为2', type: 'error', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱' },
      { validator: emailValidator },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { validator: passwordValidator },
    ],
    passwordAgain: [
      { required: true, message: '请再一次输入密码以确认' },
      { validator: passwordAgainValidator },
    ],
  };

  const isSubmitBtnDisabled: Ref<boolean> = ref(false);

  const onSubmit = ({ validateResult, firstError, e }: any) => {
    e.preventDefault();
    MessagePlugin.closeAll();
    if (validateResult === true) {
      isSubmitBtnDisabled.value = !isSubmitBtnDisabled.value;
      MessagePlugin.loading('注册中');

      user
        .register(formData.name, formData.account, formData.password)
        .then((data: any) => {
          MessagePlugin.closeAll();
          MessagePlugin.success('注册成功，请十分钟内前往邮箱激活');
        })
        .catch((error: any) => {
          MessagePlugin.closeAll();
          isSubmitBtnDisabled.value = !isSubmitBtnDisabled.value;
          MessagePlugin.error(`${error.msg}`);
          console.log(error);
        });
    } else {
      MessagePlugin.error(firstError);
    }
  };

  return {
    formData,
    rules,
    isSubmitBtnDisabled,
    onSubmit,
  };
};
