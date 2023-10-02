export class SignUpResDto {
  accessToken: string;

  private constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  public static of(accessToken: string): SignUpResDto {
    return new SignUpResDto(accessToken);
  }
}

export class SignInResDto {
  accessToken: string;

  private constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  public static of(accessToken: string): SignInResDto {
    return new SignInResDto(accessToken);
  }
}
