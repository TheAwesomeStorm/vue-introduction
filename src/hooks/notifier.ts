import { Mutation } from '@/store/mutation';
import { NotificationTypes } from '@/interfaces/INotification';
import { store } from '@/store';

export const GetNotifier = () => {
  const notify = (type: NotificationTypes, title: string, message: string) => {
    store.commit(Mutation.NOTIFICATE, {
      message,
      title,
      type
    });
  };
  return { notify };
};
