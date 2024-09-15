import { ReadonlyURLSearchParams } from "next/navigation";

export function readCheckedStateFromParam(params: ReadonlyURLSearchParams, key: string, if_null_return: boolean = true) {
    const val = params.get(key);
    if (typeof val === "string") return val === "true";
    return if_null_return;
}