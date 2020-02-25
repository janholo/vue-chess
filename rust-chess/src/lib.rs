mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
pub struct ExportedNamedStruct {
    pub inner: u32,
}

#[wasm_bindgen]
pub enum Pieces {
    Hello,
    World,
    One,
    Two
}

#[wasm_bindgen]
pub fn create_piece() -> Pieces {
    Pieces::Hello
}

#[wasm_bindgen]
pub fn return_named_struct(inner: u32) -> ExportedNamedStruct {
    ExportedNamedStruct { inner }
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(val: &ExportedNamedStruct) {
    let msg = &format!("Hello, {}!", val.inner);
    alert(msg);
}
