export class Group {
    id: String;
    name: String;
    ownerID: String;
    userIDs: String[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public toString(): string {
        return "{" +
            "id: " + this.id + "," +
            "name: " + this.name + "," +
            "ownerID: " + this.ownerID + "," +
            "userIDs: " + this.userIDs + "}";
    }
}
