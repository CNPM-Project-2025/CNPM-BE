import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ResponsePayload<T> {
    statusCode: number;
    data: T;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, ResponsePayload<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponsePayload<T>>;
}
