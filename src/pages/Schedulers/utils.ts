import { useTranslation } from 'react-i18next';

export const confirmProps = {
  title: 'schedulers.popconfirmTitle',
  description: 'schedulers.popconfirmDescription',
  okText: 'schedulers.popconfirmOkText',
  cancelText: 'schedulers.popconfirmCancelText',
};

export const handleConfirmPropsTranslation = (
  translateObj: Record<string, string>
): Record<string, string> => {
  const { t } = useTranslation();
  const translatedObj: Record<string, string> = {};
  for (const key in translateObj) {
    if (Object.prototype.hasOwnProperty.call(translateObj, key)) {
      translatedObj[key] = t(translateObj[key]);
    }
  }
  return translatedObj;
};
