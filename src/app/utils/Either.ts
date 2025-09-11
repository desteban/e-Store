// Definición del tipo Either
export abstract class Either<L, R> {
  abstract isLeft(): boolean;
  abstract isRight(): boolean;

  // Métodos de transformación
  abstract map<U>(fn: (value: R) => U): Either<L, U>;
  abstract mapLeft<U>(fn: (value: L) => U): Either<U, R>;
  abstract flatMap<U>(fn: (value: R) => Either<L, U>): Either<L, U>;
  abstract fold<U>(fnLeft: (left: L) => U, fnRight: (right: R) => U): U;

  // Métodos de acceso seguro
  abstract getOrElse<U>(defaultValue: U): R | U;
  abstract orElse<U>(alternative: Either<L, U>): Either<L, R | U>;

  // Métodos estáticos para crear instancias
  static left<L, R>(value: L): Either<L, R> {
    return new Left(value);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Right(value);
  }

  // Método para manejar operaciones que pueden fallar
  static try<L, R>(fn: () => R, errorHandler?: (error: unknown) => L): Either<L, R> {
    try {
      return Either.right(fn());
    } catch (error) {
      const leftValue = errorHandler ? errorHandler(error) : error as L;
      return Either.left(leftValue);
    }
  }
}

// Implementación de Left (error/fallo)
class Left<L, R> extends Either<L, R> {
  constructor(private readonly value: L) {
    super();
  }

  isLeft(): boolean {
    return true;
  }

  isRight(): boolean {
    return false;
  }

  map<U>(_fn: (value: R) => U): Either<L, U> {
    return new Left(this.value);
  }

  mapLeft<U>(fn: (value: L) => U): Either<U, R> {
    return new Left(fn(this.value));
  }

  flatMap<U>(_fn: (value: R) => Either<L, U>): Either<L, U> {
    return new Left(this.value);
  }

  fold<U>(fnLeft: (left: L) => U, _fnRight: (right: R) => U): U {
    return fnLeft(this.value);
  }

  getOrElse<U>(defaultValue: U): U {
    return defaultValue;
  }

  orElse<U>(alternative: Either<L, U>): Either<L, U> {
    return alternative;
  }

  // Getter para acceder al valor (uso interno)
  get leftValue(): L {
    return this.value;
  }
}

// Implementación de Right (éxito)
class Right<L, R> extends Either<L, R> {
  constructor(private readonly value: R) {
    super();
  }

  isLeft(): boolean {
    return false;
  }

  isRight(): boolean {
    return true;
  }

  map<U>(fn: (value: R) => U): Either<L, U> {
    return new Right(fn(this.value));
  }

  mapLeft<U>(_fn: (value: L) => U): Either<U, R> {
    return new Right(this.value);
  }

  flatMap<U>(fn: (value: R) => Either<L, U>): Either<L, U> {
    return fn(this.value);
  }

  fold<U>(_fnLeft: (left: L) => U, fnRight: (right: R) => U): U {
    return fnRight(this.value);
  }

  getOrElse<U>(_defaultValue: U): R {
    return this.value;
  }

  orElse<U>(_alternative: Either<L, U>): Either<L, R> {
    return this;
  }

  // Getter para acceder al valor (uso interno)
  get rightValue(): R {
    return this.value;
  }
}

// Tipos de utilidad para crear Either más específicos
export type EitherLeft<L> = Either<L, never>;
export type EitherRight<R> = Either<never, R>;
