import { ApiWithoutToken } from './Api';

export const authenticate = async (userLoginId: string, password: string) => {
  const END_POINT = '/user/authenticate';
  try {
    const repsonse = await ApiWithoutToken(END_POINT, {
      method: 'POST',
      data: {
        userLoginId,
        password,
      },
    });
    return repsonse.data;
  } catch (ex) {
    console.error(ex);
    throw new Error();
  }
};
