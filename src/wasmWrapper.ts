import * as wasm from "rust-chess";

wasm.init();

export type Color = "White" | "Black";
export type FieldInfo = {
  background: Color,
  name: string
}
type FieldInfos = {
 infos: FieldInfo[];
}

export function calcFieldInfos() {
    let f = wasm.calc_field_infos_js() as FieldInfos;
    return f.infos
}

