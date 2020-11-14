export class User {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null
    }
    return this._token;
  }

  get tokenExpirationTime(): Date {
    return this._tokenExpirationDate;
  }

  toString(): string {
    const userData = {
      email: this.email,
      id: this.id,
      _token: this._token,
      _tokenExpirationDate: this._tokenExpirationDate
    }
    return JSON.stringify(userData);
  }
}