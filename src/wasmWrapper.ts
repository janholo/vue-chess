import * as wasm from "rust-chess";

wasm.init();

export type FieldInfo = {
  background: wasm.Color,
  name: string
}

export function calcFieldInfos() {
    let fields = wasm.calc_field_infos_js();
    for (const info of fields.infos) {
        if(info.background === "White") {
            info.background = wasm.Color.White;
        } else {
            info.background = wasm.Color.Black;
        }
    }

    return fields.infos as FieldInfo[]
}

