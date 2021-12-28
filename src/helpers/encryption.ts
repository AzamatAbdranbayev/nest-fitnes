import * as bcrypt from 'bcrypt'

class EncryptionHelpers {
    salt: number
    constructor() {
        this.salt = 10
    }
    encrypt(encryptVar) {
        return bcrypt.hash(encryptVar, this.salt)
    }
    decrypt(decryptVar, hashVar) {
        return bcrypt.compare(decryptVar, hashVar)
    }
}

export default new EncryptionHelpers()
