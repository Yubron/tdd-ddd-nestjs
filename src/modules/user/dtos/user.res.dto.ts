export class SignUpResDto {
  accessToken: string;

  private constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  public static of(accessToken: string): SignUpResDto {
    return new SignUpResDto(accessToken);
  }
}
