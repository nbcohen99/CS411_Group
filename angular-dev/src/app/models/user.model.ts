export class User {
    id: string;
    name: string;
    token: string;
    email: string;
    friends: number[];
    groups: number[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public toString(): string {
        return "{" + 
            "id: "+ this.id + "," +
            "name: " + this.name + "," +
            "token: " + this.token + "," +
            "email: " + this.email + "," +
            "friends: " + this.friends.toString() + "," +
            "groups: " + this.groups.toString() + "}";
    }
}
