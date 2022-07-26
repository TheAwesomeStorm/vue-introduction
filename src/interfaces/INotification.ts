export enum NotificationTypes {
  danger = 'is-danger',
  success = 'is-success',
  warning = 'is-warning',
}

export interface INotification {
  id: number,
  message: string
  title: string,
  type: NotificationTypes
}