const tags = ["Work", "Study", "Spanish"];

export const getTags = async () => {
  return tags;
};

export const insertTag = async (tag: string) => {
  tags.push(tag);
};
