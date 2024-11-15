export interface FormStrategy {
    renderForm: (mode: string, data: Record<string, any>) => JSX.Element;
}

export enum FormMode {
    VIEW = 'VIEW',
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
}

export interface KeyBoardProduct {
    id: string;
    category: string;
    price: string;
    adapt: string;
}