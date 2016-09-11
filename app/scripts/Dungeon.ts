
export interface Room {
    x:number;
    y:number;
    w:number;
    h:number;
}

export interface DungeonConfig {
    mapSize?:number;
    minRoomCount?:number;
    maxRoomCount?:number;
    minRoomSize?:number;
    maxRoomSize?:number;
}

export class Dungeon {

    public mapSize: number;
    public map:Array<Array<number>> = null;
    public rooms:Array<Room> = [];

    constructor(config:DungeonConfig = {}) {

        this.mapSize = config.mapSize || 64;
        let minRoomCount = config.minRoomCount || 10;
        let maxRoomCount = config.maxRoomCount || 20;
        let minSize = config.minRoomSize || 5;
        let maxSize = config.maxRoomSize || 15;

        this.map = [];

        for (let x = 0; x < this.mapSize; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.mapSize; y++) {
                this.map[x][y] = 0;
            }
        }

        let roomCount = Helpers.getRandom(minRoomCount, maxRoomCount);

        for (let i = 0; i < roomCount; i++) {
            let room:Room = {
                x: Helpers.getRandom(1, this.mapSize - maxSize - 1),
                y: Helpers.getRandom(1, this.mapSize - maxSize - 1),
                w: Helpers.getRandom(minSize, maxSize),
                h: Helpers.getRandom(minSize, maxSize)
            };

            if (this.doesCollide(room)) {
                i--;
                continue;
            }
            room.w--;
            room.h--;

            this.rooms.push(room);
        }
    }

    doesCollide(room:Room, ignore: number = undefined):boolean {
        for (let i = 0; i < this.rooms.length; i++) {
            if (i === ignore) { continue; }
            let check = this.rooms[i];
            if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) ||
                  (room.y + room.h < check.y) || (room.y > check.y + check.h))) {
                return true;
            }
        }
        return false;
    }
}

export class Helpers {
    public static getRandom(low:number, high:number):number {
        return~~ (Math.random() * (high - low)) + low;
    }
}