export class ParameterError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'ParameterError';
        this.statusCode = 400;
    }
}

export class FileOperationError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'FileOperationError';
        this.statusCode = 500;
    }
}

export class ParseFileError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'ParseFileError';
        this.statusCode = 400;
    }
}

export class QueueError extends Error {
    public statusCode: number;
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.name = 'QueueError';
        this.statusCode = 500;
    }
}
