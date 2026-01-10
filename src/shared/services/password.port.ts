export interface PasswordPort {
  hash(password: string, saltOrRounds?: string | number): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
