export interface User {
  id: string
  name: string
  gmail: string
  phonenumber: string
}

export interface CreateUserRequest {
  name: string
  gmail: string
  phonenumber: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  gmail?: string
  phonenumber?: string
}
