export class ServerError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'ServerError';
        this.statusCode = 500;
    }
}

export class ValidationError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

export class NotFoundError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
