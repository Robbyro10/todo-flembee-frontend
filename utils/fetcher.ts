import { todoApi } from "@/api/todoApi";

export const fetcher = (url: string) => todoApi.get(url).then(res => res.data);