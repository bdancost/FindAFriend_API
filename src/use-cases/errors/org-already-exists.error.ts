export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization already exists with this email')
  }
}
