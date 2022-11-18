import { MenuItem } from '@/types/common/menuSider';

export const menuItem: Array<MenuItem> = [
  { value: 'dish', label: '菜品', icon: 'file-add', to: '/home/dish' },
  {
    value: 'category',
    label: '菜品口味',
    icon: 'file-add',
    to: '/home/Category',
  },
  { value: 'order', label: '订单', icon: 'file-add', to: '/home/order' },
  {
    value: 'staff',
    label: '门店人员',
    icon: 'file-add',
    to: '/home/staff',
  },
  { value: 'appraise', label: '评价', icon: 'file-add', to: '/home/appraise' },
  { value: 'chat', label: '交流', icon: 'file-add', to: '/home/chat' },
];
