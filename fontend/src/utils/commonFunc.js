import { hostImg } from '../const/index';
export const buildHistories = (histories) => {
  return histories.map((history) => {
    return {
      id: history?.id,
      chapter: history?.name,
      name: history?.manga?.name,
      time: history?.created_at,
      thumbnail: hostImg + history?.manga?.thumbnail,
    };
  });
};
