export interface ModuleProps {
  code: string;
  name: string;
  ec: number;
  level: 'NLQF-5' | 'NLQF-6';
  theme?: string;
  description?: string;
  keywords?: string[];
}

export class Module {
  private constructor(private readonly props: ModuleProps) {}
  static create(props: ModuleProps) {
    return new Module(props);
  }
  toJSON(): ModuleProps {
    return { ...this.props };
  }
}