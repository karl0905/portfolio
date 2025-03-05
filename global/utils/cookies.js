"use server";
import { cookies } from "next/headers";

// function to set cookie
export async function setCookie(data) {
  const cookieStore = cookies();
  cookieStore.set(data.name, data.value, data.options);
}

export async function getCookie(data) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(data);
  return cookie;
}
