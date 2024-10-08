import { createSignal } from "solid-js";

const [tags, setTags] = createSignal<string[]>(["Work", "Study"]);

export const getTags = async () => {
  return tags();
};

export const searchTags = (keyword: string) =>
  keyword === ""
    ? tags()
    : tags().filter((t) => t.toLowerCase().includes(keyword.toLowerCase()));


export const insertTag = async (tag: string) => {
  setTags(t => [...t, tag]);
};
