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
