import bcrypt from 'bcryptjs'
import type { PasswordHasher } from '../../types/services.js'

function createPasswordHasher({ rounds }: { rounds: number }): PasswordHasher {
    return {
        hash: (plain) => bcrypt.hash(plain, rounds),
        compare: (plain, hash) => bcrypt.compare(plain, hash),
    }
}

export default createPasswordHasher
