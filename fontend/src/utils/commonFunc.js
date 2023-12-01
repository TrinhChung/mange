export const buildHistories = (histories) => {
  return histories.map((history) => {
    return {
      id: history?.id,
      chapter: history?.name,
      name: history?.manga?.name,
      time: new Date(history?.created_at),
      thumbnail: history?.manga?.thumbnail,
      slug: history?.manga?.slug,
      mangaId: history?.manga?.id,
    };
  });
};

export const checkInputVote = (score) => {
  score = 100 * score;
  score = Math.round(score / 50);
  score = (score * 50) / 100;
  if (score < 0) return 0;
  if (score > 5) return 5;
  return score;
};
