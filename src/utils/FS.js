import fs from 'fs'
import path  from 'path'

export const read = dir => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'model', dir)))


export const write =(dir, data)=>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(path.join(process.cwd(), 'src', 'model', dir), JSON.stringify(data, null, 4), err=>{
            if(err) reject(err)

            resolve(data.at(-1))

        })
    })
}