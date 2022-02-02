export enum enumDeep {
    all = "all",
    one = "one",
    none = "none"
}

type enumDeeptype = keyof typeof enumDeep;

export const getEnumfromString = (str: any): enumDeep => {
    if (!str) {
        return enumDeep.none;
    }
    if (!(str in enumDeep)) {
        throw new Error(`${str} is not a valid value for deep flag`);
    }
    return enumDeep[str as enumDeeptype];
}