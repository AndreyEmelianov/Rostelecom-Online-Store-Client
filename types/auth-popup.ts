import { FieldErrors, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IRegisterAndLoginFx {
  name?: string
  email: string
  password: string
  isOAuth?: boolean
}

export interface IAuthSideProps {
  isSideActive: boolean
  toggleAuth: VoidFunction
}

export interface IAuthInput {
  register: UseFormRegister<IInputs>
  errors: Partial<FieldErrorsImpl<IInputs>>
}

export interface INameErrorsMessageProps {
  fieldName: string
  className?: string
  errors: FieldErrors<IInputs & { [index: string]: string }>
}
