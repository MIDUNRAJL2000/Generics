interface Repository<T>{
    items: T[];
    add(item: T): void;
    remove(id: number): void;
    find(predicate: (item: T) => boolean): T | undefined;
}

class DataRepository<T extends {id:number}>implements Repository <T>{
    items:T[]

    constructor(initialItems:T[] = []){
        this.items = initialItems
    }

    add(item: T): void{
         this.items.push(item)
    }
    remove(id:number):void{
      
      this.items = this.items.filter(item => item.id !== id)
    }


    find(predicate: (item: T) => boolean): T | undefined{
        return this.items.find(predicate)
    }

}
interface User {
    id: number;
    name: string;
}

const userRepos = new DataRepository<User>();
userRepos.add({ id: 1, name: "John" });
userRepos.add({ id: 3, name: "Midun" });
console.log(userRepos.find(user => user.name === "John"));
console.log(userRepos.find(user => user.name === "Jake"));
userRepos.remove(1)
console.log(userRepos.find(user => user.name === "Midun"));