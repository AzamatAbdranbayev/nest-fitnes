import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { nanoid } from 'nanoid'

@Injectable()
export class FilesService {
    async createFile(files) {
        try {
            let filesName = []
            files.forEach((element) => {
                const fileName = `fitnes.${nanoid(15)}.jpg`
                const filePath = path.resolve(__dirname, '..', 'static')
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                }
                fs.writeFileSync(path.join(filePath, fileName), element.buffer)
                filesName.push(fileName)
            })
            return filesName
        } catch (e) {
            console.log(e)
            throw new HttpException(
                'Произошла ошибка при записи файла',
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async deleteFile(fileName) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static')
            const result = fs.unlink(path.join(filePath, fileName), (err) => {
                if (err) {
                    return false
                    // return false;
                    console.log('innnnn : ', err)
                    // throw new Error("Произошла ошибка при удалении файла")
                    throw new HttpException(
                        'Произошла ошибка при удалении файла',
                        HttpStatus.BAD_REQUEST,
                    )
                }
                return true
            })
            return result
        } catch (e) {
            return false
            console.log('eeror inner : ', e)
            // return false
            // throw new Error("Произошла ошибка при удалении файла")
            throw new HttpException(
                'Произошла ошибка при удалении файла',
                HttpStatus.BAD_REQUEST,
            )
        }
    }
}
