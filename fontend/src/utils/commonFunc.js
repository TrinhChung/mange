export const buildHistories = (histories) => {
  return histories.map((history) => {
    return {
      id: history?.id,
      chapter: history?.name,
      name: history?.manga?.name,
      time: new Date(history?.created_at),
      thumbnail: history?.manga?.thumbnail,
      slug: history?.manga?.slug,
    };
  });
};
