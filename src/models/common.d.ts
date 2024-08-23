declare module Common {
  type BasicResponse<T> = {
    code: number;
    message: string;
    data: T;
    description: string;
  };
}
