export class Group {
    id: string;
    name: string;
    ownerID: string;
    userIDs: string[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public toString(): string {
        return "{" +
            "id: " + this.id + "," +
            "name: " + this.name + "," +
            "ownerID: " + this.ownerID + "," +
            "userIDs: [" + this.userIDs + "]}";
    }
}
