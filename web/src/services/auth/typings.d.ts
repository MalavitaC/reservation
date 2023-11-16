declare namespace API {
  interface LoginBody {
    account: string;
    password: string;
  }

  interface LoginRes {
    access_token: string;
  }
}