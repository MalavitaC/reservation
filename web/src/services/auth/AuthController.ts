import { request } from "@umijs/max";

export async function login(
  body: API.LoginBody
) {
  return request<API.LoginRes>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export default {
  login
}