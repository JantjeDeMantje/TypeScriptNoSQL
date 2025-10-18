export interface FavoriteProps {
  userEmail: string;
  moduleCode: string;
  createdAt?: Date;
}

export class Favorite {
  constructor(private props: FavoriteProps) {}

  get userEmail(): string {
    return this.props.userEmail;
  }

  get moduleCode(): string {
    return this.props.moduleCode;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  static create(props: FavoriteProps): Favorite {
    return new Favorite(props);
  }

  toJSON() {
    return {
      userEmail: this.userEmail,
      moduleCode: this.moduleCode,
      createdAt: this.createdAt,
    };
  }
}
