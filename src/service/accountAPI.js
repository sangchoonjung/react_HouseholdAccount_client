class AccountAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.getOption = {
      mothod: "get",
    };
    this.postOption = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    };
  }
  //로그인 API
  async auth(email, password) {
    const response = await fetch(this.baseURL + "/api/account/auth", {
      ...this.postOption,
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  }
  //토큰확인 API
  async valid(token) {
    const response = await fetch(this.baseURL + "/api/account/valid", {
      ...this.postOption,
      body: JSON.stringify({ token }),
    });
    return await response.json();
  }
  //가입 하기 API
  async register(email, password, name, gender) {
    const response = await fetch(this.baseURL + "/api/account/register", {
      ...this.postOption,
      body: JSON.stringify({ email, password, name, gender }),
    });

    return await response.json();
  }
}

export default AccountAPI;
