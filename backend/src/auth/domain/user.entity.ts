export interface UserProps {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
}

export class User {
  constructor(private props: UserProps) {}

  get email(): string {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  toJSON() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
    };
  }
}
