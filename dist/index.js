function a() {
    console.log('a');
}

function main() {
    console.log('yes working');
}
var index = { main: main, a: a };

export { index as default };
