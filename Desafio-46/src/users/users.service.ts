import { Injectable } from '@nestjs/common';

let data = []

@Injectable()
export class UsersService {
  create(createUserDto: object) {
    if(data.length===0){
      createUserDto['id'] = 1
    }else{
      createUserDto['id'] = data[data.length - 1].id + 1
    }
    data.push(createUserDto)
    const user = this.findOne(createUserDto['id'])
    return user;
  }

  findAll() {
    return data;
  }

  findOne(id: number) {
    const user = data.filter((e)=>e.id===id)
    return user;
  }

  update(id: number, updateUserDto: object) {
    let user = data.find((e)=>e.id===id)
    if(updateUserDto['id.']) delete updateUserDto['id']
    for (const key in updateUserDto) {
      user[key] = updateUserDto[key]
    }

    const newdata = []
    for (const item of data) {
        if(item.id == user.id){
            newdata.push(user)
        }else{
            newdata.push(item)
        }
    }
    data = newdata
    return user;
  }

  remove(id: number) {
    const newData = data.filter(element=>element.id != id)
    data = newData
    return `User deleted success`;
  }
}
